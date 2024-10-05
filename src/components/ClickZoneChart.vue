<template>
  <div class="bar-chart-container">
    <div class="chart-header">
      <h1>Bar Chart</h1>
      <button @click="deleteData">Reset Data</button>
    </div>
    <Bar class="bar-chart" :options="chartOptions" :data="formattedChartData" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const emit = defineEmits(['data-delete'])

// Props
const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
})

const formattedChartData = computed(() => ({
  labels: props.chartData.map((item) => item.zoneName),
  datasets: [
    {
      label: 'Click Count',
      data: props.chartData.map((item) => item.clickCount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}

const deleteData = () => emit('data-delete')
</script>
<style scoped>
.bar-chart-container {
  display: flex;
  flex-direction: column;
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    button {
      padding: 10px 20px;
      background-color: #54a1a1;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .bar-chart {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 3px 24px rgba(0, 0, 0, 0.08);
    padding: 10px;
    margin-top: 50px;
  }
}
</style>
