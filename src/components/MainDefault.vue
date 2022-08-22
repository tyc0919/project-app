<script setup>
import EventCard from './EventCard.vue';
</script>


<template>

    <!-- content -->
    <div class="container w-full px-8 py-8">
        <!-- options -->
        <div id="options" class="inline-flex justify-between items-center my-4 w-full ">
            <div class="inline-flex justify-around">

                <div id="radios">
                    <input id="radio1" class="radioInput hidden" type="radio" name="radio" value="radio1" checked />
                    <label class="radioLable text-base" for="radio1">完成</label>
                    <input id="radio2" class="radioInput hidden" type="radio" name="radio" value="radio2" />
                    <label class="radioLable text-base" for="radio2">未完成</label>
                    <input id="radio3" class="radioInput hidden" type="radio" name="radio" value="radio3" />
                    <label class="radioLable text-base" for="radio3">全部</label>
                </div>


            </div>

            <div id="optionsRight" class="flex justify-end align-center">
                <button
                    class="btnCreateEvent bg-transparent hover: font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    新增活動
                </button>
            </div>
        </div>


        <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
            <!-- cards -->
            <EventCard tracePercentage=100 costMoney=300000 budgetMoney=987541></EventCard>
            <EventCard tracePercentage=40 costMoney=800000 budgetMoney=987541></EventCard>
            <EventCard tracePercentage=60 costMoney=1000000 budgetMoney=987541></EventCard>
            <EventCard tracePercentage=80 costMoney=200000 budgetMoney=987541></EventCard>
            <EventCard tracePercentage=20 costMoney=900000 budgetMoney=987541></EventCard>
            <!-- cards end -->
        </div>


    </div>
</template>



<style>
.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5B83AC;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}

.btnCreateEvent {
    border-color: #2b6cb0;
    color: #2b6cb0;
}

.btnCreateEvent:hover {
    background-color: #2b6cb0;
    color: #ffffff;
}

.shadow-out {
    box-shadow: 2px 2px 3px 1px rgb(157 157 157);
}

.shadow-inset {
    box-shadow: inset 4px 4px 4px 0 rgb(157 157 157);
}

.shadow {
    box-shadow: 10px 10px 10px 4px rgb(0 0 0 / 10%);
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-2 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all .2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
    cursor: pointer;
}

.text-blue {
    color: rgb(60, 60, 240)
}

.cardBottom {
    border-color: #000000
}

.pic {
    border: 1px solid #000000;
    height: 8rem;
}

.container {
    height: 100%;
}

.grid-gap-1rem {
    grid-row-gap: 3rem;
    grid-column-gap: 3rem;
}

.radioLable {
    padding: 8px 14px;
    font-size: 14px;
    font-family: sans-serif;
    color: #ffffff;
    background: #5B83AC;
    cursor: pointer;
    transition: background 0.1s;
}

.radioLable:not(:last-of-type) {
    border-right: 1px solid #52708f;
}

.radioInput:checked+.radioLable {
    background: #52708f;
}
</style>



