<script setup>
const props = defineProps({
    title: String,
    content: String,
})
</script>

<template>
    <div class="work-card p-4 bg-white hover:card-float-up my-4 border border-[#2b6cb0] rounded-2xl">
        <div class="work-title w-fit eclipse text-2xl font-bold mb-1 cursor-text">{{ title }}</div>
        <div class="work-content ellipsis-4 cursor-text">
            {{ content }}
        </div>
    </div>
</template>

<style scoped>
.hover\:card-float-up:hover {
    border-color: #2b6cb0;
    transition: all 0.2s ease-in-out;
    box-shadow: 3px 6px 13px 0 rgba(8, 9, 13, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-4 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
}
</style>
