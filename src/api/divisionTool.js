import { ApiGeneral } from './api'

export default {
  getDivisionTools(id) {
    return ApiGeneral.get(`/pivot_division_tools/${id}`);
  },
  addDivisionTool(data) {
    return ApiGeneral.post(`/pivot_division_tools/`, data);
  },
  deleteDivisionTool(id) {
    return ApiGeneral.delete(`/pivot_division_tools/${id}`);
  }
}