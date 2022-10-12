<template>
  <div style="height: 100%">
    <el-card
      class="box-card"
      style="height: 100%; overflow: auto"
      v-loading="loading"
    >
      <div slot="header" class="clearfix">
        <span>最近执行的SQL语句</span>
      </div>
      <el-table :data="sqldata" border>
        <el-table-column label="连接地址" prop="connectUrl"></el-table-column>
        <el-table-column label="执行时间" prop="executeTime"></el-table-column>

        <el-table-column label="sql语句" prop="sqlText"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 25, 50]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.totalRecords"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dbReports",
  data() {
    return {
      sqldata: [],
      pageInfo: {
        pageNumber: 0,
        pageSize: 10,
        totalPages: 1,
        totalRecords: 6,
      },
      currentPage: 1,
      loading: false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.loading = true;
      let request = {
        PageSize: this.pageInfo.pageSize,
        PageIndex: this.currentPage - 1,
      };
      axios
        .put("/api/sqllogs", request)
        .then((res) => {
          let data = res.data;
          this.sqldata = data.sqlLogs;
          this.pageInfo = data.pagedInfo;

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          if (err.response.status === 401) {
            this.$router.push("/admin/login");
          } else {
            this.$message("加载失败！");
          }
        });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.loading = true;
      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.getInfo();
    },
  },
};
</script>

<style>
</style>