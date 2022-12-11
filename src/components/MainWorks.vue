<script setup>
import MainWorksCard from './MainWorksCard.vue'
import { usePageStoretest } from "../stores/page"
import axios from 'axios'
import { ref } from 'vue'

let workData = ref([])
const store = usePageStoretest()

let pages = ref([])
const quantum = 3
let pageNumber = ref(1)
const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

const getData = async () => {
    await axios.get('/api/myjob/').then((response) => {
        workData.value = response.data
    })


    for (let work of workData.value) {
        await axios.get('/api/activity/' + work.activity + '/job/' + work.id +'/job_detail/').then(res=>{
            let job_detail_list = res.data
            let count = 0
            for (jd of job_detail_list){
                if (jd.status == 1){
                    count += 1
                }
            }
            if (count == 0 || job_detail_list.length == 0){
                work.tracePercentage = 0
            }else{
                work.tracePercentage = Math.round((count / job_detail_list.length) * 100)
            }
        })


        await axios.get('/api/activity/' + work.activity + '/').then((response) => {
            work['activity_name'] = response.data.activity_name
        })
    }
    changeFilter(999)
}

// 更換篩選條件
const changeFilter = async (status) => {
    pages.value = []
    pageNumber.value = 1
    let candidates = []
    for (let work of workData.value) {
        if (status == 999) {
            candidates = workData.value
        }
        if (work.status == status) {
            candidates.push(work)
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

const trans_tab = (id, title) => {
    let temp = {
        id: id,
        title: title
    }
    let isHave = false
    store.tabs.forEach(function (item, index) {
        if (item.id == temp.id) {
            isHave = true
        }
    })
    if (!isHave) {
        store.pushin(temp)
    }

}

getData()
</script>

<template>
    <div class="w-full px-8 py-8">
        <!-- options -->
        <div id="options" class="inline-flex justify-between items-center my-4 w-full">
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


        <div class="bg-white border border-[#d1d5db] rounded-2xl p-8 my-4">
            <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
                <div v-if="pages.length == 0" class="text-[#F87171] font-bold text-2xl my-4">目前沒有任何你負責的工作喔
                </div>
                <router-link v-for="(item, index) of pages[pageNumber - 1]"
                    :to="{ name: 'event-work-detail', params: { EventId: item.activity, WorkId: item.id } }"
                    @click="trans_tab(item.id, item.title)">
                    <MainWorksCard :work-title="item.title" :activity="item.activity_name" :content="item.content"
                        :tracePercentage="item.tracePercentage" :costMoney="item.job_expenditure" :budgetMoney="item.job_budget">
                    </MainWorksCard>
                </router-link>
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

.btnCreateEvent {
    border-color: #2b6cb0;
    color: #2b6cb0;
}

.btnCreateEvent:hover {
    background-color: #2b6cb0;
    color: #ffffff;
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
