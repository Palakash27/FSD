<template>
  <div class="app-container">
    <h1>Click Zone Visualizer</h1>
    <FileUploader @file-uploaded="handleFetchClickZoneData" />
    <ClickZoneChart
      v-if="chartData.length"
      :chartData="chartData"
      @data-delete="handleDataDelete"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import FileUploader from './components/FileUploader.vue'
import ClickZoneChart from './components/ClickZoneChart.vue'
import api from './services/api'

const chartData = ref([])

const handleDataDelete = async () => {
  try {
    const analysisId = Number(localStorage.getItem('analysis-id') ?? 0)
    if (!analysisId) return
    const { data } = await api.deleteClickZoneData(analysisId)
    console.log('deleteClickZoneData -->', data)
    chartData.value = data.data
    localStorage.removeItem('analysis-id')
  } catch (error) {
    console.error('Error deleteing chart data:', error)
  }
}

const handleFetchClickZoneData = async () => {
  try {
    const analysisId = Number(localStorage.getItem('analysis-id') ?? 0)
    if (!analysisId) return
    const { data } = await api.fetchClickZoneData(analysisId)
    console.log('fetchClickZoneData -->', data)
    chartData.value = data.data
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}

onMounted(() => {
  handleFetchClickZoneData()
})
</script>

<style>
.app-container {
  padding: 20px;
  text-align: center;
  max-width: 990px;
  width: 990px;
  margin: 0 auto;

  h1 {
    text-decoration: underline;
    text-transform: uppercase;
  }
}
</style>
