<script setup>
</script>

<script defer>
document.addEventListener("DOMContentLoaded", function () {

    // trace stages
    let tracesEl = document.querySelectorAll('.trace');

    tracesEl.forEach(function (TraceEl) {
        // each trace element -- 80% 
        let lstTraceClass = TraceEl.classList;
        let traceText = TraceEl.childNodes[1].innerText;
        // percentage -- 80 -> Number
        let tracePercentage = Number(traceText.substring(0, traceText.length - 1));
        // width 
        TraceEl.style.width = traceText;
        // background-color
        if (tracePercentage > 90) {
            lstTraceClass.add("trace-90");
        } else if (tracePercentage > 50) {
            lstTraceClass.add("trace-50");
        } else {
            lstTraceClass.add("trace-under50");
        }
    });

    // cost stages
    let costEls = document.querySelectorAll('.cost');
    console.log(costEls);
    costEls.forEach(function (costEl) {
        let currentCostEl = costEl.childNodes[1].childNodes[0];
        let budgetEl = costEl.childNodes[1].childNodes[2];

        let cost = {
            currentCost: Number(currentCostEl.innerText.substring(1, currentCostEl.innerText.length)),
            budget: Number(budgetEl.innerText.substring(1, budgetEl.innerText.length)),
        };

        let costPercentage = Math.round(cost['currentCost'] / cost['budget'] * 100);
        costEl.style.width = costPercentage + '%';

        if (costPercentage > 85) {
            costEl.classList.add('bg-red-400');
        } else {
            costEl.classList.add('bg-yellow-400');
        }
        console.log(costPercentage);
    })











}, false);
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
            <!-- card1 -->
            <div
                class="shadow bg-white flex flex-col justify-between px-4 py-4 card h-96 align-start hover:card-float-up    ">
                <div class="cardTop mb-4">
                    <div class="mb-2 text-center pic">pic</div>
                    <div class="text-xl font-bold title ellipsis-2">活動標題活動標題活動標題活動標題標題活動標題活動標題活動標題標題活動標題活動標題活動標題</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start ">
                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="trace text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">完成進度</span>
                            <span>50%</span>
                        </div>

                    </div>

                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="cost text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="ml-1">$700000</span>
                                <span class="ml-1">/</span>
                                <span class="ml-1">$900800</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <!-- card1 -->
            <div
                class="shadow bg-white flex flex-col justify-between px-4 py-4 card h-96 align-start hover:card-float-up    ">
                <div class="cardTop mb-4">
                    <div class="mb-2 text-center pic">pic</div>
                    <div class="text-xl font-bold title ellipsis-2">活動標題活動標題活動標題活動標題標題活動標題活動標題活動標題標題活動標題活動標題活動標題</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start ">
                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="trace text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">完成進度</span>
                            <span>50%</span>
                        </div>

                    </div>

                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="cost text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="ml-1">$800000</span>
                                <span class="ml-1">/</span>
                                <span class="ml-1">$900800</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <!-- card1 -->
            <div
                class="shadow bg-white flex flex-col justify-between px-4 py-4 card h-96 align-start hover:card-float-up    ">
                <div class="cardTop mb-4">
                    <div class="mb-2 text-center pic">pic</div>
                    <div class="text-xl font-bold title ellipsis-2">活動標題活動標題活動標題活動標題標題活動標題活動標題活動標題標題活動標題活動標題活動標題</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start ">
                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="trace text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">完成進度</span>
                            <span>50%</span>
                        </div>

                    </div>

                    <div class="text-white h-fit w-full border-black border-2">
                        <div class="cost text-white h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="ml-1">$200000</span>
                                <span class="ml-1">/</span>
                                <span class="ml-1">$900800</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>









        </div>
    </div>

</template>



<style>
.shadow {
    box-shadow: 0 0 30px 2px rgb(0 0 0 / 10%);
}

.trace-under50 {
    background-color: #ccc;
}

.trace-50 {
    background-color: blue;
}

.trace-90 {
    background-color: green;
}


.cost {
    border: 1px solid #ccc
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



