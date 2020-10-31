<template>
  <div class="wrapper">
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>
      <div>
        <router-view></router-view>
      </div>
      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent
  },
  data() {
    return {
      sidebarBackground: "primary", //vue|blue|orange|green|red|primary
      show: 0,
      refreshing: false,
      registration: null,
      snackWithButtons: false
    };
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },

  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackWithButtons = true;
    },

    refreshApp() {
      this.snackWithButtons = false;

      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }

      this.registration.waiting.postMessage("skipWaiting");
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.snackbar {
  position: fixed;
  right: 10px;
  bottom: 10px;
  color: white;
  background: rgba(10, 10, 10, 0.8);
  padding: 10px;
  border-radius: 5px;
  z-index: 99;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #bbbbbb;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #666666;
  border-radius: 10px;
}
</style>
