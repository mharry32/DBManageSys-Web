<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div v-loading="treeLoading">
          <el-tree lazy :load="loadNode" :props="props"></el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div style="height: 400px">
          <el-input></el-input>
          <el-button @click="ExecSql">执行SQL</el-button>
          <dynamic-table
            v-if="dynamicTableShow"
            :table-data="tableData"
            :table-header="tableHeaders"
            :height="'350px'"
          ></dynamic-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import DynamicTable from "./DynamicTable.vue";

export default {
  name: "dbCheckDialog",
  data() {
    return {
      dynamicTableShow: false, // DynamicTable组件重新渲染变量
      // 表头数据
      tableHeaders: [],
      // 表格数据
      tableData: [],
      props: {
        label: "name",
        isLeaf: "isLeaf",
      },
      treeLoading: false,
    };
  },
  props: {
    dbId: Number,
  },
  components: {
    DynamicTable,
  },
  methods: {
    loadNode(node, resolve) {
      //如果展开第一级节点，从后台加载一级节点列表
      if (node.level == 0) {
        this.treeLoading = true;
        this.loadDatabaseNode(resolve);
      }
      //如果展开其他级节点，动态从后台加载下一级节点列表
      if (node.level == 1) {
        this.loadTableNode(node, resolve);
      }

      if (node.level == 2) {
        this.loadColumnNode(node, resolve);
      }
    },
    //加载第一级节点
    async loadDatabaseNode(resolve) {
      const res = await axios.get("/api/dbschema/databases/" + this.dbId);
      this.treeLoading = false;
      return resolve(res.data);
    },
    //加载节点的子节点集合
    async loadTableNode(node, resolve) {
      let request = {
        ServerId: node.data.serverId,
        DatabaseName: node.data.name,
      };
      const res = await axios.put("/api/dbschema/tables", request);
      //console.log(res.data);
      return resolve(res.data);
    },

    async loadColumnNode(node, resolve) {
      let request = {
        ServerId: node.parent.data.serverId,
        DatabaseName: node.parent.data.name,
        TableName: node.data.name,
      };
      const res = await axios.put("/api/dbschema/columns", request);
      console.log(res.data);
      return resolve(res.data);
    },

    ExecSql() {
      this.dynamicTableShow = false;
      this.tableHeaders = [
        "Id",
        "Name",
        "NullName",
        "DateData",
        "Nums",
        "NullDate",
        "LongNum",
      ];
      this.tableData = [
        {
          Id: 1,
          Name: "test!",
          NullName: "",
          DateData: "2022-10-08 17:54:56.7684",
          Nums: 3.14159,
          NullDate: "",
          LongNum: 10000000000,
        },
        {
          Id: 2,
          Name: "test!2",
          NullName: "not null",
          DateData: "2022-10-08 17:54:56.7684",
          Nums: 3.14159,
          NullDate: "",
          LongNum: 10000000000,
        },
      ];
      this.$nextTick(() => {
        // DOM现在更新了
        this.dynamicTableShow = true;
      });
    },
  },
};
</script>

<style>
</style>