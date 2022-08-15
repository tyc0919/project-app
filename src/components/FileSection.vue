<script setup>
import File from './File.vue';
</script>

<template>
    <div class="bg-white flex flex-col file-sec-wrapper w-80 items-center p-4 w-1/4 ml-2">
        <input type="text" placeholder="搜尋" class="w-full border-2 border-black mb-4">
        <button class="w-full bg-sky-700 text-white p-2 rounded-md file-shadow">邀請+</button>
        <div class="file w-full overflow-auto">
            <File></File>
            <File></File>
            <File></File>
            <File></File>
            <File></File>
            <File></File>
        </div>

    </div>
</template>

<style scoped>
.file-sec-wrapper {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
}

.file-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>