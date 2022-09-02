<template>
  <div>
    <h2>当前有{{ announceNum }}条公告</h2>
    <el-calendar v-model="value"> </el-calendar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "dashboard",
  data() {
    return {
      value: new Date(),
      announceNum: 0,
    };
  },
  created() {
    axios.get("/api/announce").then((res) => {
      // console.log(res.data);
      this.announceNum = res.data.length;
    });
  },
};
</script>

<style scoped>
</style>