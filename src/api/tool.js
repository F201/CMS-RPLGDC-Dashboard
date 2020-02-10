import { ApiGeneral } from './api'

export default {
  getAllTool() {
    return ApiGeneral.get(`/tools`)
  },
  createTool(data) {
    return ApiGeneral.post(`/tools`, data)
  },
  getDetailTool(id) {
    return ApiGeneral.get(`/tools/${id}`)
  },
  editTool({ id, data }) {
    return ApiGeneral.put(`/tools/${id}`, data)
  },
  deleteTool(id) {
    return ApiGeneral.delete(`/tools/${id}`)
  }
}