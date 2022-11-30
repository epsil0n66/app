export default function ({ $axios, redirect, store }) {
  // $axios.onRequest((config) => {
  //   console.log('Making request to ' + config.url)
  //   console.log(store.getters.getToken)
  // })
  // $axios.onResponse((response) => {
  //   console.log('Making response to ' + response)
  // })

  $axios.onError(async (error) => {
    console.log(error.response)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      const originalRequest = error.config
      await store.dispatch('onRefresh').then(() => {
        originalRequest.baseUrl = undefined
        originalRequest.headers.Authorization = store.getters.getToken
      })
        .catch(() => {
          store.dispatch('onSignOut')
          redirect('/')
        })
    }
    return Promise.reject(error)
  })
}
