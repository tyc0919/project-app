<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed } from '@vue/reactivity';
import Event from './components/Event.vue'
// import { usePageStore } from './stores/page';

// let store = usePageStore()


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
                    <a href="event_index.html" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-house-user fa-1x w-12"></i>主頁
                    </a>
                    <a href="myproposal.html" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-list fa-1x w-12"></i>我的企劃
                    </a>
                    <a href="mywork.html" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-book fa-1x w-12"></i>我的工作
                    </a>
                    <a href="colla_index.html" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-user-group fa-1x w-12"></i>合作店家
                    </a>
                    <a href="social_index.html" class="block text-white p-4 hover:opacity-70">
                        <i class="icon fa-solid fa-comment fa-1x w-12"></i>社群
                    </a>
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
              <img class="avatar w-12 h-12 rounded-full object-cover" src="/src/assets/images/default_avatar.svg">
              <div class="dot_list hidden">
                  <a href="information.html">
                    個人檔案
                  </a>
                  <a href="">
                    設定
                  </a>
                  <a href="../tailwind/index.html">
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
