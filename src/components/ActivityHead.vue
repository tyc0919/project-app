<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const showModal = ref(false)
const showModal2 = ref(false)

const toggleModal = () => {
    showModal.value = !showModal.value
}

const toggleModal2 = () => {
    showModal2.value = !showModal2.value
}


const modalContent = ref('測試內容')

</script>

<template>
    <!--FirstPart Start-->
    <div class="content bg-[CEE5F2]">
        <div class="w-full flex">
            <div class="w-2/3 m-1.5 ">
                <img src="../assets/images/FirstPart.png" class="event_main_img">

                <form action="">
                    <div class="flex justify-around w-full">
                        <div class="button hover">
                            <input type="button" value="新增活動">
                        </div>
                        <div class="button hover" @click="toggleModal()">
                            <input type="button" value="編輯活動">
                        </div>
                        <div class="button hover" @click="toggleModal2()">
                            <input type="button" value="刪除活動">
                        </div>
                    </div>
                </form>

            </div>

            <div class="w-1/3 border-solid border border-black m-1.5 mr-10 bg-white relative">
                <p class="text-base2x m-1.5 text-[696969]">活動標題</p>
                <p class="text-base m-1.5 text-[696969]">提案人 <span class="text-blue">提案人</span></p>
                <p class="text-base m-1.5 text-[696969] overflow-y intro2">
                    簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介
                </p>
                <div class="absolute bottom-down w-full">
                    <hr class="m-1.5 border-3">
                    <p class="text-base m-1.5 text-[696969]">建立日期 2022/07/08 12:00</p>
                    <p class="text-base m-1.5 text-[696969]">活動地點 台北市</p>
                </div>

            </div>
        </div>
    </div>
    <!--FirstPart End-->

    <!-- test block start -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">編輯活動</div>
                </div>
            </template>
            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">活動名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="原本的活動名稱">
                        <div class="text-base font-bold">活動運算</div>
                        <div class="flex items-center justify-start space-x-3">
                            <span class="italic font-bold">$</span>
                            <input type="number" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                                placeholder="原本的活動運算">
                        </div>

                        <div class="text-base font-bold">活動圖片</div>
                        <input type="file">
                        <div class="text-base font-bold ">活動簡介</div>
                        <textarea class="text-base font-bold border border-2 border-slate-400 w-full"
                            placeholder="原本的活動簡介"></textarea>

                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="toggleModal()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    更改
                </button>
                <button @click="toggleModal()"
                    class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal2" @close="toggleModal2()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>
            <template #body>
                你確定要刪除此活動嗎，按下確定後就不能返回了
            </template>
            <template #footer>
                <button @click="toggleModal2()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal2()"
                    class="py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- test block end -->
</template>

<style scoped>
/*First Start */
.bg-\[696969\] {
    background-color: #696969;
}

.w-2\/3 {
    width: 66.666667%;
}

.w-1\/3 {
    width: 33.333333%;
}

.text-base2x {
    font-size: 2rem;
    line-height: 2.5rem;
}

.text-base075 {
    font-size: 0.75rem;
    line-height: 1.25rem;
}

.text-\[696969\] {
    color: #696969;
}

.text-blue {
    color: blue;
}

.text-red {
    color: #FF0000
}

.p-1\.5 {
    padding: 1.5rem;
}

.m-1\.5 {
    margin: 1.5rem;
}

.mr-10 {
    margin-right: 2.5rem;
}

.border-3 {
    border-width: 3px;
}

.border-solid {
    border-style: solid;
}

.border-red {
    border-color: #FF0000;
}

.justify-around {
    justify-content: space-around;
}

.overflow-y {
    overflow-y: auto;
}

.event_main_img {
    height: 500px;
    width: 85%;
    margin: 0 auto;
}

.button {
    width: 250px;
    height: 45px;
    line-height: 45px;
    background-color: #1D5E9F;
    margin: 1.5rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hover:hover {
    background-color: white;
    color: #1D5E9F;
}

.hover:nth-of-type(3):hover{
    background-color: #FF0000;
    color: white;

}

.button:nth-of-type(3) {
    background-color: #FEEBD7;
    color: #FF0000;
    border: 1px solid #FF0000;
}

.bottom-down {
    bottom: 0;
}

.intro {
    max-height: 600px;
}

.intro2 {
    height: 300px;
}



/*First End */
</style>