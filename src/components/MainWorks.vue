<script setup>
import MainWorksCard from './MainWorksCard.vue'
import axios from 'axios'
import { ref } from 'vue'

let workData = []
let work = ref([])
let activityData = ref([])
let activityName = ref([])

const show_f = async () => {
    workData.length = 0
    work.value.length = 0
    activityName.value.length = 0
    axios
        .get('/api/activity/')
        .then(async function (response) {
            activityData.value = response.data

            for (let a of activityData.value) {
                await axios.get('/api/activity/' + a.id + '/job/').then(function (response) {
                    let temp = response.data
                    for (let i of temp) {
                        if (i.status == 3) {
                            workData.push(i)
                        }
                    }
                })
            }
        })
        .finally(function (response) {
            for (let wd of workData) {
                work.value.push(wd)
                for (let a of activityData.value) {
                    if (a.id == wd.activity) {
                        activityName.value.push(a.activity_name)
                    }
                }
            }
        })
}

const show_un = () => {
    workData.length = 0
    work.value.length = 0
    activityName.value.length = 0
    axios
        .get('/api/activity/')
        .then(async function (response) {
            activityData.value = response.data

            for (let a of activityData.value) {
                await axios.get('/api/activity/' + a.id + '/job/').then(function (response) {
                    let temp = response.data
                    for (let i of temp) {
                        if (i.status == 1) {
                            workData.push(i)
                        }
                    }
                })
            }
        })
        .finally(function (response) {
            for (let wd of workData) {
                work.value.push(wd)
                for (let a of activityData.value) {
                    if (a.id == wd.activity) {
                        activityName.value.push(a.activity_name)
                    }
                }
            }
        })
}
const show_all = () => {
    workData.length = 0
    work.value.length = 0
    activityName.value.length = 0
    axios
        .get('/api/activity/')
        .then(async function (response) {
            activityData.value = response.data

            for (let a of activityData.value) {
                await axios.get('/api/activity/' + a.id + '/job/').then(function (response) {
                    workData.push(response.data)
                })
            }
        })
        .finally(function (response) {
            for (let wd of workData) {
                for (let w of wd) {
                    work.value.push(w)
                    for (let a of activityData.value) {
                        if (a.id == w.activity) {
                            activityName.value.push(a.activity_name)
                        }
                    }
                }
            }
        })
}
show_all()
</script>

<template>
    <div class="container w-full px-8 py-8">
        <!-- options -->
        <div id="options" class="inline-flex justify-between items-center my-4 w-full">
            <div class="inline-flex justify-around">
                <div id="radios">
                    <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" />
                    <label class="radioLable text-base" for="radio1" @click="show_f">完成</label>
                    <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                    <label class="radioLable text-base" for="radio2" @click="show_un">未完成</label>
                    <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" checked />
                    <label class="radioLable text-base" for="radio3" @click="show_all">全部</label>
                </div>
            </div>
        </div>

        <div class="my-4 grid grid-cols-3 grid-gap-1rem items-center justify-center">
            <router-link
                v-for="(item, index) of work"
                :to="{ name: 'event-work-detail', params: { EventId: item.activity, WorkId: item.id } }"
            >
                <MainWorksCard
                    :work-title="item.title"
                    :activity="activityName[index]"
                    :content="item.content"
                    :tracePercentage="100"
                    :costMoney="item.job_expenditure"
                    :budgetMoney="item.job_budget"
                ></MainWorksCard>
            </router-link>
        </div>

        <div class="flex justify-center py-10">
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >上一頁</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >1</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >2</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-current="page"
                            class="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >3</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >4</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >5</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >下一頁</a
                        >
                    </li>
                </ul>
            </nav>
        </div>
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

.radioInput:checked + .radioLable {
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
