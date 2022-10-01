<script setup>
// moduals
import { ref } from 'vue';
import { getCookie } from '../assets/modules'
import axios from "axios";
import { useRoute } from 'vue-router'
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



// modal
const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
const modalContent = ref('測試內容')

// DATA
// GET budget 
let budgetData = ref("");
let activityExpense = ref(0);
axios.get('/api/activity/' + activityId + '/budget/', config)
    .then(response => {
        budgetData.value = response.data;
        console.log("GET budget data");
        console.log(response.data);

        // total activity expense
        for (let i = 0; i < budgetData.value.jobs.length; i++) {
            activityExpense.value = budgetData.value.jobs[i].job_expenditure;
        }

        // append jobs data
        for (let i = 0; i < budgetData.value.expenditures.length; i++) {
            budgetData.value.expenditures[i].expenditure_uploaded_time = new Date(
                budgetData.value.expenditures[i].expenditure_uploaded_time).toLocaleDateString();
            for (let j = 0; j < budgetData.value.jobs.length; j++) {
                if (budgetData.value.expenditures[i].job_serial_number ==
                    budgetData.value.jobs[j].serial_number) {
                    budgetData.value.expenditures[i]["job_title"] = budgetData.value.jobs[j].title;
                    budgetData.value.expenditures[i]["person_in_charge_email"] = budgetData.value.jobs[j].person_in_charge_email;
                }
            }
        }
        console.log(budgetData.value);
    });


let budget = ref([]);
async function getData() {
    try {
        axios.get('/api/activity/' + activityId + '/budget/', config)
            .then(async function (response) {
                // ? get userJobs in this activity.
                budget.value = response.data;

                let user = ref([]);
                await axios.get('/api/userprofile/')
                    .then(function (response) {
                        user.value = response.data;
                    });


                let userJobs = ref([]);
                for (let job of budget.value.jobs) {
                    if (job.person_in_charge_email == user.value.user_email) {
                        userJobs.value.push(job);
                    }
                }
                budget.value["user_jobs"] = userJobs.value;

                console.log("budget.value");
                console.log(budget.value);
            });
    } catch (error) {
        throw new Error(error);
    }
}
getData()

// post
let fileEl = ref(null);
const expenditureUpload = () => {
    let expenseEl = document.querySelector('#expense-el');
    let jobEl = document.querySelector('#job-el');
    let jobSerialNumber = null;
    let activityId = null;

    for (let job of budget.value.jobs) {
        if (job.title == jobEl.value) {
            jobSerialNumber = job.serial_number;
        }
    }

    let formData = new FormData();
    formData.append('file', fileEl.value.files[0]);
    formData.append('serial_number', jobSerialNumber.value); //工作序號
    formData.append('activity_id', activityId); //活動ID
    formData.append('expense', expenseEl.value); //花費

    axios.post('/api/upload/expenditure/', formData, config)
        .then(function (response) {
            console.log(response);
        })
}



</script>

<template>
    <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->

    <!-- ? from EventBudgetUpper -->
    <div class="p-1 border-b mx-12 border-black">
        <!-- budget box start -->
        <div class="flex justify-around mt-8 mb-16">
            <div class="bg-green-400 flex flex-col items-center p-2 rounded shadow-md">
                <p class="m-2 text-center">預算</p>
                <p class="mb-2 text-2xl w-56 text-center">$ {{budgetData.activity_budget}}</p>
            </div>
            <div class="bg-red-400 flex flex-col items-center p-2 rounded shadow-md">
                <p class="m-2 text-center">支出</p>
                <p class="mb-2 text-2xl w-56 text-center">$ {{activityExpense}}</p>
            </div>
        </div>
        <div class="flex justify-center w-full mb-8 ">
            <input type="number" class="w-1/3 mr-4" />
            <button class="bg-sky-700 text-white px-4 py-2 rounded shadow-md">預算更新</button>
        </div>

        <!-- budget box end -->


        <!-- test block start -->
        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal">
                <template #header>
                    <div class="border-b-4 w-full px-4 py-4">
                        <div class="font-bold text-2xl">上傳收據</div>
                    </div>

                </template>

                <template #body>
                    <div class="overflow-y-auto max-h-96 pr-4">
                        <div class="flex-row justify-between space-y-3">

                            <div class="text-base font-bold">支出金額</div>
                            <div class="flex items-center justify-start space-x-3">
                                <span class="italic font-bold">$</span>
                                <input id="expense-el" type="number"
                                    class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                    placeholder="10000">
                            </div>

                            <div @change="expenditureUpload()" ref="fileEl" class="text-base font-bold">收據圖片證明</div>
                            <input id="file-el" type="file">
                            <div class="text-base font-bold ">所屬工作</div>
                            <select id="job-el" class="px-1 py-1 w-full font-bold border border-2 border-slate-500">
                                <option class="italic font-bold">--請選擇一個工作--</option>
                                <option v-for="item in budget.user_jobs">{{item.title}}</option>
                            </select>
                        </div>
                    </div>
                </template>

                <template #footer>
                    <div class="border-t-2 pt-2">
                        <button @click="[toggleModal(),expenditureUpload()]"
                            class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                            新增
                        </button>
                        <button @click="toggleModal()"
                            class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                            取消
                        </button>
                    </div>
                </template>
            </modal>
        </Teleport>
        <!-- test block end -->


        <!-- analysis start -->
        <!-- analysis end -->
    </div>
    <div class="p-1 my-8 mx-12 flex items-center">
        <canvas id="BudgetCanva" class="w-1/2">
            圖表放置處
        </canvas>
        <div class="w-1/2 pt-4 pb-4 bg-white h-96 rounded-lg shadow-md flex flex-col">
            <button @click="toggleModal()" class="w-auto border-sky-700 border mx-8 mb-4 rounded text-sky-700">
                上傳</button>
            <div class="overflow-y-auto">
                <div v-for="item in budgetData.expenditures"
                    class="flex justify-between w-auto mt-4 mx-8 border-2 rounded-md py-2 pl-4 pr-2 border-gray-300 file-shadow">

                    <div class="w-full whitespace-nowrap">
                        <p class="font-bold">{{item.expenditure_receipt_path}}</p>
                        <div class="w-full text-sm text-gray-500">
                            <div>
                                <span>上傳日期: </span>
                                <span>{{item.expenditure_uploaded_time}}</span>
                            </div>
                            <div>
                                <span>上傳者: </span>
                                <span>{{item.person_in_charge_email}}</span>
                            </div>
                        </div>


                    </div>
                    <button class="text-red-500 p-2">X</button>
                </div>
            </div>

        </div>
    </div>








    <!-- ? historyRecord -->
    <h1>歷史記載</h1>
    <div class="wrapper">
        <div class="normal-row">
            <div class="expense normal-square text-xl">支出金額</div>
            <div class="represent normal-square text-xl">報銷人員</div>
            <div class="work-name normal-square text-xl">工作名稱</div>
            <div class="upload-time normal-square text-xl">上傳日期</div>
        </div>
        <hr>

        <div class="normal-row" v-for="item in budgetData.expenditures">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">{{item.expense}}</div>
            </div>
            <div class="represent normal-square text-xl">{{item.person_in_charge_email}}</div>
            <div class="work-name normal-square text-xl">{{item.job_title}}</div>
            <div class="upload-time normal-square text-xl">{{item.expenditure_uploaded_time}}</div>
        </div>

        <div class="normal-row">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">1235454</div>
            </div>
            <div class="represent normal-square text-xl">黃紫紅</div>
            <div class="work-name normal-square text-xl">交通</div>
            <div class="upload-time normal-square text-xl">2011-08-10</div>
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