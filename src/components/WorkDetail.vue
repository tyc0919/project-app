<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}

let mode = ref(null)

const deleteWorkDetail = () => {
    mode.value = 2
    toggleModal()
}
</script>
<template>
    <div>
        <!--確認完成-->
        <div class="w-full flex border border-[#3491d9] my-[20px]">
            <div
                class="flex w-[8.3%] py-14 bg-[#00db00] items-center justify-center text-white border-r-3 border-black"
            >
                確認完成
            </div>
            <div class="w-[calc(100%-8.3%)]">
                <div class="border-b border-black">
                    <div class="w-2/4 inline-flex font-bold align-middle">
                        看到著就嗚嗚嗚好的大概：如果我人不，已經不入了是對。
                    </div>
                    <div class="w-2/4 inline-flex justify-end align-middle my-1">
                        <button
                            class="rounded-lg border-w-3 border-[#3491d9] font-bold text-base text-[#3491d9] py-0 px-3 shadow-btn"
                        >
                            編輯
                        </button>
                        <button
                            class="mx-4 rounded-lg border-w-3 border-[#ff0000] font-bold text-base text-[#ff0000] py-0 px-3 shadow-btn"
                            @click="deleteWorkDetail()"
                        >
                            刪除
                        </button>
                    </div>
                </div>
                <div class="text-[#696969]">
                    看到著就嗚嗚嗚好的大概：如果我人不，已經不入了是對。
                    得有整可以可發現，剛是在因為你們的開心，這次的想起來像有這不真的很的內容，你嗚根本是的很棒，我自己出不常也不是：嗎多少⋯所有就怎麼要來吸血鬼，看到的開始麼的手賣場，這件事覺得看了好。愛了的影片麼時可以，貨久不見消失，多少獲得畫好自己都，苦了也不知為不甚至望公忙，或陌生跳今天還⋯哈哈了第時交換卡。沒辦法後會要求問男友，送也不嫌東西展開，這不是他們家家長，好可愛看不，馬上很開心太好看，看的消是跟為什教會。
                </div>
            </div>
        </div>
        <!--確認完成-->

        <!--取消確認-->
        <div class="w-full flex border border-[#00db00] my-[20px]">
            <div
                class="flex w-[8.3%] py-14 bg-[#ff0000] items-center justify-center text-white border-r-3 border-black"
            >
                取消確認
            </div>
            <div class="w-[calc(100%-8.3%)]">
                <div class="border-b border-black">
                    <div class="w-2/4 inline-flex font-bold align-middle">
                        看到著就嗚嗚嗚好的大概：如果我人不，已經不入了是對。
                    </div>
                    <div class="w-2/4 inline-flex justify-end align-middle my-1">
                        <button
                            class="rounded-lg border-w-3 border-[#3491d9] font-bold text-base text-[#3491d9] py-0 px-3 shadow-btn"
                        >
                            編輯
                        </button>
                        <button
                            class="mx-4 rounded-lg border-w-3 border-[#ff0000] font-bold text-base text-[#ff0000] py-0 px-3 shadow-btn"
                            @click="deleteWorkDetail()"
                        >
                            刪除
                        </button>
                    </div>
                </div>
                <div class="text-[#696969]">
                    看到著就嗚嗚嗚好的大概：如果我人不，已經不入了是對。
                    得有整可以可發現，剛是在因為你們的開心，這次的想起來像有這不真的很的內容，你嗚根本是的很棒，我自己出不常也不是：嗎多少⋯所有就怎麼要來吸血鬼，看到的開始麼的手賣場，這件事覺得看了好。愛了的影片麼時可以，貨久不見消失，多少獲得畫好自己都，苦了也不知為不甚至望公忙，或陌生跳今天還⋯哈哈了第時交換卡。沒辦法後會要求問男友，送也不嫌東西展開，這不是他們家家長，好可愛看不，馬上很開心太好看，看的消是跟為什教會。
                </div>
            </div>
        </div>
        <!--取消確認-->
        <Teleport to="body">
            <modal :show="showModal" @close="toggleModal()">
                <template #header>
                    <div v-if="mode === 2"><h3>刪除工作細項</h3></div>
                </template>
                <template #body>
                    <form class="flex flex-col">
                        <div class="flex flex-col">確定要刪除嗎？</div>
                    </form>
                </template>
                <template #footer>
                    <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md">確認</button>
                    <button class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md" @click="toggleModal()">
                        取消
                    </button>
                </template>
            </modal>
        </Teleport>
    </div>
</template>
