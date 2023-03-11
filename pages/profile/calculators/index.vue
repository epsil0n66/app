<template>
  <v-app>
    <v-main>
      <div>
        <v-card
          flat
          style="margin-left: 8vw; margin-right: 8vw; background-color: transparent;"
        >
          <v-row
            no-gutters
          >
            <h1>Calculators</h1>
            <v-spacer />
          </v-row>
          <v-row>
            <v-col
              cols="4"
            >
              <h2>Ипотечный калькулятор</h2>
              <v-slider
                v-model="mortgageCalc.percentage"
                class="mt-4"
                min="3"
                max="30"
                step="0.1"
                :thumb-label="true"
                thumb-color="green"
                label="Процент ипотеки"
              />
              <v-text-field
                v-model="mortgageCalc.percentage"
                suffix="%"
                hide-details
                label="Процент ипотеки"
                outlined
              />
              <v-slider
                v-model="mortgageCalc.total"
                class="mt-8"
                min="500000"
                max="30000000"
                step="100000"
                label="Стоимость недвижимости"
              />
              <v-text-field
                v-model="formattedMortgageTotal"
                hide-details
                label="Стоимость недвижимости"
                outlined
              />
              <v-slider
                v-model="mortgageCalc.initialFee"
                class="mt-8"
                :min="mortgageCalc.total / 100 * 15"
                :max="mortgageCalc.total / 100 * 95"
                step="100000"
                label="Первоначальный взнос"
              />
              <v-text-field
                v-model="mortgageCalc.initialFee"
                hide-details
                label="Первоначальный взнос"
                outlined
              />
              <v-slider
                v-model="mortgageCalc.duration"
                class="mt-8"
                min="1"
                :max="30"
                label="Срок кредита"
              />
              <v-text-field
                v-model="mortgageCalc.duration"
                hide-details
                label="Срок кредита"
                outlined
              />
            </v-col>
            <v-spacer />
            <v-col
              cols="6"
            >
              <p
                class="mb-2"
              >
                Ежемесячный платеж
              </p>
              <h1> {{ mortgagePayment }} </h1>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'TreasurerFrontendAddedstocks',
  data () {
    return {
      mortgageCalc: {
        percentage: 0,
        total: 0,
        initialFee: 0,
        duration: 0
      },
      mortgagePayment: 0
    }
  },
  computed: {
    formattedMortgageTotal () {
      return new Intl.NumberFormat().format(this.mortgageCalc.total)
    }
  },
  watch: {
    mortgageCalc: {
      handler: function (newMortgage) {
        this.mortgagePayment = ((newMortgage.total - newMortgage.initialFee) * (newMortgage.percentage / 12)) / (1 - (1 + newMortgage.percentage / 12) * (1 - newMortgage.duration * 12))
        this.mortgagePayment = Math.floor(this.mortgagePayment)
      },
      deep: true
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
