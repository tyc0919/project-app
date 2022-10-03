<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import axios from "axios"

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const showModal1 = ref(false)
const showModal2 = ref(false)

const toggleModal1 = () => {
    showModal1.value = !showModal1.value
}

const toggleModal2 = () => {
    showModal2.value = !showModal2.value
}

let csrftoken = getCookie('csrftoken')
let config = {
    headers: {
        'X-CSRFToken': csrftoken
    },
    mode: 'same-origin'
}


/* 取得使用者資料 */
let data = ref("")
function take_userfile() {
    axios.get("/api/userprofile/")
        .then(response => {
            data.value = response.data
        })
}

take_userfile()

/* 取得使用者資料 */

/* 更改使用者資料 */
let file = ref(null)
let formData = new FormData()

function fileUpload() {
    formData.append('file', file.value.files[0])
}

async function post_userfile() {
    let configf = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken
        },
        mode: 'same-origin'
    }
    let name = document.getElementById("1").value
    let tele = document.getElementById("2").value
    await axios.post("/api/userprofile/edit/", {
        "user_name": name,
        "telephone": tele
    }, config).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    })

    axios.post('/api/upload/avatar/',
        formData,
        configf
    ).then(response => {
        console.log(response)
    })

    take_userfile()

}
/* 更改使用者資料 */

/* 更改使用者密碼 */
const post_passwd = () => {
    let passwd1 = document.getElementById("3").value
    let passwd2 = document.getElementById("4").value
    axios.post("/api/userprofile/resetpassword/", {
        "password": passwd1,
        "new_password": passwd2
    }, config).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    })
}
/* 更改使用者密碼 */

</script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <div class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center">
                    會員中心
                </div>
            </div>
            <div class="flex items-center pr-4">
                <img src="/src/assets/images/home.svg" class="h-8">
            </div>
        </div>
        <div class="content bg-[CEE5F2] overflow-y-auto">
            <div class="grid_wrapper">
                <div class="pic">
                    <picture>
                        <img src="../assets/images/FirstPart.png" alt="">
                    </picture>
                </div>
                <div class="name">暱稱: {{ data.user_name }}</div>
                <div class="acc">帳號: {{ data.user_email }}</div>
                <div class="tele">手機: {{ data.telephone }}</div>
            </div>

            <div class="s_title">
                修改個人資料
            </div>

            <hr>

            <div class="alter_general">

                <div class="normal">
                    <span class="fix">暱稱</span>
                    <input id="1" type="text">
                </div>

                <div class="normal">
                    <span class="fix">手機</span>
                    <input id="2" type="text">
                </div>

                <div class="normal">
                    <input @change="fileUpload()" ref="file" type="file"
                        class="w-auto border-sky-700 border mx-8 mb-4 rounded text-sky-700" />
                </div>

                <!-- <button class="sub_btn" @click="toggleModal1()">確定</button> -->
                <button class="sub_btn" @click="post_userfile">確定</button>

            </div>

            <div class="s_title">
                修改密碼
            </div>

            <hr>

            <div class="alter_password">
                <div class="normal">
                    <span class="fix">舊密碼</span>
                    <input id="3" type="text">
                </div>
                <div class="normal">
                    <span class="fix">新密碼</span>
                    <input id="4" type="text">
                </div>
                <div class="normal">
                    <span class="fix">確認新密碼</span>
                    <input type="text">
                </div>

                <button class="sub_btn" @click="post_passwd">確定</button>
            </div>

        </div>
    </div>

    <router-link to="/events/1" class="text-sky-500">點擊前往Event.vue</router-link>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal1" @close="toggleModal1()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">修改個人資料</div>
                </div>
            </template>
            <template #body>
                <div class="alert_message">
                    <span>!!!</span>確認修改前請輸入新密碼
                </div>

                <div class="jump_frame">
                    <div class="pass_input">
                        密碼:
                        <input type="text">
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="jump_frame">
                    <button @click="toggleModal1()"
                        class="mr-2 px-4 py-1 rounded text-red-500 bg-transparent border border-red-500 hover:text-white hover:bg-red-500 hover:font-semibold ">
                        取消
                    </button>
                    <button @click="toggleModal1()"
                        class="mr-2 px-4 py-1 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        確定
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="showModal2" @close="toggleModal2()">
            <template #header>
                <div class="border-b-4 w-full px-4 py-4">
                    <div class="font-bold text-2xl">重設密碼</div>
                </div>
            </template>
            <template #body>
                <div class="alert_message">
                    <span>!!!</span>請輸入新密碼
                </div>

                <div class="jump_frame">
                    <div class="pass_input">
                        密碼:
                        <input type="text">
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="jump_frame">
                    <button @click="toggleModal2()"
                        class="mr-2 px-4 py-1 rounded text-red-500 bg-transparent border border-red-500 hover:text-white hover:bg-red-500 hover:font-semibold ">
                        取消
                    </button>
                    <button @click="toggleModal2()"
                        class="mr-2 px-4 py-1 rounded text-blue-500 bg-transparent border border-blue-500 hover:text-white hover:bg-blue-500 hover:font-semibold ">
                        確定
                    </button>
                </div>

            </template>
        </modal>
    </Teleport>

</template>

<style scoped>
.main-switch.router-link-exact-active {
    background-color: #cee5f2;
}

.wrapper {
    height: calc(100% - 7rem);
}

.content {
    height: calc(100% - 3rem);
}

.bg-\[CEE5F2\] {
    background-color: #cee5f2;
}

/* 10846017 */

/* first part */
hr {
    border-bottom: 3px solid #BEC0C5;
    margin: 0 2rem;
}

.grid_wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 100px 100px 100px;
    align-items: center;
    margin: 2rem 0;
    font-size: 1.5rem;
}

.grid_wrapper .pic {
    grid-column: 1/2;
    grid-row: 1/4;
    margin: 0 auto;
}

.grid_wrapper img {
    height: 300px;
    width: 300px;
    border-radius: 50%;
}

.grid_wrapper .name {
    grid-column: 2/3;
    grid-row: 1/2;
}

.grid_wrapper .acc {
    grid-column: 2/3;
    grid-row: 2/3;
}

.grid_wrapper .tele {
    grid-column: 2/3;
    grid-row: 3/4;
}

/* first part */

/* second part */
.s_title {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    font-size: 2rem;
}

.alter_general {
    width: 55%;
    display: flex;
    position: relative;
    flex-direction: column;
    font-size: 1.5rem;
    padding-right: 20rem;
    margin-left: 2rem;
}

.alter_password {
    width: 55%;
    display: flex;
    position: relative;
    flex-direction: column;
    font-size: 1.5rem;
    padding-right: 20rem;
    margin-left: 2rem;
}

.normal {
    margin-top: 2rem;
    display: flex;
}

.normal .fix {
    width: 150px;
    text-align: center;
}

.normal input[type=text] {
    height: 2rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

.sub_btn {
    width: 6rem;
    height: 2.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: auto;
    text-align: center;
    line-height: 2.5rem;
    background-color: white;
    border: 1px solid #004E98;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    color: #004E98;

}

/* second part */

/* jump_frame */
.alert_message {
    background: rgba(102, 178, 255, 0.73);
    border: 1px solid #000000;
    margin-bottom: 1rem;
    padding: 0.5rem 3rem;
    font-size: 1.5rem;
}

.alert_message span {
    color: red;
    margin-right: 0.5rem;
}

.jump_frame {
    display: flex;
    justify-content: center;
    font-size: 1rem;
}

.jump_frame .pass_input {
    font-size: 1.5rem;
}

.jump_frame input {
    border: 1px solid #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    margin-left: 2rem;
}

.jump_frame button {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

/* jump_frame */
</style>