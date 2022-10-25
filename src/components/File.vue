<script setup>
import axios from 'axios';
import Modal from './Modal.vue';
import { ref } from 'vue';
import { useRoute } from "vue-router";
import { getCookie } from '../assets/modules'

const emit = defineEmits(['deleteFile'])
const route = useRoute()
const props = defineProps({
    fname: String,
    upload_time: String
})
let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}

const delete_file = async () => {
    let data = {
        "model": "file",
        "job_id": route.params.WorkId,
        "file_name": props.fname
    }

    await axios.post("/api/delete-file/", data, config)
        .then(response => {
            console.log(response)
        })
    
    toggleModal()

    emit('deleteFile')
}

</script>

<template>
    <div class="flex justify-between w-full mt-4 border-2 rounded-md p-2 border-sky-400 file-shadow">
        <div class="flex">
            <img src="" alt="" class="w-12 h-12 inline mr-2">
            <div class="file-detail">
                <!-- <span>檔案名稱.xlsx</span> -->
                <span>{{ props.fname }}</span>
                <!-- <span>上傳日期: 2022/07/20</span> -->
                <span>上傳日期: {{ props.upload_time }}</span>
            </div>
        </div>

        <button class="text-red-500" @click="toggleModal">X</button>
    </div>


    <Teleport to="body">
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">確認刪除下列檔案?</div>
                </div>
            </template>
            <template #body>
                {{ props.fname }}
            </template>
            <template #footer>
                <button @click="delete_file()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal()"
                    class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>

            </template>
        </modal>
    </Teleport>
</template>

<style scoped>
.file-detail>span {
    display: block;
}
</style>