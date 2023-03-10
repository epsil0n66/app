/* eslint-disable camelcase */
import { LoginAPIInstance, DefaultAPIInstance } from '@/api'

export const AuthAPI = {
  login (email, password) {
    const url = '/user/session'
    const data = { email, password }
    return LoginAPIInstance.post(url, data)
    // return null
  },
  confirm (email, registration_token) {
    const url = '/user/email/confirmation'
    const data = { email, registration_token }
    return LoginAPIInstance.post(url, data)
  },
  recovery (email, recovery_token) {
    const url = '/user/password_recovery/confirmation'
    const data = { email, recovery_token }
    return LoginAPIInstance.post(url, data)
  },
  refresh (refresh_token) {
    const url = '/user/session/refresh'
    const data = { refresh_token }
    return DefaultAPIInstance.post(url, data)
  }
}
export const UserAPI = {
  profile () {
    const url = '/user/profile'
    return DefaultAPIInstance.get(url)
  }
}
