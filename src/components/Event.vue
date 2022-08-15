<script setup>
import invitec from './invitec.vue';
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
           <invitec></invitec>
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

.file-sec-wrapper {
    position: fixed;
    right: 25px;
    bottom: 20px;
    height: 40%;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
}

.file-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.file>div>div>span {
    display: block;
}
</style>
