<script setup>
import Modal from './Modal.vue'
import axios from "axios";
import { ref } from 'vue'
import { getCookie } from '../assets/modules'
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const emit = defineEmits(["refresh", "refresh2"])

function refresh() {
    emit('refresh')
}

function refresh2(x) {
    emit('refresh2', x)
}

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
const props = defineProps([
    "jobDetail",
    "jright"
]
)
const route = useRoute()
const router = useRouter()

let ujob_detailName = ref("")
let ujob_detailContent = ref("")
let messageS = ref("")
let messageF = ref("")

const showModal_update_job_detail = ref(false)
const toggleModal_update_job_detail = () => {
    showModal_update_job_detail.value = !showModal_update_job_detail.value
}

const showModal_delete_job_detail = ref(false)
const toggleModal_delete_job_detail = () => {
    showModal_delete_job_detail.value = !showModal_delete_job_detail.value
}

const showModal_success = ref(false)
const showModal_fail = ref(false)

const toggleModal_success = () => {
    showModal_success.value = !showModal_success.value
}

const toggleModal_fail = () => {
    showModal_fail.value = !showModal_fail.value
}

/* 編輯工作細項 */
async function updateJobDetail() {
    let data = {
        "job_detail_id": props.jobDetail.job_detail_id,
        "title": ujob_detailName.value,
        "content": ujob_detailContent.value
    }

    await axios.post("/api/job-detail/update/", data, config)
        .then(function (response) {
            messageS.value = "編輯工作細項成功"
            toggleModal_success()
        })
        .catch(function (error) {
            messageF.value = "編輯工作細項失敗"
            toggleModal_fail()
        })

    refresh()
}
/* 編輯工作細項 */

/* 刪除工作細項 */
async function deleteJobDetail() {
    let data = {
        "job_detail_id": props.jobDetail.job_detail_id
    }

    await axios.post("/api/job-detail/delete/", data, config)
        .then(function (response) {
            refresh()
        })
        .catch(function (error) {
            messageF.value = "刪除工作細項失敗"
            toggleModal_fail()
        })


}
/* 刪除工作細項 */

/* 工作細項狀態 */
async function statusJobDetail() {
    let jdstatus = props.jobDetail.status
    let isOkStatus = false

    if (jdstatus == "1") {
        jdstatus = "0"
    }

    else {
        jdstatus = "1"
    }

    let data = {
        "job_detail_id": props.jobDetail.job_detail_id,
        "status": jdstatus
    }

    await axios.post("/api/job-detail/status/", data, config)
        .then(function (response) {
            isOkStatus = true
        })
        .catch(function (error) {
            isOkStatus = false
        })

    refresh2(isOkStatus)
}
/* 工作細項狀態 */



</script>

<template>
    <!--工作細項未完成-->
    <div class="w-fullcjo4 flex border border-[#00db00] my-[20px] round_border" v-if="props.jobDetail.status == 0">
        <div v-if="props.jright" class="flex w-[9%] py-14 bg-[#ff0000] items-center justify-center text-white round_border cursor-pointer"
            @click="statusJobDetail()">
            未完成
        </div>

        <div v-else class="flex w-[9%] py-14 items-center justify-center text-white round_border hide-status-nfinish"            >
            未完成
        </div>

        <div class="w-[calc(100%-9%)]">
            <div class="border-b border-black">
                <div class="w-2/4 inline-flex font-bold align-middle pl-1">
                    {{ props.jobDetail.title }}
                </div>
                <div v-if="props.jright" class="w-2/4 inline-flex justify-end  items-center my-2">
                    <button
                        class="text-white bg-[#3056d3] border-[#3056d3] border hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-0 px-3 rounded"
                        @click="toggleModal_update_job_detail()">
                        編輯
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff0000] border-[#ff0000] border hover:text-[#ff0000] hover:border hover:border-[#ff0000] hover:bg-transparent font-semibold py-0 px-3 rounded"
                        @click="toggleModal_delete_job_detail()">
                        刪除
                    </button>
                </div>

                <div v-else class="w-2/4 inline-flex justify-end align-middle my-1">
                    <button
                        class="text-white bg-[#3056d380] border-[#3056d380] border font-semibold py-0 px-3 rounded">
                        編輯
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff000080] border-[#ff000080] border font-semibold py-0 px-3 rounded">
                        刪除
                    </button>
                </div>
            </div>
            <div class="text-[#696969] pl-1">
                {{ props.jobDetail.content }}
            </div>
        </div>
    </div>
    <!--工作細項未完成-->

    <!--工作細項完成-->
    <div class="w-full flex border border-[#3491d9] my-[20px] round_border" v-else>
        <div v-if="props.jright" class="flex w-[9%] py-14 bg-[#00db00] items-center justify-center text-white round_border cursor-pointer"
            @click="statusJobDetail()">
            完成
        </div>
        <div v-else class="flex w-[9%] py-14 bg-[#00db00] items-center justify-center text-white round_border">
            完成
        </div>

        <div class="w-[calc(100%-9%)]">
            <div class="border-b border-black">
                <div class="w-2/4 inline-flex font-bold align-middle pl-1">
                    {{ props.jobDetail.title }}
                </div>
                <div v-if="props.jright" class="w-2/4 inline-flex justify-end  items-center my-2">
                    <button
                        class="text-white bg-[#3056d3] border-[#3056d3] border hover:text-[#3056d3] hover:border hover:border-[#3056d3] hover:bg-transparent font-semibold py-0 px-3 rounded"
                        @click="toggleModal_update_job_detail()">
                        編輯
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff0000] border-[#ff0000] border hover:text-[#ff0000] hover:border hover:border-[#ff0000] hover:bg-transparent font-semibold py-0 px-3 rounded"
                        @click="toggleModal_delete_job_detail()">
                        刪除
                    </button>
                </div>

                <div v-else class="w-2/4 inline-flex justify-end align-middle my-1">
                    <button
                        class="text-white bg-[#3056d380] border-[#3056d380] border font-semibold py-0 px-3 rounded">
                        編輯
                    </button>
                    <button
                        class="mx-2 text-white bg-[#ff000080] border-[#ff000080] border font-semibold py-0 px-3 rounded">
                        刪除
                    </button>
                </div>
            </div>

            <div class="text-[#696969] pl-1">
                {{ props.jobDetail.content }}
            </div>
        </div>
    </div>
    <!--工作細項完成-->

    <!-- 編輯工作細項 -->
    <Teleport to="body">
        <modal :show="showModal_update_job_detail" @close="toggleModal_update_job_detail()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">編輯工作細項</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">工作細項名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            v-model="ujob_detailName">

                        <div class="text-base font-bold">工作細項內容</div>
                        <textarea class=" px-1 py-1 text-base border border-2 border-slate-400 w-full"
                            v-model="ujob_detailContent">
                        </textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal_update_job_detail(), updateJobDetail()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        更改
                    </button>
                    <button @click="toggleModal_update_job_detail()"
                        class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>
    <!-- 編輯工作細項 -->

    <!-- 刪除工作細項 -->
    <Teleport to="body">
        <modal :show="showModal_delete_job_detail" @close="toggleModal_delete_job_detail()">

            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>

            <template #body>
                你確定要刪除此工作細項嗎，按下確定後就不能返回了
            </template>

            <template #footer>
                <button @click="toggleModal_delete_job_detail(), deleteJobDetail()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal_delete_job_detail()"
                    class="py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>

        </modal>
    </Teleport>
    <!-- 刪除工作細項 -->

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

<style>
.border-r-3 {
    border-right-width: 3px;
}

.border-w-3 {
    border-width: 3px;
}

.circle {
    height: 1.875rem;
    width: 1.875rem;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    border-color: rgb(0, 0, 0);
}

.focus\:shadow-inner:focus {
    box-shadow: inset 0 5px 9px 0 rgb(157 157 157);
}

.shadow-btn {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.p-search {
    padding: 0.3rem 0.3rem 0.3rem 2.5rem;
}

.round_border {
    border-radius: 1rem;
}

.btn_click1:hover {
    background-color: #b9cfe4;
}

.btn_click2:hover {
    background-color: #ffcccc;
}

.hide-text-color {
    color: #3491d957;
}

.hide-text-color2 {
    color: #ff000057;
}

.hide-text-color3 {
    color: #ffffff70;
}

.hide-status-nfinish{
    background-color: #ff000057;
}

.hide-status-finish{
    background-color: #00db0057;
}
</style>