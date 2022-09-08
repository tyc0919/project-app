<script setup>
const props = defineProps({
    tracePercentage: Number,
    costMoney: Number,
    budgetMoney: Number,
})

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
        // width and transtion animation
        if (percentage > 100) {
            percentage = 100;
        }
        containerEl.classList.add('shadow-out');
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
        costEls.push(objCostEl);
        // 顯示資料時，加上千分位符號
        costMoneyEl[i].innerText = costMoneyEl[i].innerText.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        budgetMoneyEl[i].innerText = budgetMoneyEl[i].innerText.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }

    costEls.forEach(function (costEl) {
        let percentage = costEl['percentage'];
        let containerEl = costEl['container'];
        // width and transition animation
        if (percentage > 100) {
            percentage = 100;
        }
        containerEl.style.width = percentage + '%';
        containerEl.style.transition = '2s';
        containerEl.style.transitionDelay = '.5s';
        containerEl.classList.add('shadow-out');
        // color
        if (percentage > 85) {
            containerEl.classList.add('bg-red-400');
        } else {
            containerEl.classList.add('bg-yellow-400');
        }
    })
})

</script>


<template>
    <!-- card1 -->
    <div class="shadow bg-white flex flex-col justify-between px-4 py-4 card align-start hover:card-float-up">
        <div class="cardTop mb-8 ">
            <div class="mb-2 text-center flex flex-col justify-start items-center">
                <img class="h-64 w-96" src="src\assets\images\FirstPart.png">
            </div>
            <div class="text-xl font-bold title ellipsis-2">一起支持「身心障礙兒爸爸」 ► 他想學習自立，希望有能力，幫爸爸換一打新襪子！</div>
            <div class="inline-flex justify-start w-full text-sm italic person">
                <span class="">By</span>
                <span class="ml-2  person-name text-blue font-bold ellipsis">籌畫人名稱</span>
            </div>
        </div>

        <div class="cardBottom border-t border-black pt-2 flex flex-col justify-between items-start">

            <div class="relative h-fit w-full rounded-full mb-2 bg-slate-300 shadow-inset py-1 px-1">
                <div class="absolute text-black font-bold text-sm h-8 w-full px-4 flex items-center justify-between">
                    <span class="ellipsis">完成進度</span>
                    <span class="trace-percentage">{{ tracePercentage }}%</span>
                </div>
                <div class="trace-container rounded-full h-8 w-0 px-4">
                </div>
            </div>

            <div class="relative h-fit w-full rounded-full bg-slate-300 shadow-inset py-1 px-1">
                <div class="absolute text-black font-bold h-8 w-full flex items-center justify-between px-4 text-sm">
                    <span class="ellipsis">預算花費</span>
                    <div>
                        <span class="cost ml-1">${{ costMoney }}</span>
                        <span class="ml-1">/</span>
                        <span class="budget ml-1">${{ budgetMoney }}</span>
                    </div>
                </div>
                <div class="cost-container rounded-full h-8 w-0 flex items-center justify-between px-4 text-sm">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all .2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
    cursor: pointer;
}
</style>