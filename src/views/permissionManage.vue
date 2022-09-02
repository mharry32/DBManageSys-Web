<template>
  <div id="permissionManage">
    <el-table
      :data="roleNames"
      style="width: 100%"
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
    >
      <el-table-column
        prop="roleName"
        label="角色"
        width="300"
      ></el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editRolePermission(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- 按编辑按钮后的弹框 -->
          <el-dialog
            title="权限管理"
            :visible.sync="pmsManageDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <el-tree
              :data="allMenuData"
              :props="defaultProps"
              show-checkbox
              node-key="menuid"
              ref="tree"
              v-loading="editDialogLoading"
              element-loading-text="拼命加载中"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="pmsManageDialogVisible = false"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="getCheckedKeys"
                :disabled="isEditConfirmDisabled"
                >确 定</el-button
              >
            </span>
          </el-dialog>
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
            title="新增角色"
            :visible.sync="addDialogFormVisible"
            class="edit"
          >
            <el-form @submit.native.prevent>
              <el-form-item
                label="角色名："
                :label-width="formLabelWidth"
                class="name"
              >
                <el-input v-model="addRoleName" autocomplete="off"></el-input>
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
  name: "permissionManage",
  data() {
    return {
      roleNames: [],
      // currentId: -1,
      formLabelWidth: "120px",
      addRoleName: "",
      addDialogFormVisible: false,
      tableLoading: false,
      pmsManageDialogVisible: false,
      allMenuData: [],
      defaultProps: {
        children: "subMenus",
        label: "name",
      },
      defaultCheckbox: [],
      editDialogLoading: false,
      isEditConfirmDisabled: false,
      currentRoleId: "",
    };
  },
  created() {
    // 发送网络请求
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios
        .get("/api/users/roles")
        .then((res) => {
          // console.log(res);
          this.roleNames = res.data;
          this.tableLoading = false;
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
    editRolePermission(index, row) {
      this.pmsManageDialogVisible = true;
      this.editDialogLoading = true;
      this.isEditConfirmDisabled = true;
      // console.log(row.roleid);
      this.currentRoleId = row.roleid;
      axios.get("/api/users/allmenus").then((res) => {
        console.log(res.data);
        this.allMenuData = res.data;
        axios
          .get("/api/users/menusbyrole" + "?roleid=" + this.currentRoleId)
          .then((res) => {
            console.log(res.data);
            this.defaultCheckbox = res.data;
            this.$refs.tree.setCheckedKeys(this.defaultCheckbox);
            this.editDialogLoading = false;
            this.isEditConfirmDisabled = false;
          });
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 监听按编辑按钮后弹框中的确认按钮
    getCheckedKeys() {
      this.editDialogLoading = true;
      this.isEditConfirmDisabled = true;
      // console.log(this.$refs.tree.getCheckedKeys());
      this.defaultCheckbox = this.$refs.tree.getCheckedKeys();
      axios
        .post("/api/users/modifypermission", {
          roleid: this.currentRoleId,
          menuids: this.defaultCheckbox,
        })
        .then((res) => {
          this.pmsManageDialogVisible = false;
          this.editDialogLoading = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        });
    },

    // 监听新增按钮
    handleAdd() {
      this.addDialogFormVisible = true;
    },
    // 监听新增按钮里面的确认按钮
    addNewConfirmed() {
      this.tableLoading = true;
      if (this.addRoleName.length !== 0) {
        this.addDialogFormVisible = false;
        let newRole = { roleName: this.addRoleName };
        axios
          .post("/api/users/addroles", newRole)
          .then((res) => {
            // console.log(res.data.success);
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              this.getInfo();
              this.addRoleName = "";
            } else {
              this.$message.error(res.data.message);
              this.tableLoading = false;
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
.addUser {
  margin-right: 10px;
}

.edit {
  font-weight: normal;
  text-align: left;
  width: 1300px;
}

.name {
  width: 550px;
}
</style>