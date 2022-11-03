<script setup>
import { ref, watch } from 'vue';
import { onMounted, onBeforeUpdate, onUpdated, onBeforeMount } from 'vue'
const props = defineProps({
    percentage: Number,
    left: String,
    right: String,
})
// 調整圖的大小(只要調整angle就可以控制寬高)
let angle = 160

// angle : size
let sizePower = 1.875
let size = angle * sizePower

// size : font
let fontPower = 0.16
let fontSize = size * fontPower

// 準備渲染至style (加上px)
angle = angle + "px"
size = size + "px"
fontSize = fontSize + "px"
</script>


<template>
    <div :style="{ '--size': size }" class="progress blue">
        <span :style="{ '--degree': props.left }" class="progress-left">
            <span :style="{ '--angle': angle }" class="progress-bar"></span>
        </span>
        <span :style="{ '--degree': props.right }" class=" progress-right">
            <span :style="{ '--angle': angle }" class="progress-bar"></span>
        </span>
        <div :style="{ '--fontSize': fontSize }" class=" progress-value font-bold">{{ props.percentage }}%</div>
    </div>
</template>


<style scoped>
/* 設定一般樣式 */

.progress {
    background: none;
    margin: 0 0;
    box-shadow: none;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    position: relative;
}

.progress:after {
    content: "";
    border-radius: 50%;
    border: 20px solid #cadcff;
    position: absolute;
    width: 100%;
    height: 100%;
}

.progress>span {
    position: absolute;
    top: 0;
    z-index: 1;
    width: 50%;
    height: 100%;
    overflow: hidden;
}

.progress .progress-left {
    left: 0;
}

.progress .progress-bar {
    border-width: 20px;
    border-style: solid;
    position: absolute;
    width: 100%;
    height: 100%;
    background: none;
    top: 0;
}

.progress .progress-left .progress-bar {
    left: 100%;
    border-top-right-radius: var(--angle);
    border-bottom-right-radius: var(--angle);
    border-left: 0;
    -webkit-transform-origin: center left;
    transform-origin: center left;
    animation: loading-2 1.5s linear forwards 1.8s;

}

.progress .progress-right {
    right: 0;
}

.progress .progress-right .progress-bar {
    left: -100%;
    -webkit-transform-origin: center right;
    transform-origin: center right;
    border-top-left-radius: var(--angle);
    border-bottom-left-radius: var(--angle);
    border-right: 0;
    animation: loading-1 1.8s linear forwards;
}

/* 內容文字 */
.progress .progress-value {
    font-size: var(--fontSize);
    color: #3056D3;
    text-align: center;
    width: 100%;
    height: 100%;
    position: absolute;
}


/* animation */
@keyframes loading-1 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: var(--degree);
        transform: var(--degree);
    }
}

@keyframes loading-2 {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: var(--degree);
        transform: var(--degree);
    }
}


/* color */
.progress.blue .progress-bar {
    border-color: #3056D3;
}
</style>