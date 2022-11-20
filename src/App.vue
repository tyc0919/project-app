<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const showUserMenu = ref(false)
const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
}

const userPic = ref('')

const takeUserPic = async () => {
    let path = ''
    await axios.get('/api/userprofile/').then((response) => {
        userPic.value = '/api/serve-file/avatar/' + response.data.user_email
    })
    
}

function logout(){
    axios.get("/api/logout/")
    .then((response) => {
        window.location.href = "https://www.project-ace.site";
    })

}

onMounted(() => {
    (() => {
        let name = 'jwt'
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
        if (cookieValue === null){
            window.location.href = "https://www.project-ace.site";
        }
    })()
})

takeUserPic()
</script>

<template>
    <div class="flex h-full w-full">
        <div class="wrapper w-full">
            <!-- Header start -->
            <div class="header flex justify-between px-4 bg-primary text-white text-center h-20">
                <router-link :to="{ name: 'main-default' }" class="img-size">
                    <img src="/src/assets/images/Logo.svg" />
                </router-link>

                <div class="avatar">
                    <img
                        @click="toggleUserMenu"
                        class="avatar w-12 h-12 rounded-full object-cover cursor-pointer"
                        v-bind:src="userPic"

                        id = "avatorId"
                        onerror="this.src='https://i.imgur.com/LOEKh9R.jpg'"

                    />

                    <div
                        v-if="showUserMenu"
                        class="absolute w-40 h-18 top-16 right-8 py-2 bg-white text-black flex flex-col rounded-lg border-2 z-10"
                    >
                        <router-link
                            :to="{ name: 'user-profile' }"
                            class="mb-2 hover:bg-blue-600 hover:text-white rounded-lg"
                        >
                            個人檔案
                        </router-link>
                        <div class="hover:bg-blue-600 hover:text-white rounded-lg cursor-pointer" @click="logout()">
                            登出
                        </div>

                    </div>
                </div>
            </div>
            <!-- Header End -->
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.img-size {
    position: relative;
    width: 150px;
    height: 100px;
    top: 15px;
    bottom: 20px;
}

.bg-primary {
    background: #3056d3;
}

.sidebar > .wrapper {
    height: calc(100% - 6rem);
}

a i {
    color: white;
}

.header > div {
    display: flex;
    align-items: center;
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
</style>
