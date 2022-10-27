<template>
  <div />
</template>

<script>
export default {
  name: 'ArobotsFrontendRecoveryConfirm',
  layout: 'main',
  data () {
    return {
      email: null,
      recoveryToken: null
    }
  },

  async mounted () {
    const url = document.URL
    this.email = decodeURI(url.slice(url.indexOf('=') + 1, url.indexOf('&')).replace('%40', '@'))
    this.recoveryToken = url.slice(url.indexOf('=') + 1).slice(url.slice(url.indexOf('=') + 1).indexOf('=') + 1)
    console.log(this.email)
    console.log(this.recoveryToken)
    try {
      await this.$store.dispatch('onPasswordChange', {
        email: this.email,
        recoveryToken: this.recoveryToken
      })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {

  }
}
</script>

  <style lang="scss" scoped>

  </style>
