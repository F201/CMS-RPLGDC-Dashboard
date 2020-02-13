import { ApiGeneral } from './api'

export default {
  getAllProduct() {
    return ApiGeneral.get(`/products`)
  },
  createProduct(data) {
    return ApiGeneral.post(`/products`, data)
  },
  getDetailProduct(id) {
    return ApiGeneral.get(`/detail_products/${id}`)
  },
  editProduct({ id, data }) {
    return ApiGeneral.put(`/products/${id}`, data)
  },
  deleteProduct(id) {
    return ApiGeneral.delete(`/products/${id}`)
  }
}