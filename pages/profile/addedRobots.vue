<template>
  <v-app>
    <v-main>
      <div>
        <v-card
          flat
          style="margin-left: 8vw; margin-right: 8vw;"
        >
          <v-row
            no-gutters
          >
            <h1>Arobots</h1>
            <v-spacer />
            <v-btn
              height="48px"
              width="150px"
              class="white--text mb-4"
              color="primary"
              @click="addRobot"
            >
              Add robot
            </v-btn>
          </v-row>
          <RobotsTable />
        </v-card>
        <v-dialog
          v-model="addRobotDialog"
          width="50vw"
        >
          <v-card>
            <v-row
              no-gutters
              dense
            >
              <v-spacer />
              <v-icon
                class="ma-3"
                @click="addRobotDialog = false"
              >
                mdi-close-circle-outline
              </v-icon>
            </v-row>
            <div
              style="margin-left:3vw;margin-right:3vw"
            >
              <h1
                class="mb-8"
              >
                Add robot
              </h1>
              <v-container
                no-gutters
              >
                <v-row
                  no-gutters
                >
                  <img
                    style="border-radius: 12px"
                    class="mb-4"
                    width="100"
                    height="100"
                    src="@/static/robotexample.png"
                  >
                  <v-col
                    class="ml-4"
                  >
                    <h3
                      class="mb-2"
                    >
                      Avatar
                    </h3>
                    <p
                      class="mb-1"
                      style="color:#4CAF50; cursor: pointer;"
                      @click="upload"
                    >
                      <v-icon
                        color="green"
                      >
                        mdi-upload
                      </v-icon>
                      Upload
                    </p>
                    <p
                      class="text-caption mb-1"
                    >
                      Format .png or .jpg
                    </p>
                    <p
                      class="text-caption mb-1"
                    >
                      Max. size 5 MB
                    </p>
                  </v-col>
                </v-row>
              </v-container>

              <v-col
                class="pa-0"
                cols="6"
              >
                <v-text-field
                  v-model="addRobotData.name"
                  label="Robot name"
                  hide-details
                  dense
                  outlined
                  class="ml-0 pb-4 rounded-lg"
                />
              </v-col>
              <v-textarea
                v-model="addRobotData.description"
                rows="3"
                label="Robot name"
                hide-details
                dense
                outlined
                class="ml-0 pb-4 rounded-lg"
              />
              <v-row
                no-gutters
                class="pa-0 pb-4"
              >
                <v-col
                  no-gutters
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="addRobotData.exchange_id"
                    label="Exchange"
                    hide-details
                    dense
                    outlined
                    single-line
                    class="mx-2 rounded-lg"
                    :items="['1', '2', '3']"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-autocomplete
                    v-model="addRobotData.currency_id"
                    label="Currency"
                    hide-details
                    dense
                    outlined
                    multiple
                    single-line
                    class="mx-2 rounded-lg"
                    :items="items"
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
                        (+{{ items.length - 2 }} others)
                      </span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    v-model="addRobotData.timeframe_id"
                    label="Timeframe"
                    hide-details
                    dense
                    outlined
                    single-line
                    class="mx-2 rounded-lg"
                    :items="['1', '2', '3']"
                  />
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-checkbox
                  v-model="addRobotData.sell"
                  color="primary"
                  label="side Sell"
                >
                  Sell
                </v-checkbox>
                <v-checkbox
                  v-model="addRobotData.buy"
                  color="primary"
                  class="pl-8"
                  label="side Buy"
                >
                  Buy
                </v-checkbox>
              </v-row>
              <v-btn
                color="primary"
                height="48px"
                width="170px"
                class="white--text mb-4"
                @click="addRobot"
              >
                Add robot
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import RobotsTable from '~/components/robotsTable.vue'

export default {
  name: 'ArobotsFrontendAddedRobots',
  components: { RobotsTable },
  data () {
    return {
      items: ['1', '2', '3'],
      addRobotDialog: false,
      addRobotData: {
        name: null,
        description: null,
        exchange_id: null,
        currency_id: null,
        timeframe_id: null,
        sell: false,
        buy: false,
        image_id: null
      }
    }
  },
  mounted () {
  },
  methods: {
    addRobot () {
      this.addRobotDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
