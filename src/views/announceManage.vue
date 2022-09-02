<template>
  <div id="announceManage">
    <el-table :data="newInfo" style="width: 100%">
      <el-table-column prop="title" label="标题" width="200"> </el-table-column>
      <el-table-column prop="createtime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间" width="200">
      </el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button
            class="manibtn"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- 按编辑按钮后的弹框 -->
          <el-dialog title="编辑公告" :visible.sync="dialogFormVisible">
            <el-form>
              <el-form-item
                label="公告"
                :label-width="formLabelWidth"
                class="announce"
              >
                <el-input v-model="announceTitle" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmed">确 定</el-button>
            </div>
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
            class="addAnnounce"
            @click="handleAdd()"
            >新增</el-button
          >
          <!-- 按新增按钮后的弹框 -->
          <el-dialog
            title="新增公告"
            :visible.sync="addDialogFormVisible"
            class="edit"
          >
            <el-form @submit.native.prevent>
              <el-form-item
                label="公告"
                :label-width="formLabelWidth"
                class="announceItem"
              >
                <el-input
                  v-model="addAnnounceTitle"
                  autocomplete="off"
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
  name: "announceManage",
  data() {
    return {
      newInfo: [],
      dialogFormVisible: false,
      announceTitle: "",
      currentId: -1,
      formLabelWidth: "120px",
      addAnnounceTitle: "",
      addDialogFormVisible: false,
    };
  },
  created() {
    // 发送网络请求
    this.getInfo();
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
    // 封装网络请求
    getInfo() {
      axios
        .get("/api/announce")
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data[0].updatetime);
          // console.log(this.timetrans(res.data[0].createtime));
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].createtime = this.timetrans(res.data[i].createtime);
            if (res.data[i].updatetime == null) {
              res.data[i].updatetime = "";
            } else {
              res.data[i].updatetime = this.timetrans(res.data[i].updatetime);
            }
          }
          this.newInfo = res.data;
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
    handleEdit(index, row) {
      this.announceTitle = row.title;
      // console.log(row.title);
      this.dialogFormVisible = true;
      this.currentId = row.id;
    },
    // 监听删除按钮
    handleDelete(index, row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .delete("/api/announce", {
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
    // 监听编辑里面的确认按钮
    confirmed() {
      this.dialogFormVisible = false;
      // console.log("--------");
      axios
        .post("/api/announce", {
          title: this.announceTitle,
          id: this.currentId,
        })
        .then((res) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.getInfo();
        })
        .catch((err) => {
          // 请求失败的操作
          //   console.log(err);
          //   console.log(err.response.status);
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("修改失败！");
          }
        });
    },
    // 监听新增按钮
    handleAdd() {
      this.addDialogFormVisible = true;
    },
    // 监听新增按钮里面的确认按钮
    addNewConfirmed() {
      //   console.log(this.addAnnounceTitle.length);
      if (this.addAnnounceTitle.length !== 0) {
        this.addDialogFormVisible = false;
        let newTitle = { title: this.addAnnounceTitle };
        axios
          .put("/api/announce", newTitle)
          .then((res) => {
            // console.log(res);
            this.getInfo();
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.addAnnounceTitle = "";
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push("/admin/login");
            } else {
              this.$message("添加失败！");
            }
          });
      } else {
        this.$message.error("请输入新增内容");
      }
    },
  },
};
</script>

<style scoped>
.manibtn {
  margin-right: 10px;
}

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