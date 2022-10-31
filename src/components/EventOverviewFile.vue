<script setup>
import axios from 'axios'
import { getCookie } from '../assets/modules'
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
}

// 分頁準備
let pages = ref([])
const quantum = 5
let pageNumber = ref(1)
const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

// 彈出視窗控制
const modalController = {
    deleteModal: ref(false),
    deleteSuccessModal: ref(false),
}
const toggleModal = (modalName) => {
    modalController[modalName].value = !modalController[modalName].value
}
// 刪除檔案操作
let selectedFile = ref(null)
const setSelectedFile = (file) => {
    selectedFile.value = file
}
const deleteFile = async () => {
    let file = selectedFile.value
    await axios.post('/api/delete-file/', { model: 'file', job_id: file.job, file_name: file.file_path }, config)
    getData()
    toggleModal('deleteModal')
    toggleModal('deleteSuccessModal')
}
// 取得檔案
let logFile = ref([])
const getData = async () => {
    await axios.get('/api/file/activity/' + route.params.EventId + '/').then(function (response) {
        logFile.value = response.data
    })

    // get users
    let collaborators = []
    await axios.get('/api/activity/' + route.params.EventId + '/collaborator/').then(function (response) {
        collaborators = response.data
    })

    // append some extra information
    for (let file of logFile.value) {
        // append user_name
        for (let user of collaborators) {
            if (file.uploader == user.user_email) {
                file['user_name'] = user.user_name
            }
        }
        //append job_name
        await axios.get('/api/activity/' + route.params.EventId + '/job/' + file.job + '/').then(function (response) {
            file['job_name'] = response.data.title
        })
    }
}

// 檔案分頁
const sorter = () => {
    pages.value = []
    pageNumber.value = 1
    let candidates = []
    candidates = logFile.value

    let selectBox = document.getElementById('select')
    let selectInput = selectBox.options[selectBox.selectedIndex].value

    if (selectInput == 'time') {
        candidates.sort(function (a, b) {
            return a.id - b.id
        })
    }
    if (selectInput == 'job') {
        candidates.sort(function (a, b) {
            return a.job - b.job
        })
    }
    if (selectInput == 'uploader') {
        candidates.sort(function (a, b) {
            return a.uploader.localeCompare(b.uploader, 'zh-Hant')
        })
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
getData()
</script>

<template>
    <Teleport to="body">
        <modal :show="modalController.deleteModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>
            <template #body> 確定要刪除檔案嗎？此動作無法復原 </template>
            <template #footer>
                <button
                    @click="deleteFile()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
                >
                    確定
                </button>
                <button
                    @click="toggleModal('deleteModal')"
                    class="py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold"
                >
                    取消
                </button>
            </template>
        </modal>
    </Teleport>

    <Modal :show="modalController.deleteSuccessModal.value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">提醒</div>
            </div>
        </template>
        <template #body> 刪除成功！ </template>
        <template #footer>
            <button
                @click="toggleModal('deleteSuccessModal')"
                class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
            >
                確定
            </button>
        </template>
    </Modal>
    <div>
        <!-- 下拉式選單 -->
        <div class="flex justify-end mt-10">
            <select id="select" class="flex p-2 pr-20" @change="sorter()">
                <option value="time" selected>時間</option>
                <option value="job">工作</option>
                <option value="uploader">上傳者</option>
            </select>
        </div>
        <!-- 下拉式選單 -->
    </div>
    <div
        v-for="file in logFile"
        class="flex justify-between w-auto my-4 py-4 pl-4 pr-2 border-2 border-[#3399FF] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
        <div class="w-full whitespace-nowrap">
            <p class="font-bold">{{ file.file_path }}</p>
            <div class="flex flex-row w-full mt-2 text-base text-gray-500 font-bold">
                <div class="mr-2">
                    <span>上傳日期：{{ file.file_uploaded_time.substring(0, 10) }}</span>
                    <span></span>
                </div>
                <div class="mx-2">
                    <span>上傳時間：{{ file.file_uploaded_time.substring(11, 19) }} </span>
                    <span></span>
                </div>
                <div class="mx-2">
                    <span>上傳者： {{ file.user_name }}</span>
                    <span></span>
                </div>
                <div class="mx-2">
                    <span>所屬工作： {{ file.job_name }}</span>
                    <span></span>
                </div>
            </div>
        </div>
        <button class="text-red-500 p-2" @click=";[toggleModal('deleteModal'), setSelectedFile(file)]">X</button>
    </div>

    <!--換頁-->
    <div class="flex justify-center pb-10">
        <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-xl shadow-primary">
                <li
                    v-if="pageNumber - 1 > 0"
                    @click="changePage(pageNumber - 1)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    上一頁
                </li>
                <li
                    v-else
                    class="shadow-none text-opacity-30 bg-white border border-gray-300 text-gray-500 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                >
                    上一頁
                </li>
                <li
                    v-if="pageNumber - 2 > 1"
                    @click="changePage(1)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    1
                </li>
                <li
                    v-if="pageNumber - 2 > 1"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    ...
                </li>

                <li
                    v-if="pageNumber - 2 >= 1"
                    @click="changePage(pageNumber - 2)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ pageNumber - 2 }}
                </li>
                <li
                    v-if="pageNumber - 1 >= 1"
                    @click="changePage(pageNumber - 1)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ pageNumber - 1 }}
                </li>

                <li
                    class="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                    {{ pageNumber }}
                </li>

                <li
                    v-if="pageNumber + 1 <= pages.length"
                    @click="changePage(pageNumber + 1)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ pageNumber + 1 }}
                </li>
                <li
                    v-if="pageNumber + 2 <= pages.length"
                    @click="changePage(pageNumber + 2)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ pageNumber + 2 }}
                </li>

                <li
                    v-if="pageNumber + 2 < pages.length"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    ...
                </li>
                <li
                    v-if="pageNumber + 2 < pages.length"
                    @click="changePage(pages.length)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    {{ pages.length }}
                </li>

                <li
                    v-if="pageNumber < pages.length"
                    @click="changePage(pageNumber + 1)"
                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                    下一頁
                </li>
                <li
                    v-else
                    class="shadow-none text-opacity-30 bg-white border border-gray-300 text-gray-500 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                >
                    下一頁
                </li>
            </ul>
        </nav>
    </div>
    <!--換頁-->
</template>

<style scoped></style>
