import { ApiGeneral } from './api'

export default {
  getAllRecruitment(params) {
    return ApiGeneral.get(`/recrutiment`, {
      params: {
        tahap: params
      }
    })
  }
}