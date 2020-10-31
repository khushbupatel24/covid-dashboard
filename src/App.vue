<template>
  <router-view></router-view>

</template>

<script>

import Signup from './components/Modals/signup.vue'
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

