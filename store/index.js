// import { AuthAPI } from '@/api/Auth'

export const state = () => ({
  token: localStorage.getItem('token') || null,
  userRole: localStorage.getItem('userRole') || null
})

export const getters = {
  getUserRole (state) {
    return state.userRole
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  setUserRole (state, userRole) {
    state.userRole = userRole
    localStorage.setItem('userRole', userRole)
  },
  deleteToken (state) {
    state.token = null
    localStorage.removeItem('token')
  },
  deleteUserRole (state) {
    state.userRole = null
    localStorage.removeItem('userRole')
  }
}

export const actions = {
  onLogin ({ commit }, { email, password }) {
    console.log(email, password)
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
    // AuthAPI.login({ email, password }).then((res) => {
    // commit('setToken', res.headers.authorization)
    //   commit('setUserRole', 'registered')
    // })
  },
  onLogout ({ commit }) {
    localStorage.setItem('userRole', 'guest')
    commit('setToken', null)
    commit('setUserRole', 'guest')
  }
}
