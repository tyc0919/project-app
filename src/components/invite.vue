<script setup>
import { ref } from 'vue'
const props = defineProps({
    email: String,
    name: String,
})
let userPicPath = ref('')
userPicPath.value = '/api/serve-file/avatar/' + props.email
</script>

<template>
    <div class="flex items-center p-2 mt-4 border-2 border-[#2b6cb0] rounded-md file-shadow">
        <div class="rounded-full">
            <img v-bind:src="userPicPath" class="w-12 h-12 rounded-full mr-2" />
        </div>

        <div class="flex">
            <span>{{ props.name }}</span>
        </div>
    </div>
</template>
<style></style>
