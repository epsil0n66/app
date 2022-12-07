<template>
  <div>
    <v-menu
      max-height="300px"
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          {{ currentInterval.time + currentInterval.name }}
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
          v-bind="attrs"
          v-on="on"
        >
          {{ currentSeries.name }}
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
      @click="takeScreenshot"
    >
      Take screenshot
    </v-btn>
    <div
      :id="chartID"
      class="twchart"
    />
  </div>
</template>

<script>
import { createChart } from 'lightweight-charts'
let chart
let instance
let candlestickSeries
let barSeries
let lineSeries

export default {
  name: 'ArobotsFrontendTwLightCharts',
  data () {
    return {
      chartID: 'twChart',
      intervalMenu: [],
      currentInterval: { time: '1', name: 'm' },
      seriesMenu: [
        { name: 'Candlestick', id: 0 },
        { name: 'Bar', id: 1 },
        { name: 'Line', id: 2 }
      ],
      currentSeries: { name: 'Candlestick', id: 0 },
      chartData: null,
      lineData: null
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
    instance = this.$axios.create()
    delete instance.defaults.headers.Authorization
    instance('http://arobots.evospb.ru/api/timeframes')
      .then((res) => {
        this.intervalMenu = res.data
      })
    this.loadData().then(() => {
      this.applySeries()
    })
    // const socket = new WebSocket('wss://stream.binance.com:9443/ws/ethbusd@kline_1m')
    // socket.onmessage = function (event) {
    //   const a = JSON.parse(event.data).k
    //   candlestickSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
    //   barSeries.update({ time: a.t / 1000, open: parseFloat(a.o), high: parseFloat(a.h), low: parseFloat(a.l), close: parseFloat(a.c) })
    //   lineSeries.update({ time: a.t / 1000, value: parseFloat(a.c) })
    // }
    // const maxPriceLine = {
    //   price: 1280,
    //   color: 'red',
    //   lineWidth: 2,
    //   lineStyle: 2, // LineStyle.Dashed
    //   axisLabelVisible: true,
    //   title: 'Price'
    // }
    // candlestickSeries.createPriceLine(maxPriceLine)
    // barSeries.createPriceLine(maxPriceLine)
    // lineSeries.createPriceLine(maxPriceLine)
    // const markers = [
    //   {
    //     time: Date.now() / 1000,
    //     position: 'aboveBar',
    //     color: 'green',
    //     shape: 'circle',
    //     text: 'Marker'
    //   }
    // ]
    // candlestickSeries.setMarkers(markers)
    // barSeries.setMarkers(markers)
    // lineSeries.setMarkers(markers)
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
      chart.timeScale().fitContent()
      switch (this.currentSeries.id) {
        case (0):
          candlestickSeries = chart.addCandlestickSeries()
          candlestickSeries.setData(this.chartData)
          break
        case (1):
          barSeries = chart.addBarSeries()
          barSeries.setData(this.chartData)
          break
        case (2):
          lineSeries = chart.addLineSeries()
          lineSeries.setData(this.lineData)
      }
    },
    async loadData () {
      await instance(`https://www.binance.com/api/v3/uiKlines?symbol=ETHBUSD&interval=${this.currentInterval.time}${this.currentInterval.name}&limit=100`)
        .then((res) => {
          this.chartData = res.data.map((a) => {
            return { time: a[0] / 1000, open: parseFloat(a[1]), high: parseFloat(a[2]), low: parseFloat(a[3]), close: parseFloat(a[4]) }
          })
          console.log(res)
          this.lineData = res.data.map((a) => {
            return { time: a[0] / 1000, value: parseFloat(a[4]) }
          })
        })
    },
    takeScreenshot () {
      chart.takeScreenshot().toBlob((blob) => {
        navigator.clipboard.write([new window.ClipboardItem({ 'image/png': blob })])
      })
    }
  }
}
</script>
<style>
.twchart {
float: right;
}
</style>
