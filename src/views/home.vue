<template>
  <div id="home">
    <div class="homeHeader">
      <span>公告栏</span
      ><el-button type="text" class="el-icon-s-custom" @click.native="login"
        >登录</el-button
      >
    </div>
    <el-table :data="info" style="width: 100%">
      <el-table-column prop="title" label="标题" width="500"> </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="300">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      info: [],
    };
  },
  created() {
    axios.get("/api/announce").then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].createtime = this.timetrans(res.data[i].createtime);
        if (res.data[i].updatetime == null) {
          res.data[i].updatetime = "";
        } else {
          res.data[i].updatetime = this.timetrans(res.data[i].updatetime);
        }
      }
      this.info = res.data;
      this.$message({
        type: "success",
        message: "加载完成",
      });
    });
  },
  methods: {
    // 时间戳转换时间
    timetrans(date) {
      var date = new Date(date * 1000); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Y + M + D + h + m;
    },
    login() {
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
.homeHeader {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
  background-color: #555c63;
  color: #fff;
}

.homeHeader span {
  font-size: 20px;
  padding-left: 9px;
  font-weight: 700;
}

.homeHeader .el-button {
  padding-right: 20px;
  font-size: 16px;
  color: #fff;
}

.homeHeader .el-button:hover {
  color: rgb(185, 220, 236);
}
</style>