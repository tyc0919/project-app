<script setup>
const props = defineProps({
    title: String,
    owner: String,
    rating: String,
    content: String,
})
let star = props.rating
</script>
<template>
    <div class="mr-20 shadow-primary my-4">
        <div class="w-full bg-zinc-50">
            <div class="flex px-[10px] pt-[10px]">
                <!--貼文圖片-->
                <div class="w-1/5 mr-4 my-1">
                    <img
                        src="../assets/images/FirstPart.png"
                        class="img-social"
                        onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';this.onerror=null ;"
                    />
                </div>
                <!--貼文圖片-->

                <!--貼文-->
                <div class="align-top h-full w-[70%]">
                    <div class="font-bold text-xl pb-4 underline">{{ title }}</div>
                    <!--By作者、星級-->
                    <div>
                        <div class="inline-flex text-sm pb-4 mr-4">By</div>
                        <div class="inline-flex text-sm italic mr-4 text-blue">{{ owner }}</div>
                        <div class="star_ratings">
                            <div>★★★★★</div>
                            <div :style="{ width: star }" class="full_star">★★★★★</div>
                        </div>
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
    </div>
</template>

<style scoped>
.img-social {
    max-height: 15.625rem;
    width: 90%;
    margin: 0 auto;
}
.star_ratings {
    position: relative;
    display: inline-block;
    color: #ddd; /*背景星星顏色*/
    font-size: 20px; /*調整字體大小可放大縮小星星*/
    text-shadow: 0px 1px 0 #999;
}
.full_star {
    width: 10%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    color: #ffce31; /*前景星星顏色*/
}
.text-blue {
    color: rgb(60, 60, 240);
}
</style>
