<template>
  <v-app>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-card
        flat
        style="margin-left: 7.3vw; margin-right: 7.3vw;"
      >
        <h1>
          Arobots
        </h1>
        <v-card
          style="margin-left: 7.3vw; margin-right: 7.3vw; z-index: 1;"
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
          <v-row no-gutters class="pb-4">
            <v-col
              cols="12"
              md="6"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="4"
                  class="pb-4"
                >
                  <v-text-field
                    v-model="filters.search"
                    label="Search"
                    hide-details
                    dense
                    outlined
                    class="mx-2 rounded-lg"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="pb-4"
                >
                  <v-select
                    v-model="filters.profit"
                    label="Profit"
                    hide-details
                    dense
                    outlined
                    class="mx-2 rounded-lg"
                    :items="filters.profitItems"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="pb-4"
                >
                  <v-select
                    v-model="filters.life"
                    label="Life"
                    hide-details
                    dense
                    outlined
                    class="mx-2 rounded-lg"
                    :items="filters.lifeItems"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-select
                    v-model="filters.exchange"
                    label="Exchange"
                    hide-details
                    dense
                    outlined
                    single-line
                    class="mx-2 rounded-lg"
                    :items="filters.exchangeItems"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="8"
                  class="pb-4"
                >
                  <v-autocomplete
                    v-model="filters.currency"
                    label="Currency"
                    hide-details
                    dense
                    outlined
                    multiple
                    class="mx-2 rounded-lg"
                    :items="filters.currencyItems"
                    @change="filterChipsFunction"
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
                        (+{{ filters.currency.length - 2 }} others)
                      </span>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-chip
            class="mx-2 mb-2"
            v-for="(item, index) in filters.filteredChips"
            :key="index"
            >
            {{ item }}
            </v-chip>
          </v-row>
        </v-card>
        <div
          style="z-index: 1; position:relative"
        >
          <v-data-table
            :headers="robotsTableHeaders"
            :items="robotsTable"
            :items-per-page="5"
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
                  class="text-none"
                  height="4.5vh"
                  width="5.5vw"
                  style="border-radius:12px ;"
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
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import IconCrypto from 'vue-cryptocurrency-icons'
Vue.use(IconCrypto)
export default {
  name: 'ArobotsFrontendMain',
  data () {
    return {
      demoToken: null,
      demoRefreshToken: null,
      demoUserRole: null,
      filters: {
        search: null,
        profit: null,
        profitItems: ['0 - 10', '10 - 20', '30 - 40', '90 - 100'],
        life: null,
        lifeItems: ['>1m', '>3m', '>12m'],
        exchange: null,
        exchangeItems: ['Coinbase', 'Binance', 'Huobi Global'],
        currency: null,
        currencyItems: ['USDT / USDT', 'USDT / UDDT', 'UWWT / USDT', 'USDT / UADT', 'USDT / WADT'],
        filteredChips: null
      },
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
    this.UserRole = this.$store.getters.getUserRole
    this.Token = this.$store.getters.getToken
    this.RefreshToken = this.$store.getters.getRefreshToken
  },

  methods: {
    filterChipsFunction () {
      this.filters.filteredChips = this.filters.currency
    }
  }
}
</script>

<style>
thead::after
{
    content: "";
    display: block;
    height: 8px;
    width: 100%;
}
.v-data-table > .v-data-table__wrapper > table {
    border-spacing: 0 8px;
}
.theme--light.v-data-table {
  background-color: transparent;
}
tbody {
    background-color: white;
}
tr {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06);
}
td:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
.v-data-table > .v-data-table__wrapper tbody tr:first-child:hover td:first-child {
    border-top-left-radius: 12px;
}
.v-data-table > .v-data-table__wrapper tbody tr:first-child:hover td:last-child {
    border-top-right-radius: 12px;
}
.v-data-table--has-bottom > .v-data-table__wrapper > table > tbody > tr:last-child:hover > td:first-child {
    border-bottom-left-radius: 12px;
}
.v-data-table--has-bottom > .v-data-table__wrapper > table > tbody > tr:last-child:hover > td:last-child {
    border-bottom-right-radius: 12px;
}
td:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}
td:first-child:hover {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
td:last-child:hover {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}
th {
    background-color: rgb(255, 255, 255);
    max-height: 32px;
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
