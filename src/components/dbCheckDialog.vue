<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4"
        ><div>
          <el-tree :data="dbdetails" :props="defaultProps"></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
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
      dbdetails: [
        {
          label: "dbmanagementsystem",
          children: [
            {
              label: "mainmenus",
              children: [
                {
                  label: "Id",
                },
                {
                  label: "Name",
                },
                {
                  label: "Order",
                },
              ],
            },
            {
              label: "rolemenus",
              children: [
                {
                  label: "Id",
                },
                {
                  label: "RoleId",
                },
                {
                  label: "SubMenuId",
                },
              ],
            },
          ],
        },
        {
          label: "sys",
          children: [
            {
              label: "sys_config",
              children: [
                {
                  label: "variable",
                },
                {
                  label: "value",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  components: {
    DynamicTable,
  },
  methods: {
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