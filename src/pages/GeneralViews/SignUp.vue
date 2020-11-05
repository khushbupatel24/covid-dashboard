<template>
        <div class="col-sm-5 offset-sm-4 pt-lg-5">
          <div>
            <h1>
              <center>Register Yourself</center>
            </h1>
            <h5>
              <center>To check your <b>COVID-19 symptoms</b></center>
            </h5>
            <form
              @submit.prevent="handleSubmit"
              class="border border-primary p-md-4"
            >
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  v-model="user.firstName"
                  id="firstName"
                  name="firstName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.firstName.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.user.firstName.required"
                  class="invalid-feedback"
                >
                  First Name is required
                </div>
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  v-model="user.lastName"
                  id="lastName"
                  name="lastName"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.lastName.$error,
                  }"
                />
                <div
                  v-if="submitted && !$v.user.lastName.required"
                  class="invalid-feedback"
                >
                  Last Name is required
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="user.email"
                  id="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">Email is required</span>
                  <span v-if="!$v.user.email.email">Email is invalid</span>
                </div>
              </div>
              <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input
                  type="date"
                  v-model="user.dob"
                  id="dob"
                  name="dob"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.lastName.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.email.required">DOB is required</span>
                </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  v-model="user.password"
                  id="password"
                  name="password"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.password.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.password.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.password.required"
                    >Password is required</span
                  >
                  <span v-if="!$v.user.password.minLength"
                    >Password must be at least 6 characters</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  v-model="user.confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  class="form-control"
                  :class="{
                    'is-invalid': submitted && $v.user.confirmPassword.$error,
                  }"
                />
                <div
                  v-if="submitted && $v.user.confirmPassword.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.user.confirmPassword.required"
                    >Confirm Password is required</span
                  >
                  <span v-else-if="!$v.user.confirmPassword.sameAsPassword"
                    >Passwords must match</span
                  >
                </div>
              </div>
              <div class="form-group  text-center">
                <button class="btn btn-primary">
                  <center>Register</center>
                </button>
              </div>
            </form>
          </div>
        </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "app",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        dob: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      dob: { required },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") },
    },
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
    },
  },
};
</script>
<style>
label {
  color: rgba(255, 255, 255, 0.8);
}
</style>