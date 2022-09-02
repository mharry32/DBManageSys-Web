<template>
  <div id="modifyPassword">
    <h2 class="modify">修改密码</h2>
    <div class="pass pass1">
      <span>原密码</span
      ><el-input
        placeholder="请输入旧密码"
        v-model="orginPassword"
        show-password
        class="input"
      ></el-input>
    </div>

    <div class="pass pass2">
      <span class="pass">新密码</span
      ><el-input
        placeholder="请输入新密码"
        v-model="newPassword"
        show-password
        class="input"
      ></el-input>
    </div>
    <el-button type="primary" @click="confirmed">确定</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "modifyPassword",
  data() {
    return {
      orginPassword: "",
      newPassword: "",
      currentId: -1,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get("/api/users/current")
        .then((res) => {
          // console.log(res.data.id);
          this.currentId = res.data.id;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message.error("获取失败！");
          }
        });
    },
    confirmed() {
      if (this.orginPassword !== this.newPassword) {
        if (this.orginPassword.length !== 0 && this.newPassword.length !== 0) {
          axios
            .post("/api/users", {
              id: this.currentId,
              oldpassword: this.orginPassword,
              newpassword: this.newPassword,
            })
            .then((res) => {
              // console.log(res.data.success);
              if (res.data.success === true) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                axios.post("/api/admin/logout");
                this.$router.push("/admin/login");
              } else {
                this.$message.error("原密码输入错误！");
              }
            })
            .catch((err) => {
              // 请求失败的操作
              //   console.log(err);
              //   console.log(err.response.status);
              if (err.response.status === 401) {
                this.$router.push("/admin/login");
              } else {
                this.$message.error("修改失败！");
              }
            });
        } else {
          this.$message.error("密码不能为空");
        }
      } else {
        this.$message.error("新密码不能与原密码相同");
      }
    },
  },
};
</script>

<style scoped>
.modify {
  margin: 30px 0 30px 45px;
  font-weight: normal;
}
.pass1 {
  margin-bottom: 20px;
}

.pass2 {
  margin-bottom: 30px;
}

.pass span {
  padding: 0 20px 0 45px;
}

.input {
  width: 300px;
}

.el-button {
  margin-left: 113px;
}
</style>