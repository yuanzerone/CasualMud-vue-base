<template>
  <el-row>
    
  </el-row>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Panel',
  props: {
    people: {
      type: String,
      default: ''
    },
    line: {
      type: String,
      default: ''
    }
  },
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

</style>