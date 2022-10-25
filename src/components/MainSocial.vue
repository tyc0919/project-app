<script setup>
import SocialPost from './SocialPost.vue'
import { ref } from 'vue'
import axios from 'axios'


const quantum = 2;
let pageNumber = ref(1);

// get data
let socialData = ref([])
let pages = ref([])

const changePage = (targetPage) => {
    pageNumber.value = targetPage
}

const getData = async () => {
    // add social data
    await axios.get('/api/social/')
        .then(function (response) {
            socialData.value = response.data
        })

    // add total starCount into each activity
    for (let s of socialData.value) {
        let stars = [];
        await axios.get('/api/social/' + s.id + '/review/').then(function (response) {
            if (response.data.length > 0) {
                let total = 0
                for (let rv of response.data) {
                    stars.push(rv.review_star)
                    total += rv.review_star;
                }
                s["total_star"] = total / stars.length
                s['star_percent'] = (s["total_star"] * 20).toString() + "%"
            } else {
                s["total_star"] = 0
                s['star_percent'] = "0%"
            }
        })
    }
    console.log(socialData.value)

    // divide data to each page
    let pageData = [];
    for (let [i, s] of socialData.value.entries()) {
        pageData.push(s);
        if (pageData.length >= quantum || i == socialData.value.length - 1) {
            pages.value.push(pageData)
            pageData = [];
        }
    }
}
getData()

</script>

<template>
    <!--Component here-->
    <div class="h-full">
        <!--貼文、按鈕-->
        <div class="px-8 py-8">
            <!--按鈕列-->
            <div id="options" class="inline-flex justify-between items-center my-4 w-full">
                <div class="inline-flex justify-around">
                    <div id="radios">
                        <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" checked />
                        <label class="radioLable text-base" for="radio1">完成</label>
                        <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                        <label class="radioLable text-base" for="radio2">未完成</label>
                        <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" />
                        <label class="radioLable text-base" for="radio3">全部</label>
                    </div>
                </div>
            </div>
            <!--按鈕列-->

            <!--主要內容-->
            <router-link v-for="(item, index) of pages[pageNumber-1]"
                :to="{ name: 'post', params: { PostId: item.id } }">
                <SocialPost :title="item.activity_name" :owner="item.owner" :rating="item.star_percent"
                    :content="item.content"></SocialPost>
            </router-link>
            <!--主要內容-->
        </div>
        <!--貼文、按鈕-->

        <!--換頁-->
        <div class="pagination">
            <ul>
                <li v-if="pageNumber - 1 > 0" @click="changePage(pageNumber-1)" class="prev">上一頁</li>
                <li class="number current">{{pageNumber}}</li>
                <li v-if="pageNumber+1 <= pages.length" @click="changePage(pageNumber + 1)" class="number">
                    {{pageNumber+1}}
                </li>
                <li v-if="pageNumber + 2 <= pages.length" @click="changePage(pageNumber + 2)" class="number">
                    {{pageNumber + 2}}
                </li>
                <li class="dot">...</li>
                <li @click="changePage(pages.length)" class="number">{{pages.length}}</li>
                <li v-if="pageNumber < pages.length" @click="changePage(pageNumber+1)" class="next">下一頁</li>
            </ul>
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
