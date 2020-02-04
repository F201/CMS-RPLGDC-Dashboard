import { ApiGeneral } from './api'

export default {
  getAllAchievement() {
    return ApiGeneral.get(`/achievements`)
  }
}