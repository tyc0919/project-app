<script setup>
import SocialPost from './SocialPost.vue'
</script>

<template>
    <!--Component here-->
    <div class="h-full">
        <!--貼文、按鈕-->
        <div>
            <!--按鈕列-->
            <div class="ml-8 my-7 inline-flex flex items-center">
                <div>
                    <button class="py-1 px-4 border border-[#7a6d6d] bg-[#7a6d6d] text-white text-base font-medium">
                        全部
                    </button>
                    <button class="py-1 px-4 border border-[#7a6d6d] bg-[#95a2aa] text-white text-base font-medium">
                        我的
                    </button>
                    <button class="py-1 px-4 border border-[#7a6d6d] bg-[#95a2aa] text-white text-base font-medium">
                        其他
                    </button>
                </div>
            </div>
            <!--按鈕列-->

            <!--主要內容-->
            <SocialPost></SocialPost>
            <SocialPost></SocialPost>
            <SocialPost></SocialPost>
            <!--主要內容-->
        </div>
        <!--貼文、按鈕-->

        <!--換頁-->
        <div class="pagination">
            <ul>
                <li class="prev"><span>上一頁</span></li>
                <li class="number current"><span>1</span></li>
                <li class="number"><span>2</span></li>
                <li class="number"><span>3</span></li>
                <li class="dot"><span>...</span></li>
                <li class="number"><span>8</span></li>
                <li class="next"><span>下一頁</span></li>
            </ul>
        </div>

        <!--換頁-->
    </div>
    <!--Component here-->
</template>

<style>
.img-social {
    max-height: 15.625rem;
    width: 90%;
    margin: 0 auto;
}

.shadow-primary {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.star_ratings {
    position: relative;
    vertical-align: center;
    display: inline-block;
    color: #ddd; /*背景星星顏色*/
    font-size: 20px; /*調整字體大小可放大縮小星星*/
    text-shadow: 0px 1px 0 #999;
}
.full_star {
    width: 90%; /*調整寬度可變更星等*/
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    overflow: hidden;
    color: #ffce31; /*前景星星顏色*/
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
</style>
