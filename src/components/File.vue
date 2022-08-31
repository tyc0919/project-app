<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const emit = defineEmits(['deleteFile'])
const props = defineProps({
    fname: String,
    upload_time: String
})

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
const confirm = () => {
    emit('deleteFile', 'id')
    toggleModal()
}

</script>

<template>
    <div class="flex justify-between w-full mt-4 border-2 rounded-md p-2 border-sky-400 file-shadow">
        <div class="flex">
            <img src="" alt="" class="w-12 h-12 inline mr-2">
            <div class="file-detail">
                <!-- <span>檔案名稱.xlsx</span> -->
                <span>{{props.fname}}</span>
                <!-- <span>上傳日期: 2022/07/20</span> -->
                <span>上傳日期: {{props.upload_time}}</span>
            </div>
        </div>

        <button class="text-red-500" @click="toggleModal">X</button>
    </div>
    <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="toggleModal()">
                <template #header>
                    <h3>確認刪除下列檔案?</h3>
                </template>
                <template #body>
                    {{props.fname}}
                </template>
                <template #footer>
                    <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md" @click="confirm">確認</button>
                    <button class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md" @click="toggleModal">取消</button>
                </template>
            </modal>
    </Teleport>
</template>

<style scoped>
.file-detail>span {
    display: block;
}
</style>