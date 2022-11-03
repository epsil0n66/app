import { AuthAPI } from '@/api/Auth'
export const state = () => ({
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  userRole: localStorage.getItem('userRole') || null
})

export const getters = {
  getUserRole (state) {
    return state.userRole
  },
  getToken (state) {
    return state.token
  },
  getRefreshToken (state) {
    return state.refreshToken
  },
  getAlertText (state) {
    return state.alertText
  },
  getAlertType (state) {
    return state.alertType
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  setRefreshToken (state, refreshToken) {
    state.refreshToken = refreshToken
    localStorage.setItem('refreshToken', refreshToken)
  },
  setUserRole (state, userRole) {
    state.userRole = userRole
    localStorage.setItem('userRole', userRole)
  },
  setAlert (state, alertText, alertType) {
    state.alertText = alertText
    state.alertType = alertType
  },
  deleteToken (state) {
    state.token = null
    localStorage.removeItem('token')
  },
  deleteRefreshToken (state) {
    state.refreshToken = null
    localStorage.removeItem('refreshToken')
  },
  deleteUserRole (state) {
    state.userRole = null
    localStorage.removeItem('userRole')
  }
}

export const actions = {
  async onSignIn ({ commit }, { email, password }) {
    await AuthAPI.login(email, password).then((res) => {
      commit('setToken', res.headers.authorization)
      if (res.headers.refresh) {
        commit('setRefreshToken', res.headers.refresh)
      }
      commit('setUserRole', 'registered')
      this.$axios.defaults.headers.Authorization = `Bearer ${res.headers.authorization}`
      this.$router.push({
        path: '/main'
      })
    })
  },
  async onSignUp ({ commit }, { email, registrationToken }) {
    await AuthAPI.confirm(email, registrationToken).then((res) => {
      commit('setToken', res.headers.authorization)
      commit('setRefreshToken', res.headers.refresh)
      commit('setUserRole', 'registered')
      localStorage.setItem('userRole', 'registered')
      this.$router.push({ path: '/main' })
    })
  },
  async onPasswordChange ({ commit }, { email, recoveryToken }) {
    await AuthAPI.recovery(email, recoveryToken).then((res) => {
      commit('setToken', res.headers.authorization)
      commit('setRefreshToken', res.headers.refresh)
      commit('setUserRole', 'registered')
      localStorage.setItem('userRole', 'registered')
      this.$router.push({ path: '/main' })
    })
  },
  onSignOut ({ commit }) {
    localStorage.setItem('userRole', 'guest')
    commit('setToken', null)
    commit('setRefreshToken', null)
    commit('setUserRole', 'guest')
    delete this.$axios.defaults.headers.Authorization
  }
}
