<template>
  <div class="app-container">
    <h1>Click Zone Visualizer</h1>
    <FileUploader @file-uploaded="handleFileUploaded" />
    <ClickZoneChart :chartData="chartData" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUploader from './components/FileUploader.vue'
import ClickZoneChart from './components/ClickZoneChart.vue'
import api from './services/api'

const chartData = ref([
  {
    zone: 'Zone 1',
    clickCount: 10
  },
  {
    zone: 'Zone 2',
    clickCount: 20
  },
  {
    zone: 'Zone 3',
    clickCount: 30
  }
])

const handleFileUploaded = async () => {
  try {
    const response = await api.fetchClickZoneData()
    chartData.value = response.data
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }
}
</script>

<style>
.app-container {
  padding: 20px;
  text-align: center;
  max-width: 990px;
  width: 990px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;

  h1 {
    text-decoration: underline;
  }
}
</style>
