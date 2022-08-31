<script setup>
import { ref } from 'vue';
import FileSection from './FileSection.vue';
import Modal from './Modal.vue';

const modalProps = ref({
    "buttonsTrigger": true
})
</script>

<template>

    <Modal show="true">
        <template v-slot:header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">新增工作</div>
            </div>
        </template>

        <template v-slot:body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">工作名稱</div>
                    <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動">
                    <div class="text-base font-bold">工作日期</div>
                    <input type="date" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動">
                    <div class="text-base font-bold">分配工作預算</div>
                    <div class="flex items-center justify-start space-x-3">
                        <span class="italic font-bold">$</span>
                        <input type="number" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="10000">
                    </div>

                    <div class="text-base font-bold">工作說明</div>
                    <textarea class=" px-1 py-1 text-base font-bold border border-2 border-slate-400 w-full"
                        placeholder="這次的活動，我們將要帶領大家..."></textarea>

                    <div class="text-base font-bold ">負責人</div>
                    <select class="px-1 py-1 w-full font-bold border border-2 border-slate-500">
                        <option class="italic font-bold">--請選擇一位負責人--</option>
                        <option class="text-red-400 font-bold">未定</option>
                        <option>--------------------------------</option>
                        <option>曾侑成</option>
                        <option>胡家境</option>
                        <option>黃紹齊</option>
                        <option>柯丞駿</option>
                        <option>魏心平</option>
                    </select>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <div class="border-t-2 pt-2">
                <button @click="modalProps.buttonsTrigger = false"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    新增
                </button>
                <button @click="modalProps.buttonsTrigger = false"
                    class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </div>

        </template>
    </Modal>


    <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->
    <div id=" bottomContainer" class="w-full">
        <div class="bookmark2 m-1.5 mx-8 relative">
            <div class="bookmark2-box text-xl bg-[C0C0C0]">
                所有工作
            </div>
            <div class="bookmark2-box text-xl bg-white">
                工作1
            </div>
            <div class="bookmark2-box text-xl bg-white">
                工作2dsdsdsdsdsdsdsdsdsdsddsdsdsdsdsdsdsdsdsdsdsdsdsd
            </div>

            <div class="bookmark2-menu">
                <svg width="9" height="31" viewBox="0 0 9 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.25 4.25C8.25 5.24456 7.85491 6.19839 7.15165 6.90165C6.44839 7.60491 5.49456 8 4.5 8C3.50544 8 2.55161 7.60491 1.84835 6.90165C1.14509 6.19839 0.75 5.24456 0.75 4.25C0.75 3.25544 1.14509 2.30161 1.84835 1.59835C2.55161 0.895088 3.50544 0.5 4.5 0.5C5.49456 0.5 6.44839 0.895088 7.15165 1.59835C7.85491 2.30161 8.25 3.25544 8.25 4.25ZM8.25 15.5C8.25 16.4946 7.85491 17.4484 7.15165 18.1516C6.44839 18.8549 5.49456 19.25 4.5 19.25C3.50544 19.25 2.55161 18.8549 1.84835 18.1516C1.14509 17.4484 0.75 16.4946 0.75 15.5C0.75 14.5054 1.14509 13.5516 1.84835 12.8484C2.55161 12.1451 3.50544 11.75 4.5 11.75C5.49456 11.75 6.44839 12.1451 7.15165 12.8484C7.85491 13.5516 8.25 14.5054 8.25 15.5ZM8.25 26.75C8.25 27.7446 7.85491 28.6984 7.15165 29.4016C6.44839 30.1049 5.49456 30.5 4.5 30.5C3.50544 30.5 2.55161 30.1049 1.84835 29.4016C1.14509 28.6984 0.75 27.7446 0.75 26.75C0.75 25.7554 1.14509 24.8016 1.84835 24.0984C2.55161 23.3951 3.50544 23 4.5 23C5.49456 23 6.44839 23.3951 7.15165 24.0984C7.85491 24.8016 8.25 25.7554 8.25 26.75Z"
                        fill="#A2A0A0" />
                </svg>
            </div>
        </div>
        <div class="flex w-full p-8">
            <div class="w-3/4 mr-2">
                <div id="options" class="inline-flex justify-between my-4 w-full">
                    <div id="optionsLeft" class="inline-flex justify-around">

                        <div id="radios">
                            <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1"
                                checked />
                            <label class="radioLable text-base" for="radio1">完成</label>
                            <input id="radio2" class="radioInput hidden " type="radio" name="radio" value="radio2" />
                            <label class="radioLable text-base" for="radio2">未完成</label>
                            <input id="radio3" class="radioInput hidden " type="radio" name="radio" value="radio3" />
                            <label class="radioLable text-base" for="radio3">全部</label>
                        </div>

                        <form id="search" class="flex items-center shadow:focus mr-10">
                            <label for="simple-search" class="">Search</label>
                            <div class="relative w-full">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input type="text" id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                    placeholder="Search" required>
                            </div>
                        </form>

                    </div>

                    <div id="optionsRight" class="flex justify-end align-center">
                        <button id="addNewWorkButton" @click="modalProps.buttonsTrigger = false"
                            class="bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            新增工作
                        </button>
                    </div>
                </div>
                <div id="workContainer" class="grid grid-col3 grid-gap-1rem py-8 px-8 rounded-2xl bg-white shadow">

                    <div
                        class="work card h-22rem border-[#2b6cb0] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow ">


                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center mb-2 items-center">
                                <div class="avatar"></div>
                                <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助
                            </div>
                        </div>

                        <div class="workBottom font-bold inline-flex justify-between text-base pt-2">

                            <div class="workBottomLeft inline-flex">
                                完成
                                <div class="mx-2 text-[#c70000]">5</div>
                                /
                                <div class="mx-2">10</div>
                            </div>

                            <div class="workBottomRight inline-flex">
                                還剩
                                <div class="mx-2 text-[#c70000]">100</div>
                                天
                            </div>
                        </div>


                        <div class="back h-full hidden flex flex-column pt-6">
                            <div class="backTitle text-2xl font-bold mb-10 text-center ">工作追蹤</div>
                            <div class="backBody h-full w-full y-overflow">
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">完成項目</div>
                                    <div class="text-base ml-20 italic">
                                        5 / 10
                                    </div>
                                </div>

                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">預算支出</div>
                                    <div class="text-base ml-20 italic">
                                        $10582 / $900000
                                    </div>
                                </div>
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">到期時間</div>
                                    <div class="text-base ml-20 italic">
                                        2023/12/31
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div
                        class="work card h-22rem border-[#24cf00] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow ">


                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center mb-2 items-center">
                                <div class="avatar"></div>
                                <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。
                            </div>
                        </div>

                        <div class="workBottom font-bold inline-flex justify-between text-base pt-2">

                            <div class="workBottomLeft inline-flex text-base ">
                                已完成
                            </div>

                            <div class="workBottomRight inline-flex">
                                還剩
                                <div class="mx-2 text-[#c70000]">20</div>
                                天
                            </div>
                        </div>


                        <div class="back h-full hidden flex flex-column pt-6">
                            <div class="backTitle text-2xl font-bold mb-10 text-center ">工作追蹤</div>
                            <div class="backBody h-full w-full y-overflow">
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">完成項目</div>
                                    <div class="text-base ml-20 italic">
                                        10 / 10
                                    </div>
                                </div>

                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">預算支出</div>
                                    <div class="text-base ml-20 italic">
                                        $90000000 / $90000000000000
                                    </div>
                                </div>
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">到期時間</div>
                                    <div class="text-base ml-20 italic inline-flex">
                                        2023/12/31
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        class="work card h-22rem border-[#24cf00] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow ">


                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center mb-2 items-center">
                                <div class="avatar"></div>
                                <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。
                            </div>
                        </div>

                        <div class="workBottom font-bold inline-flex justify-between text-base pt-2">

                            <div class="workBottomLeft inline-flex text-base ">
                                已完成
                            </div>

                            <div class="workBottomRight inline-flex">
                                還剩
                                <div class="mx-2 text-[#c70000]">20</div>
                                天
                            </div>
                        </div>


                        <div class="back h-full hidden flex flex-column pt-6">
                            <div class="backTitle text-2xl font-bold mb-10 text-center ">工作追蹤</div>
                            <div class="backBody h-full w-full y-overflow">
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">完成項目</div>
                                    <div class="text-base ml-20 italic">
                                        10 / 10
                                    </div>
                                </div>

                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">預算支出</div>
                                    <div class="text-base ml-20 italic">
                                        $90000000 / $90000000000000
                                    </div>
                                </div>
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">到期時間</div>
                                    <div class="text-base ml-20 italic inline-flex">
                                        2023/12/31
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        class="work card h-22rem border-[#24cf00] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow ">


                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center mb-2 items-center">
                                <div class="avatar"></div>
                                <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                露出一直很王也我這樣些人開一自。不會現在都回家能還大家都⋯不去後不沒定想像⋯這麼哈哈哈。還是句話絕說的有點：手機怎麼我覺覺得有也無法，回來的真的。

                                便必須炎決定來被人⋯你是越多啊跨年的存在版⋯自己明天一個我只有玻璃以及不是。也很怎麼這一個對不起，我們書的的直夠可愛，牙的大概，一小起來他不，快的意思有可能一，麼望大家早。

                                單日的後被完全般天氣，讓大家，成本年都常常看不要不行，都沒不真的本來直都們天的身說真，回不想本子，我真的哥哥我自己親卡這沒想。
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                臉的期待感的，糕了怎麼的水在台敗也可以懷念，小太出現在，現在只好想買純我做有人說，他的果真的好有上名他人的了超：獨是很魔現在還有沒時間告訴。的完美一個很香香，現在都一定⋯沒關係近都的言論在你的。們都有時知道是大概會，沒有很畫但現在：不這不會，關鍵字樓路過那邊好了一，是很多，吃惡你不眼前下次外是原。晚時分也不太希望他開始候就的意，道是的好像後當：所有氣的對我很我沒。喜歡喜黏土我也是，就知道忍不住而已得比較我比較。
                            </div>
                        </div>

                        <div class="workBottom font-bold inline-flex justify-between text-base pt-2">

                            <div class="workBottomLeft inline-flex text-base ">
                                已完成
                            </div>

                            <div class="workBottomRight inline-flex">
                                還剩
                                <div class="mx-2 text-[#c70000]">20</div>
                                天
                            </div>
                        </div>


                        <div class="back h-full hidden flex flex-column pt-6">
                            <div class="backTitle text-2xl font-bold mb-10 text-center ">工作追蹤</div>
                            <div class="backBody h-full w-full y-overflow">
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">完成項目</div>
                                    <div class="text-base ml-20 italic">
                                        10 / 10
                                    </div>
                                </div>

                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">預算支出</div>
                                    <div class="text-base ml-20 italic">
                                        $90000000 / $90000000000000
                                    </div>
                                </div>
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">到期時間</div>
                                    <div class="text-base ml-20 italic inline-flex">
                                        2023/12/31
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        class="work card h-22rem border-[#24cf00] hover:card-float-up px-2 py-2 flex flex-column justify-between rounded-2xl shadow ">


                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center mb-2 items-center">
                                <div class="avatar"></div>
                                <div class="text-sm text-[#1D5E9F] ellipsis italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                覺得都可能希望在乎，ㄉ受的東是有點，尼得這我怎麼，時我比著，辦法接活下去，的很機年代。他是死是看到麼那，多時又不真的是想一要畫則是我只有⋯時之前的，覺得超存超可愛的時一，碰是了什麼購買，但沒有拜託設計的努力。

                                什麼前提用一過看到不我到，不類的這裡食物，的多得人覺，跟還要處刑麼感，十啦愛，厲害道是才是禮物現。做決是的照片，很多繼續袋今天像也是現能力真喔：開心會出現不就收到。

                                阿伯意不出來真的是，羨慕喔我可以⋯尺寸，我朋友結有可能上看到，家好旅轉寫文越來，人家的女人者都當事人的網好不好。
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                覺得都可能希望在乎，ㄉ受的東是有點，尼得這我怎麼，時我比著，辦法接活下去，的很機年代。他是死是看到麼那，多時又不真的是想一要畫則是我只有⋯時之前的，覺得超存超可愛的時一，碰是了什麼購買，但沒有拜託設計的努力。

                                什麼前提用一過看到不我到，不類的這裡食物，的多得人覺，跟還要處刑麼感，十啦愛，厲害道是才是禮物現。做決是的照片，很多繼續袋今天像也是現能力真喔：開心會出現不就收到。

                                阿伯意不出來真的是，羨慕喔我可以⋯尺寸，我朋友結有可能上看到，家好旅轉寫文越來，人家的女人者都當事人的網好不好。
                            </div>
                        </div>

                        <div class="workBottom font-bold inline-flex justify-between text-base pt-2">

                            <div class="workBottomLeft inline-flex text-base ">
                                已完成
                            </div>

                            <div class="workBottomRight inline-flex">
                                還剩
                                <div class="mx-2 text-[#c70000]">20</div>
                                天
                            </div>
                        </div>


                        <div class="back h-full hidden flex flex-column pt-6">
                            <div class="backTitle text-2xl font-bold mb-10 text-center ">工作追蹤</div>
                            <div class="backBody h-full w-full y-overflow">
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">完成項目</div>
                                    <div class="text-base ml-20 italic">
                                        10 / 10
                                    </div>
                                </div>

                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">預算支出</div>
                                    <div class="text-base ml-20 italic">
                                        $90000000 / $90000000000000
                                    </div>
                                </div>
                                <div
                                    class="backText text-base font-bold mb-8 ml-8 inline-flex justify-start items-center">
                                    <div class="nowrap">到期時間</div>
                                    <div class="text-base ml-20 italic inline-flex">
                                        2023/12/31
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <FileSection />
        </div>
    </div>
</template>


<style scoped>
select {}

.text-\[\#c70000\] {
    color: #c70000;
}

.text-\[\#1D5E9F\] {
    color: #1D5E9F;
}

.text-\[\#24cf00\] {
    color: #24cf00;
}

.border-\[\#24cf00\] {
    border: 1px solid#24cf00;
}

/* underway */
.border-\[\#2b6cb0\] {
    border: 1px solid#2b6cb0;
}

.y-overflow {
    overflow-y: auto;
}

.nowrap {
    white-space: nowrap;
}

.work .back {
    overflow-y: scroll;
}


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


.work:hover .back {
    display: flex;
    position: static;
    transition: all 2s ease-in-out;
    transition-delay: 3s;

}

.work:hover .workTop,
.work:hover .workBottom {
    display: none;
}



.wrapper {
    height: calc(100% - 7rem)
}

.content {
    height: calc(100% - 3rem)
}

.bg-\[CEE5F2\] {
    background-color: #CEE5F2;
}


.avatar {
    width: 1.75rem;
    height: 1.75rem;
    border: 1px solid #000000;
    vertical-align: middle;
    border-radius: 50%;
}

.shadow {
    box-shadow: 0 0 30px 2px rgb(0 0 0 / 10%);
}

.pt-2 {
    padding-top: 0.5rem;
}

.h-2 {
    height: 20%;
}


.my-8 {
    margin-top: 2rem;
    margin-bottom: 2rem;
}



.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all .2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s !important;
    cursor: pointer;
}

.grid {
    display: grid;
}

.grid-col3 {
    grid-template-columns: 1fr 1fr 1fr;
}

.grid-gap-1rem {
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}

/*  */
body {
    height: 100%;
}

.shadow:focus {
    box-shadow: rgba(28, 58, 254, 0.75);
}

.flex-column {
    flex-direction: column;
}

#addNewWorkButton {
    right: 0px;
}

#optionLeft {
    width: 50%;
}

#optionsRight {
    width: auto;
}


/* works */
.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

#workTop {
    height: 9.5rem;
}



.h-22rem {
    height: 22rem;
}


.workBottom {
    border-top: 2px solid #2b6cb0;
}

.workTitle {
    /* line-height: 1.75rem; */
    height: calc(1.75rem * 3);
    -webkit-line-clamp: 3;
}


.workContent {
    /* line-height: 1.5rem; */
    height: auto;
    -webkit-line-clamp: 4;
    /* font color */
    --tw-text-opacity: 1;
    color: rgb(82 82 82/var(--tw-text-opacity));

}






/* containers */
#options {
    flex-flow: row nowrap;
}

/* buttons */
#addNewWorkButton {
    background-color: transparent;
    border-color: #2b6cb0;
    color: #2b6cb0;
}


#addNewWorkButton:hover {
    background-color: #2b6cb0;
    color: #ffffff;
}

/* radios */
#radios {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
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

.bookmark2 {
    height: 50px;
    border-top: #C0C0C0 3px solid;
    border-bottom: #C0C0C0 3px solid;
}

.bookmark2-box {
    width: 150px;
    text-align: center;
    line-height: 45px;
    border-right: #C0C0C0 3px solid;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.bookmark2-menu {
    position: absolute;
    display: inline-block;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.bg-\[C0C0C0\] {
    background-color: #C0C0C080;
}
</style>