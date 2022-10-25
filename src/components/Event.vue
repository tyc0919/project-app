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
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <router-link :to="{ name: 'event-works' }" class="flex-1 mask main-switch">
                    <div class="w-half px-4 h-full flex items-center mask_p">
                        {{ activity_data.activity_name }}
                    </div>
                </router-link>

                <router-link :to="{ name: 'budget' }" class="flex-1 mask main-switch">
                    <div class="w-half px-4 h-full flex items-center mask_p">
                        預算編輯
                    </div>
                </router-link>

                <router-link :to="{ name: 'overview' }" class="flex-1 mask main-switch">
                    <div class="w-half px-4 h-full flex items-center mask_p">
                        總覽
                    </div>
                </router-link>
            </div>
            <router-link :to="{ name: 'main-default' }" class="flex items-center pr-4 mx-3">
                <img src="/src/assets/images/home.svg" class="h-8" />
            </router-link>
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
