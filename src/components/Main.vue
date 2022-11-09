<script setup></script>

<template>
    <div class="wrapper px-12">
        <div class="bookmark h-12 flex px-8 mt-8">
            <div class="w-full flex text-center items-center">
                <router-link
                    class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title revised-button"
                    :to="{ name: 'main-default' }"
                    >所有活動</router-link
                >
                <router-link
                    class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title revised-button"
                    :to="{ name: 'main-works' }"
                    >我的工作</router-link
                >
                <router-link
                    class="w-fit rounded-full bg-white text-base text-black mr-2 main-switch btn-title revised-button"
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

.btn-title{
    width: 100px;
    height: 45px;
    line-height: 45px;
}
</style>
