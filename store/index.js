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
  onLogin ({ commit }, { email, password }) {
    AuthAPI.login(email, password).then((res) => {
      console.log(res)
      commit('setToken', res.headers.authorization)
      if (res.headers.refresh) {
        commit('setRefreshToken', res.headers.refresh)
      }
      commit('setUserRole', 'registered')
      localStorage.setItem('userRole', 'registered')
      if (localStorage.getItem('userRole') === 'registered') {
        this.$router.push({
          path: '/main'
        })
      } else {
        this.$router.push({
          path: '/'
        })
      }
    })
  },
  onRegister ({ commit }, { email, registrationToken }) {
    AuthAPI.confirm(email, registrationToken).then((res) => {
      console.log(res)
      commit('setToken', res.headers.authorization)
      commit('setRefreshToken', res.headers.refresh)
      commit('setUserRole', 'registered')
      localStorage.setItem('userRole', 'registered')
      this.$router.push({ path: '/main' })
    })
  },
  onLogout ({ commit }) {
    localStorage.setItem('userRole', 'guest')
    commit('setToken', null)
    commit('setRefreshToken', null)
    commit('setUserRole', 'guest')
  }
}
