<template>
  <v-app>
    <v-card
      width="1166px"
      class="mx-auto my-8 pa-2 rounded-lg"
    >
      <v-row>
        <p
          class="font-display ml-5 mt-5"
        >
          Filters
        </p>
        <v-spacer />
        <p
          class="font-display mr-5 mt-5 green--text"
        >
          Clear all
        </p>
      </v-row>
      <v-row
        align-content="center"
        class="px-2"
      >
        <v-col
          cols="2"
          class="ma-0 pa-0"
        >
          <v-text-field
            label="Search"
            dense
            outlined
            class="mx-2 rounded-lg"
          />
        </v-col>
        <v-col
          cols="2"
          class="ma-0 pa-0"
        >
          <v-select
            label="Profit"
            hide-details
            dense
            outlined
            class="mx-2 rounded-lg"
            :items="['0 - 10', '10 - 20', '30 - 40', '90 - 100']"
          />
        </v-col>
        <v-col
          cols="2"
          class="ma-0 pa-0"
        >
          <v-select
            label="Life"
            hide-details
            dense
            outlined
            class="mx-2 rounded-lg"
            :items="['>1m', '>3m', '>12m']"
          />
        </v-col>
        <v-col
          cols="4"
          class="ma-0 pa-0"
        >
          <v-autocomplete
            v-model="value"
            label="Currency"
            hide-details
            dense
            outlined
            multiple
            class="mx-2 rounded-lg"
            :items="['USDT / USDT', 'USDT / UDDT', 'UWWT / USDT', 'USDT / UADT', 'USDT / WADT']"
          >
            <template
              #selection="{ item, index }"
            >
              <v-chip
                v-if="index <= 1"
              >
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 2"
                class="grey--text text-caption"
              >
                (+{{ value.length - 2 }} others)
              </span>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="2"
          class="ma-0 pa-0"
        >
          <v-select
            label="Exchange"
            hide-details
            dense
            outlined
            single-line
            class="mx-2 rounded-lg"
            :items="['Coinbase', 'Binance', 'Huobi Global']"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card
      width="1166px"
      class="mx-auto"
      flat
    >
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
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
                  class="text-md-body-1 mb-1 font-weight-bold"
                >
                  Traderist
                </p>
                <p
                  class="text-caption mb-1 text--secondary"
                >
                  Company Robots
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
              :coinname="item.currency.split('/')[0]"
              color="color"
              format="svg"
              height="20px"
              width="20px"
            />
            <p
              class="mb-0"
            >
              {{ item.currency.split('/')[0] }}
            </p>
            <p
              class="mb-0 ml-1"
            >
              /
            </p>
            <IconCrypto
              class="mx-1"
              :coinname="item.currency.split('/')[1]"
              color="color"
              format="svg"
              height="20px"
              width="20px"
            />
            <p
              class="mb-0"
            >
              {{ item.currency.split('/')[1] }}
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
              {{ item.exchange }}
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
              {{ item.time }}
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
              class="rounded-lg"
              outlined
            >
              Rent
            </v-btn>
            <v-icon
              small
              class="ml-2"
              color="green"
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
    </v-card>
    <v-card
      class="mx-auto"
      width="50vw"
    />
  </v-app>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
Vue.use(IconCrypto)
export default {
  name: 'ArobotsFrontendTest',
  layout: 'main',
  data () {
    return {
      headers: [
        { text: 'Trading robots', value: 'robots' },
        { text: 'Currency', value: 'currency' },
        { text: 'Exchange', value: 'exchange' },
        { text: 'Profit', value: 'profit' },
        { text: 'Trades', value: 'trades' },
        { text: 'Time', value: 'time' },
        { text: 'Chart of trading', value: 'chart' },
        { text: '', sortable: false, value: 'menu' }
      ],
      desserts: [
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
    console.log(this.$store.state.counter)
  },

  methods: {

  }
}
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
thead::after
{
    content: "";
    display: block;
    height: 8px;
    width: 100%;
    background: white;
}
.v-data-table > .v-data-table__wrapper > table {
    border-spacing: 0 8px;
}
tbody {
    background-color: white;
}
tr {
    line-height: 56px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
}
td:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
td:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}
th {
    background-color: white;
}
th:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    box-shadow: -12px 0px 12px rgba(0, 0, 0, 0.06);
}
th:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 12px 0px 12px rgba(0, 0, 0, 0.06);
}

</style>
