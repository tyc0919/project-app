<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { getCookie } from '../assets/modules'
import Modal from './Modal.vue';
import axios from "axios";


/* 取得使用者帳號 */
const user_data = ref()
let activity_data = ref("")
const route = useRoute()
const router = useRouter()
const works = ref([])
const file = ref(null)
let csrftoken = getCookie()
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}

let user_e
let formData = new FormData()

/* 活動資訊 */
function take_activity() {
    axios.get("/api/userprofile/")
        .then(response => {
            user_data.value = response.data;
            user_e = user_data.value.user_email
        })

    axios.get("/api/activity/" + route.params.EventId + "/")
        .then(response => {
            activity_data.value = response.data
            let temp = new Date(activity_data.value.post_time)
            activity_data.value.post_time = temp.toLocaleDateString()
        })
        .catch(error => {
            console.log(error)
        })
}

take_activity()
 /* 活動資訊 */

/* 取得工作列表 */
// function add_tab(serial_number, title){
//     works.value.push({
//         serial_number: serial_number,
//         title: title
//     })
//     console.log(works.value)
// }
// axios.get("/api/activity/" + route.params.EventId + "/job/")
//     .then(response => {
//         for (let i = 0; i < response.data.length; i++) {
//             works.value[i] = {
//                 id: response.data[i].serial_number,
//                 name: response.data[i].title
//             }
//         }
//     })
/* 取得工作列表 */

/* 完成活動 */
function finish_activity() {
    var yesNo1 = document.querySelector('input[name="test1"]:checked').value;

    axios.post('/api/activity/finish/',
        {
            "activity_id": route.params.EventId,
            "is_finished": yesNo1
        }
        , config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

}
/* 完成活動 */

/* 發布活動 */
function publish_Activity() {
    var yesNo2 = document.querySelector('input[name="test2"]:checked').value;
    axios.post('/api/activity/publish/',
        {
            "activity_id": route.params.EventId,
            "is_public": yesNo2
        }
        , config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
}
/* 發布活動 */

/* 編輯活動 */

function fileUpload() {
    formData.append('file', file.value.files[0])
    formData.append('activity_id', route.params.EventId)
}

async function update_Activity() {
    let csrftoken = getCookie()
    let config = {
        headers: {
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin'
    }
    let configf = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin'
    }
    const activity_n = document.getElementById("test1")
    const activity_t = document.getElementById("test2")

    await axios.post('/api/activity/update/', {
        "activity_id": route.params.EventId,
        "owner": user_e,
        "activity_name": activity_n.value,
        "activity_description": activity_t.value
    }, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

    axios.post("/api/upload/activity_pic/", formData, configf)
        .then(response => {
            console.log(response)
        })
    take_activity()
}
/* 編輯活動 */

/* 刪除活動 */
async function delete_Activity() {
    let csrftoken = getCookie()
    let config = {
        headers: {
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin'
    }
    await axios.post('/api/activity/delete/', {
        "activity_id": route.params.EventId
    }, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })

    router.push({
        path: '',
        name: 'main-default',
    })
}
/* 刪除活動 */

/* 彈出視窗 */
const showModal_publish = ref(false)
const showModal_update = ref(false)
const showModal_delete = ref(false)
const showModal_finish = ref(false)

const toggleModal_publish = () => {
    showModal_publish.value = !showModal_publish.value
}

const toggleModal_update = () => {
    showModal_update.value = !showModal_update.value
}

const toggleModal_delete = () => {
    showModal_delete.value = !showModal_delete.value
}
const toggleModal_finish = () => {
    showModal_finish.value = !showModal_finish.value
}
/* 彈出視窗 */
</script>

<template>
    <!-- activityHead Start-->
    <div class="content bg-[CEE5F2]">
        <div class="w-full flex">
            <div class="w-2/3 m-1.5 ">
                <img src="../assets/images/FirstPart.png" class="event_main_img">

                <form action="">
                    <div class="flex justify-around w-full">
                        <div class="button hover" @click="toggleModal_finish()">
                            <input type="button" value="完成活動">
                        </div>
                        <div class="button hover" @click="toggleModal_publish()">
                            <input type="button" value="發布活動">
                        </div>
                        <div class="button hover" @click="toggleModal_update()">
                            <input type="button" value="編輯活動">
                        </div>
                        <div class="button hover" @click="toggleModal_delete()">
                            <input type="button" value="刪除活動">
                        </div>
                    </div>
                </form>

            </div>

            <div class="w-1/3 border-solid border border-black m-1.5 mr-10 bg-white relative">
                <p class="text-base2x m-1.5 text-[696969]"> {{ activity_data.activity_name }} </p>
                <p class="text-base m-1.5 text-[696969]">提案人 {{activity_data.owner}} </p>
                <p class="text-base m-1.5 text-[696969] overflow-y intro2">
                    {{activity_data.activity_description}}
                </p>
                <div class="absolute bottom-down w-full">
                    <hr class="m-1.5 border-3">
                    <p class="text-base m-1.5 text-[696969]">建立日期 {{activity_data.post_time}}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- activityHead end-->


    <!-- 完成視窗 -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal_finish" @close="toggleModal_finish()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">完成活動</div>
                </div>
            </template>
            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3 px-1 py-1 check">
                        <div class="text-base font-bold">活動狀態</div>
                        <form name="test1">
                            <input type="radio" id="Yes1" name="test1" value="1">
                            <label for="Yes1" class="text-base font-bold">已完成</label>
                            <br>
                            <input type="radio" id="No1" name="test1" value="0">
                            <label for="No1" class="text-base font-bold">未完成</label>
                            <br>
                        </form>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="toggleModal_finish(), finish_activity()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal_finish()"
                    class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 完成視窗 -->

    <!-- 發布視窗 -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal_publish" @close="toggleModal_publish()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">完成活動</div>
                </div>
            </template>
            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3 px-1 py-1 check">
                        <div class="text-base font-bold">是否要發布此活動到社群上?</div>
                        <form name="test2">
                            <input type="radio" id="Yes2" name="test2" value="1">
                            <label for="Yes2" class="text-base font-bold">發布</label>
                            <br>
                            <input type="radio" id="No2" name="test2" value="0">
                            <label for="No2" class="text-base font-bold">不發布</label>
                            <br>
                        </form>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="toggleModal_publish(), publish_Activity()()"
                    class="btnComfirmCreateActivity mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal_publish()"
                    class="btnCancelCreateActivity  py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 發布視窗 -->

    <!-- 編輯視窗 -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal_update" @close="toggleModal_update()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">編輯活動</div>
                </div>
            </template>
            <template #body>
                <div class="overflow-y-auto max-h-96 pr-4">
                    <div class="flex-row justify-between space-y-3">
                        <div class="text-base font-bold">活動名稱</div>
                        <input type="text" class="px-1 py-1 w-full text-base border border-2 border-slate-400"
                            placeholder="原本的活動名稱" id="test1">
                        <div class="text-base font-bold">活動圖片</div>
                        <input @change="fileUpload()" ref="file" type="file"
                            class="w-auto border-sky-700 border mx-8 mb-4 rounded text-sky-700" />
                        <div class="text-base font-bold ">活動簡介</div>
                        <textarea class="text-base font-bold border border-2 border-slate-400 w-full"
                            placeholder="原本的活動簡介" id="test2"></textarea>
                    </div>
                </div>
            </template>
            <template #footer>
                <button @click="toggleModal_update(),update_Activity()"
                    class="py-2 mr-2  px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    更改
                </button>
                <button @click="toggleModal_update()"
                    class="py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 編輯視窗 -->

    <!-- 刪除視窗 -->
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal_delete" @close="toggleModal_delete()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">警告視窗</div>
                </div>
            </template>
            <template #body>
                你確定要刪除此活動嗎，按下確定後就不能返回了
            </template>
            <template #footer>
                <button @click="toggleModal_delete(), delete_Activity()"
                    class="mr-2 py-2 px-4 rounded text-green-500 border border-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:font-semibold ">
                    確定
                </button>
                <button @click="toggleModal_delete()"
                    class="py-2 px-4 rounded text-blue-500  bg-transparent  border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                    取消
                </button>
            </template>
        </modal>
    </Teleport>
    <!-- 刪除視窗 -->

    <!-- eventBody start-->

    <div class="bookmark2 m-1.5 mx-8 relative">
        <router-link class="bookmark2-box text-xl bg-white" :to="{name: 'event-works'}">
            所有工作
        </router-link>

        <router-link class="bookmark2-box text-xl bg-white" v-for="work in works"
            :to="{name: 'event-work-detail', params: {WorkId: work.id}}">
            {{work.name}}
        </router-link>

        <!-- <router-link class="bookmark2-box text-xl bg-white" :to="{name: 'event-work-detail', params: {WorkId: 2}}">
                工作2dsdsdsdsdsdsdsdsdsdsddsdsdsdsdsdsdsdsdsdsdsdsdsd
            </router-link> -->

        <a class="bookmark2-menu">
            <svg width="9" height="31" viewBox="0 0 9 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.25 4.25C8.25 5.24456 7.85491 6.19839 7.15165 6.90165C6.44839 7.60491 5.49456 8 4.5 8C3.50544 8 2.55161 7.60491 1.84835 6.90165C1.14509 6.19839 0.75 5.24456 0.75 4.25C0.75 3.25544 1.14509 2.30161 1.84835 1.59835C2.55161 0.895088 3.50544 0.5 4.5 0.5C5.49456 0.5 6.44839 0.895088 7.15165 1.59835C7.85491 2.30161 8.25 3.25544 8.25 4.25ZM8.25 15.5C8.25 16.4946 7.85491 17.4484 7.15165 18.1516C6.44839 18.8549 5.49456 19.25 4.5 19.25C3.50544 19.25 2.55161 18.8549 1.84835 18.1516C1.14509 17.4484 0.75 16.4946 0.75 15.5C0.75 14.5054 1.14509 13.5516 1.84835 12.8484C2.55161 12.1451 3.50544 11.75 4.5 11.75C5.49456 11.75 6.44839 12.1451 7.15165 12.8484C7.85491 13.5516 8.25 14.5054 8.25 15.5ZM8.25 26.75C8.25 27.7446 7.85491 28.6984 7.15165 29.4016C6.44839 30.1049 5.49456 30.5 4.5 30.5C3.50544 30.5 2.55161 30.1049 1.84835 29.4016C1.14509 28.6984 0.75 27.7446 0.75 26.75C0.75 25.7554 1.14509 24.8016 1.84835 24.0984C2.55161 23.3951 3.50544 23 4.5 23C5.49456 23 6.44839 23.3951 7.15165 24.0984C7.85491 24.8016 8.25 25.7554 8.25 26.75Z"
                    fill="#A2A0A0" />
            </svg>
        </a>

    </div>
    <!-- <WorksPage></WorksPage> -->
    <router-view :key="$route.path">

    </router-view>
    <!-- eventBody end-->

</template>

<style scoped>
/* activityHead start */
.bg-\[696969\] {
    background-color: #696969;
}

.w-2\/3 {
    width: 66.666667%;
}

.w-1\/3 {
    width: 33.333333%;
}

.text-base2x {
    font-size: 2rem;
    line-height: 2.5rem;
}

.text-base075 {
    font-size: 0.75rem;
    line-height: 1.25rem;
}

.text-\[696969\] {
    color: #696969;
}

.text-blue {
    color: blue;
}

.text-red {
    color: #FF0000
}

.p-1\.5 {
    padding: 1.5rem;
}

.m-1\.5 {
    margin: 1.5rem;
}

.mr-10 {
    margin-right: 2.5rem;
}

.border-3 {
    border-width: 3px;
}

.border-solid {
    border-style: solid;
}

.border-red {
    border-color: #FF0000;
}

.justify-around {
    justify-content: space-around;
}

.overflow-y {
    overflow-y: auto;
}

.event_main_img {
    height: 500px;
    width: 85%;
    margin: 0 auto;
}

.button {
    width: 250px;
    height: 45px;
    line-height: 45px;
    background-color: #1D5E9F;
    margin: 1.5rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.hover:hover {
    background-color: white;
    color: #1D5E9F;
}

.hover:nth-of-type(4):hover {
    background-color: #FF0000;
    color: white;
}

.button:nth-of-type(4) {
    background-color: #FEEBD7;
    color: #FF0000;
    border: 1px solid #FF0000;
}

.bottom-down {
    bottom: 0;
}

.intro {
    max-height: 600px;
}

.intro2 {
    height: 300px;
}

.check input {
    margin: 16px;

}

/* activityHead end */

/* eventBody start */
.bookmark2 {
    height: 50px;
    border-top: #C0C0C0 3px solid;
    border-bottom: #C0C0C0 3px solid;
}

.bookmark2-box {
    width: 150px;
    text-align: center;
    line-height: 45px;
    border-right: #C0C0C0 3px solid;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.bookmark2-menu {
    position: absolute;
    display: inline-block;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}

.router-link-active.router-link-exact-active {
    background-color: #C0C0C080;
}

/* eventBody end */
</style>