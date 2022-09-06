<script setup>
import { ref } from 'vue';
import File from './File.vue';
import Invite from './invite.vue';
import Modal from './Modal.vue';
const props = defineProps({
    mode: {
        type: Number,
        default: 1
    }
})
const mode = props.mode
// const mode = 2
const showModal = ref(false)
let id = 0
const toggleModal = () => {
    showModal.value = !showModal.value
}
const invite = () => {
    console.log('send invite axios')
    toggleModal()
}
const upload = () => {
    console.log('send upload axios')
    toggleModal()
}
const deleteFile = (id) => {
    console.log(`send delete axios ${id}`)
}
const data = ref([])
if(mode === 1){
    // get coop users
    data.value = [
    {
        email: '10846017@ntub.edu.tw',
        username: '黃紹麒',
        avatar: 'a123f12sd.jpg'
    },
    {
        email: '10846009@ntub.edu.tw',
        username: '方尾鰭',
        avatar: 'b73f412sd.jpg'
    }
]

}else{
    // get files for current work
    data.value = [
    {
        id: id++,
        fname: 'test1',
        upload_time:'2020/07/10'
    },
    {
        id: id++,
        fname: 'test2',
        upload_time:'2021/04/01'
    },
    {
        id: id++,
        fname: 'test3',
        upload_time:'2022/11/12'
    }]
}

</script>

<template>
    <div class="bg-white flex flex-col file-sec-wrapper w-80 items-center p-4 w-1/4 ml-2">
        <input type="text" placeholder="搜尋" class="w-full border-2 border-black mb-4">
        <div v-if="mode === 1" class="w-full">
            <button class="w-full bg-sky-700 text-white p-2 rounded-md file-shadow" @click="toggleModal()">邀請+</button>
        </div>
        <div v-else class="w-full">
            <button class="w-full bg-sky-700 text-white p-2 rounded-md file-shadow" @click="toggleModal()">上傳</button>
        </div>
        <div class="file w-full overflow-auto">
            <div v-if="mode === 1">
                <Invite v-for="user in data" :key="user.email"/>
            </div>
            <div v-else>
                <File v-for="workFile in data" :key="workFile.id" @delete-file="deleteFile" :fname="workFile.fname" :upload_time="workFile.upload_time"/>
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
                        <input type="text" placeholder="請輸入email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
                    </div>
                    <div v-else>
                        <input type="file" name="上傳檔案" id="">
                    </div>
                </template>
                <template #footer>
                    <div v-if="mode === 1" class="inline-block">
                        <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md" @click="invite()">確認</button>
                    </div>
                    <div v-else class="inline-block">
                        <button class="bg-sky-700 text-white px-4 py-2 mx-1 rounded shadow-md" @click="upload()">確認</button>
                    </div>
                    <button class="bg-gray-400 text-white px-4 py-2 mx-1 rounded shadow-md inline-block" @click="toggleModal()">取消</button>
                </template>
            </modal>
    </Teleport>

</template>

<style scoped>
.file-sec-wrapper {
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.16);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
}

.file-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>