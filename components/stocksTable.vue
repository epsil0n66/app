<template>
  <div>
    <RentRobot
      ref="rent"
    />
    <v-data-table
      :headers="stocksTableHeaders"
      :items="stocksTableData"
      :items-per-page="10"
      class="elevation-0"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
import RentRobot from './rentRobot.vue'
import config from '@/config'
Vue.use(IconCrypto)
export default {
  name: 'TreasurerFrontendAddedstocks',
  components: { RentRobot },
  props: ['stocksTableData', 'hideFooter', 'stocksPath'],
  data () {
    return {
      stocksTableHeaders: [
        { text: 'Аббревиатура', value: 'short' },
        { text: 'Название', value: 'name' },
        { text: 'Цена', value: 'price' },
        { text: 'Тип', value: 'type' }
      ],
      stocksTable: [
        {
          currency: 'USDT/BNB',
          exchange: 'Binance',
          profit: 92,
          trades: 242,
          time: '1y 5m',
          chart: [5, 2, 5, 9, 10, 3, 9, 1, 8, 0]
        },
        {
          currency: 'ETH/USD',
          exchange: 'Binance',
          profit: -92,
          trades: 122,
          time: '1y 3m',
          chart: [1, 2, 5, 9, 2, 5, 10, 8, 3, 5]
        },
        {
          currency: 'RUB/ADA',
          exchange: 'Binance',
          profit: 5,
          trades: 32,
          time: '3m',
          chart: [3, 9, 1, 10, 8, 2, 1, 4, 6, 5]
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    rent (robotID, exchangeID) {
      this.$refs.rent.checkKey(robotID, exchangeID)
    },
    favorite (robot) {
      if (robot.favorite === false) {
        this.$axios.post(`${config.apiUrl}/favorites`, { robot_id: robot.id })
          .then(() => {
            robot.favorite = !robot.favorite
          })
      } else {
        this.$axios.delete(`${config.apiUrl}/favorites/${robot.id}`)
          .then(() => {
            robot.favorite = !robot.favorite
          })
      }
    }
  }
}
</script>

  <style lang="scss" scoped>

  </style>
