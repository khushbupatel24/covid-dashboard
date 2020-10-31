<template>
  <div>
    <div class="col-lg-12 m-0 p-0">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h2
                class="card-title d-inline"
                title="How States Are Reopening"
              >How States Are Reopening</h2>
              <el-tooltip
                content="We use gating criteria provided by the White House under the Guidelines Opening Up America Again three-phased approach. We've tracked each state's progress toward meeting these guidelines which include: reduction in symptoms and cases, health system readiness, and increased testing. According to the White House guidelines, a state must meet this criteria for 14-days to move into the next phase."
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
        </template>
        <div>
          <div
            id="container"
            style="height: 500px;min-width: 300px; max-width: 900px; margin: 0 auto"
          ></div>
        </div>
        <div class="text-center mainscorebox" v-show="renderedMap">
          <div class="row text-center text-white scorebox">
            <div class="col-lg-3">
              <div class="p-3 bred text-section">
                <span>Uncontrolled Spread</span>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="p-3 red text-section">
                <span>Trending poorly</span>
              </div>
            </div>
            <div class="col-lg-3 text-section">
              <div class="p-3 yellow">
                <span>Trending better</span>
              </div>
            </div>
            <div class="col-lg-3 text-section">
              <div class="p-3 green">
                <span>Making progress</span>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
    <div class="col-lg-12 m-0 p-0">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6">
              <h2
                class="card-title d-inline"
                title="Key COVID-19 Metrics by State"
              >Key COVID-19 Metrics by State</h2>
              <el-tooltip
                content="This table shows a red, yellow, green scale so you can see progress by key measures by state. Covid+ is the number of positive Covid-19 test cases. ICU capacity is red > 90%, yellow > 70%, green < 70%. Test target is based on a 500K/day goal. Increasing or decreasing describes the overall Covid+ trend. Covid+ % is red > 15%, yellow > 5%, green < 5%."
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
        </template>
        <div class="p-2" style="min-height:500px">
          <table class="table table-responsive datatablemap">
            <thead v-show="renderedTable">
              <tr>
                <th
                  v-for="(column,index) in columns"
                  @click="activeColumn = column;sortBy(index,activeColumn.name,activeColumn.order=='asc'?'desc':'asc',column.orderable);"
                  :class="[{active: column == activeColumn,orderable:column.orderable}]"
                  :key="column.name"
                >
                  {{ colTitles[column.name] }}
                  <span
                    v-show="column.orderable"
                    class="arrow"
                    :class="column.order =='asc' ? 'asc' : 'dsc' "
                  ></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in exitData" :key="item.name">
                <td :class="item.score.toLowerCase()">{{item.name}}</td>
                <td :class="item.fourteen_day_trend_for_covid_pos.toLowerCase()">
                  <h4
                    v-if="item.fourteen_day_trend_of_covid_pos!==''"
                    class="m-0 font-weight-bold"
                    style="color: inherit;"
                  >{{item.fourteen_day_trend_of_covid_pos}}%</h4>
                  <span>{{item.fourteen_day_trend_for_covid_pos}}</span>
                </td>
                <td>
                  <micro :points="item.points" class="sparkline1" />
                </td>
                <td :class="item.icu_color.trim().toLowerCase().replace(/ /g, '-')">
                  <h4
                    class="m-0 font-weight-bold"
                    style="color: inherit;"
                    v-if="item.icu_availability==='N/A'"
                  >{{item.icu_availability}}</h4>
                  <h4
                    class="m-0 font-weight-bold"
                    style="color: inherit;"
                    v-else
                  >{{item.icu_availability}}%</h4>
                  <span>{{item.icu_color}}</span>
                </td>
                <td>
                  <div class="progress">
                    <div
                      class="progress-bar"
                      :class="item.daily_incidents_per_million_color.trim().toLowerCase()"
                      role="progressbar"
                      :style="'width:'+item.new_cases_per_million_per_day+'%;'"
                      :aria-valuenow="item.new_cases_per_million_per_day"
                      aria-valuemin="0"
                      aria-valuemax="200"
                    >{{item.new_cases_per_million_per_day}}</div>
                  </div>
                </td>
                <td :class="item.positivity_grade.trim().toLowerCase()+'-color'">
                  <h4 class="m-0 font-weight-bold" style="color: inherit;">{{item.positivity_is}}%</h4>
                  <span>{{item.positivity_is_grade}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import * as chartConfigsH from "@/components/Charts/HighchartConfig";
import * as chartConfigs from "@/components/Charts/config";
import Micro from "@/pages/Dashboard/Micro.vue";
import axios from "axios";
import moment from "moment";
import lodash from "lodash";
const options = chartConfigsH.config;
export default {
  data() {
    return {
      activeColumn: {},
      columns: [],
      colTitles: {
        name: "STATE",
        fourteen_day_trend_of_covid_pos: "14-DAY TREND OF COVID+",
        points: "LAST 14 DAYS OF COVID+ (ROLLING)",
        icu_availability: "ICU AVAILABILITY",
        new_cases_per_million_per_day: "NEW CASES PER MILLION PER DAY",
        positivity_is: "% TEST POSITIVE",
      },
      exitPulldate: "",
      exitPullTime: "",
      exitData: [],
      renderedTable: false,
      renderedMap: false,
      mapOptions: {},
    };
  },
  components: { Micro },
  mounted() {
    var self = this;
    this.columnData();
    this.setTheme();
    axios.get(process.env.VUE_APP_API_URL + "/nyt").then((response) => {
      var nytdata = response.data;
      axios.get(process.env.VUE_APP_API_URL + "/exit").then((response) => {
        var origianlData = response.data;
        //update datasource pull data time
        self.exitPulldate = moment
          .utc(origianlData[0].updated)
          .local()
          .format("M/D");
        self.exitPullTime = moment
          .utc(origianlData[0].updated)
          .local()
          .format("h:mm A");
        $("#exitDate").empty().append(self.exitPulldate);
        $("#exitTime").empty().append(self.exitPullTime);
        $("#nyDate").empty().append(self.exitPulldate);
        $("#nyTime").empty().append(self.exitPullTime);
        var data = [];
        // Set drilldown pointers
        for (var i = 0; i < origianlData.length; i++) {
          var dataset = origianlData[i];
          var temp = {};
          var dd = chartConfigs.states_hash;
          temp.name = dataset.state.trim();
          temp.code = chartConfigs.states_hash[dataset.state.trim()];
          temp.value = dataset.state_of_reopening
            ? dataset.state_of_reopening
            : ""; // Non-random bogus data
          if (temp.value == "") {
            var nytstatus = nytdata.find((el) => el.status.trim() == temp.name);
            if (nytstatus) {
              temp.value = nytstatus.state ? nytstatus.state : "";
            }
          }

          temp.score = dataset.new_gating_score ? dataset.new_gating_score : "";
          temp.testing = dataset.percent_of_testing_target
            ? dataset.percent_of_testing_target
            : "";
          temp.icu = dataset.percent_of_icu ? dataset.percent_of_icu : "";

          if (temp.score == "Red") {
            temp.color = "#c82d2d";
          } else if (temp.score == "Green") {
            temp.color = "#12ad2c";
          } else if (temp.score == "Yellow") {
            temp.color = "#ffc300";
          } else if (temp.score == "Bruised Red") {
            temp.color = "#8C0604";
          }

          temp.fourteen_day_trend_of_covid_pos = dataset.fourteen_day_trend_of_covid_pos
            ? dataset.fourteen_day_trend_of_covid_pos
                .substring(
                  0,
                  dataset.fourteen_day_trend_of_covid_pos.indexOf("%")
                )
                .trim()
            : "";
          temp.fourteen_day_trend_for_covid_pos = dataset.fourteen_day_trend_for_covid_pos
            ? dataset.fourteen_day_trend_for_covid_pos
            : "";

          temp.icu_availability = dataset.icu_occupied
            ? dataset.icu_occupied
                .substring(0, dataset.icu_occupied.indexOf("%"))
                .trim()
            : "";
          temp.icu_color = dataset.icu_color ? dataset.icu_color : "";

          temp.positivity_grade = dataset.positivity_grade
            ? dataset.positivity_grade
            : "";
          temp.positivity_is = dataset.positivity_is
            ? dataset.positivity_is
                .substring(0, dataset.positivity_is.indexOf("%"))
                .trim()
            : "";
          temp.positivity_is_grade = dataset.positivity_is
            ? dataset.positivity_is
                .substring(
                  dataset.positivity_is.indexOf("^"),
                  dataset.positivity_is.length - 1
                )
                .trim()
                .replace("^", "")
            : "";

          temp.daily_incidents_per_million_color = dataset.daily_incidents_per_million_color
            ? dataset.daily_incidents_per_million_color
            : "";
          temp.new_cases_per_million_per_day = dataset.new_cases_per_million_per_day
            ? dataset.new_cases_per_million_per_day
            : "";

          temp.gating_criteria_tests = dataset.gating_criteria_tests
            ? dataset.gating_criteria_tests
            : "";

          temp.points =
            dataset.cases_t_13 +
            "," +
            dataset.cases_t_12 +
            "," +
            dataset.cases_t_11 +
            "," +
            dataset.cases_t_10 +
            "," +
            dataset.cases_t_9 +
            "," +
            dataset.cases_t_8 +
            "," +
            dataset.cases_t_7 +
            "," +
            dataset.cases_t_6 +
            "," +
            dataset.cases_t_5 +
            "," +
            dataset.cases_t_4 +
            "," +
            dataset.cases_t_3 +
            "," +
            dataset.cases_t_2 +
            "," +
            dataset.cases_t_1 +
            "," +
            dataset.cases_t_0;
          data.push(temp);
        }
        self.exitData = [...data];
        self.renderMap(data);
        self.renderDataTable(data);
        self.activeColumn = {
          name: "new_cases_per_million_per_day",
          order: "asc",
          orderable: true,
        };
        self.sortBy(4, "new_cases_per_million_per_day", "desc", true);
      });
    });
  },
  methods: {
    //reset this very important to show sort arrow correct way
    columnData() {
      this.columns = [
        { name: "name", order: "asc", orderable: true },
        {
          name: "fourteen_day_trend_of_covid_pos",
          order: "asc",
          orderable: true,
        },
        { name: "points", order: "asc", orderable: false },
        { name: "icu_availability", order: "asc", orderable: true },
        {
          name: "new_cases_per_million_per_day",
          order: "asc",
          orderable: true,
        },
        { name: "positivity_is", order: "asc", orderable: true },
      ];
    },
    sortBy: function (index, columnname, order, orderable) {
      if (!orderable) return;
      this.exitData = lodash.orderBy(
        this.exitData,
        function (o) {
          var n = o[columnname];
          if (/^\d+\.\d+$/.test(n)) {
            return parseFloat(o[columnname]);
          } else if (parseInt(n) == n) {
            return parseInt(o[columnname]);
          } else {
            return o[columnname];
          }
        },
        order
      );

      this.columnData();
      this.activeColumn.order =
        this.activeColumn.order == "asc" ? "desc" : "asc";
      this.columns[index] = this.activeColumn;
    },
    renderDataTable(data) {
      this.renderedTable = true;
    },
    renderMap(data) {
      var self = this;
      // Instanciate the map.mapChart('world-map',
      Highcharts.mapChart("container", {
        chart: {
          events: {},
          map: "countries/us/us-all",
          scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1,
            opacity: 0,
          },
        },
        title: {
          text: "",
        },
        legend: {
          enabled: false,
        },
        mapNavigation: {
          enabled: false,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },

        plotOptions: {
          map: {
            states: {
              hover: {
                enabled: false,
                color: "#EEDD66",
              },
            },
          },
        },
        colorAxis: {
          min: 0,
          minColor: "#E6E7E8",
          maxColor: "#005645",
        },
        series: [
          {
            data: data,
            joinBy: ["postal-code", "code"],
            dataLabels: {
              enabled: false,
              pointFormat: "{point.name}",
            },
            tooltip: {
              useHTML: true,
              headerFormat: "<b>{point.name}</b><br>",
              pointFormat:
                "<b>{point.name} - {point.score}</b><br><br/>Covid + Cases: {point.value}" +
                "<br/><br/>Testing Target: {point.testing}" +
                "<br/><br/> ICU Utilization: {point.icu}%",
            },
          },
        ],
      });
      self.renderedMap = true;
    },
    setTheme() {
      Highcharts.theme = options;
      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
    },
  },
};
</script>
 <style scoped>
table {
  table-layout: fixed;
}
.progress {
  border-radius: 0;
  height: 1rem;
}
.map {
  min-height: 500px;
}
.bred {
  background-color: #8c0604 !important;
}
.red {
  background-color: #c82d2d !important;
}
.green {
  background-color: #12ad2c !important;
}
.yellow {
  background-color: #ffc300 !important;
}
.scorebox {
  padding: 5px 30px;
}
@media (min-width: 961px) {
  .mainscorebox {
    padding-top: 20px;
    width: 90%;
    margin: 0 auto;
  }
  .table-responsive {
    display: table !important;
  }
}
.table-responsive {
  display: block;
}
.text-section {
  margin-bottom: 10px;
}
.decreasing,
.normal,
.green-color {
  color: #12ad2c !important;
}
.increasing,
.red-color {
  color: #c82d2d !important;
}
.yellow-color,
.flat,
.low-availability {
  color: #ffc300 !important;
}
</style>
