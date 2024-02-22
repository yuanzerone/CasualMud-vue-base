<template>
  <div class="fr-bg">
    <el-row>
      <!-- <el-col style="width: calc(100% - 400px)"> -->
      <div class="fr-sd" :style="GLOBAL.frame.leftShow ? 'width: 300px' : '0'">
        <LeftPanel />
      </div>
      <!-- </el-col> -->
      <!-- <el-col> -->
      <div
        class="fr-sd"
        :style="
          'width: calc(100% - ' +
          (GLOBAL.frame.leftShow + GLOBAL.frame.rightShow) * 300 +
          'px);'
        "
      >
        <RouterView />
      </div>
      <!-- </el-col>
      <el-col> -->
      <div class="fr-sd" :style="GLOBAL.frame.rightShow ? 'width: 300px' : '0'">
        <RightPanel />
      </div>
      <!-- </el-col> -->
    </el-row>
    <el-row>
      <div style="height: 10px"></div>
    </el-row>
  </div>

  <SaveLoadMenu></SaveLoadMenu>
  <ModLoader></ModLoader>
  <SettingMenu></SettingMenu>
  <!-- 数据界面 -->
  <div
    style="
      width: 300px;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 300px;
      opacity: 0.5;
    "
    v-if="GLOBAL.debug"
  >
    <el-scrollbar>
      <div>
        {{ GLOBAL }}
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import ModLoader from "@/views/Base/ModLoader.vue";
</script>

<script>
import LeftPanel from "./Base/LeftPanel.vue";
import RightPanel from "./Base/RightPanel.vue";
import SaveLoadMenu from "./Base/SaveLoadMenu.vue";
import SettingMenu from "./Base/SettingMenu.vue";
import { inject } from "vue";
export default {
  name: "Layout",
  components: {
    LeftPanel,
    RightPanel,
    SaveLoadMenu,
    SettingMenu,
  },
  data() {
    return {
      GLOBAL: inject("GLOBAL"),
    };
  },
};
</script>

<style scoped>
.fr-bg {
  width: 100%;
  min-width: 1280px;
}
.fr-sd {
  /* height: 100vh; */
  /* transition: 0.3s; */
  color: white
}
</style>
