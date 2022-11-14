import { AuthAPI, UserAPI } from '@/api/Auth'
import { DefaultAPIInstance } from '@/api'

export const state = () => ({
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  userRole: localStorage.getItem('userRole') || null,
  nickname: localStorage.getItem('nickname') || null
})

export const getters = {
  getUserRole (state) {
    return state.userRole
  },
  getUserNickname (state) {
    return state.nickname
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
  setUserNickname (state, nickname) {
    state.nickname = nickname
    localStorage.setItem('nickname', nickname)
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
    state.userRole = 'guest'
    localStorage.removeItem('userRole')
  },
  deleteUserNickname (state) {
    state.nickname = null
    localStorage.removeItem('nickname')
  }
}

export const actions = {
  async onSignIn ({ commit, dispatch }, { email, password }) {
    await AuthAPI.login(email, password).then((res) => {
      this.$axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        dispatch('onRefresh')
        const response = error.response
        if (response) {
          if (response.status === 401) {
            dispatch('onSignOut')
              .then(this.$router.push('/'))
          }
        }
        return Promise.reject(error)
      })
      commit('setToken', res.headers.authorization)
      this.$axios.defaults.headers.Authorization = `${res.headers.authorization}`
      DefaultAPIInstance.defaults.headers.Authorization = `${res.headers.authorization}`
      if (res.headers.refresh) {
        commit('setRefreshToken', res.headers.refresh)
      }
      commit('setUserRole', 'registered')
      dispatch('onProfile')
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
  async onRefresh ({ commit, getters }) {
    await AuthAPI.refresh(getters.getRefreshToken).then((res) => {
      console.log(res.headers.authorization)
      this.$axios.defaults.headers.Authorization = `${res.headers.authorization}`
      DefaultAPIInstance.defaults.headers.Authorization = `${res.headers.authorization}`
      commit('setToken', res.headers.authorization)
      return 'Done'
    })
  },
  async onProfile ({ commit }) {
    await UserAPI.profile().then((res) => {
      console.log(res.data)
      if (res.data.nickname) {
        commit('setUserNickname', res.data.nickname)
      } else {
        commit('setUserNickname', res.data.email)
      }
    })
  },
  onSignOut ({ commit }) {
    commit('deleteToken')
    commit('deleteRefreshToken')
    commit('deleteUserRole')
    commit('deleteUserNickname')
    delete DefaultAPIInstance.defaults.headers.Authorization
    DefaultAPIInstance.interceptors.response.eject()
  }
}
