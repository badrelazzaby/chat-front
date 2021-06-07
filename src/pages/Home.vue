<template>
  <div class="main">
    <div class="row">
      <div class="col-12 col-lg-7 left-side"></div>
      <div class="col-12 col-lg-5 px-5 right-side">
        <h1 class="text-primary p-5">
          <i class="fa fa-wechat fa-2x pr-2"></i>
          Galaxy Chat 
        </h1>
        <h5 class="px-5">Join Us Now: </h5>
          <a class="btn btn-outline-info w-25 m-5 rounded-pill" href="/login">Login</a>
          <a class="btn btn-outline-warning w-25 rounded-pill" href="/register">Register</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {},
  mounted() {},
  methods: {},
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
  background-image: url("../../public/images/home.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: auto;
}
.right-side {
  display: inline;
  align-items: center;
  position: relative;
  flex-direction: column;
  margin: auto;
  
}
.text-primary {
  font-size: 55px;
  font-weight: bold;
}

</style>

