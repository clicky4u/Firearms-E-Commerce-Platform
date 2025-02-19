<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script>
import Home from './components/Home.vue';
import Checkout from './components/Checkout.vue';
import Details from './components/Details.vue';
import Success from './components/Success.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Home,
    Checkout,
    Details,
    Success,
    Footer
  }
};
</script>

<style scoped>
/* Add some general styling */
</style>
