<template>
   <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <center><a href="#" @click="XMLdownload()"> Download </a></center> <br> -->
  <center>
    <p>{{ message }}</p>
    <input class="form-control w-50" type="text" v-model="message" />
    <br />
    <button class="btn btn-info" @click="sendMessage()">send message</button>
  </center>
</template>

<script>
import axios from "axios";
import * as io from "socket.io-client";
export default {
  name: "Home",
 
  data() {
    return {
      socket: io('http://localhost:5000'),
      users: [],
      message: "",
    };
  },
  methods: {
    XMLdownload() {
      axios({
        url: "http://localhost:5000/api/etudiant/getXML",
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "TEST.xml");
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    sendMessage() {
      this.socket.emit("message", this.message);
    },
  },
};
</script>

<style>

</style>