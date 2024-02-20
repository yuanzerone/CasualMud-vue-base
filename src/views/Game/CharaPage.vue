<template>
  <div>
    <el-row justify="center">
      <div v-for="(item, index) in GLOBAL.data.chara" :key="index">
        <div style="margin: 5px;" v-if="index !== '000_主角'">
          <PeopleCard :chara="index"></PeopleCard>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import PeopleCard from '../Item/PeopleCard.vue';
import { inject } from 'vue'
export default {
  name: 'Panel',
  components: {
    PeopleCard
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

</style>