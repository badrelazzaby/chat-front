<template>
  <Navbar />
  
  <slot>
  </slot>
  <Footer />
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
</style>