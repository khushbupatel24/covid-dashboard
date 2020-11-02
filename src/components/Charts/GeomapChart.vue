<template>
  <div class="component-wrapper">
    <div ref="chart"></div>
    <GChart type="geochart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";

  //added  
import * as VueGoogleMaps from 'vue2-google-maps';



export default {
  components: GChart,
 
  data() {
    return {
      headings: ["State", "Cases"],
      chartData: [
        ["British Columbia", 4373],
        ["Canada", 11023],
        ["Quebec", 556],
        ["Alberta", 1969],
        ["Manitoba", 352],
        ["Nova Scotia", 182],
      ],
      chartOptions: {
        chart: {
          title: "Google Map for Canada Covid data",
          width: 400,
          height: 400,
          region: "CA",
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    };
  },
  //added computed
   computed: {
    google: VueGoogleMaps.gmapApi
},
  created() {
      console.log('geo chart')
      google.charts.load("current", {
      packages: ["geochart"],
      mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",
    });
    console.log('geo chart')
    google.charts.setOnLoadCallback(() => this.drawChart())    
  },
  methods: {
    drawChart () {
      const dataTable = google.visualization.arrayToDataTable([
          ['State', 'Cases'],
          ['British Columbia',4373],
          ['Canada',11023],
          ['Quebec',556],
          ['Alberta',1969],
          ['Manitoba',352],
          ['Nova Scotia',182]
        ]) // 👈 don't forget "false" here to indicate the first row as labels

      const chart = new google.visualization.GeoChart(this.$refs.chart) // 👈 use ref here
      chart.draw(dataTable, this.chartOptions)
    }
  }
  };
</script>