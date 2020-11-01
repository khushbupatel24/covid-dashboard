<template>
  <div class="col-sm-4 offset-sm-4 pt-lg-5">
    <div>
      <h1>
        <center>Sign In</center>
      </h1>
      <h5>
        <center>To chat with other users</center>
      </h5>
      <form @submit.prevent="handleSubmit" class="border border-primary p-md-4">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" placeholder="Enter your Email" v-model="user.email" id="email" name="email"
                 class="form-control"
                 :class="{ 'is-invalid': submitted && $v.user.email.$error }" required/>
          <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
            <span v-if="!$v.user.email.required">Email is required</span>
            <span v-if="!$v.user.email.email">Email is invalid</span>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" placeholder="Enter your Password" v-model="user.password" id="password" name="password"
                 class="form-control"
                 :class="{ 'is-invalid': submitted && $v.user.password.$error }" required/>
          <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
            <span v-if="!$v.user.password.required">Password is required</span>
          </div>
        </div>

        <div class="form-group text-center">
          <button class="btn btn-primary">
            <center>SignIn</center>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import {required, email, sameAs} from "vuelidate/lib/validators";

    export default {
        name: "app",
        data() {
            return {
                user: {
                    email: "",
                    password: "",
                },
                submitted: false
            };
        },
        validations: {
            user: {

                email: {required, email},
                password: {required},
            }
        },
        methods: {
            handleSubmit() {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
            }
        }
    };
</script>
<style>
  label {
    color: rgba(255, 255, 255, 0.8);
  }
</style>
