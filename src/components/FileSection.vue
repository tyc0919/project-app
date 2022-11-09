<script setup>
import File from './File.vue';
import Invite from './invite.vue';
import Modal from './Modal.vue';
import axios from "axios";
import { ref } from 'vue';
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { getCookie } from '../assets/modules'

const props = defineProps({
    mode: {
        type: Number,
        default: 1
    }
})
const mode = props.mode
const route = useRoute()
let csrftoken = getCookie()
let id = 0


const data = ref([])
const c_email = ref([])
const file = ref(null)
let formData = new FormData()

/* 邀請 */
const invite = () => {
    console.log('send email')
    toggleModal()
}
/* 邀請 */

/* 上傳檔案 */
function fileUpload() {
    formData.append('file', file.value.files[0])
    formData.append('job_id', route.params.WorkId)
    file.value.files.length = 0
}

const upload = async () => {
    let configf = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin'
    }

    await axios.post('/api/upload/job/',
        formData,
        configf
    ).then(response => {
        console.log(response)
    })

    toggleModal()

    take_file()
}
/* 上傳檔案 */


/* 獲得檔案或協作者 */
const take_colla = () => {
    axios.get("/api/activity/" + route.params.EventId + "/collaborator/")
        .then(response => {
            data.value = response.data
        })
}

const take_file = () => {
    axios.get("/api/file/job/" + route.params.WorkId + "/")
        .then(response => {
            data.value = response.data
        })
}

if (mode === 1) {
    // get coop users
    take_colla()
} else {
    // get files for current work
    take_file()
}
/* 獲得檔案或協作者 */

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
</script>

<template>
    <div class="bg-white flex flex-col file-sec-wrapper w-80 items-center p-4 w-1/4 ml-2 round_border">

        <!-- <input type="text" placeholder="搜尋" class=" border-2 border-black mb-4"> -->
        <form id="search" class="flex items-center shadow:focus w-full mb-4">
            <label for="simple-search" class=""></label>
            <div class="relative w-full">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <input type="text" id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Search" required>
            </div>
        </form>

        <div v-if="mode === 1">
        </div>

        <div v-else class="w-full">
            <button class="py-2 rounded w-full text-white bg-[#3056d3] hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold" @click="toggleModal()">上傳</button>
        </div>

        <div class="file w-full overflow-auto">
            <div v-if="mode === 1">
                <Invite v-for="user in data" :key="user.email" :email="user.user_email" :picture_path="user.picture_path"></Invite>
            </div>

            <div v-else>
                <File v-for="workFile in data" :key="workFile.id" :fname="workFile.file_path" @deleteFile="take_file()"
                    :upload_time="workFile.file_uploaded_time" />
            </div>
        </div>
    </div>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div v-if="mode === 1">
                    <h3>邀請對象</h3>
                </div>
                <div v-else>
                    <h3>上傳檔案</h3>
                </div>
            </template>
            <template #body>
                <div v-if="mode === 1">
                    <input type="text" placeholder="請輸入email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        v-model="c_email">
                </div>
                <div v-else>
                    <input type="file" ref="file" @change="fileUpload()"
                        class="w-auto border-sky-700 border mx-8 mb-4 rounded text-sky-700" />
                </div>
            </template>
            <template #footer>
                <div v-if="mode === 1" class="inline-block">
                    <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md" @click="invite()">確認</button>
                </div>
                <div v-else class="inline-block">
                    <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md" @click="upload()">確認</button>
                </div>
                <button class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md inline-block"
                    @click="toggleModal()">取消</button>
            </template>
        </modal>
    </Teleport>

</template>

<style scoped>
.file-sec-wrapper {
    background: #FFFFFF;
    border: 1px solid #d1d5db;
    border-radius: 2px;
}

.file-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.round_border {
    border-radius: 1rem;
}
</style>