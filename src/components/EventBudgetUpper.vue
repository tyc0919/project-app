<script setup>
import EventBudgetFile from './EventBudgetFile.vue';

</script>

<template>

    <div class="p-1 border-b mx-12 border-black">
        <!-- budget box start -->
        <div class="flex justify-around mt-8 mb-16">
            <div class="bg-green-400 flex flex-col items-center p-2 rounded shadow-md">
                <p class="m-2 text-center">預算</p>
                <p class="mb-2 text-2xl w-56 text-center">$ 100,000</p>
            </div>
            <div class="bg-red-400 flex flex-col items-center p-2 rounded shadow-md">
                <p class="m-2 text-center">支出</p>
                <p class="mb-2 text-2xl w-56 text-center">$ 75,466</p>
            </div>
        </div>
        <div class="flex justify-center w-full mb-8 ">
            <input type="number" class="w-1/3 mr-4" />
            <button class="bg-sky-700 text-white px-4 py-2 rounded shadow-md">預算更新</button>
        </div>

        <!-- budget box end -->

        <!-- analysis start -->
        <!-- analysis end -->
    </div>
    <div class="p-1 my-8 mx-12 flex items-center">
        <canvas id="BudgetCanva" class="w-1/2">
            圖表放置處
        </canvas>
        <div class="w-1/2 pt-4 pb-4 bg-white h-96 rounded-lg shadow-md flex flex-col">
            <button class="w-auto border-sky-700 border mx-8 mb-4 rounded text-sky-700"> 上傳</button>
            <div class="overflow-y-auto">
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
                <EventBudgetFile />
            </div>

        </div>
    </div>
</template>

<style scoped>
</style>