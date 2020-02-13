import { ApiNoAuth, ApiGeneral } from './api'

export default {
  login(credential) {
    return ApiNoAuth.post(`/auth`, credential);
  },
  userDetail() {
    return ApiGeneral.get(`/auth/details`);
  }
}