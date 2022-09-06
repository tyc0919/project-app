<script setup>
import { ref } from 'vue';

const showUserMenu = ref(false)
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}


</script>

<template>

    <div class="flex h-full w-full">
    <!--Nav start-->
        <div class="sidebar bg-primary h-full ">
            <div class="logo">
                <img src="/src/assets/images/Logo.svg" class=" w-60 h-24" alt="">
            </div>
          <div class="wrapper flex flex-col justify-between">
              <div class="nav_table">
                    <router-link :to="{name: 'main-default'}" class="block text-white p-4 hover:opacity-70">
                      <i class="icon fa-solid fa-house-user fa-1x w-12"></i>主頁
                    </router-link>
                    <router-link :to="{name: 'main-works'}" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-book fa-1x w-12"></i>我的工作
                    </router-link>
                    <router-link :to="{name: 'main-social'}" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-comment fa-1x w-12"></i>社群
                    </router-link>
              </div>

              <div class="social_media flex justify-center">
                <a href="#" class="w-12 h-8 text-center"><i class="fa-brands fa-facebook flex h-full items-center justify-center"></i></a>
                <a href="#" class="w-12 h-8 text-center"><i class="fa-brands fa-github flex h-full items-center justify-center"></i></a>
                <a href="#" class="w-12 h-8 text-center"><i class="fa-brands fa-instagram flex h-full items-center justify-center"></i></a>
              </div>
          </div>
        </div>
    <!--Nav end-->
        <div class="wrapper w-full">
          <!-- Header start -->
          <div class="header flex justify-between px-4 bg-primary text-white text-center h-20 mb-8">
            <div class="detail">
              1個專案
              <br>
              3個工作
            </div>
            <div class="avatar">
              <img @click="toggleUserMenu" class="avatar w-12 h-12 rounded-full object-cover cursor-pointer" src="/src/assets/images/default_avatar.svg">
              <div v-if="showUserMenu" class="absolute w-40 h-18 top-16 right-8 py-2 bg-white text-black flex flex-col rounded-lg border-2 ">
                  <router-link :to="{name: 'user-profile'}" class="mb-2 hover:bg-blue-600 hover:text-white rounded-lg">
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
.sidebar > .wrapper {
  height: calc(100% - 6rem)
}
a i{
  color: white;
}
.header > div {
  display: flex;
  align-items: center;
}
</style>
