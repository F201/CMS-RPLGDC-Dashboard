import { ApiGeneral } from './api'

export default {
  getAllOrganization() {
    return ApiGeneral.get(`/organizations`)
  },
  createOrganization(data) {
    return ApiGeneral.post(`/organizations`, data)
  },
  getDetailOrganization(id) {
    return ApiGeneral.get(`/organizations/${id}`)
  },
  editOrganization({ id, data }) {
    return ApiGeneral.put(`/organizations/${id}`, data)
  },
  deleteOrganization(id) {
    return ApiGeneral.delete(`/organizations/${id}`)
  }
}