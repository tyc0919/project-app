<script setup>
import Modal from './Modal.vue'
import axios from 'axios'
import JobDetail from './JobDetail.vue'
import FileSection from './FileSection.vue'
import { ref } from 'vue'
import { getCookie } from '../assets/modules'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { usePageStoretest } from "../stores/page"
import { objectToString } from '@vue/shared'

const showModal1 = ref(false)
const toggleModal1 = () => {
    showModal1.value = !showModal1.value
}

const showModal_delete = ref(false)
const toggleModal_delete = () => {
    showModal_delete.value = !showModal_delete.value
}

const showModal_new_job_detail = ref(false)
const toggleModal_new_job_detail = () => {
    showModal_new_job_detail.value = !showModal_new_job_detail.value
}

const showModal_success = ref(false)
const showModal_fail = ref(false)
const toggleModal_success = () => {
    showModal_success.value = !showModal_success.value
}
const toggleModal_fail = () => {
    showModal_fail.value = !showModal_fail.value
}

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
}
const route = useRoute()
const router = useRouter()

let colla = ref('')
let respon_gmail

let uworkName = ref('')
let uworkDate = ref('')
let uworkBudget = ref('')
let uworkContent = ref('')

let job = ref('')
let job_detail = ref('')
let job_detail_Y = ref([])
let job_detail_N = ref([])
let njob_detailName = ref('')
let njob_detailContent = ref('')
let right = ref(Boolean)



let messageS = ref("")
let messageF = ref("")

/* 取得活動協作者 */
axios.get('/api/activity/' + route.params.EventId + '/collaborator/').then((response) => {
    colla.value = response.data
})
/* 取得活動協作者 */

/* 獲得工作內容和權限判斷 */
async function take_work() {
    let user_data = ""

    await axios.get("/api/userprofile/")
        .then(response => {
            user_data = response.data;
        })

    await axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/")
        .then(response => {
            job.value = response.data
            let temp = new Date(job.value.dead_line)
            job.value.dead_line = temp.toLocaleDateString()
        })

    await axios.get("/api/activity/" + route.params.EventId + "/")
        .then(response => {
            let activity_data = response.data
        })

    if (user_data.user_email == job.value.person_in_charge_email || user_data.user_email == activity_data.owner) {
        right.value = true
    }
    else {
        right.value = false
    }


}

take_work()
/* 獲得工作內容 */



/* 權限 */

/* 更新工作 */
function get_responGmail() {
    const select_res = document.querySelector("select[name='responsibility']")
    respon_gmail = select_res.options[select_res.selectedIndex].text
}

async function updateWork() {
    get_responGmail()
    let data = {
        job_id: route.params.WorkId, //1
        person_in_charge_email: respon_gmail,
        title: uworkName.value,
        dead_line: uworkDate.value,
        content: uworkContent.value,
        job_budget: uworkBudget.value,
    }


    await axios.post("/api/job/update/", data, config)
        .then(function (response) {
            messageS.value = "編輯工作成功"
            toggleModal_success()
        })
        .catch(function (error) {
            messageF.value = "編輯工作失敗"
            toggleModal_fail()

        })

    take_work()
}
/* 更新工作 */

/* 刪除工作 */
async function deleteWork() {
    let data = {
        job_id: route.params.WorkId, //2
    }

    await axios
        .post('/api/job/delete/', data, config)
        .then(function (response) {
            router.push({
                path: '/events/' + route.params.EventId,
                name: 'event-default',
            })
        })
        .catch(function (error) {
            messageF.value = "刪除工作失敗"
            toggleModal_fail()
        })


}
/* 刪除工作 */

/* 刪除分頁 */
const delete_tab = (msg) => {
    axios.get("/api/activity/" + route.params.EventId + "/job/" + msg + "/")
        .then(response => {
            let temp = {
                id: response.data.id,
                title: response.data.title
            }
            store.pushin(temp)
        }
        )
}
/* 刪除分頁 */

/* 獲得工作細項 */

async function take_job_detail() {
    await axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/job_detail/")
        .then(response => {
            job_detail.value = response.data
        }
        )
        .then(() => {
            job_detail_N.value = []
            job_detail_Y.value = []
            job_detail.value.forEach((item) => {
                if (item.status == 0) {
                    job_detail_N.value.push(item)
                }
                else {
                    job_detail_Y.value.push(item)
                }
            }
            )
        })
}
take_job_detail()

let Okstatus = ref("")
function take_job_detail_test(x) {
    take_job_detail()
    if (x == true) {
        messageS.value = "成功更新活動狀態"
        toggleModal_success()
    }
    else {
        messageF.value = "更新活動狀態失敗"
        toggleModal_fail()
    }
}


function take_job_detailF() {
    axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/job_detail/")
        .then(response => {
            job_detail.value = response.data
        }
        )
        .then(() => {
            job_detail_N.value = []
            job_detail_Y.value = []
            job_detail.value.forEach((item) => {
                if (item.status == 1) {
                    job_detail_Y.value.push(item)
                }
            }
            )
        })
}
function take_job_detailNF() {
    axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/job_detail/")
        .then(response => {
            job_detail.value = response.data
        }
        )
        .then(() => {
            job_detail_N.value = []
            job_detail_Y.value = []
            job_detail.value.forEach((item) => {
                if (item.status == 0) {
                    job_detail_N.value.push(item)
                }
            }
            )
        })
}

/* 獲得工作細項 */

/* 新增工作細項 */
function newJobDetail() {
    let data = {
        "job_id": Number(route.params.WorkId),
        "title": njob_detailName.value,
        "content": njob_detailContent.value
    }

    axios.post('/api/job-detail/create/', data, config)
        .then(function (response) {
            messageS.value = "新增工作細項成功"
            toggleModal_success()
            njob_detailName.value = ""
            njob_detailContent.value = ""
            take_job_detail()
        })
        .catch(function (error) {
            messageF.value = "新增工作細項失敗"
            toggleModal_fail()
            njob_detailName.value = ""
            njob_detailContent.value = ""   
            take_job_detail()

        })
}
/* 新增工作細項 */

/* 關閉分頁 */

const closePage = () => {
    const store = usePageStoretest()
    let deleteWorkID = route.params.WorkId
    for (const [index, item] of store.tabs.entries()) {
        if (item.id == deleteWorkID) {
            store.tabs.splice(index, 1);
        }
    }
    router.push({
        path: '',
        name: 'event-works'
    })

}

/* 關閉分頁 */
</script>

<template>

    <!-- 主要內容 -->
    <div class="flex px-8 py-4 bg-white">
        <div class="w-3/4 mr-2">
            <!--功能列-->
            <div class="w-[50%]  inline-flex flex-wrap items-center my-4">
                <!--全部、未完成、完成狀態-->
                <div>
                    <div id="radios">
                        <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" />
                        <label class="radioLable text-base" for="radio1" @click="take_job_detailF()">完成</label>
                        <input id="radio2" class="radioInput hidden " type="radio" name="radio" value="radio2" />
                        <label class="radioLable text-base" for="radio2" @click="take_job_detailNF()">未完成</label>
                        <input id="radio3" class="radioInput hidden " type="radio" name="radio" value="radio3"
                            checked />
                        <label class="radioLable text-base" for="radio3" @click="take_job_detail()">全部</label>
                    </div>
                </div>
                <!--全部、未完成、完成狀態-->

                <!--搜尋欄-->
                <form id="search" class="flex items-center shadow:focus mr-10 ml-5">
                    <label for="simple-search" class=""></label>
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="simple-search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            placeholder="Search" required>
                    </div>
                </form>
                <!--搜尋欄-->
            </div>
            <!--編輯、刪除工作，關閉分頁-->
            <div v-if="right" class="w-[50%] py-[px] inline-flex flex-wrap justify-end">
                <div>
                    <button
                        class="mx-2 text-white bg-[#3056d3] border border-[#3056d3] hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-2 px-4 rounded"
                        @click="toggleModal1()">
                        編輯工作
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff0000] border border-[#ff0000] hover:text-[#ff0000] hover:border hover:border-[#ff0000] hover:bg-transparent font-semibold py-2 px-4 rounded"
                        @click="toggleModal_delete()">
                        刪除工作
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff0000] border border-[#ff0000] hover:text-[#ff0000] hover:border hover:border-[#ff0000] hover:bg-transparent font-semibold py-2 px-4 rounded"
                        @click="closePage()">
                        關閉分頁
                    </button>
                </div>
            </div>

            <div v-else class="w-[50%] py-[px] inline-flex flex-wrap justify-end">
                <div class="ml-">
                    <button class="mx-2 text-white border border-[#3056d380] bg-[#3056d380] font-semibold py-2 px-4 rounded">
                        編輯工作
                    </button>
                    <button class="mx-2 text-white border border-[#ff000080] bg-[#ff000080] font-semibold py-2 px-4 rounded">
                        刪除工作
                    </button>
                    <button class="mx-2 text-white border border-[#ff000080] bg-[#ff000080] font-semibold py-2 px-4 rounded">
                        關閉分頁
                    </button>
                </div>
            </div>
            <!--編輯、刪除工作，關閉分頁-->
            <!--功能列-->

            <!--主要內容-->
            <div>
                <div class="bg-white relative px-[10px] pt-[10px] pb-[60px] round_border">
                    <div class="w-full pb-[10px] flex">
                        <!--預算-->
                        <div class="w-6/12 inline-flex flex-row items-center">
                            <div class="text-[#696969] font-bold">預算</div>

                            <div class="ml-4 font-bold">${{ job.job_expenditure }}</div>
                            /
                            <div class="font-bold">${{ job.job_budget }}</div>

                            <div class="ml-4 text-[#696969] font-bold">到期日期</div>

                            <div class="ml-4 font-bold">{{ job.dead_line }}</div>


                        </div>
                        <!--預算-->

                        <!--負責人-->
                        <div class="w-2/4 inline-flex justify-end pr-[20px] items-center">
                            <div class="circle mr-2 border"></div>
                            <div class="mr-4">負責人</div>
                            <div class="text-[#3491d9]">{{ job.person_in_charge_email }}</div>
                        </div>
                        <!--負責人-->
                    </div>

                    <!--工作標題、工作簡介說明-->
                    <div class="w-full py-[10px] mb-2 text-center text-base font-bold  border round_border">
                        {{ job.title }}
                    </div>
                    <div class="w-full p-[10px] pb-[150px] mb-2 text-base text-[#696969] border round_border">
                        {{ job.content }}
                    </div>
                    <!--工作標題、工作簡介說明-->

                    <!--新增細項、完成、取消完成-->
                    <div v-if="right">
                        <button
                            class="mb-2 w-full text-white bg-[#3056d3] border-[#3056d3] border hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-2 px-4 rounded"
                            @click="toggleModal_new_job_detail()">
                            新增細項 +
                        </button>
                        <button
                            class="mb-2 w-full text-white bg-[#22c55e] border-[#22c55e] border hover:text-[#22c55e] hover:border hover:border-[#22c55e] hover:bg-transparent font-semibold py-2 px-4 rounded">
                            完成
                        </button>
                        <button
                            class="mb-2 w-full text-white bg-[#ff0000] border-[#ff0000] border hover:text-[#ff0000] hover:border hover:border-[#ff0000] hover:bg-transparent font-semibold py-2 px-4 rounded">
                            取消完成
                        </button>
                    </div>

                    <div v-else>
                        <button
                            class="mb-2 w-full text-white bg-[#3056d380] border-[#3056d380] border font-semibold py-2 px-4 rounded">
                            新增細項 +
                        </button>
                        <button
                            class="mb-2 w-full text-white bg-[#22c55e80] border-[#22c55e80] border font-semibold py-2 px-4 rounded">
                            完成
                        </button>
                        <button
                            class="mb-2 w-full text-white bg-[#ff000080] border-[#ff000080] border font-semibold py-2 px-4 rounded">
                            取消完成
                        </button>
                    </div>

                    <!--新增細項、完成、取消完成-->

                    <!-- 工作細項 -->
                    <template v-for="item in job_detail_Y" :key="item.job_detail_id">
                        <JobDetail :jobDetail=item :jright=right @refresh="take_job_detail" @refresh2="(msg) => {
                            Okstatus = msg
                            take_job_detail_test(Okstatus)
                        }">
                        </JobDetail>
                    </template>

                    <template v-for="item in job_detail_N" :key="item.job_detail_id">
                        <JobDetail :jobDetail=item :jright=right @refresh="take_job_detail" @refresh2= "(msg) => {
                            Okstatus = msg
                            take_job_detail_test(Okstatus)
                        }">>
                        </JobDetail>
                    </template>
                    <!-- 工作細項 -->
                </div>
            </div>
            <!--主要內容-->


        </div>
        <FileSection :mode=2></FileSection>
    </div>
    <!-- 主要內容 -->

    <!-- 彈出視窗 -->
    <!-- 編輯工作 -->
    <Teleport to="body">
        <Modal :show="showModal1">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">編輯工作</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">工作名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="超棒的活動" v-model="uworkName">
                        <div class="text-base font-bold">工作日期</div>
                        <input type="date" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="超棒的活動" v-model="uworkDate">
                        <div class="text-base font-bold">分配工作預算</div>
                        <div class="flex items-center justify-start space-x-3">
                            <span class="italic font-bold">$</span>
                            <input type="number" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                placeholder="10000" v-model="uworkBudget">
                        </div>
                        <div class="text-base font-bold">工作說明</div>
                        <textarea class=" px-1 py-1 text-base border border-2 border-slate-400 w-full"
                            placeholder="這次的活動，我們將要帶領大家..." v-model="uworkContent"></textarea>

                        <div class="text-base font-bold ">負責人</div>
                        <select class="px-1 py-1 w-full font-bold border border-2 border-slate-500"
                            name="responsibility" @change="get_responGmail()">
                            <option v-for="c_email in colla">{{ c_email.user_email }}</option>
                        </select>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal1(), updateWork()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        新增
                    </button>
                    <button @click="toggleModal1()"
                        class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>

            </template>
        </Modal>
    </Teleport>
    <!-- 編輯工作 -->

    <!--刪除工作-->
    <Teleport to="body">
        <modal :show="showModal_delete">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>
            <template #body>
                你確定要刪除此工作嗎，按下確定後就不能返回了
            </template>
            <template #footer>
                <button @click="toggleModal_delete(), deleteWork()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal_delete()"
                    class="py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!--刪除工作-->

    <!-- 新增工作細項 -->
    <Teleport to="body">
        <modal :show="showModal_new_job_detail" @close="toggleModal_new_job_detail()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">新增工作細項</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">工作細項名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            v-model="njob_detailName">

                        <div class="text-base font-bold">工作細項內容</div>
                        <textarea class=" px-1 py-1 text-base border border-2 border-slate-400 w-full"
                            v-model="njob_detailContent">
                                    </textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal_new_job_detail(), newJobDetail()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        新增
                    </button>
                    <button @click="toggleModal_new_job_detail()"
                        class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>
    <!-- 新增工作細項 -->

    <!-- 正確訊息視窗 -->
    <Teleport to="body">
        <modal :show="showModal_success">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">成功視窗</div>
                </div>
            </template>
            <template #body>
                {{ messageS }}
            </template>
            <template #footer>
                <button @click="toggleModal_success()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>

            </template>
        </modal>
    </Teleport>
    <!-- 正確訊息視窗 -->

    <!-- 錯誤訊息視窗 -->
    <Teleport to="body">
        <modal :show="showModal_fail">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>
            <template #body>
                {{ messageF }}
            </template>
            <template #footer>
                <button @click="toggleModal_fail()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 錯誤訊息視窗 -->
    <!-- 彈出視窗 -->
</template>

<style scoped>
.border-r-3 {
    border-right-width: 3px;
}

.border-w-3 {
    border-width: 3px;
}

.circle {
    height: 1.875rem;
    width: 1.875rem;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    border-color: rgb(0, 0, 0);
}

.focus\:shadow-inner:focus {
    box-shadow: inset 0 5px 9px 0 rgb(157 157 157);
}

.shadow-btn {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.p-search {
    padding: 0.3rem 0.3rem 0.3rem 2.5rem;
}

.round_border {
    border-radius: 1rem;
}

.hide-text-color {
    color: #3491d957;
}

.hide-text-color2 {
    color: #ff000057;
}

.hide-text-color3 {
    color: #ffffff70;
}


/* radios */
#radios {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5B83AC;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}

.btn_click1:hover {
    background-color: #b9cfe4;
}

.btn_click2:hover {
    background-color: #ffcccc;

}
</style>
