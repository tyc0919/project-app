<script setup>
const props = defineProps({
    title: String,
    owner: String,
    rating: String,
    content: String,
    postTime: String,
    picturePath: String,
})
</script>
<template>
    <div class="mr-20 shadow card w-full bg-zinc-50 hover:border hover:border-gray-500 my-4">
        <div class="flex px-[10px] py-4">
            <!--貼文圖片-->
            <div class="w-1/5 mr-4 my-1">
                <img :src="props.picturePath" class="img-social" onerror="this.src='https://i.imgur.com/fAgK9sl.jpg'" />
            </div>
            <!--貼文圖片-->

            <!--貼文-->
            <div class="align-top h-full w-[70%]">
                <div class="font-bold text-2xl pb-4 underline">{{ title }}</div>
                <!--By作者、星級-->
                <div>
                    <div class="inline-flex text-sm pb-4 mr-2">By</div>
                    <div class="inline-flex text-sm italic mr-4  text-blue">{{ owner }}</div>
                    <div class="star_ratings mr-2">
                        <div class="empty_star">★★★★★</div>
                        <div :style="{ width: rating }" class="full_star absolute text-yellow-400">★★★★★</div>
                    </div>
                    <div class="inline-flex">{{ postTime.substring(0, 10) }}</div>
                </div>
                <!--By作者、星級-->

                <!--貼文內容-->
                <div class="post_content text-base overflow-hidden">
                    {{ content }}
                </div>
                <!--貼文內容-->
            </div>
            <!--貼文-->
        </div>
    </div>
</template>

<style scoped>
.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
    cursor: pointer;
}

.img-social {
    max-height: 15.625rem;
    width: 90%;
    margin: 0 auto;
}

.star_ratings {
    position: relative;
    display: inline-block;
    color: #ddd;
    /*背景星星顏色*/
    font-size: 20px;
    /*調整字體大小可放大縮小星星*/
    text-shadow: 0px 1px 0 #999;
}

.full_star {
    left: 0;
    top: 0;
    overflow: hidden;
}

.text-blue {
    color: rgb(60, 60, 240);
}

.cardBottom {
    border-color: #000000;
}

.card {
    border-radius: 20px;
    border-width: 1px;
}
</style>
