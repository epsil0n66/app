<template>
  <div>
    <v-card
      flat
      style="margin-left: 8vw; margin-right: 8vw; background-color: transparent;"
    >
      <v-row
        no-gutters
      >
        <h1>Favorite robots</h1>
        <v-spacer />
      </v-row>
      <RobotsTable
        :hide-footer="true"
        :robots-table-data="robotsTableData"
        :robots-path="'/robots'"
      />
    </v-card>
  </div>
</template>

<script>
import config from '~/config'
import RobotsTable from '~/components/robotsTable.vue'
export default {
  name: 'ArobotsFrontendFavorites',
  components: { RobotsTable },

  data () {
    return {
      robotsTableData: []
    }
  },

  mounted () {
    this.$axios.get(`${config.apiUrl}/favorites`).then((res) => {
      this.robotsTableData = res.data.map(el => el.robot)
    })
      .catch((e) => {
        if (e.response.status === 401) {
          this.$axios.get(`${config.apiUrl}/favorites`).then((res) => {
            this.robotsTableData = res.data.map(el => el.robot)
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
