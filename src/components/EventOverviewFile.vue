<script setup>
import axios from 'axios'
import { getCookie } from '../assets/modules'
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
    name: String,
    date: String,
    uploader: String,
    jobId: Number,
})

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
}

let jobName = ref('')
let userName = ref('')
const modalController = {
    deleteModal: ref(false),
    deleteSuccessModal: ref(false),
}
const toggleModal = (modalName) => {
    modalController[modalName].value = !modalController[modalName].value
}

const deleteFile = async () => {
    axios.post('/api/delete-file/', { model: 'file', job_id: props.jobId, file_name: props.name }, config)
    toggleModal('deleteModal')
    toggleModal('deleteSuccessModal')
}

const getJobName = async () => {
    let job = []
    let file = []
    await axios.get('/api/activity/' + route.params.EventId + '/job/').then(async function (response) {
        job = response.data
    })
    await axios.get('/api/file/job/' + props.jobId + '/').then(function (response) {
        file = response.data
    })

    file.forEach(function (f) {
        job.forEach(function (j) {
            if (f.job == j.id) {
                jobName.value = j.title
            }
        })
    })
}
const getUserName = async () => {
    let collab = []
    await axios.get('/api/activity/' + route.params.EventId + '/collaborator/').then(async function (response) {
        collab = response.data
    })

    collab.forEach(function (c) {
        if (c.user_email == props.uploader) {
            userName.value = c.user_name
        }
    })
}

getUserName()
getJobName()
</script>

<template>
    <Teleport to="body">
        <modal :show="modalController.deleteModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>
            <template #body> 確定要刪除檔案嗎？此動作無法復原 </template>
            <template #footer>
                <button
                    @click="deleteFile()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
                >
                    確定
                </button>
                <button
                    @click="toggleModal('deleteModal')"
                    class="py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold"
                >
                    取消
                </button>
            </template>
        </modal>
    </Teleport>

    <Modal :show="modalController.deleteSuccessModal.value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">提醒</div>
            </div>
        </template>
        <template #body> 刪除成功！ </template>
        <template #footer>
            <button
                @click="toggleModal('deleteSuccessModal')"
                class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold"
            >
                確定
            </button>
        </template>
    </Modal>
    <div
        class="flex justify-between w-auto my-4 py-4 pl-4 pr-2 border-2 border-[#3399FF] rounded-md bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
        <div class="w-full whitespace-nowrap">
            <p class="font-bold">{{ props.name }}</p>
            <div class="flex flex-row w-full mt-2 text-base text-gray-500 font-bold">
                <div class="mr-2">
                    <span>上傳日期： </span>
                    <span>{{ props.date.substring(0, 10) }}</span>
                </div>
                <div class="mx-2">
                    <span>上傳時間： </span>
                    <span>{{ props.date.substring(11, 19) }}</span>
                </div>
                <div class="mx-2">
                    <span>上傳者： </span>
                    <span>{{ userName }}</span>
                </div>
                <div class="mx-2">
                    <span>所屬工作： </span>
                    <span>{{ jobName }}</span>
                </div>
            </div>
        </div>
        <button class="text-red-500 p-2" @click="toggleModal('deleteModal')">X</button>
    </div>
</template>

<style scoped></style>
