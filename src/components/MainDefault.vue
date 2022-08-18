<script setup>
import EventCard from './EventCard.vue';
</script>


<template>

    <!-- content -->
    <div class="container w-full px-8 py-8">
        <!-- options -->
        <div class="inline-flex justify-between w-full my-4">
            <div class="inline-flex justify-around">
                <div>
                    <input id="radio1" class="hidden radioInput" type="radio" name="radio" value="radio1" checked />
                    <label class="text-base radioLable" for="radio1">完成</label>
                    <input id="radio2" class="hidden radioInput " type="radio" name="radio" value="radio2" />
                    <label class="text-base radioLable" for="radio2">未完成</label>
                    <input id="radio3" class="hidden radioInput " type="radio" name="radio" value="radio3" />
                    <label class="text-base radioLable" for="radio3">全部</label>
                </div>
            </div>
        </div>

        <!-- cards -->
        <div class="grid grid-cols-3 grid-gap-1rem ">
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
.shadow-out {
    box-shadow: 2px 2px 3px 1px rgb(157 157 157);
}

.shadow-inset {
    box-shadow: inset 4px 4px 4px 0 rgb(157 157 157);
}

.shadow {
    box-shadow: 0 0 30px 2px rgb(0 0 0 / 10%);
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



