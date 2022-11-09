<script setup>
import {onBeforeMount, ref,onUpdated} from 'vue'
const props = defineProps({
    name: String,
    owner: String,
    tracePercentage: Number,
    costMoney: Number,
    budgetMoney: Number,
})

</script>

<template>
    <!-- card1 -->
    <div
        class="shadow bg-white flex flex-col justify-between px-4 py-8 card align-start hover:border hover:border-gray-500"
    >
        <div>
            <div class="cardTop mb-8">
                <div class="mb-2 text-center flex flex-col justify-start items-center">
                    <img class="h-64 w-96" src="src\assets\images\FirstPart.png" />
                </div>
                <div class="text-2xl font-bold title ellipsis-2">{{ name }}</div>
                <div class="inline-flex justify-start w-full text-sm italic person">
                    <span class="">By</span>
                    <span class="ml-2 person-name text-blue font-bold ellipsis">{{ owner }} </span>
                </div>
            </div>

            <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start">
                <div class="relative h-fit w-full rounded-full mb-2 bg-slate-300 shadow-inset py-1 px-1">
                    <div
                        class="absolute text-black font-bold text-sm h-8 w-full px-4 flex items-center justify-between"
                    >
                        <span class="ellipsis">完成進度</span>
                        <span class="trace-percentage">{{ tracePercentage }}%</span>
                    </div>
                    <div :style="{width: props.tracePercentage + '%'}" class="trace-container bg-[#3056d3] rounded-full h-8 w-0  px-4"></div>
                </div>

                <div class="relative h-fit w-full rounded-full bg-slate-300 shadow-inset py-1 px-1">
                    <div
                        class="absolute text-black font-bold h-8 w-full flex items-center justify-between px-4 text-sm"
                    >
                        <span class="ellipsis">預算花費</span>
                        <div>
                            <span class="cost ml-1">${{ costMoney }}</span>
                            <span class="ml-1">/</span>
                            <span class="budget ml-1">${{ budgetMoney }}</span>
                        </div>
                    </div>
                    <div
                        class="cost-container rounded-full h-8 w-0 flex items-center justify-between px-4 text-sm"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transition-delay: 0s;
    cursor: pointer;
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-2 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.text-blue {
    color: rgb(60, 60, 240);
}

.cardBottom {
    border-color: #000000;
}

.pic {
    border: 1px solid #000000;
    height: 8rem;
}

.container {
    height: 100%;
}

.card {
    border-radius: 20px;
    border-width: 1px;
}



</style>
