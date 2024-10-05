import axios from 'axios'

const API_BASE_URL = 'https://localhost:44383/api'

const api = {
  uploadExcel(fileData) {
    return axios.post(`${API_BASE_URL}/excelupload/upload`, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  fetchClickZoneData() {
    return axios.get(`${API_BASE_URL}/calculateclick/count`)
  },

  deleteClickZoneData() {
    return axios.delete(`${API_BASE_URL}/calculateclick/count`)
  }
}

export default api
