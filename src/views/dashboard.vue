<template>
  <div>
    
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
      
    };
  },
  created() {
   
  },
};
</script>

<style scoped>
</style>