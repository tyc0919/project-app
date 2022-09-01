<script setup>
</script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <router-link class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center"
                    :to="{ name: 'main-default' }">所有活動</router-link>
                <router-link class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center"
                    :to="{ name: 'main-works' }">我的工作</router-link>
                <router-link class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center"
                    :to="{ name: 'main-social' }">社群中心</router-link>
            </div>
            <div class="flex items-center pr-4">
                <img src="/src/assets/images/home.svg" class="h-8">
            </div>
        </div>
        <div class="content bg-[CEE5F2] overflow-y-auto">
            <!-- 把你寫的Component放在這裡測試，要上github前這個檔案更動要discard掉-->
           
            <router-view />
        </div>
    </div>
    <router-link to="/events/1" class="text-sky-500">點擊前往Event.vue</router-link>
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
</style>