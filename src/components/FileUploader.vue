<template>
  <div class="file-uploader-container">
    <h3>Choose an Excel file:</h3>
    <div class="file-uploader">
      <input type="file" ref="fileInput" @change="onFileChange" accept=".xlsx" />
      <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
    </div>
    <div v-if="message" :class="['feedback-message', success ? 'success' : 'error']">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import api from '@/services/api'

const emit = defineEmits(['file-uploaded'])

const selectedFile = ref(null)
const fileInput = ref(null)
const message = ref('') // Message for feedback
const success = ref(false) // To track if the response is success or error

const hideMessageAfterDelay = (delay = 7) => {
  setTimeout(() => {
    message.value = ''
    success.value = false
  }, 1000 * delay)
}

const onFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const uploadFile = async () => {
  if (!selectedFile.value) return

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    const { data } = await api.uploadExcel(formData)
    console.log('uploadExcel -->', data)

    // Reset file input field and selected file
    fileInput.value.value = ''
    selectedFile.value = null

    // Show success message
    success.value = true
    message.value = data.message
    emit('file-uploaded')

    // Hide message after 5 seconds
    hideMessageAfterDelay(5)
  } catch (error) {
    console.error('File upload error:', error)

    // Show error message
    message.value = 'File upload failed. Please try again.'
    success.value = false

    // Hide message after 5 seconds
    hideMessageAfterDelay(5)
  }
}
</script>

<style scoped>
.file-uploader-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  margin: 50px auto;
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
      color: #878787;
    }

    [type='file']::-webkit-file-upload-button {
      background: #54a1a1;
      border: 2px solid #54a1a1;
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

  .feedback-message {
    margin-top: 10px;
    font-size: 14px;
  }

  .success {
    color: green;
  }

  .error {
    color: red;
  }
}
</style>
