<template>
  <div ref="regionChart" style="height: 100%"></div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            chartData: {
                type: Array
            }
        },
        data() {
            return {
                headings: ["State", "Cases"],
                chartData: this.chartData,
                chartOptions: {
                    title: 'Region wise statistics',
                    region: 'CA',
                    dataMode: 'markers',
                    resolution: 'provinces',
                    colorAxis: {colors: ['#FFEEE7', '#d9a57e', '#cd4912', '#da8d30', '#a35100']},
                    backgroundColor: '#27293d',
                    datalessRegionColor: ''
                },
            };
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
            drawChart() {
                const dataTable = google.visualization.arrayToDataTable([
                    this.headings,
                    ...this.chartData
                ], false)

                const chart = new google.visualization.GeoChart(this.$refs.regionChart)
                chart.draw(dataTable, this.chartOptions)
            }
        }
    };
</script>
