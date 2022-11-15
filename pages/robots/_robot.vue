<template>
  <v-main>
    <v-card
      flat
      style="margin-left: 7.3vw; margin-right: 7.3vw;"
    >
      <v-card-text
        style="cursor: pointer;"
        class="text-body-1 px-0 pt-8 green--text"
        @click="$router.push('/robots')"
      >
        <v-icon
          style="cursor: pointer;"
          color="primary"
          class="mb-1"
        >
          mdi-chevron-left
        </v-icon>
        Back
      </v-card-text>
      <v-card>
        <div
          class="ma-6"
        >
          <v-row>
            <img
              style="border-radius: 12px"
              class="ma-6"
              width="100"
              height="100"
              src="@/static/robotexample.png"
            >
            <v-col
              cols="2"
            >
              <h1>{{ robotData.data.name }}</h1>
              <h5 class="text-caption">
                {{ robotData.data.user_creator }}
              </h5>
              <div
                class="ma-0 px-2 d-flex justify-center"
                :style="[99 > 0 ? {'border': 'solid 1px green'} : { 'border': 'solid 1px red' }]"
                style="border-radius: 16px;width: fit-content;"
              >
                <h5>Profit: </h5>
                <v-icon
                  v-if="99 > 0"
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
                  :style="[99 > 0 ? { 'color': 'green' } : { 'color': 'red' }]"
                >
                  {{ 99 }}%
                </p>
              </div>
            </v-col>
            <v-spacer />
            <v-row
              class="justify-end align-start mt-6 mb-3"
            >
              <h5>Currently rents: 12 users</h5>
              <v-icon
                color="green"
              >
                mdi-star-outline
              </v-icon>
              <div
                class="ma-0 px-2 d-flex justify-center align-start"
                style="border-radius: 16px;width: fit-content; border: solid 1px green"
              >
                <v-icon
                  color="green"
                >
                  mdi-circle
                </v-icon>
                <h5>Online </h5>
              </div>
            </v-row>
          </v-row>
          <v-row>
            <v-col
              cols="4"
            >
              <h4> Trading strategy:</h4>
              <h5> This robot will help you earn money. He has been working for a long time and has made many successful deals.</h5>
              <h4>Currency: {{ robotData.data.currency.name }}</h4>
              <h4>Stock: {{ robotData.data.exchange.name }}</h4>
              <span><h4>Trades: {{ robotData.data.worked_orders }}</h4><h4>Time: {{ robotData.data.total_working_time.days }}D {{ robotData.data.total_working_time.hours }}H </h4></span>
              <v-btn
                class="white--texts"
                color="primary"
              >
                Rent
              </v-btn>
            </v-col>
            <v-col
              cols="8"
            >
              <VueTradingView
                class="mb-6"
                :options="{
                  width: '700',
                  height: '400',
                  theme: 'light'
                }"
              />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-card>
  </v-main>
</template>

<script>
import VueTradingView from 'vue-trading-view'
import config from '@/config'

export default {
  components: {
    VueTradingView
  },
  async asyncData ({ params, $axios }) {
    const robotData = await $axios.get(`${config.apiUrl}/robots/${params.robot}`)
    return { robotData }
  },
  data () {
    return {
    }
  }
}
</script>
