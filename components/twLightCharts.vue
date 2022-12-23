<template>
  <div
    style="float:right"
  >
    <v-col
      style="width:600px"
    >
      <v-row>
        <v-menu
          max-height="300px"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              class="my-2 ml-10 text--black"
              style="border-radius: 0px"
              elevation="1"
              v-bind="attrs"
              v-on="on"
            >
              <span
                style="color:black"
              >
                {{ currentInterval.time + currentInterval.name }}
              </span>
            </v-btn>
          </template>
          <v-list
            v-for="item in intervalMenu"
            :key="item.id"
            link
          >
            <v-list-item
              @click="(currentInterval = item)"
            >
              <v-list-item-title>{{ item.time }} {{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          max-height="300px"
        >
          <template #activator="{ attrs, on }">
            <v-btn
              class="my-2"
              style="border-radius: 0px"
              elevation="1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon
                color="black"
              >
                {{ currentSeries.icon }}
              </v-icon>
            </v-btn>
          </template>
          <v-list
            v-for="item in seriesMenu"
            :key="item.id"
            link
          >
            <v-list-item
              @click="(currentSeries = item)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          class="my-2"
          style="border-radius: 0px"
          elevation="1"
          @click="enterFullscreen"
        >
          <v-icon
            color="black"
          >
            mdi-fullscreen
          </v-icon>
        </v-btn>
        <v-menu
          top
        >
          <template #activator="{ on, attrs }">
            <v-btn
              class="my-2"
              v-bind="attrs"
              style="border-radius: 0px"
              elevation="1"
              v-on="on"
              @click="takeScreenshot"
            >
              <v-icon
                color="black"
              >
                mdi-camera
              </v-icon>
            </v-btn>
          </template>
          <v-alert
            class="ma-0"
            type="success"
          >
            Copied to clipboard
          </v-alert>
        </v-menu>
      </v-row>
      <div
        :id="chartID"
        style="padding-top:24px"
        class="twchart"
      />
    </v-col>
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
let chart
let instance
let candlestickSeries
let barSeries
let lineSeries
let timeScale

export default {
  name: 'ArobotsFrontendTwLightCharts',
  data () {
    return {
      chartID: 'twChart',
      intervalMenu: [],
      currentInterval: { time: '1', name: 'm' },
      seriesMenu: [
        { name: 'Candlestick', id: 0, icon: 'mdi-chart-bar' },
        { name: 'Bar', id: 1, icon: 'mdi-chart-bar-stacked' },
        { name: 'Line', id: 2, icon: 'mdi-chart-areaspline-variant' }
      ],
      currentSeries: { name: 'Candlestick', icon: 'mdi-chart-bar', id: 0 },
      chartData: null,
      lineData: null,
      timer: null,
      tooltip: false,
      isSafari: true,
      resolution: {
        height: null,
        width: null
      }
    }
  },
  watch: {
    currentInterval () {
      this.loadData().then(() => {
        this.applySeries()
      })
    },
    currentSeries () {
      this.applySeries()
    }
  },
  mounted () {
    this.resolution.height = screen.height
    this.resolution.width = screen.width
    const chromeAgent = navigator.userAgent.includes('Chrome')
    const safariAgent = navigator.userAgent.includes('Safari')
    if ((chromeAgent) && (safariAgent)) { this.isSafari = false }
    console.log(this.isSafari)
    instance = this.$axios.create()
    delete instance.defaults.headers.Authorization
    instance('https://arobots.evospb.ru/api/timeframes')
      .then((res) => {
        this.intervalMenu = res.data
      })
    this.loadData().then(() => {
      this.applySeries()
      this.watchForUpdate()
    })
    function safarifullscreenchanged () {
      console.log('document.webkitullscreenElement = ', document.webkitFullscreenElement)
      if (document.webkitFullscreenElement !== null) {
        console.log(`Element: ${document.webkitFullscreenElement} entered fullscreen mode.`)
      } else {
        chart.applyOptions({ width: 600, height: 400 })
        console.log('Leaving fullscreen mode.')
      }
    };
    function fullscreenchanged () {
      if (document.fullscreenElement) {
        console.log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`)
      } else {
        chart.applyOptions({ width: 600, height: 400 })
        console.log('Leaving fullscreen mode.')
      }
    };
    const chartEl = document.getElementById('twChart')
    if (this.isSafari) {
      chartEl.addEventListener('webkitfullscreenchange', safarifullscreenchanged)
    } else {
      chartEl.addEventListener('fullscreenchange', fullscreenchanged)
    }
    this.applyWebSocketData()
    this.applyMarkers()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    applySeries () {
      if (chart) {
        chart.remove()
      }
      chart = createChart(this.chartID,
        {
          rightPriceScale: { visible: true },
          leftPriceScale: { visible: true },
          width: 600,
          height: 400,
          crosshair: { mode: 0 },
          timeScale: {
            timeVisible: true,
            secondsVisible: false
          }
        })
      if (document.fullscreenElement) {
        // If the document is not in full screen mode
        // make the video full screen
        chart.applyOptions({ width: this.resolution.width, height: this.resolution.height })
      }
      timeScale = chart.timeScale()
      switch (this.currentSeries.id) {
        case (0):
          candlestickSeries = chart.addCandlestickSeries()
          candlestickSeries.setData(this.chartData)
          barSeries = undefined
          lineSeries = undefined
          break
        case (1):
          barSeries = chart.addBarSeries()
          barSeries.setData(this.chartData)
          candlestickSeries = undefined
          lineSeries = undefined
          break
        case (2):
          lineSeries = chart.addLineSeries()
          lineSeries.setData(this.lineData)
          candlestickSeries = undefined
          barSeries = undefined
      }
    },
    applyMarkers () {
      const maxPriceLine = {
        price: 1280,
        color: 'red',
        lineWidth: 2,
        lineStyle: 2, // LineStyle.Dashed
        axisLabelVisible: true,
        title: 'Price'
      }
      const markers = [
        {
          time: Date.now() / 1000,
          position: 'aboveBar',
          color: 'green',
          shape: 'circle',
          text: 'Marker'
        }
      ]
      if (candlestickSeries) {
        candlestickSeries.createPriceLine(maxPriceLine)
        candlestickSeries.setMarkers(markers)
      } else if (barSeries) {
        barSeries.createPriceLine(maxPriceLine)
        barSeries.setMarkers(markers)
      } else if (lineSeries) {
        lineSeries.createPriceLine(maxPriceLine)
        lineSeries.setMarkers(markers)
      }
    },
    applyWebSocketData () {
      const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m')
      socket.onmessage = function (event) {
        const a = JSON.parse(event.data).k
        if (candlestickSeries) {
          candlestickSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
        }
        if (barSeries) {
          barSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
        }
        if (lineSeries) {
          lineSeries.update({ time: a.t / 1000, value: parseFloat(a.c) })
        }
      }
    },
    async loadData () {
      await instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${this.currentInterval.time}${this.currentInterval.name}&limit=1000`)
        .then((res) => {
          this.chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          this.lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
        })
    },
    updateData (time) {
      instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${this.currentInterval.time}${this.currentInterval.name}&limit=1000&endTime=${time}`)
        .then((res) => {
          const chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          chartData.pop()
          this.chartData = chartData.concat(this.chartData)
          const lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
          lineData.pop()
          this.lineData = lineData.concat(this.lineData)
          this.watchForUpdate()
          this.applySeries()
        })
    },
    watchForUpdate () {
      timeScale = chart.timeScale()
      this.timer = setInterval(async () => {
        const logicalRange = timeScale.getVisibleLogicalRange()
        if (logicalRange !== null) {
          if (candlestickSeries) {
            const barsInfo = candlestickSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          } else if (barSeries) {
            const barsInfo = barSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          } else if (lineSeries) {
            const barsInfo = lineSeries.barsInLogicalRange(logicalRange)
            if (barsInfo !== null && barsInfo.barsBefore < 10) {
              await this.updateData(this.chartData[0].time * 1000)
              clearInterval(this.timer)
            }
          }
        }
      }, 50)
    },
    takeScreenshot () {
      chart.takeScreenshot().toBlob((blob) => {
        navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
      })
    },
    enterFullscreen () {
      const chartEl = document.getElementById('twChart')
      if (this.isSafari === true) {
        if (!document.webkitFullscreenElement) {
          chartEl.webkitRequestFullscreen()
          chart.applyOptions({ width: this.resolution.width, height: this.resolution.height })
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
          chart.applyOptions({ width: 600, height: 400 })
        }
        return
      }
      if (!document.fullscreenElement) {
        chartEl.requestFullscreen()
        chart.applyOptions({ width: this.resolution.width, height: this.resolution.height })
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
        chart.applyOptions({ width: 600, height: 400 })
      }
    }
  }
}
</script>
<style>
.twchart {
float: right;
}
</style>
