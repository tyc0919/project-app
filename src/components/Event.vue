<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const takeActivityTitle = () => {
    axios.get("/api/activity/" + route.params.EventId + "/")
        .then(response => {
            activity_data.value = response.data
        })
        .catch(error => {
            console.log(error)
        })
}

let activity_data = ref("")
const route = useRoute()

takeActivityTitle()

</script>

<template>

        <div class="wrapper">
            <div class="h-12 flex mb-8">
                <div class="w-full flex text-center items-center ">
                    <router-link :to="{ name: 'event-works' }"
                        class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title">
                        活動內容
                    </router-link>

                    <router-link :to="{ name: 'budget' }"
                        class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title">
                        預算編輯
                    </router-link>

                    <router-link :to="{ name: 'overview' }"
                        class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title">
                        總覽
                    </router-link>

                    <!-- 
                    以免之後又要用梯形分頁 先保存
                    <router-link :to="{ name: 'overview' }" class="flex-1 mask main-switch">
                    <div class="w-half px-4 h-full flex items-center mask_p">
                        總覽
                    </div>
                    </router-link> 
                    -->
                </div>
                <router-link :to="{ name: 'main-default' }" class="flex items-center pr-4 mx-3">
                    <img src="/src/assets/images/home.svg" class="h-8" />
                </router-link>
            </div>

            <div class="overflow-y-auto">
                <router-view />
            </div>
        </div>

</template>

<style scoped>
.main-switch.router-link-exact-active {
    background-color: #3056D3;
    color: white;
}


.bg-\[CEE5F2\] {
    background-color: #cee5f2;
}

.wrapper{
    padding: 2rem 5rem;
    background-color: #ecf4fa;
}

.btn-title{
    width: 100px;
    height: 45px;
    line-height: 45px;
}


/* 梯形分頁
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
*/
</style>
