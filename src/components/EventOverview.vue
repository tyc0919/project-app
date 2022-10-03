<script setup>
import EventOverviewFile from './EventOverviewFile.vue'
import EventOverviewLog from './EventOverviewLog.vue'
</script>
<template>
    <div class="content bg-[CEE5F2]">
        <!-- Log紀錄 -->
        <div class="mx-10 p-14 border-b-2 border-[#c0c0c0]">
            <div class="w-full h-80 bg-white overflow-auto text-xl font-bold">
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
                <EventOverviewLog></EventOverviewLog>
            </div>
        </div>
        <!-- Log紀錄 -->

        <!-- 檔案總覽 -->

        <div class="m-2">
            <div class="mr-20">
                <!-- 下拉式選單 -->
                <div class="flex justify-end mt-10">
                    <select class="flex p-2 pr-20">
                        <option value="time">時間</option>
                        <option value="work">工作</option>
                        <option value="uploader">上傳者</option>
                    </select>
                </div>
                <!-- 下拉式選單 -->
            </div>

            <!-- 檔案區-->
            <div class="m-8 border-2 border-dashed border-[#9747FF]">
                <EventOverviewFile></EventOverviewFile>
                <EventOverviewFile></EventOverviewFile><EventOverviewFile></EventOverviewFile>
            </div>
            <!-- 檔案區-->

            <!--換頁-->
            <div class="pagination">
                <ul>
                    <li class="prev"><span>上一頁</span></li>
                    <li class="number current"><span>1</span></li>
                    <li class="number"><span>2</span></li>
                    <li class="number"><span>3</span></li>
                    <li class="dot"><span>...</span></li>
                    <li class="number"><span>8</span></li>
                    <li class="next"><span>下一頁</span></li>
                </ul>
            </div>
            <!--換頁-->
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
