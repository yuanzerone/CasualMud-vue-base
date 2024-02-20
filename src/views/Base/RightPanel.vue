<template>
  <div class="right-menu" :style="GLOBAL.frame.rightShow?'right: 0': 'right: -300px'">
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'RightPanel',
  components: {
        
  },
  data() {
    return {
      GLOBAL: inject('GLOBAL')
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.right-menu{
  position: fixed;
  height: 100vh;
  width: 300px;
  border: 1px solid #ffffff;
  top: 0;
  transition: 0.3s;
}

.manu-card {
  padding-top: 20px;
  padding-bottom: 20px; 
  margin-left: 20px;
   margin-right: 20px;
}
</style>