import { ApiGeneral } from './api'

export default {
  getAchievMember(id) {
    return ApiGeneral.get(`/pivot_product_tools/${id}`);
  },
  addAchievMember(data) {
    return ApiGeneral.post(`/member_achievement/`, data);
  },
  deleteAchievMember(id) {
    return ApiGeneral.delete(`/member_achievement/${id}`);
  }
}