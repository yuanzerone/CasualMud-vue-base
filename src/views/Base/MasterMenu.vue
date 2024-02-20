<template>
  <div v-if="GLOBAL.data.chara['000_主角']">
    <el-scrollbar>
      <el-row justify="center">
        <el-row justify="center">
          <div class="menu-text">
            时间: 1106年
          </div>
        </el-row>
        <el-row justify="center">
          <div class="menu-text">
            金钱: {{ GLOBAL.data.chara['000_主角'].attr.money }}
          </div>
        </el-row>
        <el-row justify="center">
          <div class="menu-text">
            位置: 居间
          </div>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info">
            - 角色 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info">
            - 事务 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button v-if="!GLOBAL.data.show.place" class="menu-button" type="info">
            - 地图 -
          </el-button>
        </el-row>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'MasterMenu',
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
.menu-button {
  height: 30px;
  width: 150px;
  font-size: 16px;
  background: rgb(55, 75, 135);
  color: white;
  opacity: 0.8;
  transition: 0.3s;
  margin: 5px;
}

.menu-button:hover {
  opacity: 1;
}

.menu-text {
  font-size: 16px;
  width: 150px; 
  padding-bottom: 10px;
}
</style>