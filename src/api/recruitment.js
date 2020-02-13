import { ApiGeneral } from './api'

export default {
  getAllRecruitment(params) {
    return ApiGeneral.get(`/recruitment`, {
      params: params
    })
  },
  getDetailRecruitment(id) {
    return ApiGeneral.get(`/recruitment/detail/${id}`)
  },
  setLulusThp1(id) {
    return ApiGeneral.put(`/recruitment/grade1/${id}`)
  },
  undoLulusThp2(id) {
    return ApiGeneral.put(`/recruitment/ungrade2/${id}`)
  },
  undoLulusThp1(id) {
    return ApiGeneral.put(`/recruitment/ungrade1/${id}`)
  },
  setLulusThp2(id) {
    return ApiGeneral.put(`/recruitment/grade2/${id}`)
  },
  getSumThp1() {
    return ApiGeneral.get(`/recruitment/sumpass1`)
  },
  getSumThp2() {
    return ApiGeneral.get(`/recruitment/sumpass2`)
  },
}