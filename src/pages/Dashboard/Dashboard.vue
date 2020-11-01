<template>
  <div class="container-fluid">
    <div class="row pt-3">
      <div class="col-lg-6">
        <card type="chart">
          <div class="card-header pt-0">
            <div class="row">
              <div class="col-sm-8 text-left">
                <h2 title="Total Cases" class="card-title d-inline">Total Cases</h2>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <line-chart v-if="totalCases.length > 0"
                        style="height: 100%"
                        :chartData="totalCases"
                        :options="chartOptions"
                        :chartColors="totalCasesChartColors"
                        :labels="totalCasesLabels"
                        label="Total Cases"
            ></line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <div class="card-header pt-0">
            <div class="row">
              <div class="col-sm-8 text-left">
                <h2 title="Confirmed Cases" class="card-title d-inline">Confirmed Cases</h2>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <bar-chart v-if="confirmedCases.length > 0"
                       style="height: 100%"
                       :chartData="confirmedCases"
                       :options="chartOptions"
                       :chartColors="confirmedCasesChartColors"
                       :labels="confirmedCasesLabels"
                       label="Confirmed Cases"
            ></bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-12">
        <card type="chart">
          <div class="card-header pt-0">
            <div class="row">
              <div class="col-sm-8 text-left">
                <h2 title="Active Cases" class="card-title d-inline">Active Cases</h2>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <line-chart v-if="activeCases.length > 0"
                        style="height: 100%"
                        :chartData="activeCases"
                        :options="chartOptions"
                        :chartColors="activeCasesChartColors"
                        :labels="activeCasesLabels"
                        :isFilled=true
                        label="Active Cases"
            ></line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <div class="card-header pt-0">
            <div class="row">
              <div class="col-sm-8 text-left">
                <h2 title="Deaths by States" class="card-title d-inline">Deaths by States</h2>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <doughnut-chart v-if="totalDeaths.length > 0"
                            style="height: 100%"
                            :chartData="totalDeaths"
                            :options="deathsChartOptions"
                            :chartColors="deathsChartColors"
                            :labels="totalDeathsLabels"
                            label="Death"
            ></doughnut-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <card type="chart">
          <div class="card-header pt-0">
            <div class="row">
              <div class="col-sm-8 text-left">
                <h2 title="Recovered Cases" class="card-title d-inline">Recovered Cases</h2>
              </div>
            </div>
          </div>
          <div class="chart-area">
            <pie-chart v-if="totalRecovered.length > 0"
                       style="height: 100%"
                       :chartData="totalRecovered"
                       :options="recoveredChartOptions"
                       :chartColors="recoveredChartColors"
                       :labels="totalRecoveredLabels"
                       label="Death"
            ></pie-chart>
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
    import PieChart from "../../components/Charts/PieChart";
    import axios from "axios";

    export default {
        components: {
            LineChart,
            BarChart,
            DoughnutChart,
            PieChart,
        },
        data() {
            return {
                totalCases: [],
                totalCasesLabels: [],
                totalCasesChartColors: {
                    borderColor: "#077187",
                    pointBorderColor: "#0E1428",
                    pointBackgroundColor: "#AFD6AC",
                    backgroundColor: "#ff6abc"
                },
                confirmedCases: [],
                confirmedCasesLabels: [],
                confirmedCasesChartColors: {
                    borderColor: "#251F47",
                    pointBorderColor: "#260F26",
                    pointBackgroundColor: "#858EAB",
                    backgroundColor: "#00ff99"
                },
                activeCases: [],
                activeCasesLabels: [],
                activeCasesChartColors: {
                    borderColor: "#251F47",
                    pointBorderColor: "#260F26",
                    pointBackgroundColor: "#9eb3df",
                    backgroundColor: "#9eb3df"
                },
                totalDeaths: [],
                totalDeathsLabels: [],
                deathsChartColors: [
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
                deathsChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'bottom'
                    }
                },
                totalRecovered: [],
                totalRecoveredLabels: [],
                recoveredChartColors: [
                    "#d43d51",
                    "#d43d90",
                    "#00ff99",
                    "#00876c",
                    "#3d9a6f",
                    "#64ac72",
                    "#89be75",
                    "#afcf7a",
                    "#d6df81",
                    "#ffee8c",
                    "#fdd374",
                    "#fab661",
                    "#f59955",
                    "#ed7c4f",
                    "#e35d4f",
                ],
                recoveredChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: 'bottom'
                    }
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    fill: false
                }
            };
        },
        methods: {
            getDashData() {
                var self = this;
                self.renderTotalCasesChartData();
                self.renderConfirmedCasesChartData();
                self.renderActiveCasesChartData();
                self.renderDeathsChartData();
                self.renderRecoveredChartData();
            },
            renderTotalCasesChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/total.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    let response = data.data
                    let regions = Object.keys(response['total cases'])
                    regions = regions.slice(1, -2)
                    let counts = Object.values(response['total cases'])
                    counts = counts.slice(1, -2)
                    self.totalCasesLabels = regions
                    self.totalCases = counts
                })
            },
            renderConfirmedCasesChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/Tested.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    let response = data.data
                    let regions = Object.keys(response['people tested'])
                    regions = regions.slice(1, -2)
                    let counts = Object.values(response['people tested'])
                    counts = counts.slice(1, -2)
                    self.confirmedCasesLabels = regions
                    self.confirmedCases = counts
                })
            },
            renderActiveCasesChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/active.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    let response = data.data
                    let regions = Object.keys(response['active percentage'])
                    regions = regions.slice(1, -2)
                    let counts = Object.values(response['active percentage'])
                    counts = counts.slice(1, -2)
                    self.activeCasesLabels = regions
                    self.activeCases = counts
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
                    let regions = Object.keys(response['number of deaths'])
                    regions = regions.slice(1, -2)
                    let counts = Object.values(response['number of deaths'])
                    counts = counts.slice(1, -2)
                    self.totalDeathsLabels = regions
                    self.totalDeaths = counts
                })
            },
            renderRecoveredChartData() {
                var self = this;
                axios.get(
                    "https://api.github.com/repos/khushbupatel24/covid-data/contents/data/recovered.json",
                    {
                        headers: {
                            'accept': 'application/vnd.github.VERSION.raw'
                        }
                    }
                ).then(function (data) {
                    console.log(data)
                    let response = data.data
                    let regions = Object.keys(response['recovered'])
                    regions = regions.slice(1, -2)
                    let counts = Object.values(response['recovered'])
                    counts = counts.slice(1, -2)
                    self.totalRecoveredLabels = regions
                    self.totalRecovered = counts
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
