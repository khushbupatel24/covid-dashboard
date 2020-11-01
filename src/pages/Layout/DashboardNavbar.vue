<template>
  <div class="container-fluid content-nav">
    <div class="row border-bottom">
      <div class="col-md-8 col-sm-12 order-2 order-md-1">
        <router-link :to="{name: 'dashboard'}">
          <h1 class="brandtext" title="COVID-19 TRACKER FOR UNITED STATES">COVID-19 SOCIAL NETWORK</h1>
        </router-link>
        <small class="text-white" v-if="$route.name == 'Dashboard'">
          As the coronavirus that causes Covid-19 spreads worldwide, this view of CANADA<br/>
        </small>
        <!--
                <small style="display: block;" class>
                  Data sources:
                  <a
                    href="https://covidtracking.com/data"
                    target="_blank"
                  >The COVID Tracking Project</a> (pulled at
                  <span id="trackerTime">...</span> on
                  <span id="trackerDate">...</span>),
                  <a target="_blank" href="https://coronavirus.jhu.edu/">JHU</a> (pulled at
                  <span id="jhuTime">...</span> on
                  <span id="jhuDate">...</span>),
                  <a
                    target="_blank"
                    href="https://www.nytimes.com/interactive/2020/us/states-reopen-map-coronavirus.html"
                  >NYT</a> (pulled at
                  <span id="nyTime">...</span> on
                  <span id="nyDate">...</span>),
                  <a
                    target="_blank"
                    href="https://www.cdc.gov/nhsn/covid19/report-patient-impact.html"
                  >CDC</a> (pulled at
                  <span id="exitTime">...</span> on
                  <span id="exitDate">...</span>)
                </small>
        -->
      </div>
      <div class="col-md-4 col-sm-12 order-2 order-md-1 text-right" v-if="$route.name == 'Dashboard'">
        <router-link :to="{name: 'signup'}">
          <button class="btn btn-sm btn-primary">Sign Up</button>
        </router-link>
        <router-link :to="{name: 'Signin'}">
          <button class="btn btn-sm btn-primary">Sign In</button>
        </router-link>
        <router-link :to="{name: 'questionnaire'}">
          <button class="btn btn-sm btn-default">Questionnaire</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
    import {CollapseTransition} from "vue2-transitions";
    /*
    import { BaseNav } from "components";
    */

    export default {
        components: {
            CollapseTransition,
            // BaseNav
        },
        computed: {},
        data() {
            return {
                showMenu: false
            };
        },
        methods: {
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            showModal() {
                let element = this.$refs.modal.$el
                $(element).modal('show')
            }
        }
    };
</script>
<style scoped>
  .content-nav {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
  }

  .top-navbar {
    top: 0px;
  }

  .brandtext {
    font-size: 1.7875rem;
    color: #fff;
    font-weight: 100;
    margin-bottom: 10px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .headersubtitle {
      max-width: 260px;
    }

    .brandtext {
      font-size: 15px;
      margin-bottom: 10px;
    }
  }
</style>
