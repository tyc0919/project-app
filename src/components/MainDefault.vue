<script setup>
import { ref } from 'vue'
import MainDeFaultCard from './MainDefaultCard.vue'
import Modal from './Modal.vue'
import { getCookie } from '../assets/modules'
import axios from 'axios'

let activityData = ref([])
let activityOwner = ''
let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
}

const modalController = {
    addActivityModal: ref(false),
    noticeModal: ref(false),
}
const toggleModal = (modalName) => {
    modalController[modalName].value = !modalController[modalName].value
}

axios.get('/api/activity/', config).then(function (response) {
    activityData.value = response.data
})
axios.get('/api/userprofile/', config).then(function (response) {
    let temp = response.data
    activityOwner = temp.user_email
})

let errorMessage = {
    titleErrorMessage: ref(''),
    descriptionErrorMessage: ref(),
    budgetErrorMessage: ref(),
}
const addActivity = async () => {

    for (let key of Object.keys(errorMessage)) {
        errorMessage[key].value = ''
    }

    let title = document.getElementById('activityTitle').value
    let budget = document.getElementById('activityBudget').value
    let description = document.getElementById('activityContent').value

    try {
        await axios
            .post(
                '/api/activity/create/',
                {
                    owner: activityOwner,
                    activity_name: title,
                    activity_description: description,
                    activity_budget: budget,
                },
                config
            )
            .then(function (res) {
                axios.get('/api/activity/', config).then(function (response) {
                    activityData.value = response.data
                })
                toggleModal('addActivityModal')
                toggleModal('noticeModal')
            })
    } catch (error) {
        console.log('catch error.')
        if (title == '') {
            errorMessage.titleErrorMessage.value = '請填寫活動標題'
        }
        if (budget == '') {
            errorMessage.budgetErrorMessage.value = '必須給予初始預算'
        }
        if (description == '') {
            errorMessage.descriptionErrorMessage.value = '請填寫活動內容'
        }
        if (budget < 0) {
            errorMessage.budgetErrorMessage.value = '預算不可為負數'
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="modalController.noticeModal.value">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">提醒</div>
                </div>
            </template>

            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div>新增活動成功</div>
                </div>
            </template>

            <template #footer>
                <div class="border-t-2 pt-2">
                    <button @click="toggleModal('noticeModal')"
                        class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                        確定
                    </button>
                </div>
            </template>
        </modal>
    </Teleport>

    <Modal :show="modalController['addActivityModal'].value">
        <template #header>
            <div class="border-b-4 w-full px-4 py-4">
                <div class="font-bold text-2xl">新增活動</div>
            </div>
        </template>

        <template #body>
            <div class="overflow-y-auto max-h-96 pr-4">
                <div class="flex-row justify-between space-y-3">
                    <div class="text-base font-bold">活動名稱</div>
                    <input id="activityTitle" type="text"
                        class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                        placeholder="超棒的活動 (需至少三個字)" />
                    <span class="text-red-500">{{ errorMessage.titleErrorMessage.value }}</span>
                    <div class="text-base font-bold">活動預算</div>
                    <div class="flex items-center justify-start space-x-3">
                        <span class="italic font-bold">$</span>
                        <input id="activityBudget" type="number"
                            class="px-1 py-1 w-full text-base border border-2 border-slate-400" placeholder="10000" />
                    </div>
                    <span class="text-red-500">{{ errorMessage.budgetErrorMessage.value }}</span>
                    <div class="text-base font-bold">活動圖片</div>
                    <input id="activityImage" type="file" />
                    <div class="text-base font-bold">活動簡介</div>
                    <textarea id="activityContent" class="text-base font-bold border border-2 border-slate-400 w-full"
                        placeholder="這次的活動，我們將要帶領大家..."></textarea>
                    <span class="text-red-500">{{ errorMessage.descriptionErrorMessage.value }}</span>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="border-t-2 pt-2">
                <button @click="addActivity()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold">
                    新增
                </button>
                <button @click="toggleModal('addActivityModal')"
                    class="btnCancelCreateActivity py-2 px-4 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold">
                    取消
                </button>
            </div>
        </template>
    </Modal>

    <!-- content -->

    <div class="contain er w-full px-8 py-8">
        <!-- options -->
        <div id="options" class="inline-flex justify-between items-center my-4 w-full">
            <div class="inline-flex justify-around">
                <div id="radios">
                    <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" checked />
                    <label class="radioLable text-base" for="radio1">完成</label>
                    <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                    <label class="radioLable text-base" for="radio2">未完成</label>
                    <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" />
                    <label class="radioLable text-base" for="radio3">全部</label>
                </div>
            </div>

            <div id="optionsRight" class="flex justify-end align-center">
                <button @click="toggleModal('addActivityModal')"
                    class="btnCreateEvent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    新增活動
                </button>
            </div>
        </div>

        <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
            <!-- cards -->
            <router-link v-for="item in activityData" :to="{ path: '/events/' + item.id }">
                <MainDeFaultCard :name="item.activity_name" :owner="item.owner" :tracePercentage="100"
                    :costMoney="item.activity_expenditure" :budgetMoney="item.activity_budget"></MainDeFaultCard>
            </router-link>

            <!-- cards end -->
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.grid-gap-1rem {
    grid-row-gap: 3rem;
    grid-column-gap: 3rem;
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5b83ac;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}

.btnCreateEvent {
    color: #ffffff;
    background-color: #2b6cb0;
}

.btnCreateEvent:hover {
    background-color: transparent;
    color: #2b6cb0;
    border-color: #2b6cb0;
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-2 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.container {
    height: 100%;
}
</style>
