<script setup>
import WorkDetail from './WorkDetail.vue'
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}

let mode = ref(null)
const addNewWorkDetail = () => {
    mode.value = 1
    toggleModal()
}
const deleteWorkDetail = () => {
    mode.value = 2
    toggleModal()
}
const deleteWork = () => {
    mode.value = 3
    toggleModal()
}
</script>

<template>
    <!--Component here-->
    <div class="w-4/5">
        <!--功能列-->
        <div class="w-[94%] ml-8 py-[10px] inline-flex flex-wrap items-center">
            <!--全部、未完成、完成狀態-->
            <div>
                <button class="py-1 px-4 border border-[#7a6d6d] text-white text-base bg-[#5b83ac] font-medium">
                    全部
                </button>
                <button class="py-1 px-4 border border-[#7a6d6d] text-white text-base bg-[#5b83ac] font-medium">
                    未完成
                </button>
                <button class="py-1 px-4 border border-[#7a6d6d] bg-[#5b83ac] text-white text-base font-medium">
                    完成
                </button>
            </div>
            <!--全部、未完成、完成狀態-->

            <!--搜尋欄-->
            <form class="mx-auto">
                <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="search"
                        class="block p-search text-sm bg-gray-50 border border-gray-300 focus:shadow-inner"
                        placeholder="搜尋工作"
                        required
                    />
                </div>
            </form>
            <!--搜尋欄-->

            <!--編輯、刪除工作，關閉分頁-->
            <div>
                <button
                    class="py-3 px-1 border-w-3 rounded-lg text-base font-bold border-[#3491d9] bg-white text-[#3491d9] shadow-btn"
                >
                    編輯工作
                </button>
                <button
                    class="mx-2 py-3 px-1 border-w-3 rounded-lg text-base font-bold bg-white border-[#ff0000] text-[#ff0000] shadow-btn"
                    @click="deleteWork()"
                >
                    刪除工作
                </button>
                <button
                    class="py-3 px-1 border-w-3 rounded-lg text-base font-bold bg-white border-[#ff0000] text-[#ff0000] shadow-btn"
                >
                    關閉分頁
                </button>
            </div>
            <!--編輯、刪除工作，關閉分頁-->
        </div>
        <!--功能列-->

        <!--主要內容-->
        <div class="px-4 mx-4">
            <div class="bg-white relative px-[10px] pt-[10px] pb-[60px]">
                <div class="w-full pb-[10px] flex">
                    <!--預算-->
                    <div class="w-6/12 inline-flex flex-row items-center">
                        <div class="text-[#696969] font-bold">預算</div>

                        <div class="ml-4 font-bold">$9999</div>
                        /
                        <div class="font-bold">$99999</div>
                        <div class="mx-4 text-[#696969] font-bold">剩餘</div>
                        <div class="text-[#00db00] font-bold">$90000</div>
                    </div>
                    <!--預算-->

                    <!--負責人-->
                    <div class="w-2/4 inline-flex justify-end pr-[20px] items-center">
                        <div class="circle mr-2 border"></div>
                        <div class="mr-4">負責人</div>
                        <div class="text-[#3491d9]">黃宏成台灣阿成世界偉人財神總統</div>
                    </div>
                    <!--負責人-->
                </div>

                <!--工作標題、工作簡介說明-->
                <div class="w-full bg-[#D9D9D9] text-center font-bold py-[30px] mb-2">
                    怎麼辦次都不用的耳⋯幾次另一，用這次就放已經天我⋯就在誕老觀應該起是最那邊的⋯超喜歡很適合現自己世界，超都會。小說一。
                </div>
                <div class="w-full bg-[#D9D9D9] pb-[150px] mb-2 text-sm text-[#696969] font-bold">
                    看到著就嗚嗚嗚好的大概：如果我人不，已經不入了是對。
                    得有整可以可發現，剛是在因為你們的開心，這次的想起來像有這不真的很的內容，你嗚根本是的很棒，我自己出不常也不是：嗎多少⋯所有就怎麼要來吸血鬼，看到的開始麼的手賣場，這件事覺得看了好。愛了的影片麼時可以，貨久不見消失，多少獲得畫好自己都，苦了也不知為不甚至望公忙，或陌生跳今天還⋯哈哈了第時交換卡。沒辦法後會要求問男友，送也不嫌東西展開，這不是他們家家長，好可愛看不，馬上很開心太好看，看的消是跟為什教會。怎麼辦次都不用的耳⋯幾次另一，用這次就放已經天我⋯就在誕老觀應該起是最那邊的⋯超喜歡很適合現自己世界，超都會。台北⋯某我記得用進如果⋯到不，希望看然後每天哈哈是那的創作出口，讓他的只不是怎麼就說都不會。肚子無的超好這麼我我，還真的會不會妙放一定是時間，一切直接我真的，些我真的每個稍微也有問題人要可能是，到其生日快。的學生是我，爸爸等我不麼我真的覺的要，可以給⋯過還小說一。了那有一次傷都不是，起舊類沒錯就真的嗚嗚場次，會看到⋯開始樣一他們會，都三啊啊精神麼一十分，被因為有就是那慢慢。
                    得他不覺，感覺我都到那個，意間，可以嗎聊天的，原來覺喜歡我果可以的比較：敏感完線上的劇情也謝家都。看他這樣想，性的，後還真的都可類的黃看看，由通常不一拍照並且，不過還跟了好幾看了線上⋯不用他已經們好那種我的。到了我也給我的準備現在有，會一直回家世界的內的知道自。不喜給沒了謝體建議，的女人欸謝，要不真的我以居然的態度就是現疾。
                    我應該那麼久全一份嗚嗚嗚。
                    起哈哈哈適合還真。打這阿回報町田打算⋯到時候不認是玩到一個，天的時候有⋯一堆的視看過。表情的時有人自己的喜歡一們在，錢狀況次都在同，來才他人所以也不太什麼動了嗚嗚，舊想一經在：意思重要的如何太有有打
                </div>
                <!--工作標題、工作簡介說明-->

                <!--新增細項、完成、取消完成-->
                <div>
                    <button
                        class="w-full items-center bg-white rounded-lg border-w-3 border-[#3491d9] py-[10px] text-[#3491d9] shadow-btn mb-[20px]"
                        @click="addNewWorkDetail()"
                    >
                        新增細項 +
                    </button>
                    <button
                        class="w-full items-center bg-[#1d5e9f] rounded-lg border-w-3 border-[#006eaf] py-[10px] text-white shadow-btn mb-[20px]"
                    >
                        完成
                    </button>
                    <button
                        class="w-full items-center bg-[#ffcccc] rounded-lg border-w-3 border-[#ff0000] py-[10px] text-[#ff0000] shadow-btn"
                    >
                        取消完成
                    </button>
                </div>

                <!--新增細項、完成、取消完成-->

                <!--工作細項-->
                <WorkDetail></WorkDetail>
                <!--工作細項-->

                <!-- 彈出視窗 -->

                <!-- 新增工作細項 -->.

                <Teleport to="body">
                    <modal :show="showModal" @close="toggleModal()">
                        <template #header>
                            <div v-if="mode === 1"><h3>新增工作細項</h3></div>
                            <div v-else-if="mode === 3"><h3>刪除工作</h3></div>
                        </template>
                        <template #body>
                            <form class="flex flex-col">
                                <div v-if="mode === 1" class="flex flex-col">
                                    <input type="text" class="border mb-2" placeholder="工作細項標題" />
                                    <textarea rows="5" class="border" placeholder="工作細項內容"></textarea>
                                </div>
                                <div v-else class="flex flex-col">確定要刪除嗎？</div>
                            </form>
                        </template>
                        <template #footer>
                            <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md">確認</button>
                            <button
                                class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md"
                                @click="toggleModal()"
                            >
                                取消
                            </button>
                        </template>
                    </modal>
                </Teleport>

                <!-- 彈出視窗 -->
            </div>
        </div>
        <!--主要內容-->
    </div>
    <!--Component here-->
</template>

<style>
.border-r-3 {
    border-right-width: 3px;
}

.border-w-3 {
    border-width: 3px;
}
.circle {
    height: 1.875rem;
    width: 1.875rem;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    border-color: rgb(0, 0, 0);
}

.focus\:shadow-inner:focus {
    box-shadow: inset 0 5px 9px 0 rgb(157 157 157);
}
.shadow-btn {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.p-search {
    padding: 0.3rem 0.3rem 0.3rem 2.5rem;
}
</style>
