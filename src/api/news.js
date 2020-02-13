import { ApiGeneral } from './api'

export default {
  getAllNews() {
    return ApiGeneral.get(`/news`)
  },
  createNews(data) {
    return ApiGeneral.post(`/news`, data)
  },
  getDetailNews(id) {
    return ApiGeneral.get(`/news/${id}`)
  },
  editNews({ id, data }) {
    return ApiGeneral.put(`/news/${id}`, data)
  },
  deleteNews(id) {
    return ApiGeneral.delete(`/news/${id}`)
  }
}