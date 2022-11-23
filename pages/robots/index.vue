<template>
  <v-app>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-card
        flat
        style="margin-left: 7.3vw; margin-right: 7.3vw;"
        class="main-card"
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
              style="cursor:pointer"
              @click="clearFilters"
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
                    @keyup="filterQuery"
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
                    single-line
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
                    single-line
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
                    return-object
                    hide-details
                    dense
                    outlined
                    single-line
                    item-text="name"
                    class="mx-2 rounded-lg"
                    :items="filters.exchangeItems"
                    @change="filterQuery"
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
                    item-text="name"
                    return-object
                    dense
                    outlined
                    multiple
                    single-line
                    class="mx-2 rounded-lg"
                    :items="filters.currencyItems"
                  >
                    <template
                      #selection="{ item, index }"
                    >
                      <v-chip
                        v-if="index <= 1"
                      >
                        <span>{{ item.name }}</span>
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
              v-for="(item, index) in filters.filteredChips"
              :key="index"
              color="green"
              outlined
              close
              class="mx-2 mb-2 chip"
              @click:close="filters.filteredChips = filters.filteredChips.filter(filter => filter !== item); filters.currency = filters.filteredChips"
            >
              {{ item.name }}
            </v-chip>
          </v-row>
        </v-card>
        <div
          style="z-index: 1; position:relative"
          width="90vw"
        >
          <RobotsTable
            :hide-footer="true"
            :robots-table-data="robotsTableData"
            :robots-path="'robots'"
          />
          <v-pagination
            v-model="filters.page"
            class="my-8"
            :length="robotsTableTotalPages"
            :total-visible="4"
          />
        </div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import RobotsTable from '~/components/robotsTable.vue'
import config from '@/config'
export default {
  name: 'ArobotsFrontendRobots',
  components: { RobotsTable },
  data () {
    return {
      demoToken: null,
      demoRefreshToken: null,
      demoUserRole: null,
      robotsTableData: [],
      robotsTableTotalRobots: 0,
      robotsTableTotalPages: 1,
      filters: {
        filterQuery: '',
        search: null,
        profit: null,
        profitItems: ['0 - 10', '10 - 20', '30 - 40', '90 - 100'],
        life: null,
        lifeItems: ['>1m', '>3m', '>12m'],
        exchange: null,
        exchangeItems: [],
        currency: null,
        currencyItems: [],
        filteredChips: null,
        page: 1
      }
    }
  },
  watch: {
    'filters.page' () {
      this.filterQuery()
    },
    'filters.currency' () {
      this.filterQuery()
    }
  },
  mounted () {
    this.UserRole = this.$store.getters.getUserRole
    this.Token = this.$store.getters.getToken
    this.RefreshToken = this.$store.getters.getRefreshToken
    this.$axios.get(`${config.apiUrl}/robots`).then((res) => {
      this.robotsTableData = res.data.robots
      this.robotsTableTotalRobots = res.data.meta.robots_total
      this.robotsTableTotalPages = Math.ceil(this.robotsTableTotalRobots / 25)
    })
    this.$axios.get(`${config.apiUrl}/currencies`).then((res) => {
      console.log(res.data)
      this.filters.currencyItems = res.data
    })
    this.$axios.get(`${config.apiUrl}/exchanges`).then((res) => {
      console.log(res.data)
      this.filters.exchangeItems = res.data
    })
  },
  methods: {
    filterChips (item) {
      this.filters.filteredChips.filter(filter => filter !== item)
    },
    filterQuery () {
      this.filters.filterQuery = ''
      if (this.filters.page) {
        this.filters.filterQuery += `page=${this.filters.page}&`
      }
      if (this.filters.search) {
        this.filters.filterQuery += `search_by_field=${this.filters.search}&`
      }
      if (this.filters.exchange) {
        this.filters.filterQuery += `exchange_id=${this.filters.exchange.id}&`
      }
      if (this.filters.currency) {
        let result = JSON.stringify(this.filters.currency.map(item => `currency_ids[]=${item.id}`)).replace(/,/g, '&').replace(/"/g, '')
        result = result.slice(1, result.lastIndexOf(']'))
        this.filters.filterQuery += `${result}`
      }
      this.filters.filteredChips = this.filters.currency
      this.$axios.get(`${config.apiUrl}/robots?${this.filters.filterQuery}`).then((res) => {
        this.robotsTableData = res.data.robots
      })
    },
    clearFilters () {
      this.filters.search = null
      this.filters.profit = null
      this.filters.life = null
      this.filters.exchange = null
      this.filters.currency = null
      this.filterQuery()
    }
  }
}
</script>

<style>

.v-chip.v-size--default {
  border-radius: 12px;
}
.main-card.v-card.v-card--flat.v-sheet.theme--light {
  background-color: transparent;
}
.v-data-table-header {
  width: 90vw;
}
</style>
