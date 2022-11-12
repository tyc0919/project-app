<script setup>
// moduals
import { ref, onBeforeMount, onBeforeUpdate, onUpdated } from 'vue';
import { getCookie } from '../assets/modules'
import axios from "axios";
import { useRoute } from 'vue-router';
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
// components
import Modal from './Modal.vue';

//api config 
let csrftoken = getCookie('csrftoken')
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
const route = useRoute();
const activityId = route.params.EventId

//select file
let selectedFile = ref(null)
const setSelectedFile = (file) => {
    selectedFile.value = file;
}
// modal
const modalController = {
    uploadFileModal: ref(false),
    messageModal: ref(false),
    updateBudgetModal: ref(false),
}
const toggleModal = (modalName) => {
    cleanErrorMessage()
    modalController[modalName].value = !modalController[modalName].value
}

// get data
let budget = ref([]);
let graphPercent = ref(0)
const getData = async () => {
    try {
        await axios.get('/api/activity/' + activityId + '/budget/', config)
            .then(async function (response) {
                budget.value = response.data;
            });

        // To append some extra information, need to get some supporting data
        let user = ref([]);
        await axios.get('/api/userprofile/')
            .then(function (response) {
                user.value = response.data;
            });

        let collaborators = ref([]);
        await axios.get('/api/activity/' + activityId + '/collaborator/')
            .then(function (response) {
                collaborators.value = response.data;
            });

        let userJobs = ref([]);
        for (let job of budget.value.jobs) {
            if (job.person_in_charge_email == user.value.user_email) {
                userJobs.value.push(job);

            }
        }

        if (user.user_email == budget.owner) {
            budget.value['is_owner'] = true;
        } else {
            budget.value['is_owner'] = false;
        }
        budget.value["user_jobs"] = userJobs

        // append activity expense
        let activityExpense = ref(0);
        for (let i = 0; i < budget.value.jobs.length; i++) {
            activityExpense.value += budget.value.jobs[i].job_expenditure;
        }

        budget.value["activity_expense"] = activityExpense.value;
        let percent = Math.round((activityExpense.value / budget.value.activity_budget) * 100)

        if (percent > 100) {
            graphPercent.value = 100;
        } else {
            graphPercent.value = Math.round((activityExpense.value / budget.value.activity_budget) * 100)
        }
        console.log(budget.value)


        // append jobs data
        for (let expenditure of budget.value.expenditures) {
            // adjust date format
            expenditure.expenditure_uploaded_time = new Date(
                expenditure.expenditure_uploaded_time).toLocaleDateString();
            // append job data
            for (let job of budget.value.jobs) {
                if (expenditure.job == job.id) {
                    expenditure["job_title"] = job.title;
                    expenditure["person_in_charge_email"] = job.person_in_charge_email;
                }
            }
            // append user_name collaborators.value
            for (let collaborator of collaborators.value) {
                if (expenditure.person_in_charge_email == collaborator.user_email) {
                    expenditure['user_name'] = collaborator.user_name;
                }
            }
        }

        // adjust money notations
        budget.value.activity_budget = budget.value.activity_budget.toLocaleString()
        for (let expenditure of budget.value.expenditures) {
            expenditure.expense = expenditure.expense.toLocaleString();
            // add download path
            expenditure["download_path"] = "/api/serve-file/" + activityId + "/" + expenditure.expenditure_receipt_path
        }
        budget.value.activity_expense = budget.value.activity_expense.toLocaleString();

    } catch (error) {
        throw new Error(error);
    }
}
getData()


// 更新預算
let isSuccessUpdateBudget = ref(false);
const updateActivityBudget = async () => {
    // post
    let budgetEl = document.querySelector('#budget-el');
    try {
        await axios.post('/api/activity/budget/update/',
            {
                "activity_id": activityId,
                "activity_budget": budgetEl.value
            },
            config)
            .then(response => {
                console.log(response)
            });
        // success message
        isSuccessUpdateBudget.value = true;

    } catch (error) {
        // failed message
        isSuccessUpdateBudget.value = false;

    } finally {
        budgetEl.value = ""
        toggleModal('updateBudgetModal')
        toggleModal('messageModal')
    }
    getData();
}


// 上傳檔案
let fileEl = ref(null);
let fileList = ref([])
let fileName = ref("file_name")
//偵測上傳檔名
let isImage = ref(false)


const changeFile = () => {
    errorMessage.fileErrorMessage.value = ""
    if (fileEl.value.files[0].type.search('image') == -1) {
        // file 不變
        isImage.value = false
        errorMessage.fileErrorMessage.value = '檔案格式錯誤(只接受jpg, png...等圖片格式)'
    } else {
        // 更新fileList
        isImage.value = true
        let files = fileEl.value.files
        files = Array.prototype.slice.call(files);
        fileList.value = fileList.value.concat(files);
        fileName.value = fileList.value[fileList.value.length - 1].name
    }
}

// 錯誤訊息
let errorMessage = {
    expenseErrorMessage: ref(),
    fileErrorMessage: ref(),
    jobErrorMessage: ref(),
}
const cleanErrorMessage = () => {
    //  清空錯誤訊息
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }
}


const uploadExpenditure = async () => {
    cleanErrorMessage()

    // 抓取api所需參數
    let expenseEl = document.querySelector('#expense-el');
    let jobEl = document.querySelector('#job-el');

    try {
        // append data of POST api 
        let formData = new FormData();
        formData.append('file', fileList.value[fileList.value.length - 1]);
        formData.append('job_id', jobEl.value) //工作序號
        formData.append('expense', expenseEl.value); //花費

        // do POST api
        await axios.post('/api/upload/expenditure/', formData, config)
            .then(function (response) {
                console.log(response.data);
            })
        getData();
        toggleModal('uploadFileModal')
        fileList.value = [];
        fileName.value = ""
    } catch (error) {
        let expense = expenseEl.value

        // expense error
        if (expense == "") {
            errorMessage.expenseErrorMessage.value = '支出金額不可為空';

        } else if (expense < 0) {
            errorMessage.expenseErrorMessage.value = '支出金額不可為負數';
        }

        // file error

        let errorStatus = error.response.status
        if (errorStatus == 413) {
            errorMessage.fileErrorMessage.value = '檔案過大'
        }
        if (fileEl.value.files[0] == null) {
            errorMessage.fileErrorMessage.value = '請選取一個檔案'
        }

        // job error
        if (jobEl.value == "null") {
            errorMessage.jobErrorMessage.value = '請選擇一項工作'
        }
    }

}

// ? 刪除檔案
const deleteExpenditure = async (fileName, jobId) => {
    let formData = new FormData();
    try {
        // do POST api
        await axios.post('/api/delete-file/',
            {
                "model": "expenditure",
                "job_id": jobId,
                "file_name": fileName
            }, config)
            .then(function (response) {
                console.log(response);
            })

        getData()
    } catch (error) {
        console.log("error")
    }
}
</script>

<template>
    <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->

    <!-- budget box end -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="modalController.messageModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>

            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div v-if="isSuccessUpdateBudget">
                        預算更新為: <span class="text-red-500">$ {{ budget.activity_budget }}</span>
                    </div>
                    <div v-if="!isSuccessUpdateBudget">
                        失敗原因: <span class="text-red-500">不可為負數或空值</span>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">

                    <button @click="toggleModal('messageModal')"
                        class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        確定
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>

    <!-- test block start -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="modalController.uploadFileModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">上傳收據</div>
                </div>

            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-col justify-between space-y-3">

                        <div class="text-base font-bold">支出金額</div>
                        <div class="flex items-center justify-start space-x-3">
                            <span class="italic font-bold">$</span>
                            <input id="expense-el" type="number"
                                class="px-1 py-1 w-full text-base border border-2 border-slate-400" placeholder="10000">
                        </div>
                        <span class="text-red-500">{{ errorMessage.expenseErrorMessage.value }}</span>

                        <div class="text-base font-bold">收據圖片證明</div>
                        <button @click="fileEl.click()"
                            class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                            新增檔案
                        </button>
                        <span class="text-base">
                            <span class="p-2 border-2">
                                {{ fileName }}
                            </span>
                        </span>

                        <input @change="changeFile()" ref="fileEl" class="hidden" type="file" accept="image/*">
                        <div class="text-red-500">{{ errorMessage.fileErrorMessage.value }}</div>

                        <div class="text-base font-bold ">所屬工作</div>
                        <select id="job-el" class="px-1 py-1 w-full font-bold border border-2 border-slate-500">
                            <option value="null" class="italic font-bold">--請選擇一個工作--</option>
                            <option v-for="item in budget.user_jobs" :value="item.id">{{ item.title }}</option>
                        </select>
                        <span class="text-red-500">{{ errorMessage.jobErrorMessage.value }}</span>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="[uploadExpenditure()]"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        新增
                    </button>
                    <button @click="toggleModal('uploadFileModal')"
                        class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>

    <!-- test block start -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="modalController.updateBudgetModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">更新預算</div>
                </div>

            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <input id="budget-el" type="number"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400" placeholder="10000">
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="updateActivityBudget()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        更新
                    </button>
                    <button @click="toggleModal('updateBudgetModal')"
                        class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>

    <!-- ? from EventBudgetUpper -->
    <div class="bg-white mb-8 border-2">
        <div class=" mx-12 border-black">
            <!-- budget box start -->
            <div class="flex justify-around items-center  my-4 rounded-xl">
                <div class="w-56 h-96 flex flex-col justify-around    mt-8 mb-16">

                    <div class="w-full flex flex-col items-center">
                        <div class="bg-green-400 h-fit w-full rounded-t-xl shadow-md">
                            <p class="m-2 text-center text-white">預算</p>
                        </div>
                        <div
                            class="w-full h-full relative flex justify-start item-center  p-4 shadow-md rounded-b-xl bg-white border-t border-grey-400">
                            <p class=" text-2xl w-56 text-center text-green-400 font-bold">
                                $ {{ budget.activity_budget }}
                            </p>
                            <svg v-if="budget.is_owner" @click="toggleModal('updateBudgetModal')"
                                class="w-7 absolute cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48">
                                <path
                                    d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"
                                    fill="#3056d3" class="fill-000000" />
                                <path d="M0 0h48v48H0z" fill="none" />
                            </svg>

                        </div>
                    </div>


                    <div class="w-56 flex flex-col items-center">
                        <div class="w-full bg-red-400  w-full rounded-t-xl shadow-md">
                            <p class="m-2 text-center text-white">支出</p>
                        </div>
                        <div
                            class="w-full flex justify-start item-center h-fit p-4 shadow-md rounded-b-xl bg-white border-t border-grey-400">
                            <p class="text-2xl w-56 text-center text-red-400 font-bold">$ {{ budget.activity_expense }}
                            </p>
                        </div>
                    </div>

                </div>

                <circle-progress :percent="graphPercent" :size="300" :border-width="25" :border-bg-width="25"
                    :show-percent="true" :viewport="true" :transition="1000" :is-gradient="true" :gradient="{
                        angle: 180,
                        startColor: '#F87171',
                        stopColor: '#F87171'
                    }" empty-color="#4ADE80" linecap="butt" />
            </div>

        </div>

    </div>
    <div class="bg-white p-4 flex justify-between items-center">
        <div class="flex jusify-center item-center h-96 w-1/2 border-2 rounded p-2 mr-8 bg-slate-200">
            <img v-if="!(selectedFile == null)" class="w-full" :src="selectedFile.download_path">
            <div v-else class="text-[#F87171] font-bold text-2xl my-4">想查看大圖，請點擊收據圖片</div>
        </div>

        <div class="w-1/2 px-8 py-4 bg-white h-96 rounded-lg border-2 flex flex-col ">
            <button @click="toggleModal('uploadFileModal')"
                class="w-fit text-white bg-[#3056d3] border-[#3056d3] border hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-2 px-4 rounded">
                上傳
            </button>
            <div class="mt-2 overflow-y-auto flex flex-col flex-col-reverse">

                <div v-if="budget.expenditures.length == 0" class="text-[#F87171] font-bold text-2xl my-4">
                    目前沒有上傳任何支出收據喔!!!
                </div>

                <div v-for="item in budget.expenditures"
                    class="flex justify-between w-auto mt-4  border-2 rounded-md py-2 pl-4 pr-2 border-gray-300 file-shadow">
                    <div class="flex">
                        <div @click="setSelectedFile(item)"
                            class="flex jusify-center item-center h-full w-48 border border-black mr-4 bg-[#cadcff] cursor-pointer">
                            <img :src="item.download_path">
                        </div>

                        <div class="w-full whitespace-nowrap">
                            <a :href="item.download_path">
                                <p class="font-bold">{{ item.expenditure_receipt_path }}</p>
                            </a>

                            <div class="w-full text-sm text-gray-500">
                                <div class="text-red-500">
                                    <span>支出金額: </span>
                                    <span>$ </span>
                                    <span>{{ item.expense }}</span>
                                </div>
                                <div>
                                    <span>所屬工作: </span>
                                    <span>{{ item.job_title }}</span>
                                </div>
                                <div>
                                    <span>上傳者: </span>
                                    <span>{{ item.user_name }}</span>
                                </div>

                                <div>
                                    <span>上傳日期: </span>
                                    <span>{{ item.expenditure_uploaded_time }}</span>
                                </div>

                            </div>
                        </div>

                    </div>
                    <button @click="deleteExpenditure(item.expenditure_receipt_path, item.job)"
                        class="text-red-500 p-2">X</button>
                </div>
            </div>

        </div>

    </div>

</template>

<style scoped>
h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-left: 2.75rem;
    font-weight: 900;
}

hr {
    border: 1.5px solid #ACA0A0;
    margin: 0 1rem;
}

.wrapper {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 1rem 0;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.normal-row {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
}

.normal-square {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
    border-radius: 50px;
}

.expense {
    color: #FF3A3A;
    background: #FEEBD7;
    border-color: #FF0000;
}

.represent {
    color: #FFFFFF;
    background: #1D5E9F;
    border-color: #4C8DBA;
}

.work-name {
    color: #FFFFFF;
    background: #00315F;
    border-color: #165179;
}

.upload-time {
    color: #000000;
    background: #D9D9D9;
    border-color: #919395;
}
</style>