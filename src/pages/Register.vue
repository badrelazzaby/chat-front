<template>
  <div class="main">
    <div class="row">
      <div class="col-12 col-lg-7 left-side"></div>

      <div class="col-12 col-lg-5 px-5 right-side">
        <form action="">
          <div class="form-group">
            <div class="form-group">
              <h1 class="text-warning"
                >Chat with Universe</h1
              >
            </div>
            <label for="username" class="form-label">Username :</label>
            <input type="text" class="form-control" placeholder="username.." />
            <label for="password" class="form-label">Password :</label>
            <input
              type="text"
              class="form-control"
              placeholder="passoword..."
            />
            <a
              href="/login"
              class="btn btn-outline-warning text-center mt-3"
              type="button"
              >Register</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  components: {},
  data() {},
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
  background-image: url("../../public/images/register-chat.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: auto;
}
.right-side {
  display: flex;
  align-items: center;
  position: relative;
}
.text-warning {
  font-weight: bold;
}
</style>