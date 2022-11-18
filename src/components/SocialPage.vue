<script setup>
import { ref } from 'vue'
import Invite from './invite.vue'
import SocialPageReviewCard from './SocialPageReviewCard.vue'
import SocialPageWorkCard from './SocialPageWorkCard.vue'
import axios from 'axios'
import Modal from './Modal.vue'
import { useRoute } from 'vue-router'
import { getCookie } from '../assets/modules'

const route = useRoute()

const showModal_edit = ref(false)
const showModal_add = ref(false)

let errorMessage = {
    commentErrorMessage: ref(''),
    starErrorMessage: ref(),
}

let socialData = ref([])
let collabData = ref([])
let workData = ref([])

let reviewData = ref([])
let reviewId = ''

let userPic = ref('')
let userName = ref()
let userEmail = ''
let userComment = ref('')

let reviewPercentage = ref([])

const getData = async () => {
    await axios.get('/api/social/' + route.params.PostId).then(function (response) {
        socialData.value = response.data
        document.getElementById('description').innerHTML = socialData.value.activity_description
    })
    await axios.get('/api/userprofile/').then(function (response) {
        let userData = response.data
        userName.value = userData.user_name
        userEmail = userData.user_email
        userPic.value = '/api/serve-file/avatar/' + userEmail
    })
    await axios.get('/api/social/' + route.params.PostId + '/review/').then(function (response) {
        reviewData.value = response.data
        ratingPercentage(reviewData.value)
        getCurrentReview()
    })

    await axios.get('/api/activity/' + route.params.PostId + '/job/').then(function (response) {
        workData.value = response.data
    })
    await axios.get('/api/activity/' + route.params.PostId + '/collaborator/').then(function (response) {
        collabData.value = response.data
    })
}

const toggleModal_add = () => {
    showModal_add.value = !showModal_add.value
}

const toggleModal_edit = () => {
    showModal_edit.value = !showModal_edit.value
}

const getCurrentReview = () => {
    for (let i of reviewData.value) {
        if (i.reviewer == userEmail) {
            userComment.value = i.content
            reviewId = i.id
            console.log(i.review_star)
            document.getElementById('' + i.review_star + '').checked = true
        }
    }
}
const cleanErrorMessage = () => {
    //  清空錯誤訊息
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }
}

const ratingPercentage = (star) => {
    for (let i of star) {
        let rate = (i.review_star * 20).toString() + '%'
        reviewPercentage.value.push(rate)
    }
}
const editReview = async () => {
    toggleModal_edit()
    let comment = document.getElementById('comment').value
    let star = document.querySelector('input[type=radio]:checked')
    let csrftoken = getCookie()
    let config = {
        headers: {
            'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
        withCredentials: true,
    }

    await axios
        .post(
            '/api/social/update-review/',
            {
                id: reviewId,
                content: comment,
                review_star: star.value,
            },
            config
        )
        .then(async function (res) {
            await axios.get('/api/social/' + route.params.PostId + '/review/', config).then(function (response) {
                reviewData.value = response.data
                reviewPercentage.value.length = 0
                ratingPercentage(reviewData.value)
            })
        })
}
const addReview = async () => {
    getCurrentReview()
    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }
    let comment = document.getElementById('comment').value
    let star = document.querySelector('input[type=radio]:checked')
    let csrftoken = getCookie()
    let config = {
        headers: {
            'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
    }
    try {
        await axios
            .post(
                '/api/social/post-review/',
                {
                    activity_id: route.params.PostId,
                    user_email: userEmail,
                    content: comment,
                    review_star: star.value,
                },
                config
            )
            .then(async function (res) {
                await axios.get('/api/social/' + route.params.PostId + '/review/', config).then(function (response) {
                    reviewData.value = response.data
                    reviewPercentage.value.length = 0
                    ratingPercentage(reviewData.value)
                })
            })
        toggleModal_add()
    } catch (error) {
        if (comment == '') {
            errorMessage.commentErrorMessage.value = '請輸入評論內容'
        }
        if ((star = 'null')) {
            errorMessage.starErrorMessage.value = '請選擇星級'
        }
    }
}
const reload = () => {
    window.location.reload()
}
getData()

cleanErrorMessage()
</script>

<template>
    <!-- 送出評論  -->
    <Teleport to="body">
        <modal :show="showModal_add">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>
            <template #body> 送出成功！ </template>
            <template #footer>
                <button
                    @click="toggleModal_add(), reload()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
                >
                    確定
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 送出評論  -->

    <!-- 編輯評論  -->
    <Teleport to="body">
        <modal :show="showModal_edit">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>
            <template #body> 確定要修改目前的評論嗎？ </template>
            <template #footer>
                <button
                    @click="editReview(), toggleModal_add()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
                >
                    確定
                </button>
                <button
                    @click="toggleModal_edit()"
                    class="py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold"
                >
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 編輯評論  -->

    <div class="p-8">
        <div class="top-container flex justify-center bg-white border border-[#D1D5DB]">
            <!--? banner -->
            <div class="inline-flex justify-center w-3/4 my-8">
                <img
                    :src="'/api/serve-file/activity-pic/' + socialData.activity_picture"
                    class="event_main_img w-3/4"
                    onerror="this.src='https://i.imgur.com/fAgK9sl.jpg'"
                />
            </div>
        </div>

        <!-- 活動簡介 -->
        <div class="description my-4 flex flex-col">
            <div class="bookmark2 relative">
                <div class="bookmark2-box text-2xl bg-white">活動簡介</div>
            </div>
            <div id="description" class="px-2 py-4 text-xl font-bold bg-white border border-[#D1D5DB]"></div>
        </div>
        <!-- 活動簡介 -->

        <!-- 預算支出、所有工作 -->
        <div class="flex justify-between my-8 py-4">
            <!-- ? Expense -->

            <!-- ? all works-->
            <div class="flex flex-col w-1/2 mr-10">
                <div class="bookmark2 relative">
                    <div class="bookmark2-box text-2xl bg-white">所有工作</div>
                </div>
                <div class="works-container px-8 py-2 overflow-y-auto bg-white border border-[#D1D5DB]">
                    <SocialPageWorkCard v-for="item of workData" :title="item.title" :content="item.content">
                    </SocialPageWorkCard>
                </div>
            </div>

            <!-- ? people management -->
            <div class="flex flex-col w-1/2 ml-10">
                <div class="bookmark2 relative">
                    <div class="bookmark2-box text-2xl bg-white">所有人員</div>
                </div>
                <div
                    class="invite h-full flex flex-col items-center p-4 overflow-y-auto border border-[#D1D5DB] bg-white"
                >
                    <Invite v-for="item of collabData" :email="item.user_email" :name="item.user_name"></Invite>
                </div>
            </div>
        </div>
        <!-- 預算支出、所有工作 -->

        <!-- 撰寫評論 -->
        <div class="w-full bg-white mb-8 py-4 border border-[#D1D5DB]">
            <div class="flex flex-col justify-between">
                <div class="flex flex-col">
                    <div class="overflow-y-auto max-h-[30rem] px-20 py-4 rounded-2xl">
                        <div class="reviewer flex justify-start items-center mb-8">
                            <div><img id="userImage" class="reviewer-img mr-2" v-bind:src="userPic" /></div>
                            <div class="reviewer-name text-xl cursor-text">{{ userName }}</div>
                        </div>

                        <!-- 星號 -->
                        <div class="flex items-end mb-2">
                            <div class="rating text-2xl">
                                <input type="radio" name="rating" value="5" id="5" />
                                <label for="5">☆</label>
                                <input type="radio" name="rating" value="4" id="4" />
                                <label for="4">☆</label>
                                <input type="radio" name="rating" value="3" id="3" />
                                <label for="3">☆</label>
                                <input type="radio" name="rating" value="2" id="2" />
                                <label for="2">☆</label>
                                <input type="radio" name="rating" value="1" id="1" />
                                <label for="1">☆</label>
                                <input type="radio" name="rating" value="null" id="0" checked />
                            </div>
                        </div>
                        <span class="text-red-500">{{ errorMessage.starErrorMessage.value }}</span>
                        <!-- 星號 -->

                        <div class="mt-8">
                            <textarea
                                id="comment"
                                placeholder="寫下你的評論 (最多500字)"
                                class="p-2 w-full h-48 border border-2 border-black rounded"
                                maxlength="500"
                                >{{ userComment }}</textarea
                            >
                            <span class="text-red-500">{{ errorMessage.commentErrorMessage.value }}</span>
                        </div>
                        <div class="flex justify-center">
                            <button
                                v-if="userComment == ''"
                                @click="addReview()"
                                class="my-4 py-2 px-4 rounded hover:text-[#2b6cb0] border border-[#2b6cb0] hover:bg-transparent text-white bg-sky-700 font-semibold"
                                id="commentBtn"
                            >
                                送出評論
                            </button>
                            <button
                                v-else
                                @click="toggleModal_edit()"
                                class="my-4 py-2 px-4 rounded hover:text-[#2b6cb0] border border-[#2b6cb0] hover:bg-transparent text-white bg-sky-700 font-semibold"
                                id="commentBtn"
                            >
                                修改評論
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 撰寫評論 -->
        </div>
        <!-- 評論區 -->
        <div class="bookmark2 relative">
            <div class="bookmark2-box text-2xl bg-white">評論</div>
        </div>
        <div class="flex flex-col-reverse px-10 py-8 bg-white border border-[#D1D5DB]">
            <SocialPageReviewCard
                v-for="(item, index) of reviewData"
                :email="item.reviewer"
                :reviewer="item.user_name"
                :rating="reviewPercentage[index]"
                :content="item.content"
                :date="item.review_time"
            >
            </SocialPageReviewCard>
        </div>
        <!-- 評論區 -->
    </div>
</template>

<style scoped>
.expense {
    width: 50rem;
}

.rating {
    display: inline-flex;
    margin-top: -10px;
    flex-direction: row-reverse;
}

.rating > input {
    display: none;
}

.rating > label {
    position: relative;
    width: 40px;
    font-size: 45px;
    color: #ffb300;
    cursor: pointer;
}

.rating > label::before {
    content: '\2605';
    position: absolute;
    opacity: 0;
}

.rating > label:hover:before,
.rating > label:hover ~ label:before {
    opacity: 1 !important;
}

.rating > input:checked ~ label:before {
    opacity: 1;
}

.rating:hover > input:checked ~ label:before {
    opacity: 0.4;
}

.reviewer-img {
    width: 3rem;
    height: 3rem;
    border: 1px solid #000000;
    vertical-align: middle;
    border-radius: 50%;
}

.works-container {
    height: 60vh;
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

.bookmark2 {
    height: 50px;
    border-bottom: 5px solid #ccdff6;
}

.bookmark2-box {
    width: 150px;
    text-align: center;
    line-height: 45px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 1rem;
    background-color: #ccdff6;
    border-radius: 10px 10px 0 0;
    border-top: 1px rgb(209, 213, 219) solid;
    border-left: 1px rgb(209, 213, 219) solid;
    border-right: 1px rgb(209, 213, 219) solid;
    color: #1a73e8;
    font-weight: bold;
}

.invite * {
    width: 100%;
}

.top-container {
    height: 60vh;
}

button:disabled {
    border: 1px solid rgba(118, 118, 118, 0.3);
    background-color: rgba(239, 239, 239, 0.3);
    color: rgba(16, 16, 16, 0.3);
}
</style>
