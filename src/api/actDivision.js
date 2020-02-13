import { ApiGeneral } from './api'

export default {
  getActDivision(id) {
    return ApiGeneral.get(`/pivot_division_activities/${id}`);
  },
  addActDivision(data) {
    return ApiGeneral.post(`/pivot_division_activities/`, data);
  },
  deleteActDivision(id) {
    return ApiGeneral.delete(`/pivot_division_activities/${id}`);
  }
}