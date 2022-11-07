<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

let socialData = []
let activity = ref('')
const route = useRoute()

axios.get('/api/social/' + route.params.PostId).then(function (response) {
    socialData = response.data
    activity.value = socialData.activity_name
})
</script>

<template>
    <div class="wrapper px-12">
        <div class="bookmark h-12 flex px-8 mt-8 mb-4">
            <div class="w-full flex text-center items-center justify-between">
                <router-link
                    :to="{ name: 'post' }"
                    class="w-fit px-4 py-2 rounded-full bg-slate-200 text-base text-black main-switch"
                >
                    <div id="title" class="w-half px-4 h-full flex items-center mask_p">{{ activity }}</div>
                </router-link>
                <router-link :to="{ name: 'main-default' }" class="flex items-center">
                    <img src="/src/assets/images/home.svg" class="h-8" />
                </router-link>
            </div>
        </div>

        <div class="content overflow-y-auto">
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
    height: calc(100% - 7rem);
    background-color: #ecf4fa;
}
</style>
