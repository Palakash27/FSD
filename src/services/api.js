import axios from 'axios'

const api = {
  uploadExcel(fileData) {
    return axios.post('/api/upload', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  fetchClickZoneData() {
    return axios.get('/api/zones/clicks')
  }
}

export default api
