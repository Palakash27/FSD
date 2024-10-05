<template>
  <div class="file-uploader-container">
    <h3>Choose an Excel file:</h3>
    <div class="file-uploader">
      <input type="file" @change="onFileChange" accept=".xlsx" />
      <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'

const selectedFile = ref(null)

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const response = await api.uploadExcel(formData)
    // let response = { responseStatus: 200, data: [], message: 'File uploaded successfully' }
    console.log('Response -->', response)
    // reset selected file
    selectedFile.value = null
    alert(response.message)
  } catch (error) {
    console.error('File upload error:', error)
  }
}
</script>

<style scoped>
.file-uploader-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  margin: 0 auto;
  border-radius: 5px;

  h3 {
    align-self: start;
  }

  .file-uploader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 20px;

    [type='file'] {
      /* Style the color of the message that says 'No file chosen' */
      color: #878787;
    }

    [type='file']::-webkit-file-upload-button {
      background: #ed1c1b;
      border: 2px solid #ed1c1b;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
      outline: none;
      padding: 10px 25px;
      text-transform: uppercase;
      transition: all 1s ease;
    }

    [type='file']::-webkit-file-upload-button:hover {
      background: #fff;
      border: 2px solid #535353;
      color: #000;
    }
  }
}
</style>
