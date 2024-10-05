import axios from 'axios'

const API_BASE_URL = 'https://localhost:44383/api'

const axiosClient = axios.create({
  baseURL: API_BASE_URL
})

const api = {
  uploadExcel(fileData) {
    return axiosClient.post(`/analysis/upload`, fileData)
  },

  fetchClickZoneData(id) {
    return axiosClient.get(`/report/${id}`)
  },

  deleteClickZoneData(id) {
    return axiosClient.delete(`/report/${id}`)
  }
}

export default api
