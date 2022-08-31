<script setup>
import { ref } from 'vue';
import MainDeFaultCard from './MainDefaultCard.vue';
import Modal from './Modal.vue';

const modalProps = ref({
    "buttonsTrigger": true
})

</script>


<template>
    <Modal :show="modalProps.buttonsTrigger">
        <template v-slot:header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">新增活動</div>
            </div>

        </template>

        <template v-slot:body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">活動名稱</div>
                    <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動">
                    <div class="text-base font-bold">活動預算</div>
                    <div class="flex items-center justify-start space-x-3">
                        <span class="italic font-bold">$</span>
                        <input type="number" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="10000">
                    </div>

                    <div class="text-base font-bold">活動圖片</div>
                    <input type="file">
                    <div class="text-base font-bold ">活動簡介</div>
                    <textarea class="text-base font-bold border border-2 border-slate-400 w-full"
                        placeholder="這次的活動，我們將要帶領大家..."></textarea>

                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button @click="modalProps.buttonsTrigger = false"
                class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                新增
            </button>
            <button @click="modalProps.buttonsTrigger = false"
                class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                取消
            </button>
        </template>
    </Modal>

    <!-- content -->
    <!-- <Modal show=true></Modal> -->

    <div class="contain er w-full px-8 py-8">
        <!-- options -->
        <div id="options" class="inline-flex justify-between items-center my-4 w-full ">
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
                <button @click="modalProps.buttonsTrigger = true"
                    class="btnCreateEvent bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    新增活動
                </button>
            </div>
        </div>


        <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
            <!-- cards -->
            <MainDeFaultCard tracePercentage=100 costMoney=300000 budgetMoney=987541></MainDeFaultCard>
            <MainDeFaultCard tracePercentage=40 costMoney=800000 budgetMoney=987541></MainDeFaultCard>
            <MainDeFaultCard tracePercentage=60 costMoney=1000000 budgetMoney=987541></MainDeFaultCard>
            <MainDeFaultCard tracePercentage=80 costMoney=200000 budgetMoney=987541></MainDeFaultCard>
            <MainDeFaultCard tracePercentage=20 costMoney=900000 budgetMoney=987541></MainDeFaultCard>
            <!-- cards end -->
        </div>


    </div>
</template>



<style scoped>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}


::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5B83AC;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}

.btnCreateEvent {
    border-color: #2b6cb0;
    color: #2b6cb0;
}

.btnCreateEvent:hover {
    background-color: #2b6cb0;
    color: #ffffff;
}

.shadow-out {
    box-shadow: 2px 2px 3px 1px rgb(157 157 157);
}

.shadow-inset {
    box-shadow: inset 4px 4px 4px 0 rgb(157 157 157);
}

.shadow {
    box-shadow: 10px 10px 10px 4px rgb(0 0 0 / 10%);
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

.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all .2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
    cursor: pointer;
}

.text-blue {
    color: rgb(60, 60, 240)
}

.cardBottom {
    border-color: #000000
}

.pic {
    border: 1px solid #000000;
    height: 8rem;
}

.container {
    height: 100%;
}

.grid-gap-1rem {
    grid-row-gap: 3rem;
    grid-column-gap: 3rem;
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5B83AC;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}
</style>



