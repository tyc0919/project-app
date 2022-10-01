<script setup>
import Modal from './Modal.vue'
import axios from "axios";
import { ref } from 'vue'
import { getCookie } from '../assets/modules'
import { useRoute } from "vue-router";


const props = defineProps([
    "jobDetail"
]
)

let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}
const route = useRoute()

let njob_detailName = ref("")
let njob_detailContent = ref("")
let ujob_detailName = ref("")
let ujob_detailContent = ref("")

/* 新增工作細項 */
function newJobDetail() {
    let data = {
        "job_serial_number": route.params.WorkId,
        "activity_id": route.params.EventId,
        "title": njob_detailName.value,
        "content": njob_detailContent.value
    }
    axios.post("/api/job-detail/create/", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
/* 新增工作細項 */

/* 編輯工作細項 */
function updateJobDetail() {
    let data = {
        "job_detail_id": props.jobDetail.job_detail_id,
        "title": ujob_detailName.value,
        "content": ujob_detailContent.value
    }

    axios.post("/api/job-detail/update/", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
/* 編輯工作細項 */

/* 刪除工作細項 */
function deleteJobDetail() {
    let data = {
        "job_detail_id": props.jobDetail.job_detail_id
    }

    axios.post("/api/job-detail/delete/", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}


const showModal_new_job_detail = ref(false)
const toggleModal_new_job_detail = () => {
    showModal_new_job_detail.value = !showModal_new_job_detail.value
}

const showModal_update_job_detail = ref(false)
const toggleModal_update_job_detail = () => {
    showModal_update_job_detail.value = !showModal_update_job_detail.value
}

const showModal_delete_job_detail = ref(false)
const toggleModal_delete_job_detail = () => {
    showModal_delete_job_detail.value = !showModal_delete_job_detail.value
}

</script>

<template>

    <!--工作細項未完成-->
    <div class="w-fullcjo4 flex border border-[#00db00] my-[20px]" v-if="props.jobDetail.status === 1">
        <div class="flex w-[8.3%] py-14 bg-[#ff0000] items-center justify-center text-white border-r-3 border-black">
            取消確認
        </div>
        <div class="w-[calc(100%-8.3%)]">
            <div class="border-b border-black">
                <div class="w-2/4 inline-flex font-bold align-middle">
                    {{ props.jobDetail.title }}
                </div>
                <div class="w-2/4 inline-flex justify-end align-middle my-1">
                    <button
                        class="rounded-lg border-w-3 border-[#3491d9] font-bold text-base text-[#3491d9] py-0 px-3 shadow-btn"
                        @click="toggleModal_update_job_detail()">
                        編輯
                    </button>
                    <button
                        class="mx-4 rounded-lg border-w-3 border-[#ff0000] font-bold text-base text-[#ff0000] py-0 px-3 shadow-btn"
                        @click="toggleModal_delete_job_detail()">
                        刪除
                    </button>
                </div>
            </div>
            <div class="text-[#696969]">
                {{ props.jobDetail.content }}
            </div>
        </div>
    </div>
    <!--工作細項未完成-->

    <!--工作細項完成-->
    <div class="w-full flex border border-[#3491d9] my-[20px]" v-else>
        <div class="flex w-[8.3%] py-14 bg-[#00db00] items-center justify-center text-white border-r-3 border-black">
            確認完成
        </div>
        <div class="w-[calc(100%-8.3%)]">
            <div class="border-b border-black">
                <div class="w-2/4 inline-flex font-bold align-middle">
                    {{ props.jobDetail.title }}
                </div>
                <div class="w-2/4 inline-flex justify-end align-middle my-1">
                    <button
                        class="rounded-lg border-w-3 border-[#3491d9] font-bold text-base text-[#3491d9] py-0 px-3 shadow-btn"
                        @click="toggleModal_update_job_detail()">
                        編輯
                    </button>
                    <button
                        class="mx-4 rounded-lg border-w-3 border-[#ff0000] font-bold text-base text-[#ff0000] py-0 px-3 shadow-btn"
                        @click="toggleModal_delete_job_detail()">
                        刪除
                    </button>
                </div>
            </div>
            <div class="text-[#696969]">
                {{ props.jobDetail.content }}
            </div>
        </div>
    </div>
    <!--工作細項完成-->

    <!-- 新增工作細項 -->
    <Teleport to="body">
        <modal :show="showModal_new_job_detail" @close="toggleModal_new_job_detail()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">新增工作細項</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">工作細項名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            v-model="njob_detailName">

                        <div class="text-base font-bold">工作細項內容</div>
                        <textarea class=" px-1 py-1 text-base font-bold border border-2 border-slate-400 w-full"
                            v-model="njob_detailContent">
                                    </textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal_new_job_detail(),newJobDetail()"
                        class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                        新增
                    </button>
                    <button @click="toggleModal_new_job_detail()"
                        class=" btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        取消
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>
    <!-- 新增工作細項 -->

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
                        <textarea class=" px-1 py-1 text-base font-bold border border-2 border-slate-400 w-full"
                            v-model="ujob_detailContent">
                                    </textarea>
                    </div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal_update_job_detail(),updateJobDetail()"
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
</style>