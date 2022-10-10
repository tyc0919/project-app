<script setup>
import { ref } from 'vue'
import FileSection from './FileSection.vue'
import Modal from './Modal.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { getCookie } from '../assets/modules'

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
}
const route = useRoute()
const router = useRouter()

let A_job_data = ref('')
let colla = ref('')
let temp = ref('')
let respon_gmail

/*  取出活動相關工作 */

async function job_take() {
    await axios.get('/api/activity/' + route.params.EventId + '/job/').then((response) => {
        A_job_data.value = response.data
        A_job_data.value.forEach((job) => {
            let temp = new Date(job.dead_line)
            job.time = temp.toLocaleDateString()

            let temp2 = new Date()
            let x = parseInt(Math.abs(temp.getTime() - temp2.getTime()) / 1000 / 60 / 60 / 24)
            Object.assign(job, { Finish_dead_line: x })
        })
    })

    for (let i = 0; i < A_job_data.value.length; i++) {
        axios
            .get('/api/activity/' + route.params.EventId + '/job/' + A_job_data.value[i].id + '/job_detail/')
            .then((response) => {
                let count = 0
                let countY = 0
                temp.value = response.data
                temp.value.forEach(function (test) {
                    if (test.status === 1) {
                        countY++
                    }
                    count++
                })
                Object.assign(A_job_data.value[i], { count: count })
                Object.assign(A_job_data.value[i], { countY: countY })
            })
    }
}

job_take()

/*  取出活動相關工作 */

/* 取得活動協作者 */

axios.get('/api/activity/' + route.params.EventId + '/collaborator/').then((response) => {
    colla.value = response.data
})

/* 取得活動協作者 */

/* 創建工作 */

function get_responGmail() {
    const select_res = document.querySelector("select[name='responsibility']")
    respon_gmail = select_res.options[select_res.selectedIndex].text
}

let nworkName = ref('')
let nworkDate = ref('')
let nworkBudget = ref('')
let nworkContent = ref('')

function newWork() {
    axios
        .post(
            '/api/job/create/',
            {
                activity_id: route.params.EventId,
                person_in_charge_email: respon_gmail,
                title: nworkName.value,
                dead_line: nworkDate.value,
                content: nworkContent.value,
                job_budget: nworkBudget.value,
            },
            config
        )
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

/* 創建工作 */

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
</script>

<template>
    <Modal :show="showModal">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">新增工作</div>
            </div>
        </template>

        <template #body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">工作名稱</div>
                    <input
                        type="text"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動"
                        v-model="nworkName"
                    />
                    <div class="text-base font-bold">工作日期</div>
                    <input
                        type="date"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動"
                        v-model="nworkDate"
                    />
                    <div class="text-base font-bold">分配工作預算</div>
                    <div class="flex items-center justify-start space-x-3">
                        <span class="italic font-bold">$</span>
                        <input
                            type="number"
                            class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="10000"
                            v-model="nworkBudget"
                        />
                    </div>

                    <div class="text-base font-bold">工作說明</div>
                    <textarea
                        class="px-1 py-1 text-base font-bold border border-2 border-slate-400 w-full"
                        placeholder="這次的活動，我們將要帶領大家..."
                        v-model="nworkContent"
                    ></textarea>

                    <div class="text-base font-bold">負責人</div>
                    <select
                        class="px-1 py-1 w-full font-bold border border-2 border-slate-500"
                        name="responsibility"
                        @change="get_responGmail()"
                    >
                        <option class="text-red-400 font-bold">未定</option>
                        <option v-for="c_email in colla">{{ c_email.user_email }}</option>
                    </select>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="border-t-2 pt-2">
                <button
                    @click="toggleModal(), newWork()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
                >
                    新增
                </button>
                <button
                    @click="toggleModal()"
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold"
                >
                    取消
                </button>
            </div>
        </template>
    </Modal>

    <div id="bottomContainer" class="w-full">
        <div class="flex w-full p-8">
            <div class="w-3/4 mr-2">
                <div id="options" class="inline-flex justify-between my-4 w-full">
                    <div id="optionsLeft" class="inline-flex justify-around">
                        <div id="radios">
                            <input
                                id="radio1"
                                class="radioInput hidden"
                                type="radio"
                                name="radio"
                                value="radio1"
                                checked
                            />
                            <label class="radioLable text-base" for="radio1">完成</label>
                            <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                            <label class="radioLable text-base" for="radio2">未完成</label>
                            <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" />
                            <label class="radioLable text-base" for="radio3">全部</label>
                        </div>

                        <form id="search" class="flex items-center shadow:focus mr-10">
                            <label for="simple-search" class=""></label>
                            <div class="relative w-full">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                    placeholder="Search"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div id="optionsRight" class="flex justify-end align-center">
                        <button
                            id="addNewWorkButton"
                            @click="toggleModal()"
                            class="bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        >
                            新增工作
                        </button>
                    </div>
                </div>

                <div id="workContainer" class="grid grid-col3 grid-gap-1rem py-8 px-8 rounded-2xl bg-white shadow">
                    <div
                        class="work card h-22rem border-[#2b6cb0] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow"
                        v-for="item in A_job_data"
                    >
                        <router-link :to="{ name: 'event-work-detail', params: { WorkId: item.id } }">
                            <div class="workTop flex flex-column justify-between">
                                <div class="flex align-center mb-2 items-center">
                                    <div class="avatar"></div>
                                    <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">
                                        {{ item.person_in_charge_email }}
                                    </div>
                                </div>
                                <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                    {{ item.title }}
                                </div>

                                <div class="workContent text-base ellipsis mb-8">
                                    {{ item.content }}
                                </div>
                            </div>

                            <div class="workBottom font-bold inline-flex justify-between text-base pt-2">
                                <div class="workBottomLeft inline-flex">
                                    完成
                                    <div class="mx-2 text-[#c70000]">{{ item.countY }}</div>
                                    /
                                    <div class="mx-2">{{ item.count }}</div>
                                </div>

                                <div class="workBottomRight inline-flex">
                                    還剩
                                    <div class="mx-2 text-[#c70000]">{{ item.Finish_dead_line }}</div>
                                    天
                                </div>
                            </div>

                            <div class="back h-full hidden flex flex-column pt-6">
                                <div class="backTitle text-2xl font-bold mb-10 text-center">工作追蹤</div>
                                <div class="backBody h-full w-full y-overflow">
                                    <div
                                        class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center"
                                    >
                                        <div class="nowrap">完成項目</div>
                                        <div class="text-base ml-20 italic">{{ item.countY }} / {{ item.count }}</div>
                                    </div>

                                    <div
                                        class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center"
                                    >
                                        <div class="nowrap">預算支出</div>
                                        <div class="text-base ml-20 italic">
                                            ${{ item.job_expenditure }} / ${{ item.job_budget }}
                                        </div>
                                    </div>
                                    <div
                                        class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center"
                                    >
                                        <div class="nowrap">到期時間</div>
                                        <div class="text-base ml-20 italic">
                                            {{ item.time }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>

            <FileSection />
        </div>
    </div>
</template>

<style scoped>
.text-\[\#c70000\] {
    color: #c70000;
}

.text-\[\#1D5E9F\] {
    color: #1d5e9f;
}

.text-\[\#24cf00\] {
    color: #24cf00;
}

.border-\[\#24cf00\] {
    border: 1px solid#24cf00;
}

/* underway */
.border-\[\#2b6cb0\] {
    border: 1px solid#2b6cb0;
}

.y-overflow {
    overflow-y: auto;
}

.nowrap {
    white-space: nowrap;
}

.work .back {
    overflow-y: scroll;
}

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

.work:hover .back {
    display: flex;
    position: static;
    transition: all 2s ease-in-out;
    transition-delay: 3s;
}

.work:hover .workTop,
.work:hover .workBottom {
    display: none;
}

.wrapper {
    height: calc(100% - 7rem);
}

.content {
    height: calc(100% - 3rem);
}

.bg-\[CEE5F2\] {
    background-color: #cee5f2;
}

.avatar {
    width: 1.75rem;
    height: 1.75rem;
    border: 1px solid #000000;
    vertical-align: middle;
    border-radius: 50%;
}

.shadow {
    box-shadow: 0 0 30px 2px rgb(0 0 0 / 10%);
}

.pt-2 {
    padding-top: 0.5rem;
}

.h-2 {
    height: 20%;
}

.my-8 {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s !important;
    cursor: pointer;
}

.grid {
    display: grid;
}

.grid-col3 {
    grid-template-columns: 1fr 1fr 1fr;
}

.grid-gap-1rem {
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}

/*  */
body {
    height: 100%;
}

.shadow:focus {
    box-shadow: rgba(28, 58, 254, 0.75);
}

.flex-column {
    flex-direction: column;
}

#addNewWorkButton {
    right: 0px;
}

#optionLeft {
    width: 50%;
}

#optionsRight {
    width: auto;
}

/* works */
.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

#workTop {
    height: 9.5rem;
}

.h-22rem {
    height: 22rem;
}

.workBottom {
    border-top: 2px solid #2b6cb0;
}

.workTitle {
    /* line-height: 1.75rem; */
    height: calc(1.75rem * 3);
    -webkit-line-clamp: 3;
}

.workContent {
    /* line-height: 1.5rem; */
    height: auto;
    -webkit-line-clamp: 4;
    /* font color */
    --tw-text-opacity: 1;
    color: rgb(82 82 82 / var(--tw-text-opacity));
}

/* containers */
#options {
    flex-flow: row nowrap;
}

/* buttons */
#addNewWorkButton {
    background-color: transparent;
    border-color: #2b6cb0;
    color: #2b6cb0;
}

#addNewWorkButton:hover {
    background-color: #2b6cb0;
    color: #ffffff;
}

/* radios */
#radios {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
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

.radioInput:checked + .radioLable {
    background: #52708f;
}
</style>
