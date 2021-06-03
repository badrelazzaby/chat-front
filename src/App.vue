<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
    crossorigin="anonymous"
  />
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <center><a href="#" @click="XMLdownload()"> Download </a></center> <br> -->
    <p>{{message}}</p>
    <input type="text" v-model="message">
    <button @click="sendMessage()">send message</button>
</template>

<script>
import axios from "axios";
import * as io from "socket.io-client";

export default {
  name: "App",
  data() {
    return {
      socket: io("http://localhost:5000"),
      users: [],
      message: ''
    };
  },
  mounted() {},
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

