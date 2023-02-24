<template>
  <div>
    <v-card
      v-if="userPortfolios.length < 1"
      class="d-flex align-center justify-center flex-column"
      style="margin-left: 7.5vw; margin-right: 7.5vw; margin-top: 4vh;"
    >
      <h1>Вы еще не создали инвестиционный портфель</h1>
      <v-btn
        @click="showCreatePortfolioForm = true"
      >
        Создать
      </v-btn>
      <v-card
        v-if="showCreatePortfolioForm"
      >
        <h1>
          Настройки портфеля
        </h1>
        <v-text-field
          v-model=" createPortfolioForm.amount"
          name="name"
          label="label"
        />
        <v-btn
          @click="createPortfolio"
        >
          Готово
        </v-btn>
      </v-card>
    </v-card>
    <v-card
      v-else
    >
      <apexchart width="380" type="donut" :options="options" :series="pieChartSeries" />
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'AppDashboard',
  components: { apexchart: VueApexCharts },
  data () {
    return {
      userPortfolios: [],
      portfolios: [],
      createPortfolioForm: {
        amount: 0
      },
      showCreatePortfolioForm: false,
      options: {
        labels: []
      },
      pieChartSeries: []
    }
  },
  watch: {
    'createPortfolioForm.amount': function () {
      if (typeof this.createPortfolioForm.amount === 'number') {
        console.log('done')
      } else {
        this.createPortfolioForm.amount = Number(this.createPortfolioForm.amount)
      }
    },
    userPortfolios () {
      this.pieChartSeries = this.userPortfolios.map((el) => { return el.totalPrice })
      this.options.labels = this.userPortfolios.map((el) => { return el.name })
      console.log(this.pieChartSeries, this.options.labels)
    }
  },
  mounted () {
    this.$axios.get('https://iss.moex.com/iss/engines/stock/markets/shares/securities.json')
      .then((res) => {
        this.portfolios = res.data.securities.data.map((el) => { return { short: el[0], name: el[2], price: el[3], type: el[7] } }).filter(el => typeof el.price === 'number')
      })
  },

  methods: {
    createPortfolio () {
      const totalAmount = this.createPortfolioForm.amount
      const parts = 2
      const partAmount = totalAmount / parts
      for (let i = 0; i < parts; i++) {
        let num
        do {
          num = Math.floor(Math.random() * this.portfolios.length)
        } while (this.portfolios[num].price > partAmount)
        this.userPortfolios.push(
          {
            name: this.portfolios[num].name,
            quantity: Math.floor(partAmount / this.portfolios[num].price),
            totalPrice: Math.floor(partAmount / this.portfolios[num].price) * this.portfolios[num].price
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
