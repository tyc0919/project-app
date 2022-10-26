<script setup>
const props = defineProps({
    name: String,
    date: String,
    uploader: String,
    jobBelong: String,
})
const deleteFile = () => {}
</script>

<template>
    <div
        class="flex justify-between w-auto my-4 mx-8 border-2 rounded-md py-4 pl-4 pr-2 border-[#3399FF] bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
        <div class="w-full whitespace-nowrap">
            <p class="font-bold">{{ name }}</p>
            <div class="flex flex-row w-full mt-2 text-base text-gray-500 font-bold">
                <div class="mr-2">
                    <span>上傳日期: </span>
                    <span>{{ date }}</span>
                </div>
                <div class="mx-2">
                    <span>上傳時間: </span>
                    <span>{{ date }}</span>
                </div>
                <div class="mx-2">
                    <span>上傳者: </span>
                    <span>{{ uploader }}</span>
                </div>
                <div class="mx-2">
                    <span>所屬工作: </span>
                    <span>{{ jobBelong }}</span>
                </div>
            </div>
        </div>
        <button class="text-red-500 p-2" @click="deleteFile()">X</button>
    </div>
</template>

<style scoped></style>
