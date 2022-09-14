<script setup>
import { ref } from 'vue';
import Invite from "./invite.vue"
import SocialPageReviewCard from "./SocialPageReviewCard.vue"
import SocialPageWorkCard from "./SocialPageWorkCard.vue"
import BarChart from "./BarChart.vue"
import Modal from './Modal.vue';

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
</script>

<template>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">活動名稱</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="reviewer flex justify-start items-center mb-2">
                        <div class="reviewer-img mr-2"></div>
                        <div class="reviewer-name text-xl cursor-text">
                            評論者名稱
                        </div>
                    </div>

                    <div class="flex justify-center items-end mb-2">
                        <!-- ! stars -->
                        <div class="ratings relative mr-2 text-gray-200 text-2xl">
                            <div class="empty_star">★★★★★</div>
                            <div class="full_star absolute text-yellow-400">★★★★★</div>
                        </div>

                    </div>
                    <div class="flex center mt-8 ">
                        <textarea placeholder="寫下你的評論" class=" p-2 w-full h-48 border border-2 border-black"></textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        新增
                    </button>
                    <button @click="toggleModal()"
                        class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>

    <div class="container px-4 py-4 w-full">


        <div class="top-container flex justify-between">
            <!--? banner -->
            <div class="flex justify-center w-3/4">
                <img src="../assets/images/FirstPart.png" class="event_main_img w-3/4">
            </div>

            <!-- ? people management -->
            <div class="flex flex-col justify-between w-1/4">
                <div class="title w-fit h-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    所有人員
                </div>
                <div class="invite h-auto bg-white flex flex-col  items-center p-4  overflow-y-scroll">
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
            <div class="px-10 text-xl font-bold">
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

                    <SocialPageWorkCard></SocialPageWorkCard>
                    <SocialPageWorkCard></SocialPageWorkCard>
                    <SocialPageWorkCard></SocialPageWorkCard>
                    <SocialPageWorkCard></SocialPageWorkCard>
                </div>
            </div>
        </div>


        <!-- ? Review -->
        <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
            評論
        </div>
        <div class="flex flex-col justify-between mt-4">
            <button @click="toggleModal()"
                class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                撰寫評論
            </button>
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
        </div>
    </div>
</template>






<style scoped>
.expense {
    width: 40rem;
}

.ratings {
    /*調整字體大小可放大縮小星星*/
    font-size: 48px;
    text-shadow: 0px 1px 0 #999;
}

.full_star {
    width: 40%;
    /*調整寬度可變更星等*/
    left: 0;
    top: 0;
    overflow: hidden;
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
</style>