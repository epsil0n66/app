export default function ({ $axios }) {
  // $axios.onRequest((config) => {
  //   console.log('Making request to ' + config.url)
  //   console.log(store.getters.getToken)
  // })
  // $axios.onResponse((response) => {
  //   console.log('Making response to ' + response)
  // })

  $axios.onError((error) => {
    console.log(error.response)
    return Promise.reject(error)
  })
}
