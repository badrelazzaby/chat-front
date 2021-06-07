<template>
  <div class="container rounded bg-light w-25 mt-5 text-center">
    <div class="form-group">
      <label for="username" class="form-label">Username :</label>
      <input type="text" class="form-control" placeholder="username.." />
      <label for="password" class="form-label">Password :</label>
      <input type="text" class="form-control" placeholder="passoword..." />
      <a
        href="/login"
        class="btn btn-outline-primary text-center m-3"
        type="button"
        >Login</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
</style>