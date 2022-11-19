<script setup>
import File from './File.vue'
import Invite from './invite.vue'
import Modal from './Modal.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from "vue-router";
import { getCookie } from '../assets/modules'

const props = defineProps({
    mode: {
        type: Number,
        default: 1,
    },
})

const mode = props.mode
const route = useRoute()
let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
let id = 0

const data = ref([])
const c_email = ref([])
const file = ref(null)
const router = useRouter()
let activity = ref('')


/* 上傳檔案 */

const upload = async () => {
    let formData = new FormData()
    formData.append('file', file.value.files[0])
    formData.append('job_id', route.params.WorkId)

    let configf = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
    }

    await axios
        .post('/api/upload/job/', formData, configf)
        .then((response) => {
            messageS.value = '檔案上傳成功'
            toggleModal_success()
            file.value.length = 0
        })
        .catch((error) => {
            messageF.value = '檔案上傳失敗'
            toggleModal_fail()
            file.value.length = 0
        })

    take_file()
}
/* 上傳檔案 */

/* 獲得工作內容和權限判斷 */
let right = ref('')
let leaveORcode = ref("")

async function authority() {
    let user_data
    let job
    let activity_data

    await axios.get('/api/userprofile/').then((response) => {
        user_data = response.data
    })

    await axios.get('/api/activity/' + route.params.EventId + '/job/' + route.params.WorkId + '/').then((response) => {
        job = response.data
        let temp = new Date(job.dead_line)
        job.dead_line = temp.toLocaleDateString()
    })

    await axios.get('/api/activity/' + route.params.EventId + '/').then((response) => {
        activity_data = response.data
    })

    if (user_data.user_email == job.person_in_charge_email || user_data.user_email == activity_data.owner) {
        right.value = true
    } else {
        right.value = false
    }


}

/* 獲得工作內容和權限判斷 */

/* 獲得檔案或協作者 */
const take_colla = async () => {
    await axios.get('/api/activity/' + route.params.EventId + '/collaborator/').then((response) => {
        data.value = response.data
    })

    let user_data
    let activity_data

    await axios.get('/api/userprofile/').then((response) => {
        user_data = response.data
    })

    await axios.get('/api/activity/' + route.params.EventId + '/').then((response) => {
        activity_data = response.data
    })

    if (user_data.user_email == activity_data.owner) {
        leaveORcode.value = true
    } else {
        leaveORcode.value = false
    }
}

const take_file = async () => {
    await axios.get('/api/file/job/' + route.params.WorkId + '/').then((response) => {
        data.value = response.data
    })
    authority()
}

const take_activity = async () => {
    await axios.get('/api/activity/' + route.params.EventId + '/').then((response) => {
        activity.value = response.data
    })
}
take_activity()


if (mode === 1) {
    // get coop users
    take_colla()
} else {
    // get files for current work
    take_file()
}
/* 獲得檔案或協作者 */

const leaveActivity = () => {
    axios.post('/api/leave-activity/',
        {
            "activity_id": route.params.EventId,
        }
        , config)
        .then(function (response) {
            router.push({
                path: '',
                name: 'main-default',
            })
        })
}

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
const showModal_leave = ref(false)
const toggleModal_leave = () => {
    showModal_leave.value = !showModal_leave.value
}

let messageS = ref('')
let messageF = ref('')
</script>

<template>
    <div class="bg-white flex flex-col file-sec-wrapper w-80 items-center p-4 w-1/4 ml-2 round_border">
        <div v-if="mode === 1">
            <p v-if="leaveORcode">
                邀請碼：{{ activity.invitation_code }}
            </p>
            <p v-else>
                <button class="leave-activity" @click="toggleModal_leave()">離開活動</button>

            </p>

        </div>


        <div v-else class="w-full">
            <label v-if="right"
                class="py-2 inline-block w-full text-center rounded text-white border border-[#3056d3] bg-[#3056d3] hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold"
                for="file_upload">上傳檔案
            </label>
            <input ref="file" @change="upload" type="file" id="file_upload" class="hidden" />
        </div>

        <div class="file w-full overflow-auto">
            <div v-if="mode === 1">
                <Invite v-for="user in data" :email="user.user_email" :name="user.user_name"
                    :picture_path="user.picture_path"></Invite>
            </div>

            <div v-else>
                <File v-for="workFile in data" :key="workFile.id" :fname="workFile.file_path" :right="right"
                    @deleteFile="take_file()" :upload_time="workFile.file_uploaded_time" />
            </div>
        </div>
    </div>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal" @close="toggleModal()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div>
                        <div class="font-bold text-2xl">上傳檔案</div>
                    </div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-col justify-between space-y-3">
                        <button
                            class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                            新增檔案
                        </button>
                    </div>
                </div>
            </template>

            <template #footer>
                <button
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    新增
                </button>
                <button
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
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
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
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
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    確定
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 錯誤訊息視窗 -->

    <!-- 離開活動訊息視窗 -->
    <Teleport to="body">
        <modal :show="showModal_leave">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">確認視窗</div>
                </div>
            </template>
            <template #body>
                你確定要離開活動嗎
            </template>
            <template #footer>
                <button @click="toggleModal_leave(), leaveActivity()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    確定
                </button>
                <button @click="toggleModal_leave()"
                    class="mr-2 py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 離開活動訊息視窗 -->
</template>

<style scoped>
.file-sec-wrapper {
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 2px;
}

.file-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.round_border {
    border-radius: 1rem;
}

.file-label {
    display: inline-block;
    width: 200px;
}

.leave-activity {
    width: 250px;
    height: 45px;
    line-height: 45px;
    background-color: #FF0000;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
