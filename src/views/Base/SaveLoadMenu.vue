<template>
  <div>
    <el-dialog
      v-model="this.GLOBAL.frame.saveAload"
      title="Save & Load"
      width="800"
      style="background: black; color: white; border: 1px solid white; opacity: 1;"
    >
      <el-row style="padding-bottom: 20px;">
        <el-col :span="12">
          <div class="save-card">
            <el-row>
              <el-col :span="19">
                <div class="save-line" style="padding-top: 10px;">快速存档 - 第12天 - 居所内</div>
                <div class="save-line">Time：1970/01/01 00:00:00</div>
              </el-col>
              <el-col :span="5">
                <el-button class="menu-button" type="info" :disabled="GLOBAL.frame.loadOnly">
                  Save
                </el-button>
                <el-button class="menu-button" style="background: rgb(77, 77, 77);" type="info" :disabled="false">
                  Load
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="save-card">
            <el-row>
              <el-col :span="19">
                <div class="save-line" style="padding-top: 10px;">默认存档 - 第12天 - 居所内</div>
                <div class="save-line">Time：1970/01/01 00:00:00</div>
              </el-col>
              <el-col :span="5">
                <el-button class="menu-button" type="info" :disabled="GLOBAL.frame.loadOnly">
                  Save
                </el-button>
                <el-button class="menu-button" style="background: rgb(77, 77, 77);" type="info" :disabled="false">
                  Load
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row style="padding-bottom: 20px;">
        <el-col v-for="index in (0, 10)" :key="index" :span="12">
          <div class="save-card">
            <el-row>
              <el-col :span="19">
                <div class="save-line" style="padding-top: 10px;">存档 {{ index }} - 第12天 - 居所内</div>
                <div class="save-line">Time：1970/01/01 00:00:00</div>
              </el-col>
              <el-col :span="5">
                <el-button class="menu-button" type="info" :disabled="GLOBAL.frame.loadOnly">
                  Save
                </el-button>
                <el-button class="menu-button" style="background: rgb(77, 77, 77);" type="info" :disabled="index%2==0">
                  Load
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="save-card">
            <el-button class="menu-button" type="info" :disabled="GLOBAL.frame.loadOnly">
              Save To File
            </el-button>
            <el-button class="menu-button" style="background: rgb(77, 77, 77);" type="info">
              Load From File
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'SaveLoadMenu',
  components: {
        
  },
  data() {
    return {
      GLOBAL: inject('GLOBAL'),
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.save-card {
  color: white;
  margin: 5px;
  padding: 5px;
  border: 1px solid white;
}

.menu-button {
  height: 30px;
  /* width: 150px; */
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

.save-line {
  font-size: 16px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>