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
                <div id="options" class="inline-flex justify-between my-[6px]">
                    <div id="optionsLeft" class="inline-flex justify-around">

                        <div id="radios">
                            <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1"
                                checked />
                            <label class="radioLable" for="radio1">完成</label>
                            <input id="radio2" class="radioInput hidden " type="radio" name="radio" value="radio2" />
                            <label class="radioLable" for="radio2">未完成</label>
                            <input id="radio3" class="radioInput hidden " type="radio" name="radio" value="radio3" />
                            <label class="radioLable" for="radio3">全部</label>
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

                <div id="workContainer" class="py-2 px-2">
                    <div class="work">
                        <div class="workTop">
                            <div class="workTitle"></div>
                            <div class="workContent"></div>
                        </div>
                        <div class="workBottom">

                        </div>
                    </div>
                    <div class="work">
                        <div class="workTop">
                            <div class="workTitle"></div>
                            <div class="workContent"></div>
                        </div>
                        <div class="workBottom">

                        </div>
                    </div>
                    <div class="work">
                        <div class="workTop">
                            <div class="workTitle"></div>
                            <div class="workContent"></div>
                        </div>
                        <div class="workBottom">

                        </div>
                    </div>


                    <div class="work">
                        <div class="workTop">
                            <div class="workTitle"></div>
                            <div class="workContent"></div>
                        </div>
                        <div class="workBottom">

                        </div>
                    </div>

                    <div class="work">
                        <div class="workTop">
                            <div class="workTitle"></div>
                            <div class="workContent"></div>
                        </div>
                        <div class="workBottom">

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

#workContainer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 1px solid #000000;
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
}

.work {
    height: 300px;
    border: 2px solid #006B56;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}


/* containers */
#options {
    width: 100%;
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