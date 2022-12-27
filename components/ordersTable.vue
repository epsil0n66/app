<template>
  <div>
    <v-data-table
      :headers="ordersTableHeaders"
      :items="ordersTableData"
      :items-per-page="10"
      class="elevation-0 mb-8"
    />
  </div>
</template>

<script>
export default {
  name: 'ArobotsFrontendOrdersTable',
  props: ['ordersTableData'],
  data () {
    return {
      ordersTableHeaders: [
        { text: 'Open', value: 'open' },
        { text: 'Side', value: 'side' },
        { text: 'Price', value: 'price' },
        { text: 'Profit', value: 'profit' }
      ],
      ordersTable: [
        {
          open: '23.12.22',
          side: 'Buy / Sell',
          price: '0.025413 / 0.0345987',
          profit: '+12%'
        },
        {
          open: '22.12.22',
          side: 'Sell /Buy',
          price: '0.0345987 / 0.025413',
          profit: '+9%'
        },
        {
          open: '22.12.22',
          side: 'Buy / Sell',
          price: '0.025413 / 0.0345987',
          profit: '+34%'
        }
      ]
    }
  },

  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
