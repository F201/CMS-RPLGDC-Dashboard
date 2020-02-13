import { ApiGeneral } from './api'

export default {
  getAllAchievement() {
    return ApiGeneral.get(`/achievements`);
  },
  getDetailAchievement(id) {
    return ApiGeneral.get(`/detail_achievement/${id}`)
  },
  createAchievement(data) {
    return ApiGeneral.post(`/achievements`, data);
  },
  deleteAchievement(id) {
    return ApiGeneral.delete(`/achievements/${id}`);
  },
  editAchievement({id, data}) {
    return ApiGeneral.put(`/achievements/${id}`, data);
  }
}