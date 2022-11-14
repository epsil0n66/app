export default function ({ $axios, redirect, store }) {
  // $axios.onRequest((config) => {
  //   console.log('Making request to ' + config.url)
  //   console.log(store.getters.getToken)
  // })
  // $axios.onResponse((response) => {
  //   console.log('Making response to ' + response)
  // })

  $axios.onError(async (error) => {
    const code = parseInt(error.response && error.response.status)
    console.log('Request error')
    if (code === 400) {
      console.log('Request error ' + error.response)
      redirect('/400')
    }
    if (code === 401) {
      console.log('Authorization error ' + error.response.status + JSON.stringify(error.config))
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
  })
}
