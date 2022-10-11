<template>
  <div id="dbMonitor">
    <el-table :data="dbdatas" style="width: 100%">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="connectUrl" label="地址"> </el-table-column>
      <el-table-column prop="databaseType.typeName" label="类型">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <online-status-tag :onlineStatus="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column prop="lastUpdatedTime" label="最后更新时间" width="200">
      </el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleCheck(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
            class="addAnnounce"
            @click="handleAdd()"
            >新增</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dbCheckDialogVisible"
      v-if="dbCheckDialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <db-check-dialog :dbId="editDbId"></db-check-dialog>
    </el-dialog>

    <el-dialog
      :visible.sync="dbEditDialogVisible"
      :before-close="handleClose"
      v-if="dbEditDialogVisible"
    >
      <db-edit-dialog @closing="editClosing" :dbId="editDbId"></db-edit-dialog>
    </el-dialog>
  </div>
</template>

<script>
import DbCheckDialog from "../../components/dbCheckDialog.vue";
import OnlineStatusTag from "../../components/onlineStatusTag.vue";
import { RenderHeaderWidth } from "../../components/Methods/TableRender.js";
import axios from "axios";
import DbEditDialog from "../../components/dbEditDialog.vue";

export default {
  name: "dbMonitor",
  components: {
    OnlineStatusTag,
    DbCheckDialog,
    DbEditDialog,
  },
  data() {
    return {
      dbdatas: [],
      dbCheckDialogVisible: false,
      dbEditDialogVisible: false,
      editDbId: -1,
      loading: false,
    };
  },
  created() {
    this.getDbs();
  },
  methods: {
    getDbs() {
      this.loading = true;
      axios
        .get("/api/dbmanage/db")
        .then((res) => {
          this.dbdatas = res.data;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("加载失败！");
            this.loading = false;
          }
        });
    },
    handleCheck(index, row) {
      this.editDbId = row.id;
      this.dbCheckDialogVisible = true;
    },
    handleEdit(index, row) {
      this.editDbId = row.id;
      this.dbEditDialogVisible = true;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除数据库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loading = true;
        axios
          .delete("/api/dbmanage/db/" + row.id)
          .then((res) => {
            this.$message("删除成功！");
            this.loading = false;
            this.getDbs();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push("/admin/login");
            } else {
              this.$message("删除失败！");
              this.loading = false;
            }
          });
      });
    },
    handleAdd() {
      this.editDbId = -1;
      this.dbEditDialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    headSpanFit(h, { column, index }) {
      RenderHeaderWidth(h, { column, index });
    },
    editClosing() {
      this.dbEditDialogVisible = false;
      this.getDbs();
    },
  },
};
</script>

<style scoped>
.announce {
  width: 650px;
}

.addAnnounce {
  margin-right: 10px;
}

.announceItem {
  width: 600px;
}

.edit {
  font-weight: normal;
  text-align: left;
  width: 1400px;
}
</style>