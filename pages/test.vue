<template>
  <div>
    <TwLightCharts />
  </div>
</template>

<script>
import TwLightCharts from '~/components/twLightCharts.vue'

export default {
  name: 'TreasurerFrontendTest',
  components: { TwLightCharts },
  data () {
    return {}
  },
  mounted () {
    console.log(this.$store.state.counter)
  },
  methods: {}
}
</script>
