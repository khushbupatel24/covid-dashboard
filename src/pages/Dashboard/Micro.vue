<template>
  <span>{{points}}</span>
</template>

<script>
export default {
  props: {
    points: {
      type: String
    }
  },
  mounted: function() {
    $(this.$el).sparkline("html", {
      type: "line",
      width: 100,
      height: 50,
      lineColor: "#0083CD",
      fillColor: "rgba(0,131,205,0.2)",
      minSpotColor: true,
      maxSpotColor: true
    });
  },
  beforeDestroy: function() {
    $(this.$el).sparkline("destroy");
  }
};
</script>