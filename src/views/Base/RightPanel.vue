<template>
  <div
    class="right-menu"
    :style="GLOBAL.frame.rightShow ? 'right: 0' : 'right: -300px'"
  >
    <el-input v-model="room"></el-input>
    <el-button @click="connect">connect</el-button>
  </div>
</template>

<script>
import { inject } from "vue";
import WebrtcClient from "../../service/webrtc.js"
export default {
  name: "RightPanel",
  components: {},
  data() {
    return {
      GLOBAL: inject("GLOBAL"),
      room: ""
    };
  },
  mounted() {},
  methods: {
    connect() {
      console.log(this.room);
      this.GLOBAL.webrtc = new WebrtcClient([{
                urls: "stun:stun.ekiga.net"
            }],"wss://www.buaa-jj.cn/websocket",this.room);
    },
  }
};
</script>

<style scoped>
.right-menu {
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