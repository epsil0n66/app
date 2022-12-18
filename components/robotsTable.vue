<template>
  <div>
    <RentRobot
      ref="rent"
    />
    <v-data-table
      :headers="robotsTableHeaders"
      :items="robotsTableData"
      :hide-default-footer="hideFooter"
      :items-per-page="10"
      class="elevation-0"
    >
      <template #[`item.robots`]="{ item }">
        <v-container
          class="pa-0 mx-auto"
        >
          <v-row
            class="ma-0 align-center"
          >
            <img
              src="@/static/arobots.png"
              height="40px"
              width="40px"
              style="border-radius: 12px;"
            >
            <v-col>
              <p
                style="cursor:pointer"
                class="text-md-body-1 mb-1 font-weight-bold"
                @click="$router.push(`${robotsPath}/${item.id}`)"
              >
                {{ item.name }}
              </p>
              <p
                class="text-caption mb-1 text--secondary"
              >
                {{ item.creator.nickname }}
              </p>
            </v-col>
          </v-row>
          {{ item.robots }}
        </v-container>
      </template>
      <template #[`item.currency`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <IconCrypto
            class="mr-1"
            :coinname="item.currency.name.split('/')[0]"
            color="color"
            format="svg"
            height="20px"
            width="20px"
          />
          <p
            class="mb-0"
          >
            {{ item.currency.name.split('/')[0] }}
          </p>
          <p
            class="mb-0 ml-1"
          >
            /
          </p>
          <IconCrypto
            class="mx-1"
            :coinname="item.currency.name.split('/')[1]"
            color="color"
            format="svg"
            height="20px"
            width="20px"
          />
          <p
            class="mb-0"
          >
            {{ item.currency.name.split('/')[1] }}
          </p>
        </v-row>
      </template>
      <template #[`item.exchange`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <IconCrypto
            class="mr-1"
            coinname="BNB"
            color="color"
            format="svg"
            height="20px"
            width="20px"
          />
          <p
            class="mb-0"
          >
            {{ item.exchange.name }}
          </p>
        </v-row>
      </template>
      <template #[`item.profit`]="{ item }">
        <v-row
          no-gutters
          dense
          class="ma-0 px-2 align-center justify-center"
          :style="[item.profit > 0 ? {'border': 'solid 1px green'} : { 'border': 'solid 1px red' }]"
          style="border-radius: 16px;"
        >
          <v-icon
            v-if="item.profit > 0"
            color="green"
          >
            mdi-trending-up
          </v-icon>
          <v-icon
            v-else
            color="red"
          >
            mdi-trending-down
          </v-icon>
          <p
            class="mb-0 ml-1 text-caption"
            :style="[item.profit > 0 ? { 'color': 'green' } : { 'color': 'red' }]"
          >
            {{ item.profit }}%
          </p>
        </v-row>
      </template>
      <template #[`item.trades`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <v-icon
            color="green"
          >
            mdi-swap-horizontal
          </v-icon>
          <p
            class="mb-0 ml-1"
          >
            {{ item.trades }}
          </p>
        </v-row>
      </template>
      <template #[`item.time`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <v-icon
            color="green"
          >
            mdi-clock-time-three-outline
          </v-icon>
          <p
            class="mb-0 ml-1"
          >
            {{ item.timeframe.time }} {{ item.timeframe.name }}
          </p>
        </v-row>
      </template>
      <template #[`item.chart`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <v-sparkline
            :fill="false"
            :gradient="['green']"
            :line-width="2"
            :padding="8"
            :smooth="10"
            :value="item.chart"
            auto-draw
          />
        </v-row>
      </template>
      <template #[`item.menu`]="{ item }">
        <v-row
          class="ma-0 align-center"
        >
          <v-btn
            color="green"
            class="text-none"
            height="4.5vh"
            width="5.5vw"
            style="border-radius:12px ;"
            outlined
            @click="rent(item.id, item.exchange.id)"
          >
            Rent
          </v-btn>
          <v-icon
            v-if="item.favorite"
            small
            class="ml-2"
            color="green"
            @click="favorite(item)"
          >
            mdi-star
          </v-icon>
          <v-icon
            v-else
            small
            class="ml-2"
            color="green"
            @click="favorite(item)"
          >
            mdi-star-outline
          </v-icon>
          <v-icon
            small
            class="ml-2"
            color="green"
          >
            mdi-chevron-down
          </v-icon>
          <p
            class="mb-0 ml-1"
          >
            {{ item.menu }}
          </p>
        </v-row>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
import RentRobot from './rentRobot.vue'
import config from '@/config'
Vue.use(IconCrypto)
export default {
  name: 'ArobotsFrontendAddedRobots',
  components: { RentRobot },
  props: ['robotsTableData', 'hideFooter', 'robotsPath'],
  data () {
    return {
      robotsTableHeaders: [
        { text: 'Trading robots', value: 'robots' },
        { text: 'Currency', value: 'currency' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'Profit', value: 'profit' },
        { text: 'Trades', value: 'trades' },
        { text: 'Time', value: 'time' },
        { text: 'Chart of trading', value: 'chart' },
        { text: '', sortable: false, value: 'menu' }
      ],
      robotsTable: [
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
