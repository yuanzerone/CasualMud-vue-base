<template>
  <div style="width: 260px; border: 1px solid white; padding-top: 10px;padding-bottom: 10px;" v-if="GLOBAL.data.chara[chara]">
    <el-scrollbar>
      <el-row justify="center">
        <!-- <el-row justify="center">
          <div style="width: 200px;text-align: center;">
            <el-avatar shape="square" :size="100" :src="''" />
          </div>
        </el-row> -->
        <el-row justify="center">
          <div style="font-size: 16px;">
            <div style="width: 200px;text-align: center;">
              {{ GLOBAL.data.chara[chara].attr.name }} 
              {{ GLOBAL.data.chara[chara].attr.identity ? '[ ' + GLOBAL.data.chara[chara].attr.identity + ' ]' : ''}} 
            </div>
            <div style="width: 200px;padding-top: 10px;">
              {{ GLOBAL.data.chara[chara].attr.action }}
            </div>
            <div style="width: 200px; padding-bottom: 20px;padding-top: 10px;">
              体力: {{ GLOBAL.data.chara[chara].attr.hp.now }} / {{ GLOBAL.data.chara[chara].attr.hp.max }} 
              <el-progress :percentage="100 * GLOBAL.data.chara[chara].attr.hp.now / GLOBAL.data.chara[chara].attr.hp.max" :text-inside="true" status="exception" />
              魔力: {{ GLOBAL.data.chara[chara].attr.mp.now }} / {{ GLOBAL.data.chara[chara].attr.mp.max }} 
              <el-progress :percentage="100 * GLOBAL.data.chara[chara].attr.mp.now / GLOBAL.data.chara[chara].attr.mp.max" :text-inside="true" />
              精力: {{ GLOBAL.data.chara[chara].attr.sp.now }} / {{ GLOBAL.data.chara[chara].attr.sp.max }} 
              <el-progress :percentage="100 * GLOBAL.data.chara[chara].attr.sp.now / GLOBAL.data.chara[chara].attr.sp.max" :text-inside="true" status="success" />
            </div>
          </div>
        </el-row>
        <el-row justify="center">
          <el-button class="menu-button" type="info">
            - 详情 -
          </el-button>
          <el-button class="menu-button" type="info">
            - 物品 -
          </el-button>
          <el-button class="menu-button" type="info">
            - 技能 -
          </el-button>
          <el-button v-if="showAsk" class="menu-button" type="info">
            - 交谈 -
          </el-button>
          <el-button v-if="showAsk" class="menu-button" type="info">
            - 动作 -
          </el-button>
        </el-row>
      </el-row>
      <!-- {{ GLOBAL.data.chara[chara] }}  -->
    </el-scrollbar>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'PeopleCard',
  props: {
    chara: {
      type: String,
      default: 'default'
    },
    showAsk: {
      type: Boolean,
      default: false
    },
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
</style>