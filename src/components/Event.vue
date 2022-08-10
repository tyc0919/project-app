<script>
</script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <div class="main w-half px-4 bg-[CEE5F2] h-full flex items-center">北商大母親節活動</div>
                <div class="budget w-half px-4 bg-zinc-300 h-full flex items-center">預算編輯</div>
            </div>
            <div class="flex items-center pr-4">
                <img src="/src/assets/images/home.svg" class="h-8">
            </div>
        </div>


        <div class="content bg-[CEE5F2]">

            <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->
            <div ud="bottomContainer" class="mx-8">
                <div id="options" class="inline-flex justify-between my-8 w-full">
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
                            <label for="simple-search" class="sr-only">Search</label>
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
                        <button id="addNewWorkButton"
                            class="bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            新增工作
                        </button>
                    </div>
                </div>

                <div id="workContainer" class="py-8 px-8 rounded-2xl bg-white shadow ">

                    <div class="work px-2 py-2 flex flex-column justify-between rounded-2xl shadow">
                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center">
                                <div class="avatar"></div>
                                <div class="text-base ellipsis  italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助
                            </div>
                        </div>

                        <div class="workBottom inline-flex justify-between text-base pt-2 h-2">

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
                    </div>

                    <div class="work px-2 py-2 flex flex-column justify-between rounded-2xl shadow">
                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center">
                                <div class="avatar"></div>
                                <div class="text-base ellipsis  italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助
                            </div>
                        </div>

                        <div class="workBottom inline-flex justify-between text-base pt-2 h-2">

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
                    </div>

                    <div class="work px-2 py-2 flex flex-column justify-between rounded-2xl shadow">
                        <div class="workTop flex flex-column justify-between">

                            <div class="flex align-center">
                                <div class="avatar"></div>
                                <div class="text-base ellipsis  italic ml-2">負責人名稱</div>
                            </div>
                            <div class="workTitle text-xl font-bold mb-8 ellipsis">
                                一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！
                            </div>


                            <div class="workContent text-base ellipsis mb-8">
                                對於身心障礙兒的父親來說，要基本溫飽已是勉強，襪子總是最後一個考量、破了也繼續穿。今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助今年父親節，您買一雙襪，將協助
                            </div>
                        </div>

                        <div class="workBottom inline-flex justify-between text-base pt-2 h-2">

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
                    </div>



                </div>


            </div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    height: calc(100% - 7rem)
}

.content {
    height: calc(100% - 3rem)
}

.bg-\[CEE5F2\] {
    background-color: #CEE5F2;
}

.text-\[\#c70000\] {
    color: #c70000;
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

/* bg-white pt-8 px-4 overflow-hidden  shadow-6 relative js-restricted  */
#workContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}

.work {
    height: 20rem;
    border: 1px solid#2b6cb0;
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
</style>