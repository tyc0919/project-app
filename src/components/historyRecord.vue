<script setup>
</script>

<template>
    <h1>歷史記載</h1>
    <div class="wrapper">
        <div class="normal-row">
            <div class="expense normal-square text-xl">支出金額</div>
            <div class="represent normal-square text-xl">報銷人員</div>
            <div class="work-name normal-square text-xl">工作名稱</div>
            <div class="upload-time normal-square text-xl">上傳時間</div>
        </div>
        <hr>
        <div class="normal-row">
            <div class="expense normal-square text-xl">-$5,622</div>
            <div class="represent normal-square text-xl">陳莉莉</div>
            <div class="work-name normal-square text-xl">場地安排</div>
            <div class="upload-time normal-square text-xl">2011-08-12</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl">-$69,999</div>
            <div class="represent normal-square text-xl">黃紫紅</div>
            <div class="work-name normal-square text-xl">交通</div>
            <div class="upload-time normal-square text-xl">2011-08-10</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl">-$55,693</div>
            <div class="represent normal-square text-xl">Alice</div>
            <div class="work-name normal-square text-xl">food</div>
            <div class="upload-time normal-square text-xl">2012-01-01</div>
        </div>
        <div class="normal-row">
            <div class="expense normal-square text-xl">-$562</div>
            <div class="represent normal-square text-xl">Bob</div>
            <div class="work-name normal-square text-xl">djiojei....</div>
            <div class="upload-time normal-square text-xl">2008-09-08</div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-left: 13rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
}

hr {
    border: 1.5px solid #ACA0A0;
    margin: 0 1rem;
}

.wrapper {
    width: 75%;
    margin: 0 auto;
    background-color: white;
    padding: 0.5rem 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.normal-row {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: space-around;
}

.normal-square {
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
    border-radius: 50px;
}

.expense {
    color: #FF3A3A;
    background: #FEEBD7;
    border-color: #FF0000;
}

.represent {
    color: #FFFFFF;
    background: #1D5E9F;
    border-color: #4C8DBA;
}

.work-name {
    color: #FFFFFF;
    background: #00315F;
    border-color: #165179;
}

.upload-time {
    color: #000000;
    background: #D9D9D9;
    border-color: #919395;
}
</style>
