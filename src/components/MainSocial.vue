<script setup>
import MainSocialPost from './MainSocialPost.vue'
import { ref } from 'vue'
import axios from 'axios'

// get data
let socialData = ref([])
let pages = ref([])
const quantum = 3
let pageNumber = ref(1)
const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

const getData = async () => {
    // add social data
    await axios.get('/api/social/').then(async function (response) {
        socialData.value = response.data
        console.log(socialData.value)
    })

    // add total starCount into each activity
    for (let s of socialData.value) {
        let stars = []
        s['total_star'] = 0
        s['star_percent'] = '0%'
        await axios.get('/api/social/' + s.id + '/review/').then(function (response) {
            if (response.data.length > 0) {
                let total = 0
                for (let rv of response.data) {
                    stars.push(rv.review_star)
                    total += rv.review_star
                }
                s['total_star'] = total / stars.length
                s['star_percent'] = (s['total_star'] * 20).toString() + '%'
            }
        })
    }
    changeFilter(999)
}

const changeFilter = async (status) => {
    pages.value = []
    pageNumber.value = 1
    let candidates = []
    for (let work of socialData.value) {
        if (status == 999) {
            candidates = socialData.value
        }
        if (work.is_finished == status) {
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
getData()
</script>

<template>
    <!--Component here-->
    <div class="h-full">
        <!--貼文、按鈕-->
        <div class="p-8">
            <!--按鈕列-->
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
            <!--按鈕列-->

            <!--主要內容-->

            <div class="bg-white border border-[#d1d5db] rounded-2xl p-8 my-4">
                <router-link v-for="(item, index) of pages[pageNumber - 1]"
                    :to="{ name: 'post', params: { PostId: item.id } }">
                    <MainSocialPost :title="item.activity_name" :owner="item.user_name" :rating="item.star_percent"
                        :content="item.content" :postTime="item.post_time"></MainSocialPost>
                </router-link>
            </div>

            <!--主要內容-->
        </div>
        <!--貼文、按鈕-->

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
    <!--Component here-->
</template>

<style scoped>
.shadow-primary {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.post_content {
    display: block;
    max-height: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.more_content {
    padding-right: 2rem;
    padding-bottom: 0.25rem;
}

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
</style>
