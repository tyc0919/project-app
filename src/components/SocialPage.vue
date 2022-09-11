<script setup>
import Invite from "./invite.vue"
import SocialPageReviewCard from "./SocialPageReviewCard.vue"
import SocialPageWorkCard from "./SocialPageWorkCard.vue"
import BarChart from "./BarChart.vue"
</script>

<template>

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
            <div class="flex flex-col ">
                <div class="title w-fit px-4 py-2 rounded-full bg-white text-2xl text-cyan-800 font-bold my-4">
                    預算支出
                </div>
                <div class="expense h-full">
                    <BarChart></BarChart>
                </div>
            </div>
            <!-- ? all works-->
            <div class="flex flex-col w-1/2 h-full">
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
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
            <SocialPageReviewCard></SocialPageReviewCard>
        </div>
    </div>








</template>






<style scoped>

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