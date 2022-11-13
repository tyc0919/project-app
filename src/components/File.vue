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
    upload_time: String,
    right: Boolean
})


let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
let uploadTimeFormat = ref("")
let messageS = ref("")
let messageF = ref("")


function timeFormat() {
    let temp = new Date(props.upload_time)
    uploadTimeFormat.value = temp.toLocaleDateString()
}

timeFormat()


const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}

const showModal_success = ref(false)
const showModal_fail = ref(false)

const toggleModal_success = () => {
    showModal_success.value = !showModal_success.value
}
const toggleModal_fail = () => {
    showModal_fail.value = !showModal_fail.value
}



const delete_file = async () => {
    let data = {
        "model": "file",
        "job_id": route.params.WorkId,
        "file_name": props.fname
    }

    await axios.post("/api/delete-file/", data, config)
        .then(response => {
            messageS.value = "檔案刪除成功"
            toggleModal_success()
        })
        .catch(error =>{
            messageF.value = "檔案刪除失敗"
            toggleModal_fail()
        })

    toggleModal()

    emit('deleteFile')
}

const downloadFile = () => {
    window.open("/api/serve-file/" + route.params.EventId + "/" + props.fname)
}

</script>

<template>

    <div class="relative w-full p-2 mt-4 border-2 rounded-md border-sky-400 cursor-pointer">
        <div @click="downloadFile()">
            <div>
                {{ props.fname }}
            </div>

            <div>
                上傳日期: {{ uploadTimeFormat }}
            </div>
        </div>

        <button v-if="props.right" class="text-red-500 btn-postion z-10" @click="toggleModal">X</button>
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

    <!-- 正確訊息視窗 -->
    <Teleport to="body">
        <modal :show="showModal_success">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">成功視窗</div>
                </div>
            </template>
            <template #body>
                {{ messageS }}
            </template>
            <template #footer>
                <button @click="toggleModal_success()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>

            </template>
        </modal>
    </Teleport>
    <!-- 正確訊息視窗 -->

    <!-- 錯誤訊息視窗 -->
    <Teleport to="body">
        <modal :show="showModal_fail">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>
            <template #body>
                {{ messageF }}
            </template>
            <template #footer>
                <button @click="toggleModal_fail()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 錯誤訊息視窗 -->
</template>

<style scoped>
.btn-postion {
    width: 25px;
    height: 25px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

}
</style>