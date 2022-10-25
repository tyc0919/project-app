<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'

let socialData = []
let activity
const route = useRoute()

axios.get('/api/social/' + route.params.PostId).then(function (response) {
    socialData = response.data
    activity = socialData.activity_name
    document.getElementById('title').innerHTML = activity
})
</script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center justify-between">
                <router-link :to="{ name: 'post' }" class="flex-[0.3_0.3_0%] mask main-switch">
                    <div id="title" class="w-half px-4 h-full flex items-center mask_p">北商大母親節活動</div>
                </router-link>
                <router-link :to="{ name: 'main-default' }" class="flex items-center pr-4 mx-3">
                    <img src="/src/assets/images/home.svg" class="h-8" />
                </router-link>
            </div>
        </div>

        <div class="content bg-[CEE5F2] overflow-y-auto">
            <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.main-switch.router-link-exact-active {
    border-color: transparent transparent #cee5f2;
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

.mask {
    border-width: 0 20px 50px 20px;
    border-style: none solid solid;
    border-color: transparent transparent rgb(212 212 216);
    position: relative;
}

.mask_p {
    position: absolute;
    margin-top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
}
</style>
