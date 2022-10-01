<template>
  <el-tag :type="type" effect="dark">
    {{ label }}
  </el-tag>
</template>

<script>
export default {
  name: "onlineStatusTag",
  props:{
      onlineStatus: Number,
  },
  computed: {
    type: function () {
      if (this.onlineStatus == 0) {
        return "info";
      } else if (this.onlineStatus == 1) {
        return "success";
      } else if (this.onlineStatus == 2) {
        return "danger";
      } else {
        return "";
      }
    },
    label: function () {
      if (this.onlineStatus == 0) {
        return "未知";
      } else if (this.onlineStatus == 1) {
        return "在线";
      } else if (this.onlineStatus == 2) {
        return "离线";
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
</style>