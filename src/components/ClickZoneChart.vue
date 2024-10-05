<!-- <template>
  <div class="chart-container">
    <h2>Bar Chart</h2>
    <pre>
      {{ JSON.stringify(chartData, null, 2) }}
    </pre>
    <canvas id="clickZoneChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js'

const props = defineProps(['chartData'])

const chartRef = ref(null)

const renderChart = () => {
  const ctx = chartRef.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.chartData.map((item) => item.zone),
      datasets: [
        {
          label: 'Clicks per Zone',
          data: props.chartData.map((item) => item.clickCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(() => {
  renderChart()
})

watch(
  () => props.chartData,
  () => {
    renderChart()
  }
)
</script>

<style scoped>
.chart-container {
  max-width: 600px;
  margin: 0 auto;
}
</style> -->
