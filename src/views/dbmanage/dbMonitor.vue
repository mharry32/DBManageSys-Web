<template>
  <div id="dbMonitor">
    <el-table :data="dbdatas" style="width: 100%">
      <el-table-column prop="name" label="名称" width="150"> </el-table-column>
      <el-table-column prop="address" label="地址" width="200">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
            <online-status-tag :onlineStatus = "scope.row.status"/>
      </template>
      </el-table-column>
    <el-table-column prop="lastUpdateTime" label="最后更新时间" width="200">
      </el-table-column>
      <el-table-column prop="manipualte" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
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

    <el-dialog :visible.sync = "dbCheckDialogVisible" destroy-on-close=true :before-close="handleClose">
        <db-check-dialog></db-check-dialog>
    </el-dialog>
  </div>
</template>

<script>
import DbCheckDialog from '../../components/dbCheckDialog.vue';
import OnlineStatusTag from '../../components/onlineStatusTag.vue';
export default {
  name: "dbMonitor",
  components:{
    OnlineStatusTag,
    DbCheckDialog
  },
  data(){
    return {
        dbdatas:[
            {
                name:"测试",
                address:"localhost",
                status:0,
                lastUpdateTime:"2022-09-30 15:00"
            },
            {
                name:"测试2",
                address:"localhost",
                status:1,
                lastUpdateTime:"2022-09-30 15:00"
            },
            {
                name:"测试3",
                address:"localhost",
                status:2,
                lastUpdateTime:"2022-09-30 15:00"
            }
        ],
        dbCheckDialogVisible:false
    }
  },
  methods:{
    handleCheck(index,row){
        this.dbCheckDialogVisible = true;
    },
    handleEdit(index,row){

    },
    handleDelete(index,row){

    },
    handleAdd(){

    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  }
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