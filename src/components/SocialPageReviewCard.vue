<script setup>
import { ref } from 'vue'

let show = ref(false)
let triggerMessage = ref('全文')
const showCompleteContent = () => {
    show.value = !show.value
    triggerMessage.value = !show.value ? '全文' : '顯示部分'
}

const props = defineProps({
    reviewer: String,
    content: String,
    rating: String,
    date: String,
})
let star = props.rating
</script>

<template>
    <div class="shadow bg-white flex flex-col px-4 py-4 my-2 justify-start items-center hover:card-float-up">
        <div class="review-card w-full h-fit">
            <div class="reviewer flex justify-start items-center mb-2">
                <div class="reviewer-img mr-2"></div>
                <div class="reviewer-name text-xl cursor-text">{{ reviewer }}</div>
            </div>
            <div class="flex justify-start items-end mb-2">
                <!-- ! stars -->
                <div class="ratings relative mr-2 text-gray-200 text-2xl">
                    <div class="empty_star">★★★★★</div>
                    <div :style="{ width: star }" class="full_star absolute text-yellow-400">★★★★★</div>
                </div>
                <!-- ! stars -->
                <div class="review-time text-xl font text-gray-400 cursor-text">
                    {{ date.substring(0, 10) + '　' + date.substring(11, 19) }}
                </div>
            </div>

            <div class="review-content text-base font-bold">
                <span class="content-container cursor-text" :class="{ 'ellipsis-4': !show }">
                    {{ content }}
                </span>
                <div
                    @click="showCompleteContent()"
                    class="trigger-complete-content font-bold text-blue-500 hover:underline my-2"
                >
                    {{ triggerMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ratings {
    /*調整字體大小可放大縮小星星*/
    text-shadow: 0px 1px 0 #999;
}

.full_star {
    width: 10%;
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

.hover\:underline:hover {
    text-decoration: underline;
}

.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
}
</style>
