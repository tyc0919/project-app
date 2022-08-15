<script setup>
</script>

<template>
    <div class="flex justify-between w-full mt-4 border-2 rounded-md p-2 border-sky-400 file-shadow">
        <div class="flex">
            <img src="" alt="" class="w-12 h-12 inline mr-2">
            <div class="file-detail">
                <span>檔案名稱.xlsx</span>
                <span>上傳日期: 2022/07/20</span>
            </div>
        </div>

        <button class="text-red-500">X</button>
    </div>
</template>

<style scoped>
.file-detail>span {
    display: block;
}
</style>