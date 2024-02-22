<template>
  <div>
    <el-text>{{eventMessage}}</el-text>
    <el-button v-for="action in actions" type="text">
      {{action}}
    </el-button>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Panel',
  components: {
        
  },
  data() {
    return {
      GLOBAL: inject('GLOBAL'),
      eventMessage: "",
      actions: []
    }
  },
  mounted() {
    $emitter.on("updateSection",(data)=>{
      this.eventMessage = data.message;
      this.actions = data.actions;
    })
  },
  methods: {

  }
}
</script>

<style scoped>

</style>