<script setup>
import Modal from './Modal.vue'
import axios from "axios";
import JobDetail from "./JobDetail.vue";
import FileSection from './FileSection.vue';
import { ref } from 'vue'
import { getCookie } from '../assets/modules'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const showModal1 = ref(false)
const toggleModal1 = () => {
    showModal1.value = !showModal1.value
}

const showModal_delete = ref(false)
const toggleModal_delete = () => {
    showModal_delete.value = !showModal_delete.value
}

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
const route = useRoute()
const router = useRouter()

let colla = ref("")
let respon_gmail

let uworkName = ref("")
let uworkDate = ref("")
let uworkBudget = ref("")
let uworkExpenditure = ref("")
let uworkContent = ref("")

let job = ref("")
let job_detail = ref("")
let job_detail_Y = ref([])
let job_detail_N = ref([])

/* 取得活動協作者 */
axios.get("/api/activity/" + route.params.EventId + "/collaborator/")
    .then(response => {
        colla.value = response.data
    }
    )
/* 取得活動協作者 */

/* 獲得工作內容 */
axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/")
    .then(response => {
        job.value = response.data
    })
/* 獲得工作內容 */

/* 更新工作 */
function get_responGmail() {
    const select_res = document.querySelector("select[name='responsibility']")
    respon_gmail = select_res.options[select_res.selectedIndex].text;
}

function updateWork() {
    let data = {
        "activity_id": route.params.EventId,
        "serial_number": route.params.WorkId,
        "person_in_charge_email": respon_gmail,
        "title": uworkName.value,
        "dead_line": uworkDate.value,
        "content": uworkContent.value,
        "job_budget": uworkBudget.value,
        "job_expenditure": uworkExpenditure.value
    }

    axios.post("/api/job/update/", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
/* 更新工作 */

/* 刪除工作 */
async function deleteWork() {
    let data = {
        "activity_id": route.params.EventId,
        "serial_number": route.params.WorkId
    }

    await axios.post("/api/job/delete/", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

    router.push({
        path: '/events/' + route.params.EventId,
        name: 'event-default'
    })
}
/* 刪除工作 */

/* 獲得工作細項 */
axios.get("/api/activity/" + route.params.EventId + "/job/" + route.params.WorkId + "/job_detail/")
    .then(response => {
        job_detail.value = response.data
    }
    )
    .then(() => {
        Object.values(job_detail.value).forEach((item) => {
            if (item.status === 0) {
                job_detail_N.value.push(item)
            }
            else {
                job_detail_Y.value.push(item)
            }
        }
        )
    })
/* 獲得工作細項 */



</script>

<template>
    <!--Component here-->
    <div class="flex pr-4 mb-4">

        <div>
            <!--功能列-->
            <div class="w-[94%] ml-8 py-[10px] inline-flex flex-wrap items-center">
                <!--全部、未完成、完成狀態-->
                <div>
                    <button class="py-1 px-4 border border-[#7a6d6d] text-white text-base bg-[#5b83ac] font-medium">
                        全部
                    </button>
                    <button class="py-1 px-4 border border-[#7a6d6d] text-white text-base bg-[#5b83ac] font-medium">
                        未完成
                    </button>
                    <button class="py-1 px-4 border border-[#7a6d6d] bg-[#5b83ac] text-white text-base font-medium">
                        完成
                    </button>
                </div>
                <!--全部、未完成、完成狀態-->

                <!--搜尋欄-->
                <form class="mx-auto">
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="search"
                            class="block p-search text-sm bg-gray-50 border border-gray-300 focus:shadow-inner"
                            placeholder="搜尋工作" required />
                    </div>
                </form>
                <!--搜尋欄-->

                <!--編輯、刪除工作，關閉分頁-->
                <div>
                    <button
                        class="py-3 px-1 border-w-3 rounded-lg text-base font-bold border-[#3491d9] bg-white text-[#3491d9] shadow-btn"
                        @click="toggleModal1()">
                        編輯工作
                    </button>

                    <button
                        class="mx-2 py-3 px-1 border-w-3 rounded-lg text-base font-bold bg-white border-[#ff0000] text-[#ff0000] shadow-btn"
                        @click="toggleModal_delete()">
                        刪除工作
                    </button>

                    <button
                        class="py-3 px-1 border-w-3 rounded-lg text-base font-bold bg-white border-[#ff0000] text-[#ff0000] shadow-btn">
                        關閉分頁
                    </button>
                </div>
                <!--編輯、刪除工作，關閉分頁-->
            </div>
            <!--功能列-->

            <!--主要內容-->
            <div class="px-4 mx-4">
                <div class="bg-white relative px-[10px] pt-[10px] pb-[60px]">
                    <div class="w-full pb-[10px] flex">
                        <!--預算-->
                        <div class="w-6/12 inline-flex flex-row items-center">
                            <div class="text-[#696969] font-bold">預算</div>

                            <div class="ml-4 font-bold">${{job.job_expenditure}}</div>
                            /
                            <div class="font-bold">${{job.job_budget}}</div>
                            <div class="mx-4 text-[#696969] font-bold">剩餘</div>
                            <div class="text-[#00db00] font-bold">$90000</div>
                        </div>
                        <!--預算-->

                        <!--負責人-->
                        <div class="w-2/4 inline-flex justify-end pr-[20px] items-center">
                            <div class="circle mr-2 border"></div>
                            <div class="mr-4">負責人</div>
                            <div class="text-[#3491d9]">{{job.person_in_charge_email}}</div>
                        </div>
                        <!--負責人-->
                    </div>

                    <!--工作標題、工作簡介說明-->
                    <div class="w-full bg-[#D9D9D9] text-center font-bold py-[30px] mb-2">
                        {{job.title}}
                    </div>
                    <div class="w-full bg-[#D9D9D9] pb-[150px] mb-2 text-sm text-[#696969] font-bold">
                        {{job.content}}
                    </div>
                    <!--工作標題、工作簡介說明-->

                    <!--新增細項、完成、取消完成-->
                    <div>
                        <button
                            class="w-full items-center bg-white rounded-lg border-w-3 border-[#3491d9] py-[10px] text-[#3491d9] shadow-btn mb-[20px]"
                            @click="toggleModal_new_job_detail()">
                            新增細項 +
                        </button>
                        <button
                            class="w-full items-center bg-[#1d5e9f] rounded-lg border-w-3 border-[#006eaf] py-[10px] text-white shadow-btn mb-[20px]">
                            完成
                        </button>
                        <button
                            class="w-full items-center bg-[#ffcccc] rounded-lg border-w-3 border-[#ff0000] py-[10px] text-[#ff0000] shadow-btn">
                            取消完成
                        </button>
                    </div>
                    <!--新增細項、完成、取消完成-->

                    <!-- 工作細項 -->

                    <template v-for="item in job_detail_Y">
                        <JobDetail :jobDetail=item></JobDetail>
                    </template>

                    <template v-for="item in job_detail_N">
                        <JobDetail :jobDetail=item></JobDetail>

                    </template>


                    <!-- 工作細項 -->


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
                                        <input type="text"
                                            class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                            placeholder="超棒的活動" v-model="uworkName">
                                        <div class="text-base font-bold">工作日期</div>
                                        <input type="date"
                                            class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                            placeholder="超棒的活動" v-model="uworkDate">
                                        <div class="text-base font-bold">分配工作預算</div>
                                        <div class="flex items-center justify-start space-x-3">
                                            <span class="italic font-bold">$</span>
                                            <input type="number"
                                                class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                                placeholder="10000" v-model="uworkBudget">
                                        </div>

                                        <div class="text-base font-bold">已使用工作預算</div>
                                        <div class="flex items-center justify-start space-x-3">
                                            <span class="italic font-bold">$</span>
                                            <input type="number"
                                                class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                                placeholder="10000" v-model="uworkExpenditure">
                                        </div>

                                        <div class="text-base font-bold">工作說明</div>
                                        <textarea
                                            class=" px-1 py-1 text-base font-bold border border-2 border-slate-400 w-full"
                                            placeholder="這次的活動，我們將要帶領大家..." v-model="uworkContent"></textarea>

                                        <div class="text-base font-bold ">負責人</div>
                                        <select class="px-1 py-1 w-full font-bold border border-2 border-slate-500"
                                            name="responsibility" @change="get_responGmail()">
                                            <option class="text-red-400 font-bold">未定</option>
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


                    <!-- 彈出視窗 -->
                </div>
            </div>
            <!--主要內容-->
        </div>

        <FileSection :mode=2></FileSection>

        

    </div>
    <!--Component here-->
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
</style>
