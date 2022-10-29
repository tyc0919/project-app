<script setup>
import axios from 'axios';
import { ref } from 'vue';

const showUserMenu = ref(false)
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const userPic = ref("")

const takeUserPic = async () => {
  let path = ""
  await axios.get("/api/userprofile/")
  .then(response => {
    path = response.data.picture_path
  })
  userPic.value = "/api/serve-file/avatar/"+ path
  
}
takeUserPic()
</script>

<template>

  <div class="flex h-full w-full">
    <div class="wrapper w-full">
      <!-- Header start -->
      <div class="header flex justify-between px-4 bg-primary text-white text-center h-20">
        <div class="detail">
          1個專案
          <br>
          3個工作
        </div>
        <div class="avatar">
          <img @click="toggleUserMenu" class="avatar w-12 h-12 rounded-full object-cover cursor-pointer"
            v-bind:src="userPic">

          <div v-if="showUserMenu"
            class="absolute w-40 h-18 top-16 right-8 py-2 bg-white text-black flex flex-col rounded-lg border-2 z-10">
            <router-link :to="{ name: 'user-profile' }" class="mb-2 hover:bg-blue-600 hover:text-white rounded-lg">
              個人檔案
            </router-link>
            <a href="../tailwind/index.html" class="hover:bg-blue-600 hover:text-white rounded-lg">
              登出
            </a>
          </div>
        </div>

      </div>
      <!-- Header End -->
      <router-view></router-view>
    </div>
  </div>

</template>

<style scoped>
.bg-primary {
  background: #3056D3;
}

.sidebar>.wrapper {
  height: calc(100% - 6rem)
}

a i {
  color: white;
}

.header>div {
  display: flex;
  align-items: center;
}
</style>
