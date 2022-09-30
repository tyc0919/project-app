<script setup>
import SocialPost from './SocialPost.vue'
</script>

<template>
    <!--Component here-->
    <div class="h-full">
        <!--貼文、按鈕-->
        <div class="px-8 py-8">
            <!--按鈕列-->
            <div id="options" class="inline-flex justify-between items-center my-4 w-full">
                <div class="inline-flex justify-around">
                    <div id="radios">
                        <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" checked />
                        <label class="radioLable text-base" for="radio1">完成</label>
                        <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                        <label class="radioLable text-base" for="radio2">未完成</label>
                        <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" />
                        <label class="radioLable text-base" for="radio3">全部</label>
                    </div>
                </div>

                <div id="optionsRight" class="flex justify-end align-center">
                    <button
                        @click="toggleModal()"
                        class="btnCreateEvent bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                        新增活動
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

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5b83ac;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked + .radioLable {
    background: #52708f;
}
</style>
