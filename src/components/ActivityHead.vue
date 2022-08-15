<script setup>
</script>

<template>
    <!--FirstPart Start-->
    <div class="content bg-[CEE5F2]">
        <div class="w-full flex">
            <div class="w-2/3 m-1.5 ">
                <img src="../assets/images/FirstPart.png" class="event_main_img">

                <form action="">
                    <div class="flex justify-around w-full">
                        <div class="button">
                            <input type="button" value="新增活動">
                        </div>
                        <div class="button">
                            <input type="button" value="編輯活動">
                        </div>
                        <div class="button">
                            <input type="button" value="刪除活動">
                        </div>
                    </div>
                </form>

            </div>

            <div class="w-1/3 border-solid border border-black m-1.5 mr-10 bg-white relative">
                <p class="text-base2x m-1.5 text-[696969]">活動標題</p>
                <p class="text-base m-1.5 text-[696969]">提案人 <span class="text-blue">提案人</span></p>
                <p class="text-base m-1.5 text-[696969] overflow-y intro2">
                    簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介
                </p>
                <div class="absolute bottom-down w-full">
                    <hr class="m-1.5 border-3">
                    <p class="text-base m-1.5 text-[696969]">建立日期 2022/07/08 12:00</p>
                    <p class="text-base m-1.5 text-[696969]">活動地點 台北市</p>
                </div>

            </div>
        </div>


    </div>
    <!--FirstPart End-->
</template>

<style scoped>
/*First Start */
.bg-\[696969\] {
    background-color: #696969;
}

.w-2\/3 {
    width: 66.666667%;
}

.w-1\/3 {
    width: 33.333333%;
}

.text-base2x {
    font-size: 2rem;
    line-height: 2.5rem;
}

.text-base075 {
    font-size: 0.75rem;
    line-height: 1.25rem;
}

.text-\[696969\] {
    color: #696969;
}

.text-blue {
    color: blue;
}

.text-red {
    color: #FF0000
}

.p-1\.5 {
    padding: 1.5rem;
}

.m-1\.5 {
    margin: 1.5rem;
}

.mr-10 {
    margin-right: 2.5rem;
}

.border-3 {
    border-width: 3px;
}

.border-solid {
    border-style: solid;
}

.border-red {
    border-color: #FF0000;
}

.justify-around {
    justify-content: space-around;
}

.overflow-y {
    overflow-y: auto;
}

.event_main_img {
    height: 500px;
    width: 85%;
    margin: 0 auto;
}

.button {
    width: 250px;
    height: 45px;
    line-height: 45px;
    background-color: #1D5E9F;
    margin: 1.5rem;
    color: white;
    text-align: center;
    font-size: 1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: s-resize;
}

.button:nth-of-type(3) {
    background-color: #FEEBD7;
    color: #FF0000;
    border: 1px solid #FF0000;
}

.bottom-down {
    bottom: 0;
}

.intro {
    max-height: 600px;
}

.intro2 {
    height: 300px;
}



/*First End */
</style>