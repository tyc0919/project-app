<script setup>
import { ref } from 'vue';
import historyRecord from "./historyRecord.vue";
import EventBudgetUpper from "./EventBudgetUpper.vue";
import EventBudgetFile from './EventBudgetFile.vue';
const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
const modalContent = ref('測試內容')
</script>

<template>
    <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->

    <!-- ? from EventBudgetUpper -->
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
            <button class="bg-sky-700 text-white px-4 py-2 rounded shadow-md" @click="toggleModal()">預算更新</button>
        </div>

        <!-- budget box end -->


        <!-- test block start -->
        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="toggleModal()">
                <template #header>
                    <h3>自訂標題</h3>
                </template>
                <template #body>
                    {{modalContent}}
                </template>
                <template #footer>
                    <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md">確認</button>
                    <button class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md"
                        @click="toggleModal()">取消</button>
                </template>
            </modal>
        </Teleport>
        <!-- test block end -->


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








    <!-- ? historyRecord -->
    <h1>歷史記載</h1>
    <div class="wrapper">
        <div class="normal-row">
            <div class="expense normal-square text-xl">支出金額</div>
            <div class="represent normal-square text-xl">報銷人員</div>
            <div class="work-name normal-square text-xl">工作名稱</div>
            <div class="upload-time normal-square text-xl">上傳日期</div>
        </div>
        <hr>
        <div class="normal-row">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">1235454</div>
            </div>
            <div class="represent normal-square text-xl">陳莉莉</div>
            <div class="work-name normal-square text-xl">場地安排</div>
            <div class="upload-time normal-square text-xl">2011-08-12</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">1235454</div>
            </div>
            <div class="represent normal-square text-xl">黃紫紅</div>
            <div class="work-name normal-square text-xl">交通</div>
            <div class="upload-time normal-square text-xl">2011-08-10</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">1235454</div>
            </div>
            <div class="represent normal-square text-xl">Alice</div>
            <div class="work-name normal-square text-xl">food</div>
            <div class="upload-time normal-square text-xl">2012-01-01</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl flex">
                <div class="flex-1 text-left pl-10">$</div>
                <div class="flex-2 pr-10 truncate">1235454</div>
            </div>
            <div class="represent normal-square text-xl">Bob</div>
            <div class="work-name normal-square text-xl">djiojei....</div>
            <div class="upload-time normal-square text-xl">2008-09-08</div>
        </div>
    </div>


</template>

<style scoped>
h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-left: 2.75rem;
    font-weight: 900;
}

hr {
    border: 1.5px solid #ACA0A0;
    margin: 0 1rem;
}

.wrapper {
    width: 95%;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 1rem 0;
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.normal-row {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
}

.normal-square {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
    border-radius: 50px;
}

.expense {
    color: #FF3A3A;
    background: #FEEBD7;
    border-color: #FF0000;
}

.represent {
    color: #FFFFFF;
    background: #1D5E9F;
    border-color: #4C8DBA;
}

.work-name {
    color: #FFFFFF;
    background: #00315F;
    border-color: #165179;
}

.upload-time {
    color: #000000;
    background: #D9D9D9;
    border-color: #919395;
}
</style>