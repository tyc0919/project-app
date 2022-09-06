<script setup>
</script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <div class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center">
                    會員中心
                </div>
            </div>
            <div class="flex items-center pr-4">
                <img src="/src/assets/images/home.svg" class="h-8">
            </div>
        </div>
        <div class="content bg-[CEE5F2] overflow-y-auto">
            <!-- 把你寫的Component放在這裡-->
           
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