<script setup>
import EventOverviewFile from './EventOverviewFile.vue'
import EventOverviewLog from './EventOverviewLog.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let logData = ref([])
let logFile = ref([])

let pages = ref([])
const quantum = 5
let pageNumber = ref(1)
const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

const getData = async () => {
    await axios.get('/api/log/' + route.params.EventId + '/').then(function (response) {
        logData.value = response.data
    })
    await axios.get('/api/file/activity/' + route.params.EventId + '/').then(function (response) {
        logFile.value = response.data
    })
    sorter()
}

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
            return a.uploader - b.uploader
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
    <div class="content">
        <!-- Log紀錄 -->
        <div class="border-b-2 border-[#c0c0c0]">
            <div class="w-full h-80 bg-white overflow-auto text-xl font-bold">
                <EventOverviewLog
                    v-for="log in logData"
                    :time="log.time"
                    :user="log.user_name"
                    :action="log.action"
                ></EventOverviewLog>
            </div>
        </div>
        <!-- Log紀錄 -->

        <!-- 檔案總覽 -->

        <div>
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

            <!-- 檔案區-->
            <div>
                <EventOverviewFile
                    v-for="file in pages[pageNumber - 1]"
                    :key="file.id"
                    :name="file.file_path"
                    :date="file.file_uploaded_time"
                    :uploader="file.uploader"
                    :job-id="file.job"
                ></EventOverviewFile>
            </div>
            <!-- 檔案區-->

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
        </div>

        <!-- 檔案總覽 -->
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
}
.pagination ul {
    display: inline-flex;
    background-color: #fff;
    margin: 2rem 0;
}
.pagination ul li {
    text-align: center;
    padding: 10px 20px 10px 20px;
    border-width: 1px;
    border-color: #929eaa;
    margin-left: -1px;
    cursor: pointer;
}
.pagination ul li.dot {
    cursor: default;
}
.pagination ul li.current {
    background-color: #dbd8d4;
}
</style>
