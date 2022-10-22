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
  logout () {
    const url = '/logout'
    return DefaultAPIInstance.post(url)
    // return null
  }
}
