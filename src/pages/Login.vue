<template>
  <div class="main">
    <div class="row">
      <div class=" left-side"></div>
      <div class="col-12 col-lg-5 px-5 right-side">
        <label class="form-label text-danger" v-if="hasError"
          >{{errorMessage}}</label
        >
        <div class="form-group">
          <h1 class="text-info">Chat with Universe</h1>
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
            class="btn btn-outline-info text-center mt-3"
            type="button"
            @click="Login()
            "
            >Login</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import router from "../routes/index";

export default {
  name: "Login",
  setup() {
    let username = ref("");
    let password = ref("");
    let errorMessage = ref('');
    let hasError = ref(false);

    async function Login() {
      try {
        await axios
          .post(`http://localhost:5000/api/user/login`, {
            username: this.username,
            password: this.password,
            online: true
          })
          .then(async (response) => {
            router.push("/chat");
            await localStorage.setItem("user", JSON.stringify(response.data));
          });
      } catch (error) {
        this.hasError = true;
        this.errorMessage = error.response.data.message
      }
    }

    // async function setOnlineUser() {
    //   await axios 
    //     .put(`http://localhost:5000/api/user/online-user`, {
    //       online : true
    //     }).then(data => {
    //       console.log(`set online users`,data);
    //     })
    //     .catch(error => {
    //       console.log(`Error set online users`,error);
    //     })
    // }

    return {
      username,
      password,
      Login,
      errorMessage,
      hasError,
      
    };
  },
};
</script>

<style>
.main {
  height: calc(100vh - 6vh - 5vh);
}
.row {
  height: calc(100vh - 10vh);
}
.left-side {
  background-image: url("../../public/images/login-chat.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: auto;
}
.right-side {
  display: inline;
  margin: auto;
  flex-direction: column;
  position: relative;
  align-items: center;
  max-width: 50vh;
  margin-left: 0;
}
.text-info {
  font-weight: bold;
}
</style>