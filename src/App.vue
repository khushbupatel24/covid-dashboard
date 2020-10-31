<template>
  <router-view>
 <div id="app" class="h-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-md-3 vue-bg h-100 d-flex justify-content-center align-items-center">
          <img alt="Vue logo" src="./assets/Red_leaf.jpg" width="100">
        </div>
        <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
          <div class="col-md-8 rounded px-5 py-4 shadow bg-white text-left"><login /></div>
        </div>
      </div>
    </div>
  </div>
 </router-view>

 
</template>

<script>
import * as SurveyVue from "survey-vue";
import "survey-vue/survey.vue";
import Signup from './pages/GeneralViews/SignUp';
import Questionnaire from "./Modals/Questionnaire";

    export default {
    components: {
    Signup,
    Questionnaire
  },


        methods: {
            initializeLayout() {
                if (!this.$rtl.isRTL) {
                    // Just make sure rtl css is off when we are not on rtl
                    this.$rtl.disableRTL();
                }
            }
        },
        mounted() {
            // this.initializeLayout();
        }
    };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #502c2c;
}
.vue-bg {
  background: #23f1ac;
}
</style>
