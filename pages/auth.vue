<template>
  <div />
</template>

<script>
export default {
  name: 'ArobotsFrontendAuth',
  data () {
    return {
      email: null,
      registration_token: null
    }
  },

  async mounted () {
    const url = document.URL
    this.email = decodeURI(url.slice(url.indexOf('=') + 1, url.indexOf('&')).replace('%40', '@'))
    this.registration_token = url.slice(url.indexOf('=') + 1).slice(url.slice(url.indexOf('=') + 1).indexOf('=') + 1)
    console.log(this.email)
    console.log(this.registration_token)
    try {
      await this.$store.dispatch('onSignUp', {
        email: this.email,
        registrationToken: this.registration_token
      })
    } catch (e) {
      console.log(e)
      this.$router.push('/robots')
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
