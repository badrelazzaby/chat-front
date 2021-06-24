<template>
  <div class="logout">
    <div>
      <span class="message username">{{ curentUser.user.username }} </span>
    </div>
    <button class="btn btn-outline-primary" @click="logOut()">Logout</button>
  </div>
  <div class="contain">
    <div class="main">
      <div class="connected-users">
        <ul v-for="(user, index) in users" :key="index">
          <a href="#">{{ user }}</a>
        </ul>
      </div>
      <div class="header">
        <p>{{ curentUser.user.username }}: Online</p>
      </div>
      <div class="message-content">
        <div v-for="(msg, index) in messages" :key="index">
          <span
            v-if="msg.username == curentUser.user.username"
            class="messages-left"
          >
            <p>
              <span class="message-user">{{ msg.username }}</span> :
              {{ msg.message }}
            </p></span
          >
          <span
            v-if="msg.username != curentUser.user.username"
            class="messages-right"
          >
            <p>
              <span class="message-user">{{ msg.username }}</span> :
              {{ msg.message }}
            </p></span
          >
        </div>
      </div>
      <div class="send-message">
        <input
          class="txt-box"
          type="text"
          v-model="message"
          placeholder="type..."
        />
        <button class="btn-send-message" @click.prevent="sendMessage()">
          <i class="far fa-paper-plane"></i> send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as io from "socket.io-client";
import router from "../routes/index";
import { ref, reactive, onMounted, onUpdated, onUnmounted } from "vue";

export default {
  name: "Chat",

  setup() {
    let message = ref("");
    let messages = reactive([]);
    let users = reactive([]);
    let usersCache = reactive([]);
    let lastUser = ref("");
    let curentUser = JSON.parse(localStorage.getItem("user"));
    let socket = io("http://localhost:5000");

    onUpdated(() => {
      let divScroll = document.querySelector(".message-content");
      divScroll.scrollTop = 999999999999999;
    });

    onMounted(() => {
      socket.on("message", (data) => {
        messages.push(data);
      });
      getAllUserMessages();
      getOnlineUsers()
    });

    onUnmounted(() => {
      logOut()
    })

    async function sendMessage() {
      await axios.post(
        `http://localhost:5000/api/message/store-message`,
        { message: message.value, userId: curentUser.user._id },
        { headers: { "x-access-token": curentUser.token } }
      );

      socket.emit("send-message", {
        message: message.value,
        username: curentUser.user.username,
      });
      message = "";
    }
    async function getAllUserMessages() {
      axios
        .get(
          `http://localhost:5000/api/message/all-messages/${curentUser.user._id}`,
          { headers: { "x-access-token": curentUser.token } }
        )
        .then(async (response) => {
          for (let i = 0; i < response.data.length; i++) {
            await messages.push({
              message: response.data[i].message,
              username: response.data[i].userId.username,
            });
          }
        })
        .catch((error) => {
          console.log(`-error getting messages-`, error);
        });
    }

    async function getOnlineUsers() {
      await axios
        .get(`http://localhost:5000/api/user/online-users`)
        .then((response) => {
          console.log(response.data.username);
          // let element = 0
          // for (element in data ) {
          //   users.push(data[element].username)
          //   // console.log(`users online ${users}`);
          // }
          
        })
        .catch((error) => {
          console.log(error);
        })
    }

    async function logOut() {
      await axios 
        .put(`http://localhost:5000/api/user/offline-user/${curentUser.user._id}`, {
          online: false
        })
      await localStorage.removeItem("user");
      router.replace("login");
    }

    return {
      socket,
      message,
      messages,
      users,
      usersCache,
      lastUser,
      curentUser,
      logOut,
      getAllUserMessages,
      sendMessage,
      getOnlineUsers
    };
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  margin-left: 35%;
  margin-top: 20vh;
  width: 40vh;
  padding: 10px;
  box-shadow: 1px 1px 6px 1px rgb(185, 175, 175);
  border-radius: 10px;
  height: 40vh;
  background-color: rgb(235, 221, 221);
}
.header {
  width: auto;
  height: 35px;
  background-color: inherit;
}
.btn-send-message {
  background-color: rgb(227, 203, 250);
  padding: auto;
  border-radius: 5px;
  margin-left: 5px;
  border: cornflowerblue;
  height: 3.5vh;
  width: 10vh;
}

.txt-box {
  width: 35vh;
  border: 0.5px solid rgb(185, 175, 175);
  height: 3.5vh;
  border-radius: 5px;
}

.messages-left {
  background-color: #4dd0e1;
  max-width: 25vh;
  min-width: 25vh;
  display: flex;
  justify-content: flex-start;
  padding: 3px;
  margin: 3px;
  border-radius: 7px 7px 7px 7px;
  min-height: auto;
  float: right;
  color: black;
}

.messages-right {
  background-color: #eceff1;
  max-width: 25vh;
  min-width: 25vh;
  display: flex;
  justify-content: flex-start;
  padding: 3px;
  margin: 3px;
  border-radius: 7px 7px 7px 7px;
  min-height: auto;
  float: left;
  color: black;
}

.send-message {
  display: flex;
  flex-direction: row;
  margin-top: auto;
}

.message-content {
  overflow-y: scroll;
  height: calc(40vh - 3.5vh);
  margin-bottom: 10px;
}

.message-content p {
  padding: 0.5rem;
  width: auto;
  word-break: break-word;
}
.username {
  font-weight: bold;
  color: #ffaf0a;
}
.logout {
  display: flex;
  float: right;

  width: 200px;
  justify-content: space-evenly;
}
.message-user {
  font-weight: bold;
}
.connected-users {
  display: flex;
  flex-direction: row;
}
.connected-users a:link,
a:visited {
  background-color: #6fd440;
  color: white;
  padding: 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 50px 40px 30px 10px;
  margin-left: -25px;
}

.connected-users a:hover,
a:active {
  background-color: inherit;
  color: #6fd440;
  border: 1px solid #6fd440;
}
</style>
