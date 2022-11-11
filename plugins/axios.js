export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })
  $axios.onResponse((response) => {
    console.log('Making response to ' + response)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    console.log('Request error')
    if (code === 400) {
      console.log('Request error ' + error.response)
      redirect('/400')
    }
    if (code === 401) {
      console.log('Authorization error' + error.response.status)
    }
  })
}
