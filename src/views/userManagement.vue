<template>
  <div id="announceManage">
    <el-table :data="userData" style="width: 100%">
      <el-table-column
        prop="username"
        label="用户"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="rolename"
        label="角色"
        width="300"
      ></el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button
            class="manibtn"
            size="mini"
            @click="userRoleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- 按编辑按钮后的弹框 -->
          <el-dialog
            title="编辑角色"
            :visible.sync="editUserRoleVisible"
            width="30%"
          >
            <span class="userName">用户名：{{ currentEditedUserName }}</span>
            <span class="selectRole"
              >角色：<el-select v-model="roleid" placeholder="请选择">
                <el-option
                  v-for="item in allRoles"
                  :key="item.roleid"
                  :label="item.roleName"
                  :value="item.roleid"
                >
                </el-option> </el-select
            ></span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editUserRoleVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmNewUserRole"
                >确 定</el-button
              >
            </span>
          </el-dialog>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-plus"
            class="addUser"
            @click="handleAdd()"
            >新增</el-button
          >
          <!-- 按新增按钮后的弹框 -->
          <el-dialog
            title="新增用户"
            :visible.sync="addDialogFormVisible"
            class="edit"
          >
            <el-form @submit.native.prevent>
              <el-form-item
                label="用户名："
                :label-width="formLabelWidth"
                class="name"
              >
                <el-input v-model="addUserName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="密码："
                :label-width="formLabelWidth"
                class="psd"
              >
                <el-input
                  v-model="password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addNewConfirmed"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userManagement",
  data() {
    return {
      userData: [],
      // currentId: -1,
      formLabelWidth: "120px",
      addUserName: "",
      addDialogFormVisible: false,
      password: "",
      editUserRoleVisible: false,
      currentEditedUserName: "",
      currentEditedUserId: "",
      allRoles: [],
      roleid: "",
    };
  },
  created() {
    // 发送网络请求
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get("/api/users")
        .then((res) => {
          // console.log(res.data);
          this.userData = res.data;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("加载失败！");
          }
        });
    },

    // 监听编辑按钮
    userRoleEdit(index, row) {
      this.editUserRoleVisible = true;
      console.log(row);
      if (row.roleid == 0) {
        this.roleid = "";
      } else {
        this.roleid = row.roleid;
      }
      this.currentEditedUserName = row.username;
      this.currentEditedUserId = row.id;
      axios.get("/api/users/roles").then((res) => {
        console.log(res.data);
        this.allRoles = res.data;
      });
    },

    // 监听编辑中的确认按钮
    confirmNewUserRole() {
      this.editUserRoleVisible = false;
      axios
        .post("/api/users/modifyrole", {
          id: this.currentEditedUserId,
          roleid: this.roleid,
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getInfo();
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("删除失败！");
          }
        });
    },

    // 监听删除按钮
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .delete("/api/users", {
              data: {
                id: row.id,
              },
            })
            .then((res) => {
              //   console.log(res);
              this.getInfo();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              if (err.response.status === 401) {
                this.$router.push("/admin/login");
              } else {
                this.$message("删除失败！");
              }
            });
        })
        .catch(() => {});
    },
    // 监听新增按钮
    handleAdd() {
      this.addDialogFormVisible = true;
    },
    // 监听新增按钮里面的确认按钮
    addNewConfirmed() {
      if (this.addUserName.length !== 0 && this.password.length !== 0) {
        this.addDialogFormVisible = false;
        let newUser = { username: this.addUserName, password: this.password };
        axios
          .put("/api/users", newUser)
          .then((res) => {
            console.log(res.data.success);
            if (res.data.success) {
              this.getInfo();
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.addUserName = "";
              this.password = "";
            } else {
              this.$message.error("该用户已存在");
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push("/admin/login");
            } else {
              this.$message("新增用户失败！");
            }
          });
      } else {
        this.$message.error("用户名和密码不能为空");
      }
    },
  },
};
</script>

<style scoped>
.manibtn {
  margin-right: 10px;
}

.addUser {
  margin-right: 10px;
}

.userName {
  margin-left: 10px;
  font-size: 14px;
}

.selectRole {
  margin-left: 35px;
}

.edit {
  font-weight: normal;
  text-align: left;
  width: 1300px;
}

.name,
.psd {
  width: 550px;
}
</style>