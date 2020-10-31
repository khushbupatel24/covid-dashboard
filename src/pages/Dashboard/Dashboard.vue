<template>
  <div class="container-fluid">
    <div class="row pt-3">
      <div class="col-lg-6">
        <card type="chart">
          <div class="chart-area">
            <line-chart v-if="arrPositive.length > 0"
              style="height: 100%"
              :chartData="arrPositive"
              :options="chartOptions"
              :chartColors="positiveChartColors"
              :labels="arrPositiveLabels"
              label="Death"
            ></line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <div class="chart-area">
            <bar-chart v-if="arrDeaths.length > 0"
              style="height: 100%"
              :chartData="arrDeaths"
              :options="chartOptions"
              :chartColors="deathColors"
              :labels="arrDeathsLabels"
              label="Death"
            ></bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <div class="chart-area">
            <doughnut-chart v-if="arrDeaths.length > 0"
              style="height: 100%"
              :chartData="arrDeaths"
              :options="chartOptions"
              :chartColors="recoveredColors"
              :labels="arrDeathsLabels"
              label="Death"
            ></doughnut-chart>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
    import LineChart from "../../components/Charts/LineChart";
    import BarChart from "../../components/Charts/BarChart";
    import DoughnutChart from "../../components/Charts/DonuteChart";
    import axios from "axios";
    export default {
        components: {
            LineChart,
            BarChart,
            DoughnutChart,
        },
        data() {
            return {
                arrPositive: [],
                arrPositiveLabels: [],
                positiveChartColors: {
                    borderColor: "#077187",
                    pointBorderColor: "#0E1428",
                    pointBackgroundColor: "#AFD6AC",
                    backgroundColor: "#AFD6AC"
                },
                arrHospitalized: [],
                hospitalizedChartColors: {
                    borderColor: "#251F47",
                    pointBorderColor: "#260F26",
                    pointBackgroundColor: "#858EAB",
                    backgroundColor: "#858EAB"
                },
                arrInIcu: [],
                inIcuColors: {
                    borderColor: "#190B28",
                    pointBorderColor: "#190B28",
                    pointBackgroundColor: "#E55381",
                    backgroundColor: "#E55381"
                },
                arrOnVentilators: [],
                onVentilatorsColors: {
                    borderColor: "#784F41",
                    pointBorderColor: "#784F41",
                    pointBackgroundColor: "#BBE5ED",
                    backgroundColor: "#BBE5ED"
                },
                arrRecovered: [],
                recoveredColors: [
                    "#d6df81",
                    "#ffee8c",
                    "#fdd374",
                    "#fab661",
                    "#f59955",
                    "#ed7c4f",
                    "#e35d4f",
                    "#d43d51",
                    "#d43d90",
                    "#00ff99",
                    "#00876c",
                    "#3d9a6f",
                    "#64ac72",
                    "#89be75",
                    "#afcf7a",
                ],
                arrDeaths: [],
                arrDeathsLabels: [],
                deathColors: {
                    pointBorderColor: "#E06D06",
                    pointBackgroundColor: "#e08e1a",
                    backgroundColor: "#dfe069",
                    borderColor: "#e0dc7d",
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            };
        },
        methods: {
            getDashData() {
                var self = this;
                self.renderConfirmedCaseChartData();
                self.renderDeathsChartData();
            },
            renderConfirmedCaseChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/deathRate.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    let response = data.data
                    self.arrPositiveLabels = Object.keys(response['number of deaths'])
                    self.arrPositive = Object.values(response['number of deaths'])
                })
            },
            renderDeathsChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/deathRate.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    console.log(data)
                    let response = data.data
                    self.arrDeathsLabels = Object.keys(response['number of deaths'])
                    self.arrDeaths = Object.values(response['number of deaths'])
                })
            },
        },
        created() {
            console.log('in mounted')
            this.getDashData();
        },
    };
</script>
<style>
  .chart-area {
    min-height: 400px !important;
  }

  .title-lg {
    font-size: 1.8rem;
  }

  .title-sm {
    font-size: 1.0625rem;
  }

  .info-cursor {
    cursor: pointer;
  }

  @media (min-width: 320px) and (max-width: 768px) {
    .btn-group {
      display: block;
    }
  }

  .text-group {
    display: inline;
    position: absolute;
    bottom: 11px;
  }

  .title-sm {
    font-size: 1rem;
  }

  .title-lg {
    font-size: 2.1rem;
  }

  .fa-2x {
    font-size: 1.3em !important;
  }

  /* basic positioning */
  .legend {
    margin-top: 20px;
    margin-left: 38px;
    list-style: none;
    font-weight: 100;
    font-size: 12px;
    line-height: 1.8;
  }

  .legend li {
    float: left;
    margin-right: 10px;
    color: #babac0;
  }

  .legend span {
    float: left;
    width: 17px;
    height: 17px;
    margin: 2px 5px;
    border-radius: 100px;
  }

  /* your colors */
  .legend .fifty {
    background-color: rgba(0, 255, 0, 1);
  }

  .legend .ninety {
    background-color: rgba(0, 255, 0, 0.7);
  }

  .chartWrapper {
    position: relative;
  }

  .chartWrapper canvas {
    /*   position: absolute;
    left: 0;
    top: 0;
    pointer-events: none; */
  }

  .chartAreaWrapper {
    width: 600px;
    overflow-x: scroll;
  }

  .el-tooltip__popper.is-dark {
    width: 300px;
    text-align: center;
  }

  #chartjs-tooltip {
    width: 120px;
    font-size: 12px;
    opacity: 1;
    position: fixed;
    z-index: 9;
    background: rgba(255, 255, 255, 1);
    color: #000;
    border-radius: 3px;
    -webkit-transition: all 0.1s ease;
    transition: all 0.1s ease;
    pointer-events: none;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
  }

  #chartjs-tooltip:after {
    content: "";
    border-top: 5px solid #fff;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    bottom: 100%;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
