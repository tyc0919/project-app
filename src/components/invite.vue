<script setup>
import { ref } from 'vue'
const props = defineProps({
    email: String,
    picture_path: String
})
let userPicPath = ref('')
userPicPath.value = '/api/serve-file/avatar/' + props.picture_path
</script>

<template>
    <div class="flex items-center mt-4 border-2 rounded-md p-2 border-sky-400 file-shadow">
        <div class="rounded-full">
            <img v-bind:src="userPicPath" class="w-12 h-12 rounded-full mr-2" />
        </div>

        <div class="flex">
            <span>{{ props.email }}</span>
        </div>
    </div>
</template>
<style></style>
