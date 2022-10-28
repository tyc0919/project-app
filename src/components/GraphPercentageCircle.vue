<script setup>

// 把percent render到 percentage裡
let percentage = 70
let degree = 360 * percentage / 100

// 重設左右半圓的初值
let rightDegree = "rotate(0deg)"
let leftDegree = "rotate(0deg)"

// 設定左右半圓的比率
if (degree < 180) {
    rightDegree = "rotate(" + degree + "deg)"
    leftDegree = "rotate(" + 0 + "deg)"
} else {
    rightDegree = "rotate(" + 180 + "deg)"
    leftDegree = "rotate(" + (degree - 180) + "deg)"
}


// 預設角度(只要調整這個就可以控制寬高)
let angle = 160

// 變動寬高
let sizePower = 1.875
let size = angle * sizePower

// 變動font size
let fontPower = 0.16
let fontSize = size * fontPower

// 準備渲染至style (加上px)
angle = angle + "px"
size = size + "px"
fontSize = fontSize + "px"


</script>


<template>
    <div :style="{ '--size': size }" class="progress blue">
        <span :style="{ '--degree': leftDegree }" class="progress-left">
            <span :style="{ '--angle': angle }" class="progress-bar"></span>
        </span>
        <span :style="{ '--degree': rightDegree }" class=" progress-right">
            <span :style="{ '--angle': angle }" class="progress-bar"></span>
        </span>
        <div :style="{ '--fontSize': fontSize }" class=" progress-value font-bold">{{ percentage }}%</div>
    </div>
</template>


<style scoped>
/* 設定一般樣式 */
.progress {
    background: none;
    margin: 0 auto;
    box-shadow: none;
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    position: relative;
}

.progress:after {
    content: "";
    border-radius: 50%;
    border: 10px solid #f2f5f5;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
    border-width: 10px;
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
    border-color: #26abfd;
}
</style>