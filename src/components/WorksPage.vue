<script setup>

</script>

<template>
    <link rel="stylesheet" href="https://fonts.googlepis.com/icon?family=Material+Icons">

    <div class="space"></div>

    <div id="options" class="inline-flex justify-between">
        <div id="optionsLeft" class="inline-flex justify-around">

            <div id="radios">
                <input id="radio1" class="hidden" type="radio" name="radio" value="radio1" checked />
                <label class="radioLable" for="radio1">完成</label>
                <input id="radio2" class="hidden" type="radio" name="radio" value="radio2" />
                <label class="radioLable" for="radio2">未完成</label>
                <input id="radio3" class="hidden" type="radio" name="radio" value="radio3" />
                <label class="radioLable" for="radio3">全部</label>
            </div>

            <div id="searchContainer">
                <table id="searchBox">
                    <tr>
                        <td>
                            <i class="material-icons">search</i>
                        </td>
                        <td>
                            <input id="searchText" type="text" placeholder="查找工作">
                        </td>
                    </tr>
                </table>
            </div>

        </div>

        <div id="optionsRight" class="inline-flex flex-end justify-end">
            <button id="addNewWorkButton"
                class="bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                新增工作
            </button>
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

    <div class="space"></div>

</template>



<style scoped>
body {
    height: 100%;
}

.flex-column {
    flex-direction: column;
}

.space {
    border: 1px solid #006B56;
    margin: 140px;
    width: 100%;
}

/* works */
#worksContainer {
    border: 1px solid #000000;
    margin-top: 10px;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.work {
    border: 2px solid #006B56;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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


/* search */
#searchContainer {
    display: flex;
    padding-top: 2px;
    padding-bottom: 2px;
    width: 50%;
    border: 1px solid #ced4da;
}

#searchBox {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

#searchText {
    height: 100%;
    width: 100%;
    padding: 0px 5px;
    font-size: 18px;
    font-family: sans-serif;
    color: #424242;
    font-weight: 500;
    border: 1px solid transparent;
}

#searchButton {
    width: 5%;
}

#searchText:focus {
    outline: none;
    border: 1px solid #1794e8;
    box-shadow: rgba(0, 0, 0, 0.75);
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