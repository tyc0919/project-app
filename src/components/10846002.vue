<script></script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <div class="main w-half px-4 bg-[CEE5F2] h-full flex items-center">北商大母親節活動</div>
                <div class="budget w-half px-4 bg-zinc-300 h-full flex items-center">預算編輯</div>
            </div>
            <div class="flex items-center pr-4">
                <img src="/src/assets/images/home.svg" class="h-8" />
            </div>
        </div>
        <div class="content bg-[CEE5F2]">
            <!--Component here-->
            <div class="w-80">
                <div class="w-90 ml-8 py-[10px] inline-flex flex-wrap items-center">
                    <div>
                        <button class="py-1 px-4 border border-[7a6d6d] text-white text-base bg-[5b83ac] font-medium">
                            全部
                        </button>
                        <button class="py-1 px-4 border border-[7a6d6d] text-white text-base bg-[5b83ac] font-medium">
                            未完成
                        </button>
                        <button class="py-1 px-4 border border-[7a6d6d] bg-[5b83ac] text-white text-base font-medium">
                            完成
                        </button>
                    </div>

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
                                class="block p-search pl-10 text-sm bg-gray-50 border border-gray-300 focus:shadow-inner"
                                placeholder="搜尋工作"
                                required
                            />
                        </div>
                    </form>

                    <div>
                        <button
                            class="py-3 px-1 border-btn rounded-lg text-base font-bold border-[3491d9] bg-[ffffff] text-blue shadow"
                        >
                            編輯工作
                        </button>
                        <button
                            class="mx-2 py-3 px-1 border-btn rounded-lg text-base font-bold bg-[ffffff] border-[ff0000] text-red shadow"
                        >
                            刪除工作
                        </button>
                        <button
                            class="py-3 px-1 border-btn rounded-lg text-base font-bold bg-[ffffff] border-[ff0000] text-red shadow"
                        >
                            關閉分頁
                        </button>
                    </div>
                </div>
                <div class="px-4 mx-4">
                    <div class="bg-white relative px-[10px] pt-[10px] pb-[60px]">
                        <div class="w-full pb-[10px] flex">
                            <div class="w-6/12 inline-flex flex-row items-center">
                                <div class="text-gray font-bold">預算</div>

                                <div class="ml-4 font-bold">$9999</div>
                                /
                                <div class="font-bold">$99999</div>
                                <div class="mx-4 text-gray font-bold">剩餘</div>
                                <div class="text-green font-bold">$90000</div>
                            </div>
                            <div class="w-2/4 inline-flex justify-end pr-[20px] items-center">
                                <div class="circle mr-2 border"></div>
                                <div class="mr-4">負責人</div>
                                <div class="text-blue">黃宏成台灣阿成世界偉人財神總統</div>
                            </div>
                        </div>

                        <div class="w-full bg-[D9D9D9] text-center font-bold py-[30px] mb-2">工作標題</div>
                        <div class="w-full bg-[D9D9D9] pb-[150px] mb-2 text-sm text-gray font-bold">工作簡介/說明</div>

                        <button
                            class="w-full items-center bg-white rounded-lg border-btn border-[3491d9] py-[10px] text-blue shadow mb-[20px]"
                        >
                            新增細項 +
                        </button>
                        <button
                            class="w-full items-center bg-[1d5e9f] rounded-lg border-btn border-[006eaf] py-[10px] text-white shadow mb-[20px]"
                        >
                            完成
                        </button>
                        <button
                            class="w-full items-center bg-[ffcccc] rounded-lg border-btn border-[ff0000] py-[10px] text-red shadow"
                        >
                            取消完成
                        </button>
                        <div class="w-full flex border border-[3491d9] my-[20px]">
                            <div class="w-1/12 py-14 bg-[00db00] text-center text-white border-r border-[000000]">
                                確認完成
                            </div>
                            <div class="w-11/12">
                                <div class="border-b border-[000000]">
                                    <div class="w-2/4 inline-flex font-bold align-middle">工作細項標題</div>
                                    <div class="w-2/4 inline-flex justify-end align-middle my-1">
                                        <button
                                            class="rounded-lg border-btn border-[3491d9] font-bold text-base text-blue py-0 px-3 shadow"
                                        >
                                            編輯
                                        </button>
                                        <button
                                            class="mx-4 rounded-lg border-btn border-[ff0000] font-bold text-base text-red py-0 px-3 shadow"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                </div>
                                <div class="text-gray">工作細項內容</div>
                            </div>
                        </div>
                        <div class="w-full flex border border-[3491d9] my-[20px]">
                            <div class="w-1/12 py-14 bg-[ff0000] text-center text-white border-r border-[000000]">
                                取消完成
                            </div>
                            <div class="w-11/12">
                                <div class="border-b border-[000000]">
                                    <div class="w-2/4 inline-flex font-bold align-middle">工作細項標題</div>
                                    <div class="w-2/4 inline-flex justify-end align-middle my-1">
                                        <button
                                            class="rounded-lg border-btn border-[3491d9] font-bold text-base text-blue py-0 px-3 shadow"
                                        >
                                            編輯
                                        </button>
                                        <button
                                            class="mx-4 rounded-lg border-btn border-[ff0000] font-bold text-base text-red py-0 px-3 shadow"
                                        >
                                            刪除
                                        </button>
                                    </div>
                                </div>
                                <div class="text-gray">工作細項內容</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Component here-->
        </div>
    </div>
</template>

<style scoped>
.bg-\[CEE5F2\] {
    background-color: #cee5f2;
}
.bg-\[ffffff\] {
    background-color: #ffffff;
}
.bg-\[ffcccc\] {
    background-color: #ffcccc;
}
.bg-\[D9D9D9\] {
    background-color: #d9d9d9;
}
.bg-\[5b83ac\] {
    background-color: #5b83ac;
}
.bg-\[00db00\] {
    background-color: #00db00;
}
.bg-\[1d5e9f\] {
    background-color: #1d5e9f;
}
.bg-\[ff0000\] {
    background-color: #ff0000;
}

.border-\[ff0000\] {
    border-color: #ff0000;
}
.border-\[3491d9\] {
    border-color: #3491d9;
}
.border-\[006eaf\] {
    border-color: #006eaf;
}
.border-\[000000\] {
    border-color: #000000;
}
.border-\[7a6d6d\] {
    border-color: #7a6d6d;
}
.border-r {
    border-right-width: 3px;
}
.border-btn {
    border-width: 3px;
}

.text-red {
    color: #ff0000;
}
.text-blue {
    color: #3491d9;
}
.text-green {
    color: #00db00;
}
.text-gray {
    color: #696969;
}

.flex-row {
    flex-direction: row;
}

.w-1\/12 {
    width: 8.3%;
}
.w-11\/12 {
    width: calc(100%-8.3%);
}
.w-80 {
    width: 80%;
}
.w-90 {
    width: 94%;
}

.circle {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    border-color: rgb(0, 0, 0);
}

.align-middle {
    vertical-align: middle;
}

.focus\:shadow-inner:focus {
    box-shadow: inset 0 5px 9px 0 rgb(157 157 157);
}
.shadow {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.p-search {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-right: 0.3rem;
}
</style>
