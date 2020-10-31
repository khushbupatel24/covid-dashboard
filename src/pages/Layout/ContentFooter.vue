<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        <h4 class="companytext">&copy; {{ year }} University of Windsor</h4>
        <span class="companyother">Sunset Avenue, Windsor.</span><br/>
        <span class="companycontact">
          We welcome all feedback and suggestions, please contact us at
          <a href="mailto:hello@rivethammer.com">hello@uwindsor.com</a>
        </span>
      </div>
      <button @click="scrollToTop" type="button" class="btn btn-default btn-to-top pull-right">
        <i class="fa fa-chevron-up"></i>
      </button>
      <ul class="nav" style="margin-top:11px">
        <li class="nav-item">
          <a
            href="https://www.rivethammer.com/privacy-policy/"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >Privacy Policy</a>
        </li>
        <li class="nav-item">
          <a
            href="https://www.rivethammer.com/terms-of-service/"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >Terms of Service</a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
<style>
.btn-to-top {
  width: 50px;
  height: 50px;
  padding: 10px 16px;
  border-radius: 2px;
  font-size: 14px;
  line-height: 22px;
  border: 1px solid #fff;
  background: #1e1e25;
}
.companytext {
  font-size: 20px;
  color: #fff;
  margin-bottom: 4px;
}
.companyother {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: none;
}
.companycontact {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: none;
}
.footer {
  font-family: "Roboto Slab", serif;
  /* background: #333; */
}
</style>
