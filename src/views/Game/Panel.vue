<template>
  <div class="center-panel" :style="'transition: 0.3s;opacity: '+ enable +';'">
    <Map></Map>
    <Shop></Shop>
    <Detail></Detail>
    <CharaPage></CharaPage>
    <el-dialog
      v-model="this.GLOBAL.frame.commonDialog"
      title="Tips"
      width="500"
      style="background: black; color: white; border: 1px solid white;opacity: 1;"
    >
      <CommonDialog></CommonDialog>
    </el-dialog>
  </div>
</template>

<script>
import LoadData from '@/utils/LoadData.js'
import Map from '@/views/Game/Map.vue'
import Shop from '@/views/Game/Shop.vue'
import Detail from '@/views/Game/Detail.vue'
import CommonDialog from '@/views/Game/CommonDialog.vue'
import CharaPage from '@/views/Game/CharaPage.vue'
import info from '@/data/event/info.js'
import { inject } from 'vue'
export default {
  name: 'Panel',
  components: {
    Map,
    Shop,
    Detail,
    CommonDialog,
    CharaPage,
  },
  data() {
    return {
      GLOBAL: inject('GLOBAL'),
      enable: 0,
    }
  },
  mounted() {
    setTimeout(() => {
      this.enable = 1;
    }, 300)
    this.GLOBAL.frame.leftShow = 1;
    this.GLOBAL.frame.rightShow = 1;
    this.startGame();
  },
  methods: {
    startGame() {
      // 加载数据方法
      this.GLOBAL.func.state.loading = 1
      this.GLOBAL.func.state.cnt = 0
      for (let item of LoadData.funcTree) {
        let module = item.replace('/src/data/', '').split('/')
        LoadData.AddTreeItem(this.GLOBAL.func.state, this.GLOBAL.func, module, item)
      }
      if (true) {
        this.GLOBAL.frame.newGame = 1
      }
      if (this.GLOBAL.frame.newGame) {
        this.newGame()
      }
    },
    newGame() {
      // this.GLOBAL.data.chara['主角'] = JSON.parse(JSON.stringify(this.GLOBAL.func.chara['default']))
      info.start(this.GLOBAL)
    },
  }
}
</script>

<style scoped>
.center-panel {
  padding: 10px;
  transition: 0.3s;
}
</style>