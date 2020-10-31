<template>
  <router-view></router-view>
</template>

<script>
import Questionnaire from "./Modals/Questionnaire";
    export default {
        components:{
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

