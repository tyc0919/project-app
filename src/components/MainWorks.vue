<script setup>
import MainWorksCard from './MainWorksCard.vue';    
</script>

<template>
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


        </div>

        <div class="grid grid-cols-3 grid-gap-1rem items-center justify-center">
            <MainWorksCard tracePercentage=70 costMoney=300000 budgetMoney=987541></MainWorksCard>
            <MainWorksCard tracePercentage=100 costMoney=300000 budgetMoney=987541></MainWorksCard>
            <MainWorksCard tracePercentage=100 costMoney=300000 budgetMoney=987541></MainWorksCard>
            <MainWorksCard tracePercentage=100 costMoney=300000 budgetMoney=987541></MainWorksCard>
        </div>

        <div class="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">上一頁</a>
                    </li>
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page"
                            class="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#"
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">下一頁</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style>
</style>
