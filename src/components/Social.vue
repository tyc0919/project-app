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
        <div class="bookmark h-12 flex mb-4">
            <div class="w-full flex text-center items-center justify-between">
                <router-link
                    :to="{ name: 'post' }"
                    class="w-fit px-4 py-2 rounded-full bg-slate-200 text-base text-black main-switch"
                >
                    <div id="title" class="w-half px-4 h-full flex items-center mask_p">北商大母親節活動</div>
                </router-link>
                <router-link :to="{ name: 'main-default' }" class="flex items-center">
                    <img src="/src/assets/images/home.svg" class="h-8" />
                </router-link>
            </div>
        </div>

        <div class="content bg-white border border-[#D1D5DB] overflow-y-auto">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.main-switch.router-link-exact-active {
    background-color: #3056d3;
    color: white;
}

.wrapper {
    padding: 1rem 4rem;
    background-color: #ecf4fa;
}
</style>
