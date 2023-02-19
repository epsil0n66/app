<template>
  <div>
    <v-card
      flat
      style="margin-left: 8vw; margin-right: 8vw; background-color: transparent;"
    >
      <v-row
        no-gutters
      >
        <h1>Favorite stocks</h1>
        <v-spacer />
      </v-row>
      <stocksTable
        :hide-footer="true"
        :stocks-table-data="stocksTableData"
        :stocks-path="'/stocks'"
      />
    </v-card>
  </div>
</template>

<script>
import config from '~/config'
import stocksTable from '~/components/stocksTable.vue'
export default {
  name: 'TreasurerFrontendFavorites',
  components: { stocksTable },

  data () {
    return {
      stocksTableData: []
    }
  },

  mounted () {
    this.$axios.get(`${config.apiUrl}/favorites`).then((res) => {
      this.stocksTableData = res.data.map(el => el.robot)
    })
      .catch((e) => {
        if (e.response.status === 401) {
          this.$axios.get(`${config.apiUrl}/favorites`).then((res) => {
            this.stocksTableData = res.data.map(el => el.robot)
          })
        }
      })
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
