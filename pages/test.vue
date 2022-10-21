<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    />
    Счетчик: {{ $store.state.counter }}
    <v-btn
      @click="$store.commit('increment')"
    >
      Добавить
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: 'ArobotsFrontendTest',

  data () {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },

  mounted () {
    console.log(this.$store.state.counter)
  },

  methods: {

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
    background: white;
}
.v-data-table > .v-data-table__wrapper > table {
    border-spacing: 0 8px;
}
tbody {
    background-color: rgb(46, 102, 51);
}
tr {
    line-height: 56px;
}
td:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
td:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}
th {
    background-color: rgb(46, 102, 51);
}
th:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
th:last-child {
    border-bottom-right-radius: 12px;
    border-top-right-radius: 12px;
}

</style>
