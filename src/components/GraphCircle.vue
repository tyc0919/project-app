<script setup>
let percentage = 90
let degree = percentage / 100 * 360
let transformDegree = degree / 2 + "deg"
console.log(transformDegree)

</script>


<template>
    <div class="circle-wrap">

        <div class="circle">
            <div class="mask half relative">
                <div :style="{ '--degree': transformDegree }" class="fill "></div>
            </div>

            <div class="inside-circle font-bold text-2xl bg-white absolute">
                {{ percentage }}%
            </div>

            <div class="mask full relative">
                <div :style="{ '--degree': transformDegree }" class="fill"></div>
            </div>
        </div>

    </div>
</template>


<style scoped>
body {
    background: #cee5f2;
}

.circle {
    z-index: 0;
    background-color: transparent;
}

.circle-wrap {
    --size: 150px;
    --half-size: calc(var(--size) / 2);
    --smaller: calc(var(--size) * 7 / 10);
    --margin: calc((var(--size) - var(--smaller)) /2);
    width: var(--size);
    height: var(--size);
    background: #cadcff;
    border-radius: 50%;
    border: 1px solid #b6b6b6;
}

.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
    width: var(--size);
    height: var(--size);
    position: absolute;
    border-radius: 50%;
}

.mask .fill {
    clip: rect(0px, var(--half-size), var(--size), 0px);
    background-color: #3056D3;
}

.circle-wrap .circle .mask {
    clip: rect(0px, var(--size), var(--size), var(--half-size));
}

.mask.full,
.circle .fill {
    animation: fill ease-in-out 3s forwards;
}

@keyframes fill {
    0% {
        transform: rotate(0deg);

    }

    100% {
        transform: rotate(var(--degree));
        position: absolute;
    }
}

.circle-wrap .inside-circle {
    width: var(--smaller);
    height: var(--smaller);
    line-height: var(--smaller);
    text-align: center;
    border-radius: 50%;
    color: #3056D3;
    z-index: 100;
    margin-top: var(--margin);
    margin-left: var(--margin);
}
</style>