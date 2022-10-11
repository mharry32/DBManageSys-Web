<template>
  <div>
    <el-result
      icon="error"
      v-if="errorPageVisible"
      title="加载错误"
      subTitle="请关闭窗口重试"
    >
      <template slot="extra">
        <el-button @click="closeWindow" type="primary" size="medium"
          >关闭</el-button
        >
      </template>
    </el-result>
    <div v-loading="Loading" v-if="!errorPageVisible">
      <el-row :gutter="20">
        <el-col :span="6"
          ><div>
            <el-tree lazy :load="loadNode" :props="props"></el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="height: 400px">
            <el-form>
              <el-form-item label="数据库:" prop="dbsource">
                <el-select v-model="execDatabase" placeholder="请选择">
                  <el-option
                    v-for="item in databasesData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="execSqlText">
                <el-input v-model="execSqlText"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="ExecSql">执行SQL</el-button>
              </el-form-item>
            </el-form>

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
      Loading: false,
      databasesData: [],
      execDatabase: "",
      execSqlText: "",
      errorPageVisible: false,
    };
  },
  props: {
    dbId: Number,
  },
  components: {
    DynamicTable,
  },
  created() {},
  methods: {
    closeWindow() {
      this.$emit("closeWindow");
    },
    loadNode(node, resolve) {
      //如果展开第一级节点，从后台加载一级节点列表
      if (node.level == 0) {
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
      try {
        this.Loading = true;
        const result = await axios.get("/api/dbschema/databases/" + this.dbId);

        this.databasesData = result.data;
        this.execDatabase = result.data[0].name;
        this.Loading = false;
        return resolve(result.data);
      } catch (err) {
        this.Loading = false;
        this.errorPageVisible = true;
        console.log(err);
      }
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
      let request = {
        ServerId: this.dbId,
        DatabaseName: this.execDatabase,
        SqlText: this.execSqlText,
      };
      axios
        .post("/dbschema/execsql", request)
        .then((res) => {
          let data = res.data;
          this.dynamicTableShow = false;
          //判断成功与否，失败需要增加一个提示文案（不是查询的sql也需要提示更新多少行的文案）
          this.tableHeaders = [];
          this.tableData = [];
          this.$nextTick(() => {
            // DOM现在更新了
            this.dynamicTableShow = true;
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
</style>