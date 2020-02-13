import { ApiGeneral } from './api'

export default {
  getProductTools(id) {
    return ApiGeneral.get(`/pivot_product_tools/${id}`);
  },
  addProductTool(data) {
    return ApiGeneral.post(`/pivot_product_tools/`, data);
  },
  deleteProductTool(id) {
    return ApiGeneral.delete(`/pivot_product_tools/${id}`);
  }
}