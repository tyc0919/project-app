<script setup>
import { ref } from 'vue'
import Invite from './invite.vue'
import SocialPageReviewCard from './SocialPageReviewCard.vue'
import SocialPageWorkCard from './SocialPageWorkCard.vue'
import BarChart from './BarChart.vue'
import axios from 'axios'
import Modal from './Modal.vue'
import { useRoute } from 'vue-router'
import { getCookie } from '../assets/modules'

let socialData = ref([])
let collabData = ref([])
let workData = ref([])
let reviewData = ref([])
let reviewId = ''
let userData = []
let userName = ref()
let userEmail = ''
let userComment = ref('')
let reviewPercentage = ref([])

let errorMessage = {
    commentErrorMessage: ref(''),
    starErrorMessage: ref(),
}
const route = useRoute()

axios.get('/api/social/' + route.params.PostId).then(function (response) {
    socialData.value = response.data
    document.getElementById('description').innerHTML = socialData.value.activity_description
})
axios.get('/api/activity/' + route.params.PostId + '/job/').then(function (response) {
    workData.value = response.data
})
axios.get('/api/userprofile/').then(function (response) {
    userData = response.data
    userName.value = userData.user_name
    userEmail = userData.user_email
})

axios.get('/api/social/' + route.params.PostId + '/review/').then(function (response) {
    reviewData.value = response.data
    ratingPercentage(reviewData.value)
    getCurrentReview()
})

axios.get('/api/activity/' + route.params.PostId + '/collaborator/').then(function (response) {
    collabData.value = response.data
})

const showModal_add = ref(false)
const toggleModal_add = () => {
    showModal_add.value = !showModal_add.value
}

const showModal_edit = ref(false)
const toggleModal_edit = () => {
    showModal_edit.value = !showModal_edit.value
}

const getCurrentReview = () => {
    for (let i of reviewData.value) {
        if (i.reviewer == userEmail) {
            userComment.value = i.content
            reviewId = i.id
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

    await axios
        .post(
            '/api/social/post-review/',
            {
                activity_id: route.params.PostId,
                user_email: userData.user_email,
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
}
const reload = () => {
    window.location.reload()
}
cleanErrorMessage()
getCurrentReview()
</script>

<template>
    <!-- 送出評論  -->
    <Teleport to="body">
        <modal :show="showModal_add">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">送出成功！</div>
                </div>
            </template>
            <template #body>
                {{ messageS }}
            </template>
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

    <div class="mx-12 px-4 py-4">
        <div class="top-container flex justify-between">
            <!--? banner -->
            <div class="flex justify-center w-3/4">
                <img src="../assets/images/FirstPart.png" class="event_main_img w-3/4" />
            </div>

            <!-- ? people management -->
            <div class="flex flex-col w-1/4">
                <div class="title w-fit h-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    所有人員
                </div>
                <div class="invite h-auto bg-white flex flex-col items-center p-4 overflow-y-scroll">
                    <Invite v-for="item of collabData" :name="item.user_name"></Invite>
                </div>
            </div>
        </div>

        <!-- ? The description of the activity -->
        <div class="description my-4 flex flex-col">
            <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                活動簡介
            </div>
            <div id="description" class="px-10 text-xl font-bold"></div>
        </div>

        <div class="flex justify-between">
            <!-- ? Expense -->
            <div class="flex flex-col">
                <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    預算支出
                </div>
                <div class="expense h-fit">
                    <BarChart></BarChart>
                </div>
            </div>
            <!-- ? all works-->
            <div class="flex flex-col w-1/2">
                <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    所有工作
                </div>
                <div class="works-container px-2 py-2 overflow-y-auto">
                    <SocialPageWorkCard
                        v-for="item of workData"
                        :title="item.title"
                        :content="item.content"
                    ></SocialPageWorkCard>
                </div>
            </div>
        </div>

        <!-- ? Review -->
        <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">評論</div>
        <div class="flex flex-col justify-between mt-4">
            <div class="flex flex-col my-4 p-4 pt-8 bg-white rounded">
                <div class="overflow-y-auto max-h-96 px-20">
                    <div class="reviewer flex justify-start items-center mb-8">
                        <div class="reviewer-img mr-2"></div>
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
                            placeholder="寫下你的評論 (500字以內)"
                            class="p-2 w-full h-48 border border-2 border-black rounded"
                            >{{ userComment }}</textarea
                        >
                        <span class="text-red-500">{{ errorMessage.commentErrorMessage.value }}</span>
                    </div>
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

            <div class="flex flex-col-reverse">
                <SocialPageReviewCard
                    v-for="(item, index) of reviewData"
                    :reviewer="item.user_name"
                    :rating="reviewPercentage[index]"
                    :content="item.content"
                    :date="item.review_time"
                ></SocialPageReviewCard>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expense {
    width: 40rem;
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
    width: 1.75rem;
    height: 1.75rem;
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

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-4 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.invite * {
    width: 100%;
}

.top-container {
    height: 60vh;
}

.event_main_img {
    height: 60vh;
}
button:disabled {
    border: 1px solid rgba(118, 118, 118, 0.3);
    background-color: rgba(239, 239, 239, 0.3);
    color: rgba(16, 16, 16, 0.3);
}
</style>
