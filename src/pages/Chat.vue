<template>
  <div class="logout">
    <button class="btn btn-outline-primary" @click="logOut()">Logout</button>
    <p>
      
    </p>
  </div>
  <div class="main">
    <div class="message-content">
      <div class="messages" v-for="(msg, index) in messages" :key="index">
        <p>
          <span class="message">{{ msg.message }} </span>
        </p>
      </div>
    </div>
    <div class="send-message">
      <input
        class="txt-box"
        type="text"
        v-model="message"
        placeholder="type..."
      />
      <button class="btn-send-message" @click="sendMessage()">
        <i class="far fa-paper-plane"></i> send
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as io from "socket.io-client";
import router from "../routes/index";
export default {
  name: "Chat",

  data() {
    return {
      socket: io("http://localhost:5000"),
      curentUser: {},
      message: "",
      messages: [],
    };
  },
  created: async function () {
    let data_user = await localStorage.getItem("user");
    console.log('-----', data_user);
  },
  mounted: function () {
    this.socket.on("message", (data) => {
      this.messages.push(data);
    });
  },
  methods: {

    async sendMessage() {
      await axios.post(`http://localhost:5000/api/message/store-message`, {
        message: this.message,
      });
      this.socket.emit("send-message", {
        message: this.message,
      });
      this.message = "";
    },
    logOut() {
      localStorage.removeItem("user");
      router.replace("login");
    },
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
  box-shadow: 1px 1px 6px 1px blueviolet;
  border-radius: 10px;
  height: 40vh;
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

.messages {
  background-color: rgb(227, 203, 250);
  width: 29vh;
  display: flex;
  justify-content: flex-start;
  padding: 3px;
  margin: 3px;
  border-radius: 10px 15px 15px 0px;
  min-height: auto;
}

.send-message {
  display: flex;
  flex-direction: row;
  margin-top: auto;
}

.message-content {
  overflow-y: scroll;
  height: calc(40vh - 3.5vh);
}
</style>
