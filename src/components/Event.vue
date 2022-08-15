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
            <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    height: calc(100% - 7rem);
}

.content {
    height: calc(100% - 3rem);
}
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

.border-\[00db00\] {
    border-color: #00db00;
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
