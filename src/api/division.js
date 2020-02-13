import { ApiGeneral } from './api'

export default {
  getAllDivision() {
    return ApiGeneral.get(`/divisions`)
  },
  createDivision(data) {
    return ApiGeneral.post(`/divisions`, data)
  },
  getDetailDivision(id) {
    return ApiGeneral.get(`/detail_divisions/${id}`)
  },
  editDivision({ id, data }) {
    return ApiGeneral.put(`/divisions/${id}`, data)
  },
  deleteDivision(id) {
    return ApiGeneral.delete(`/divisions/${id}`)
  }
}