<script setup>
import { ref } from 'vue'
import MainDeFaultCard from './MainDefaultCard.vue'
import Modal from './Modal.vue'
import { getCookie } from '../assets/modules'
import axios from 'axios'
import { usePageStoretest } from '../stores/page'

let activityData = ref([])
let activityOwner = ''
let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
    withCredentials: true,
}

let pages = ref([])
const quantum = 3
let pageNumber = ref(1)
const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

const modalController = {
    addActivityModal: ref(false),
    noticeModal: ref(false),
    joinActivityModal: ref(false),
    joinNoticeModal: ref(false),
}
const toggleModal = (modalName) => {
    cleanErrorMessage()
    modalController[modalName].value = !modalController[modalName].value
}

axios.get('/api/userprofile/').then(function (response) {
    let temp = response.data
    activityOwner = temp.user_email
})

let errorMessage = {
    titleErrorMessage: ref(''),
    descriptionErrorMessage: ref(),
    budgetErrorMessage: ref(),
    invitationErrorMessage: ref(''),
}
const cleanErrorMessage = () => {
    //  清空錯誤訊息
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }
}
const addActivity = async () => {
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }

    let title = document.getElementById('activityTitle').value
    let budget = document.getElementById('activityBudget').value
    let description = document.getElementById('activityContent').value

    try {
        await axios
            .post(
                '/api/activity/create/',
                {
                    owner: activityOwner,
                    activity_name: title,
                    activity_description: description,
                    activity_budget: budget,
                },
                config
            )
            .then(function (res) {
                getData()
                toggleModal('addActivityModal')
                toggleModal('noticeModal')
            })
    } catch (error) {
        if (title == '') {
            errorMessage.titleErrorMessage.value = '請填寫活動標題'
        }
        if (budget == '') {
            errorMessage.budgetErrorMessage.value = '必須給予初始預算'
        }
        if (description == '') {
            errorMessage.descriptionErrorMessage.value = '請填寫活動內容'
        }
        if (budget < 0) {
            errorMessage.budgetErrorMessage.value = '預算不可為負數'
        }
    }
}

const joinActivity = async () => {
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }

    let invitation = document.getElementById('invitationCode').value

    await axios
        .post(
            '/api/join-activity/code/',
            {
                invitation_code: invitation,
            },
            config
        )
        .then(function (res) {
            getData()
            toggleModal('joinActivityModal')
            toggleModal('noticeModal')
        })
        .catch((error) => {
            if (invitation == '') {
                errorMessage.invitationErrorMessage.value = '請輸入邀請碼'
            } else if (error.response.data.error == '已經是協作者了!') {
                errorMessage.invitationErrorMessage.value = '已加入此活動'
            } else {
                errorMessage.invitationErrorMessage.value = '邀請碼不存在'
            }
        })
}

// 更換篩選條件
const changeFilter = async (status) => {
    pages.value = []
    pageNumber.value = 1
    let candidates = []
    for (let activity of activityData.value) {
        if (status == 999) {
            candidates = activityData.value
        }
        if (activity.is_finished == status) {
            candidates.push(activity)
        }
    }

    let pageData = []
    for (let [index, data] of candidates.entries()) {
        pageData.push(data)
        if (pageData.length >= quantum || index == candidates.length - 1) {
            pages.value.push(pageData)
            pageData = []
        }
    }
}
const getData = async () => {
    await axios.get('/api/activity/').then(function (response) {
        activityData.value = response.data
    })

    // calculate progressbars' percent
    for (let activity of activityData.value) {
        await axios.get('/api/activity/' + activity.id + '/job/').then((response) => {
            console.log(response.data)
            let allJobStatus = []
            for (let job of response.data) {
                allJobStatus.push(job.status)
            }
            if (allJobStatus.length == 0) {
                activity['finish_percentage'] = 0
            } else {
                let finishedJobs = allJobStatus.filter((item) => item == 1)
                activity['finish_percentage'] = Math.round((finishedJobs.length / allJobStatus.length) * 100)
            }
        })
    }

    //add user_name into data
    for (let activity of activityData.value) {
        await axios.get('/api/activity/' + activity.id + '/').then((response) => {
            activity['user_name'] = response.data.user_name
        })
    }
    changeFilter(999)
}

getData()

// 關閉分頁
const closePage = () => {
    const store = usePageStoretest()
    store.tabs.length = 0
}
</script>

<template>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="modalController.noticeModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div>新增活動成功</div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal('noticeModal')"
                        class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                        確定
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>
    <!-- 新增活動 -->
    <Modal :show="modalController['addActivityModal'].value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">新增活動</div>
            </div>
        </template>

        <template #body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">活動名稱</div>
                    <input id="activityTitle" type="text"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動 (需至少三個字)" />
                    <span class="text-red-500">{{ errorMessage.titleErrorMessage.value }}</span>
                    <div class="text-base font-bold">活動預算</div>
                    <div class="flex items-center justify-start space-x-3">
                        <span class="italic font-bold">$</span>
                        <input id="activityBudget" type="number"
                            class="px-1 py-1 w-full text-base border border-2 border-slate-400" placeholder="10000" />
                    </div>
                    <span class="text-red-500">{{ errorMessage.budgetErrorMessage.value }}</span>

                    <div class="text-base font-bold">活動簡介</div>
                    <textarea id="activityContent" class="px-1 py-1 text-base border border-2 border-slate-400 w-full"
                        placeholder="這次的活動，我們將要帶領大家..."></textarea>
                    <span class="text-red-500">{{ errorMessage.descriptionErrorMessage.value }}</span>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="border-t-2 pt-2">
                <button @click="addActivity()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    新增
                </button>
                <button @click="toggleModal('addActivityModal')"
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                    取消
                </button>
            </div>
        </template>
    </Modal>
    <!-- 新增活動 -->

    <!-- 加入活動 -->
    <Modal :show="modalController['joinActivityModal'].value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">加入活動</div>
            </div>
        </template>

        <template #body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">活動邀請碼</div>
                    <input id="invitationCode" type="text"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400" />
                    <span class="text-red-500">{{ errorMessage.invitationErrorMessage.value }}</span>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="border-t-2 pt-2">
                <button @click="joinActivity()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    新增
                </button>
                <button @click="toggleModal('joinActivityModal')"
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                    取消
                </button>
            </div>
        </template>
    </Modal>
    <!-- 加入活動 -->

    <Modal :show="modalController.joinNoticeModal.value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">提醒</div>
            </div>
        </template>

        <template #body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div>加入活動成功</div>
            </div>
        </template>

        <template #footer>
            <div class="border-t-2 pt-2">
                <button @click="toggleModal('joinNoticeModal')"
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                    確定
                </button>
            </div>
        </template>
    </Modal>

    <!-- content -->
    <div class="w-full px-8 py-8">
        <!-- options -->
        <div class="flex justify-between">
            <div id="options" class="inline-flex my-4">
                <div class="inline-flex justify-around">
                    <div id="radios">
                        <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" />
                        <label class="radioLable text-base" for="radio1" @click="changeFilter(1)">完成</label>
                        <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                        <label class="radioLable text-base" for="radio2" @click="changeFilter(0)">未完成</label>
                        <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" checked />
                        <label class="radioLable text-base" for="radio3" @click="changeFilter(999)">全部</label>
                    </div>
                </div>
            </div>
            <div class="inline-flex">
                <div class="mr-4">
                    <button @click="toggleModal('joinActivityModal')"
                        class="text-white bg-[#3056d3] hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-2 px-4 rounded">
                        加入活動
                    </button>
                </div>
                <div class="ml-4">
                    <button @click="toggleModal('addActivityModal')"
                        class="text-white bg-[#3056d3] hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-2 px-4 rounded">
                        新增活動
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-white border border-[#d1d5db] rounded-2xl p-8 my-4">
            <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
                <!-- cards -->
                <div @click="toggleModal('addActivityModal')" v-if="pages.length == 0"
                    class="text-[#F87171] font-bold text-2xl my-4 cursor-pointer">目前沒有活動喔，點我新增</div>
                <router-link v-for="item in pages[pageNumber - 1]" :to="{ path: '/events/' + item.id }"
                    @click="closePage()">
                    <MainDeFaultCard :name="item.activity_name" :owner="item.user_name"
                        :tracePercentage="item.finish_percentage" :costMoney="item.activity_expenditure"
                        :budgetMoney="item.activity_budget"></MainDeFaultCard>
                </router-link>

                <!-- cards end -->
            </div>
        </div>

        <!--換頁-->
        <div class="flex justify-center pb-10">
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px text-xl shadow-primary">
                    <li v-if="pageNumber - 1 > 0" @click="changePage(pageNumber - 1)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">上一頁</a>
                    </li>
                    <li v-else
                        class="shadow-none text-opacity-30 bg-white border border-gray-300 text-gray-500 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                        上一頁
                    </li>
                    <li v-if="pageNumber - 2 > 1" @click="changePage(1)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">1</a>
                    </li>
                    <li v-if="pageNumber - 2 > 1"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        ...
                    </li>

                    <li v-if="pageNumber - 2 >= 1" @click="changePage(pageNumber - 2)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">{{ pageNumber - 2 }}</a>
                    </li>
                    <li v-if="pageNumber - 1 >= 1" @click="changePage(pageNumber - 1)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">{{ pageNumber - 1 }}</a>
                    </li>

                    <li
                        class="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                        <a href="#">{{ pageNumber }}</a>
                    </li>

                    <li v-if="pageNumber + 1 <= pages.length" @click="changePage(pageNumber + 1)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">{{ pageNumber + 1 }}</a>
                    </li>
                    <li v-if="pageNumber + 2 <= pages.length" @click="changePage(pageNumber + 2)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">{{ pageNumber + 2 }}</a>
                    </li>

                    <li v-if="pageNumber + 2 < pages.length"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        ...
                    </li>
                    <li v-if="pageNumber + 2 < pages.length" @click="changePage(pages.length)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">{{ pages.length }}</a>
                    </li>

                    <li v-if="pageNumber < pages.length" @click="changePage(pageNumber + 1)"
                        class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <a href="#">下一頁</a>
                    </li>
                    <li v-else
                        class="shadow-none text-opacity-30 bg-white border border-gray-300 text-gray-500 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                        下一頁
                    </li>
                </ul>
            </nav>
        </div>
        <!--換頁-->
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.grid-gap-1rem {
    grid-row-gap: 3rem;
    grid-column-gap: 3rem;
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5b83ac;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-2 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.container {
    height: 100%;
}
</style>
