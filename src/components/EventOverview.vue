<script setup>
import EventOverviewFile from './EventOverviewFile.vue'
import EventOverviewLog from './EventOverviewLog.vue'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let logData = ref([])

const getData = async () => {
    await axios.get('/api/log/' + route.params.EventId + '/').then(function (response) {
        logData.value = response.data
    })
}
getData()
</script>

<template>
    <div class="content">
        <!-- Log紀錄 -->
        <div class="border-b-2 border-[#c0c0c0]">
            <div class="w-full h-80 bg-white overflow-auto text-xl font-bold">
                <EventOverviewLog v-for="log in logData" :time="log.time" :user="log.user_name" :action="log.action">
                </EventOverviewLog>
            </div>
        </div>
        <!-- Log紀錄 -->

        <!-- 檔案總覽 -->

        <div>
            <!-- 檔案區-->
            <div>
                <EventOverviewFile></EventOverviewFile>
            </div>
            <!-- 檔案區-->
        </div>

        <!-- 檔案總覽 -->
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
}

.pagination ul {
    display: inline-flex;
    background-color: #fff;
    margin: 2rem 0;
}

.pagination ul li {
    text-align: center;
    padding: 10px 20px 10px 20px;
    border-width: 1px;
    border-color: #929eaa;
    margin-left: -1px;
    cursor: pointer;
}

.pagination ul li.dot {
    cursor: default;
}

.pagination ul li.current {
    background-color: #dbd8d4;
}
</style>
