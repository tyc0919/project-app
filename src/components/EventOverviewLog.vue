<script setup>
const props = defineProps({
    time: String,
    user: String,
    action: String,
})
</script>

<template>
    <div class="flex flex-row">
        <div class="mr-2">
            {{ '[' + time.substring(0, 10) + ' ' + time.substring(11, 19) + ']' }}
        </div>
        <div class="mx-2 text-blue-600">{{ user }}</div>
        <div class="mx-2 text-red-500">{{ action }}</div>
    </div>
</template>

<style></style>
