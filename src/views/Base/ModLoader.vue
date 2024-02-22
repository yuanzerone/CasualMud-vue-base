<template>
  <div>
    <el-dialog
        v-model="this.GLOBAL.frame.ModLoader"
        title="Mod Loader"
        width="800"
        style="background: black; color: white; border: 1px solid white; opacity: 1;"
    >
      <el-row>
        <input type="file" accept=".zip" @change="handleFileSelect">
      </el-row>
      <el-row>
        <el-text>已加载模组</el-text>
        <el-table :data="modList" :show-header="false">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="value" label="模组"></el-table-column>
          <el-table-column label="操作" width="100px">
            <template #default="scope">
              <el-button @click="deleteMod(scope.$index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {inject} from "vue";
import JsZip from "jszip";
import * as iconv from "iconv-lite"
import {ElMessage} from "element-plus";

export default {
  name:"modLoader",
  data() {
    return {
      GLOBAL: inject("GLOBAL"),
      modList: []
    };
  },
  methods: {
    async loadCache() {
      if(await caches.has("ModLoader")) {
        for (let i = 0; i < this.modList.length;i++) {
          const mod = this.modList[i].value;
          const res = await caches.match("/mods/"+mod)
          if (!res) {
            this.modList.splice(i,1);
            localStorage.setItem("modList",JSON.stringify(this.modList));
            continue;
          }
          const fileStream = res.body;
          const data = await fileStream.getReader().read();
          const jsZip = new JsZip()
          const file = await jsZip.loadAsync(data.value,{
            //解决文件名乱码问题
            decodeFileName: function (bytes) {
              return iconv.decode(bytes, 'gbk');
            }
          });
        }
        if (this.modList.length !== 0) {
          ElMessage.info("共加载"+this.modList.length+"个MOD")
        }
      }
    },
    checkDuplicate(fileName) {
      return new Promise((resolve,reject) =>{
        for (let i = 0; i < this.modList; i++) {
          if (this.modList[i].value === fileName) {
            return resolve(false);
          }
        }
        return resolve(true);
      })
    },
    handleFileSelect(event) {
      const files = event.target.files;
      if (files.length === 1) {
        const fileName = files[0].name.split('.');
        if (fileName[fileName.length - 1] === 'zip') {
          this.checkDuplicate(files[0].name).then(res=>{
            caches.open("ModLoader").then(cache => {
              cache.put("/mods/"+files[0].name,new Response(files[0],{status:200}))
            })
            if (res) {
              this.modList = [...this.modList,{value:files[0].name}];
              localStorage.setItem("modList",JSON.stringify(this.modList));
            }
          })
        }
      }
    },
    deleteMod(index) {
      this.modList.splice(index,1);
      localStorage.setItem("modList",JSON.stringify(this.modList));
      ElMessage.info("已删除，请刷新页面重新加载")
    }
  },
  mounted() {
    let modList = localStorage.getItem("modList");
    if (modList) {
      this.modList = JSON.parse(modList);
    }
    this.loadCache()
  }
}
</script>

<style scoped>

</style>