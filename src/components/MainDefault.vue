<script setup>
</script>

<script defer>
document.addEventListener("DOMContentLoaded", function () {

    // trace stages
    let tracePercentageEls = document.querySelectorAll('.trace-percentage');
    let traceContainerEls = document.querySelectorAll('.trace-container');

    let traceEls = [];
    for (let i = 0; i < traceContainerEls.length; i++) {
        let objTraceEl = {
            container: traceContainerEls[i],
            percentage: tracePercentageEls[i]
        };
        traceEls.push(objTraceEl)
    }

    traceEls.forEach(function (traceEl) {
        let percentageEl = traceEl['percentage'];
        let containerEl = traceEl['container'];
        // each trace element -- 80% 
        let containerClass = containerEl.classList;
        let percentageText = percentageEl.innerText;
        // percentage -- 80 -> Number
        let percentage = Number(percentageText.substring(0, percentageText.length - 1));
        // width 
        containerEl.style.width = percentage + '%';
        containerEl.style.transition = '2s';
        // background-color
        if (percentage > 90) {
            containerClass.add("bg-emerald-400");
        } else if (percentage > 50) {
            containerClass.add("bg-blue-400");
        } else {
            containerClass.add("bg-stone-600");
        }
    });

    // cost stages
    let costMoneyEl = document.querySelectorAll('.cost');
    let budgetMoneyEl = document.querySelectorAll('.budget');
    let costContainerEls = document.querySelectorAll('.cost-container');

    let costEls = [];
    for (let i = 0; i < costContainerEls.length; i++) {
        // calculate the cost percentage of the budget 
        let costMoney = costMoneyEl[i].innerText;
        let budgetMoney = budgetMoneyEl[i].innerText;
        let costMoneyAmount = costMoney.substring(1, costMoney.length - 1);
        let budgetMoneyAmount = budgetMoney.substring(1, budgetMoney.length - 1);
        let costPercentage = Math.round(costMoneyAmount / budgetMoneyAmount * 100);
        // put into the object 
        let objCostEl = {
            percentage: costPercentage,
            container: costContainerEls[i],
        };
        console.log(costContainerEls[i]);
        costEls.push(objCostEl);
    }

    costEls.forEach(function (costEl) {
        let percentage = costEl['percentage'];
        let containerEl = costEl['container'];

        containerEl.style.width = percentage + '%';
        containerEl.style.transition = '2s';
        containerEl.style.transitionDelay = '.5s';
        if (percentage > 85) {
            containerEl.classList.add('bg-red-400');
        } else {
            containerEl.classList.add('bg-yellow-400');
        }
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
                    <div class="text-xl font-bold title ellipsis-2">一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start r">

                    <div class="relative h-fit w-full rounded-full mb-1 bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold text-sm h-10 w-full px-4 flex items-center justify-between">
                            <span class="ellipsis">完成進度</span>
                            <span class="trace-percentage">70%</span>
                        </div>
                        <div
                            class="trace-container rounded-full text-white text-sm h-10 w-full px-4 w-0 border-2 border-black">

                        </div>
                    </div>

                    <div class="relative h-fit w-full rounded-full bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="cost ml-1">$200000</span>
                                <span class="ml-1">/</span>
                                <span class="budget ml-1">$985214</span>
                            </div>
                        </div>
                        <div
                            class="cost-container rounded-full text-white h-10 w-0 flex items-center justify-between px-4 text-sm shadow">

                        </div>
                    </div>
                </div>
            </div>

            <!-- card1 -->
            <div
                class="shadow bg-white flex flex-col justify-between px-4 py-4 card h-96 align-start hover:card-float-up    ">
                <div class="cardTop mb-4">
                    <div class="mb-2 text-center pic">pic</div>
                    <div class="text-xl font-bold title ellipsis-2">一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start ">

                    <div
                        class="relative h-fit w-full rounded-full border-gray-300 border-black border-2 mb-1 bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold text-sm h-10 w-full px-4 flex items-center justify-between">
                            <span class="ellipsis">完成進度</span>
                            <span class="trace-percentage">100%</span>
                        </div>
                        <div class="trace-container rounded-full text-white text-sm h-10 w-full px-4 w-0">

                        </div>
                    </div>

                    <div class="relative h-fit w-full rounded-full border-gray-300 border-2 bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="cost ml-1">$500000</span>
                                <span class="ml-1">/</span>
                                <span class="budget ml-1">$900800</span>
                            </div>
                        </div>
                        <div
                            class="cost-container rounded-full text-white h-10 w-0 flex items-center justify-between px-4 text-sm">

                        </div>
                    </div>
                </div>
            </div>

            <!-- card1 -->
            <div
                class="shadow bg-white flex flex-col justify-between px-4 py-4 card h-96 align-start hover:card-float-up    ">
                <div class="cardTop mb-4">
                    <div class="mb-2 text-center pic">pic</div>
                    <div class="text-xl font-bold title ellipsis-2">一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！</div>
                    <div class="inline-flex justify-start w-full text-sm italic person">
                        <span class="">By</span>
                        <span class="ml-2  person-name text-blue ellipsis">籌畫人名稱</span>
                    </div>
                </div>

                <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start ">

                    <div
                        class="relative h-fit w-full rounded-full border-gray-300 border-black border-2 mb-1 bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold text-sm h-10 w-full px-4 flex items-center justify-between">
                            <span class="ellipsis">完成進度</span>
                            <span class="trace-percentage">20%</span>
                        </div>
                        <div class="trace-container rounded-full text-white text-sm h-10 w-full px-4 w-0">

                        </div>
                    </div>

                    <div class="relative h-fit w-full rounded-full border-gray-300 border-2 bg-slate-300 shadow-inset">
                        <div
                            class="absolute text-black font-bold h-10 w-full flex items-center justify-between px-4 text-sm">
                            <span class="ellipsis">預算花費</span>
                            <div>
                                <span class="cost ml-1">$800000</span>
                                <span class="ml-1">/</span>
                                <span class="budget ml-1">$900800</span>
                            </div>
                        </div>
                        <div
                            class="cost-container rounded-full text-white h-10 w-0 flex items-center justify-between px-4 text-sm">

                        </div>
                    </div>
                </div>
            </div>




            <!-- cards end -->
        </div>
    </div>
</template>



<style>
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



