<template>
  <Layout />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import Layout from './views/Layout.vue';
export default {
  components: {
    Layout: Layout
  },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>

</style>
