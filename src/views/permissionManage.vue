<template>
  <div id="permissionManage">
    <el-table
      :data="roleNames"
      style="width: 100%"
      v-loading="tableLoading"
      element-loading-text="拼命加载中"
    >
      <el-table-column prop="name" label="角色" width="300"></el-table-column>
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
              node-key="nodeKey"
              show-checkbox
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
      this.tableLoading = true;
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
            this.tableLoading = false;
          }
        });
    },

    // 监听编辑按钮
    editRolePermission(index, row) {
      this.pmsManageDialogVisible = true;
      this.editDialogLoading = true;
      this.isEditConfirmDisabled = true;

      axios.get("/api/users/allmenus").then((res) => {
        let treeData = res.data;
        treeData.forEach((m) => {
          m.nodeKey = "m" + m.id;
          m.subMenus.forEach((s) => {
            s.nodeKey = "m" + m.id + "s" + s.id;
          });
        });
        this.allMenuData = treeData;
        this.currentRoleId = row.id;
        axios.get("/api/users/menusbyrole/" + row.id).then((res) => {
          console.log(res.data);
          let menuData = res.data;
          let checkedKeys = [];

          treeData.forEach((element) => {
            element.subMenus.forEach((sub) => {
              if (menuData.indexOf(sub.id) != -1) {
                checkedKeys.push(sub.nodeKey);
              }
            });
          });

          this.$refs.tree.setCheckedKeys(checkedKeys);
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

      let checkedNodes = this.$refs.tree.getCheckedNodes();

      console.log(checkedNodes);
      let menuIds = [];
      checkedNodes.forEach((main) => {
        if (!main.subMenus) {
          menuIds.push(main.id);
        }
      });

      axios
        .put("/api/users/modifypermission", {
          roleid: this.currentRoleId,
          menuids: menuIds,
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