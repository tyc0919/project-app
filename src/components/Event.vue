<script setup></script>

<template>
    <div class="wrapper">
        <div class="bookmark h-12 flex">
            <div class="w-full flex text-center items-center">
                <router-link
                    :to="{ name: 'event-works' }"
                    class="main-switch w-half px-4 h-full flex items-center bg-zinc-300"
                    >北商大母親節活動</router-link
                >
                <router-link
                    :to="{ name: 'budget' }"
                    class="main-switch w-half px-4 h-full flex items-center bg-zinc-300"
                    >預算編輯</router-link
                >
                <router-link
                    :to="{ name: 'overview' }"
                    class="main-switch w-half px-4 h-full flex items-center bg-zinc-300"
                    >總覽</router-link
                >
            </div>
            <router-link :to="{ name: 'main-default' }" class="flex items-center pr-4">
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
