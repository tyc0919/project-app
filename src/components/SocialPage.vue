<script setup>
import { ref } from 'vue'
import Invite from './invite.vue'
import SocialPageReviewCard from './SocialPageReviewCard.vue'
import SocialPageWorkCard from './SocialPageWorkCard.vue'
import BarChart from './BarChart.vue'
import Modal from './Modal.vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { getCookie } from '../assets/modules'

let socialData = ref([])
let workData = ref([])
let reviewData = ref([])
let userData = ref([])
let reviewPercentage = ref([])
let user = ref()
let activity = ref()

let isDisabled = ref(true)

const route = useRoute()
const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
    isDisabled.value = true
}

axios.get('/api/social/' + route.params.PostId).then(function (response) {
    socialData.value = response.data
    activity.value = socialData.value.activity_name
    document.getElementById('description').innerHTML = socialData.value.activity_description
})
axios.get('/api/activity/' + route.params.PostId + '/job/').then(function (response) {
    workData.value = response.data
})
axios.get('/api/userprofile/').then(function (response) {
    userData.value = response.data
    user.value = userData.value.user_name
})

axios.get('/api/social/' + route.params.PostId + '/review/').then(function (response) {
    reviewData.value = response.data
    ratingPercentage(reviewData.value)
    console.log(reviewPercentage.value)
})

function ratingPercentage(star) {
    for (let i of star) {
        let rate = (i.review_star * 20).toString() + '%'
        reviewPercentage.value.push(rate)
    }
}

function addReview() {
    let comment = document.getElementById('comment').value
    let star = document.querySelector('input[name="rating"]:checked').value

    let csrftoken = getCookie()
    let config = {
        headers: {
            'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
    }

    axios
        .post(
            '/api/social/post-review/',
            {
                activity_id: route.params.PostId,
                user_email: userData.value.user_email,
                content: comment,
                review_star: star,
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

function enableBtn() {
    isDisabled.value = false
}
</script>

<template>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">{{ activity }}</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="reviewer flex justify-start items-center mb-8">
                        <div class="reviewer-img mr-2"></div>
                        <div class="reviewer-name text-xl cursor-text">{{ user }}</div>
                    </div>

                    <!-- 星號 -->
                    <div class="flex justify-center items-end mb-2">
                        <div class="rating text-2xl">
                            <input @click="enableBtn()" type="radio" name="rating" value="5" id="5" /><label for="5"
                                >☆</label
                            >
                            <input @click="enableBtn()" type="radio" name="rating" value="4" id="4" /><label for="4"
                                >☆</label
                            >
                            <input @click="enableBtn()" type="radio" name="rating" value="3" id="3" /><label for="3"
                                >☆</label
                            >
                            <input @click="enableBtn()" type="radio" name="rating" value="2" id="2" /><label for="2"
                                >☆</label
                            >
                            <input @click="enableBtn()" type="radio" name="rating" value="1" id="1" /><label for="1"
                                >☆</label
                            >
                        </div>
                    </div>
                    <!-- 星號 -->

                    <div class="flex center mt-8">
                        <textarea
                            id="comment"
                            placeholder="寫下你的評論"
                            class="p-2 w-full h-48 border border-2 border-black"
                        ></textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button
                        :disabled="isDisabled"
                        @click="toggleModal(), addReview()"
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
        </modal>
    </Teleport>

    <div class="mx-12 px-4 py-4">
        <div class="top-container flex justify-between">
            <!--? banner -->
            <div class="flex justify-center w-3/4">
                <img src="../assets/images/FirstPart.png" class="event_main_img w-3/4" />
            </div>

            <!-- ? people management -->
            <div class="flex flex-col justify-between w-1/4">
                <div class="title w-fit h-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    所有人員
                </div>
                <div class="invite h-auto bg-white flex flex-col items-center p-4 overflow-y-scroll">
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                    <Invite></Invite>
                </div>
            </div>
        </div>

        <!-- ? The description of the activity -->
        <div class="description my-4 flex flex-col">
            <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                活動簡介
            </div>
            <div id="description" class="px-10 text-xl font-bold">
                2019花在彰化活動將從2月5日到2月19日新春期間，在溪州公園盛大開幕，展出各式的彰化在地花卉，結合彰化縣燈會，邀請全國民眾利用春節期間攜家帶眷，前來彰化參觀走春，並到溪州公園白日看花、晚間遊園賞燈，期間還有各式豐富精采的表演，歡迎來彰化玩！
            </div>
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
            <div class="flex flex-col w-auto">
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
            <div class="my-4 p-4 pt-8 bg-white">
                <!-- 星號 -->
                <div class="rating text-2xl mt-8 mb-4">
                    <input @click="enableBtn()" type="radio" name="rating" value="5" id="5" /><label for="5">☆</label>
                    <input @click="enableBtn()" type="radio" name="rating" value="4" id="4" /><label for="4">☆</label>
                    <input @click="enableBtn()" type="radio" name="rating" value="3" id="3" /><label for="3">☆</label>
                    <input @click="enableBtn()" type="radio" name="rating" value="2" id="2" /><label for="2">☆</label>
                    <input @click="enableBtn()" type="radio" name="rating" value="1" id="1" /><label for="1">☆</label>
                </div>
                <!-- 星號 -->
                <div class="center">
                    <textarea
                        id="comment"
                        placeholder="寫下你的評論"
                        class="p-2 w-full h-48 border border-slate-400 focus-visible:outline-none"
                    ></textarea>
                </div>
            </div>

            <button
                @click="toggleModal()"
                class="flex items-center w-fit my-4 py-2 px-4 rounded hover:text-[#2b6cb0] border border-[#2b6cb0] hover:bg-transparent text-white bg-sky-700 font-semibold"
            >
                送出評論
            </button>
            <div class="flex flex-col-reverse">
                <SocialPageReviewCard
                    v-for="(item, index) of reviewData"
                    :reviewer="item.reviewer"
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
