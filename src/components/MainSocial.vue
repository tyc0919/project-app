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
                    <button class="py-1 px-4 border border-[7a6d6d] bg-[7a6d6d] text-white text-base font-medium">
                        全部
                    </button>
                    <button class="py-1 px-4 border border-[7a6d6d] bg-[95a2aa] text-white text-base font-medium">
                        我的
                    </button>
                    <button class="py-1 px-4 border border-[7a6d6d] bg-[95a2aa] text-white text-base font-medium">
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
.bg-\[7a6d6d\] {
    background-color: #7a6d6d;
}
.bg-\[95a2aa\] {
    background-color: #95a2aa;
}
.bg-\[fafafa\] {
    background-color: #fafafa;
}
.bg-\[dbd8d4\] {
    background-color: #dbd8d4;
}

.border-\[7a6d6d\] {
    border-color: #7a6d6d;
}

.text-blue {
    color: #1d5e9f;
}
.text-gray {
    color: #8a8080;
}
.text-right {
    text-align: right;
}
.text-underline {
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
}

.w-20 {
    width: 20%;
}
.w-70 {
    width: 70%;
}

.social-img {
    max-height: 250px;
    width: 90%;
    margin: 0 auto;
}

.shadow-box {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.ratings {
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

.content-box {
    display: block;
    max-height: 9rem;
    overflow: hidden;
}

.pagination {
    display: flex;
    justify-content: center;
}

.pagination ul {
    display: inline-flex;
    background-color: #fff;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
.pagination ul li {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-width: 1px 1px 1px 1px;
    border-color: #929eaa;
    margin: -1px -1px 0 0;
    cursor: pointer;
}
.pagination ul li.dot {
    cursor: default;
}
.pagination ul li.current {
    background-color: #dbd8d4;
}

.moreContent {
    padding-right: 2rem;
    padding-bottom: 0.25rem;
}
</style>
