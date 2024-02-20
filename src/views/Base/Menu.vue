<template>
  <div>
    <el-scrollbar>
      <el-row justify="center">
        <!-- <el-col> -->
        <el-row justify="center">
          <el-button class="menu-button" type="info" @click="SaveGame">
            - 保存 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info" @click="LoadGame">
            - 载入 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info">
            - 历史 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info" @click="toLib">
            - 设定 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info" @click="showDialog">
            - 主菜单 -
          </el-button>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info" @click="GLOBAL.debug = !GLOBAL.debug">
            - DEBUG -
          </el-button>
        </el-row>
        <!-- </el-col> -->
      </el-row>
    </el-scrollbar>
    <el-dialog
      v-model="menuDialogVisible"
      title="Tips"
      width="500"
      style="background: black; color: white; border: 1px solid white;opacity: 1;"
    >
      <span style="color:white">直接返回菜单不会保存当前进度</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="menu-button" @click="menuDialogVisible = false">Cancel</el-button>
          <el-button class="menu-button" style="background: rgb(55, 75, 135);" @click="toMenu">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
  
<script>
import { inject } from "vue";
export default {
  name: "Menu",
  components: {},
  data() {
    return {
      GLOBAL: inject("GLOBAL"),
      menuDialogVisible: false
    };
  },
  mounted() {},
  methods: {
    showDialog() {
      this.menuDialogVisible = true
    },
    toMenu() {
      this.menuDialogVisible = false
      this.GLOBAL.frame.leftShow = 0;
      this.GLOBAL.frame.rightShow = 0;
      this.$router.push("/");
    },
    SaveGame() {
      this.GLOBAL.frame.saveAload = true
      this.GLOBAL.frame.loadOnly = false
    },
    LoadGame() {
      this.GLOBAL.frame.saveAload = true
      this.GLOBAL.frame.loadOnly = true
    },
    toLib() {

    },
  },
};
</script>
  
  <style scoped>
.menu-button {
  height: 30px;
  width: 150px;
  font-size: 16px;
  background: rgb(77, 77, 77);
  color: white;
  opacity: 0.8;
  transition: 0.3s;
  margin: 5px;
}

.menu-button:hover {
  opacity: 1;
}
</style>