<template>
  <div class="start-bg" :style="'transition: 0.3s;opacity: '+ enable +';'">
    <el-row justify="center" style="width:100%">
      <el-col>
        <el-row justify="center">
        </el-row>
        <el-row justify="center">
          <el-button 
            class="menu-button"
            type="info"
            @click="StartGame"
          >
            - 开始游戏 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button 
            class="menu-button"
            type="info"
            @click="LoadGame"
          >
            - 载入游戏 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button 
            class="menu-button"
            type="info"
            @click="toLib"
          >
            - 游戏设定 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button
              class="menu-button"
              type="info"
              @click="ModLoader"
          >
            - MOD加载器 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button 
            class="menu-button"
            type="info"
            @click="toAbout"
          >
            - 关于游戏 -
          </el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Start',
  components: {
        
  },
  data() {
    return {
      GLOBAL: inject('GLOBAL'),
      enable: 1
    }
  },
  mounted() {
    this.GLOBAL.frame.leftShow = 0;
    this.GLOBAL.frame.rightShow = 0;
  },
  methods: {
    StartGame() {
      // 淡入淡出防护
      if (this.enable === 0) return
      this.GLOBAL.frame.leftShow = 1;
      this.GLOBAL.frame.rightShow = 1;
      this.GLOBAL.frame.newGame = 1;
      this.enable = 0
      setTimeout(() => {
        this.$router.push('game')
      }, 300)
    },
    LoadGame() {
      // 淡入淡出防护
      if (this.enable === 0) return
      this.GLOBAL.frame.leftShow = 0;
      this.GLOBAL.frame.rightShow = 0;
      this.GLOBAL.frame.saveAload = true
      this.GLOBAL.frame.loadOnly = true
    },
    ModLoader() {
      // 淡入淡出防护
      if (this.enable === 0) return
      this.GLOBAL.frame.leftShow = 0;
      this.GLOBAL.frame.rightShow = 0;
      this.GLOBAL.frame.ModLoader = true
    },
    toLib() {
      // 淡入淡出防护
      if (this.enable === 0) return
      this.GLOBAL.frame.leftShow = 0;
      this.GLOBAL.frame.rightShow = 0;
    },
    toAbout() {
      // 淡入淡出防护
      if (this.enable === 0) return
      this.GLOBAL.frame.leftShow = 0;
      this.GLOBAL.frame.rightShow = 0;
      this.$router.push('about')
    },
  }
}
</script>

<style scoped>
.menu-button {
  height: 50px;
  width: 500px;
  font-size: 20px;
  background: black;
  color: white;
  opacity: 0.8;
  transition: 0.3s;
  margin: 10px;
}

.menu-button:hover {
  opacity: 1;
}

.start-bg {
  display: flex;
  place-items: center;
  height: 100vh;
}
</style>
