import { ApiGeneral } from './api'

export default {
  getAllActivities() {
    return ApiGeneral.get(`/activities`);
  },
  getDetailActivities(id) {
    return ApiGeneral.get(`/detail_activities/${id}`)
  },
  createActivities(data) {
    return ApiGeneral.post(`/activities`, data);
  },
  deleteActivities(id) {
    return ApiGeneral.delete(`/activities/${id}`);
  },
  editActivities({id, data}) {
    return ApiGeneral.put(`/activities/${id}`, data);
  }
}