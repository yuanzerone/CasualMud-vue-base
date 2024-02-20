<template>
  <div class="left-menu" :style="GLOBAL.frame.leftShow?'left: 0': 'left: -300px'">
    <el-scrollbar>
      <!-- <el-button v-for="item in 100" :key="item" style="width:100%;height: 30px;margin: 0;">{{ item }}</el-button> -->
      <el-row>
        <div class="manu-card" style="border-bottom: 1px solid white;">
          <PeopleCard :chara="'000_主角'"></PeopleCard>
        </div>
      </el-row>
      <el-row>
        <div class="manu-card" style="border-bottom: 1px solid white;">
          <MasterMenu></MasterMenu>
        </div>
      </el-row>
      <el-row>
        <div class="manu-card">
          <Menu></Menu>
        </div>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { inject } from 'vue'
import Menu from '@/views/Base/Menu.vue'
import PeopleCard from '../Item/PeopleCard.vue'
import MasterMenu from './MasterMenu.vue'
export default {
  name: 'LeftPanel',
  components: {
    Menu: Menu,
    MasterMenu: MasterMenu,
    PeopleCard: PeopleCard,
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
.left-menu{
  position: fixed;
  height: 100vh;
  width: 300px;
  border: 1px solid #ffffff;
  top: 0;
  transition: 0.3s;
  z-index: 5;
}

.manu-card {
  padding-top: 20px;
  padding-bottom: 20px; 
  margin-left: 20px;
  margin-right: 20px;
}
</style>