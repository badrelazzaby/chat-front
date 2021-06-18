<template>
  <div class="container rounded bg-light w-25 mt-5 text-center">
    <label class="form-label text-danger" v-if="error"
      >your informations is invalid</label
    >
    <div class="form-group">
      <label for="username" class="form-label">Username :</label>
      <input
        type="text"
        v-model="username"
        class="form-control"
        placeholder="username.."
      />
      <label for="password" class="form-label">Password :</label>
      <input
        type="text"
        v-model="password"
        class="form-control"
        placeholder="passoword..."
      />
      <a
        href="#"
        class="btn btn-outline-primary text-center m-3"
        type="button"
        @click="Login()"
        >Login</a
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
// import router from "../routes/index";

export default {
  name: "Login",
  setup() {
    var username = ref("");
    var password = ref("");
    var error = ref(false);

    async function Login() {
      try {
        await axios
          .post(`http://localhost:5000/api/user/login`, {
            username: this.username,
            password: this.password,
          })
          .then(async (response) => {
            console.log('-----', response.data.user);
            // router.replace("chat");
            await localStorage.setItem("user", response.data.user);

            let dataUser = await localStorage.getItem("user")
            console.log(dataUser);
          });
      } catch (error) {
        this.error = true;
        console.log(error.response);
      }
    }
    return {
      username,
      password,
      Login,
      error,
    };
  },
};
</script>

<style>
</style>