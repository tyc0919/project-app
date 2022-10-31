<script setup></script>

<template>
    <div class="wrapper px-12">
        <div class="bookmark h-12 flex px-8">
            <div class="w-full flex text-center items-center">
                <router-link
                    class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center revised-button"
                    :to="{ name: 'main-default' }"
                    >所有活動</router-link
                >
                <router-link
                    class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center revised-button mx-4"
                    :to="{ name: 'main-works' }"
                    >我的工作</router-link
                >
                <router-link
                    class="main-switch w-half px-4 bg-zinc-300 h-full flex items-center revised-button"
                    :to="{ name: 'main-social' }"
                    >社群中心</router-link
                >
            </div>
            <div class="flex items-center">
                <img src="/src/assets/images/home.svg" class="h-8" />
            </div>
        </div>
        <div class="content">
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
}

.content {
    height: calc(100% - 3rem);
}

.bg-\[CEE5F2\] {
    background-color: #cee5f2;
}

.revised-button {
    border-radius: 50px;
    background-color: white;
    color: black;
}
</style>
