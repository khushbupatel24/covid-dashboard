<template>
  <div>
    <!-- Unemployment by State chart -->
    <div class="col-lg-12 m-0 p-0">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-12">
              <h2 class="card-title d-inline" title="Unemployment by State">Unemployment by State</h2>
              <el-tooltip
                content="Unemployment by State"
                effect="dark"
                :open-delay="300"
                placement="top"
              >
                <base-button type="link">
                  <i class="fa fa-info-circle text-info fa-2x info-cursor pl-1 mb-2"></i>
                </base-button>
              </el-tooltip>
            </div>
          </div>
          <div class="row mt-1">
            <div class="col-lg-6">
              <el-select
                class="select-info"
                size="large"
                v-model="economicStates"
                filterable
                placeholder="Select State"
                v-on:change="changeChartByStateSelect()"
              >
                <el-option
                  v-for="option in regions"
                  class="select-info"
                  :value="option"
                  :label="option"
                  :key="option"
                ></el-option>
              </el-select>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <bar-chart
            style="height: 100%"
            :chart-data="economicChart.chartData"
            :gradient-colors="economicChart.gradientColors"
            :gradient-stops="economicChart.gradientStops"
            :extra-options="economicChart.extraOptions"
          ></bar-chart>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import lodash from "lodash";
import * as chartConfigs from "@/components/Charts/config";
import BarChart from "@/components/Charts/BarChart";
import config from "@/config";
import { Select, Option } from "element-ui";
const removeState = [
  "American Samoa",
  "Guam",
  "Northern Mariana Islands",
  "Puerto Rico",
  "Virgin Islands",
  "District of Columbia",
];
export default {
  data() {
    return {
      dateFormat: "MMM D, YYYY",
      dateFormatOther: "YYYYMMDD",
      defaultDate: "2020-03-01",
      regions: [],
      apiData: [],
      socialDistancingData: [],
      unemploymentRates: [],
      unemploymentClaims: [],
      economicStates: "",
      economicChart: {
        activeIndex: 0,
        extraOptions: {},
        chartData: {
          labels: [],
          datasets: [],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
    };
  },
  components: {
    BarChart,
    [Option.name]: Option,
    [Select.name]: Select,
  },
  mounted() {
    this.generateEconomicChart();
  },
  methods: {
    changeChartByStateSelect() {
      this.renderEcomomicByStateChartData();
    },
    getAllDates(date) {
      return [...date]
        .sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map((d) => d.date);
    },
    generateChartPointData(groupStateData, allDate, key) {
      var self = this;
      var filterdata = [];
      allDate.forEach(function (element) {
        var data = groupStateData.find(function (el) {
          return el.date === element;
        });
        if (typeof data !== "undefined") {
          var obj = {
            x: moment.utc(element).format(self.dateFormat),
            y: 0,
          };
          if (data) {
            obj.x = moment.utc(data.date).format(self.dateFormat);
            obj.y =
              data[key] !== null
                ? data[key] === +data[key] && data[key] !== (data[key] | 0)
                  ? data[key].toFixed(2)
                  : data[key]
                : 0;
          }
          filterdata.push(obj);
        }
      });
      return filterdata;
    },
    generateUnemploymentPointData(groupStateData) {
      var self = this;
      var filterdata = [];
      var allmonths = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      allmonths.forEach(function (element) {
        var data = groupStateData[0][element];
        if (typeof data !== "undefined") {
          var date =
            "2020-" + moment().month(element).format("MM") + "-01T00:00:00Z";
          if (new Date(date) >= new Date(self.defaultDate)) {
            var obj = {
              x: moment.utc(date).format(self.dateFormat),
              y: parseFloat(data),
            };
            filterdata.push(obj);
          }
        }
      });
      return filterdata;
    },
    generateEconomicChart() {
      var self = this;
      axios
        .get(process.env.VUE_APP_API_URL + "/economicData")
        .then((response) => {
          var socialDistancingData = response.data.socialDistancingData.filter(
            (value) => !removeState.includes(value.statename.trim())
          );
          var apiData = response.data.apiData.filter(
            (value) => !removeState.includes(value.state.trim())
          );
          var unemploymentRates = response.data.unemploymentRates.filter(
            (value) => !removeState.includes(value.state.trim())
          );
          var unemploymentClaims = response.data.unemploymentClaims.filter(
            (value) => !removeState.includes(value.state.trim())
          );
          var groupByStateData = lodash.groupBy(apiData, "state");
          self.regions = Object.keys(groupByStateData).sort();
          //console.log("State Rt=" + self.regions.length, self.regions);
          self.unemploymentRates = [...unemploymentRates];
          self.apiData = [...apiData].filter(function (element) {
            return new Date(element.date) >= new Date(self.defaultDate);
          });
          self.unemploymentClaims = [...unemploymentClaims].filter(function (
            element
          ) {
            return new Date(element.date) >= new Date(self.defaultDate);
          });
          self.socialDistancingData = [...socialDistancingData];
          var lastItem = [];
          Object.keys(groupByStateData).forEach(function (stateKey, index) {
            lastItem.push([...groupByStateData[stateKey]].pop());
          });

          var positiveStates = [...lastItem]
            .sort((key1, key2) => key2.positive - key1.positive)
            .slice(0, self.showTop)
            .map((x) => x.state);
          self.economicStates = positiveStates[0];

          self.renderEcomomicByStateChartData();
        });
    },
    renderEcomomicByStateChartData() {
      var self = this;
      self.economicChart.chartData.labels = [];
      self.economicChart.chartData.datasets = [];
      self.economicChart.extraOptions = {};
      self.economicChart.extraOptions = chartConfigs.ecomomicLineChartOptions;
      var filterApiData = [...self.apiData].filter(function (item) {
        return self.economicStates == item.state;
      });
      var filterunemploymentRatesData = [...self.unemploymentRates].filter(
        function (item) {
          return self.economicStates == item.state;
        }
      );
      var filterunemploymentClaimsData = [...self.unemploymentClaims].filter(
        function (item) {
          return self.economicStates == item.state;
        }
      );
      var dates = self.getAllDates([...self.apiData]);
      var allDate = [...new Set(dates)];
      var groupApiStateData = lodash.groupBy(filterApiData, "state");
      var groupunemploymentRatesData = lodash.groupBy(
        filterunemploymentRatesData,
        "state"
      );
      var groupunemploymentClaimsData = lodash.groupBy(
        filterunemploymentClaimsData,
        "state"
      );

      Object.keys(groupApiStateData).forEach(function (stateKey, index) {
        var socialDistancingData = self.socialDistancingData.filter(
          (e) =>
            e.statename === stateKey.trim() &&
            (e.statepolicy === "EmergDec" ||
              e.statepolicy === "StayAtHome" ||
              e.statepolicy === "PublicMask")
        );

        var annot = [];
        var policy = {
          EmergDec: "Emergency declared",
          StayAtHome: "Stay at home enacted",
          PublicMask: "Public mask enacted",
        };
        for (var i = 0; i < socialDistancingData.length; i++) {
          var distancedata = socialDistancingData[i];
          if (distancedata.dateenacted !== null) {
            var date = moment
              .utc(distancedata.dateenacted, self.dateFormatOther)
              .format("YYYY-MM-DD");

            if (new Date(date) >= new Date(self.defaultDate)) {
              var temp = {
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: moment
                  .utc(distancedata.dateenacted, self.dateFormatOther)
                  .format(self.dateFormat),
                borderWidth: 1,
                borderDash: [2, 2],
                borderColor: "rgb(200, 200, 200)",
                label: {
                  backgroundColor: "rgba(0,0,0,0)",
                  content: policy[distancedata.statepolicy.trim()],
                  enabled: true,
                  position: "center",
                  xAdjust: 10,
                  rotation: -90,
                },
              };
              annot.push(temp);
            }
          }
        }

        var allApiData = self.generateChartPointData(
          groupApiStateData[stateKey],
          allDate,
          "positiveincrease"
        );
        var allUnemploymentClaims = self.generateChartPointData(
          groupunemploymentClaimsData[stateKey],
          allDate,
          "claims"
        );
        var allUnemploymentRates = self.generateUnemploymentPointData(
          groupunemploymentRatesData[stateKey]
        );
        //
        self.economicChart.extraOptions.annotation = {
          drawTime: "afterDatasetsDraw",
          annotations: annot,
        };
        self.economicChart.chartData.datasets.push(
          /*           {
            yAxisID: "positive",
            type: "bar",
            label: "Positive Cases",
            data: allApiData,
            order: 3,
            backgroundColor: chartConfigs.colorOptions.color[stateKey.trim()],
            barThickness: 6,
          }, */
          {
            yAxisID: "unemploymentrates",
            label: "Unemployment Rate",
            spanGaps: true,
            type: "bar",
            data: allUnemploymentRates,
            order: 2,
            backgroundColor: "rgba(220,20,60,0.9)",
          },
          {
            yAxisID: "positive",
            label: "Unemployment Claims",
            spanGaps: true,
            type: "line",
            data: allUnemploymentClaims,
            order: 1,
            borderColor: "rgb(0,255,0,0.7)",
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: "rgb(0,255,0,0.7)",
            pointHoverBackgroundColor: "rgb(0,255,0,0.7)",
            colors: "rgb(0,255,0,0.7)",
          }
        );
      });
    },
  },
};
</script>
 <style scoped>
</style>
