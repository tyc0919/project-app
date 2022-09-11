

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'



const props = defineProps({
    chartId: {
        type: String,
        default: 'bar-chart',
    },

    datasetIdKey: {
        type: String,
        default: 'label',
    },
    cssClasses: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: "400"
    },
    height: {
        type: String,
        default: "400",
    },
    styles: {
        type: Object,
        default: () => { }
    },
    plugins: {
        type: Object,
        default: () => { }
    }
})

const chartData = {
    labels: ['實際支出', '預算'],
    datasets: [{
        barPercentage: 0.5,
        minBarLength: 5,
        label: ["支出預算比較圖"],
        data: [50, 60],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',

        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
        ],
        borderWidth: 1,
        indexAxis: "y",
    }]
}
const chartOptions = {
    responsive: true
}


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>


<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>
  
