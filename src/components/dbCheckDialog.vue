<template>
  <div>
    <el-row :gutter="20">
   <el-col :span="8"
        ><div>
          <el-tree
            :data="dbdetails"
            :props="defaultProps"
          ></el-tree></div>
          </el-col
    >
       <el-col :span="16">
<div style="height:400px">
    <el-input></el-input>
    <el-button @click="ExecSql">执行SQL</el-button>
      <dynamic-table v-if="dynamicTableShow"
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
import DynamicTable from './DynamicTable.vue';

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
           label:"dbmanagementsystem",
           children:[
            {
                label:"mainmenus",
                children:[
                    {
                        label:"Id"
                    },
                    {
                        label:"Name"
                    },
                    {
                        label:"Order"
                    }  
                ]
            },
            {
                label:"rolemenus",
                children:[
                    {
                        label:"Id"
                    }, 
                    {
                        label:"RoleId"
                    },
                      {
                        label:"SubMenuId"
                    }
                ]
            },
           ]
        },
        {
            label:"sys",
            children:[
                {
                    label:"sys_config",
                    children:[
                        {
                            label:"variable"
                        },
                        {
                            label:"value"
                        }

                    ]
                }
            ]
        }
      ],
    };
  },
  components: {
    DynamicTable
    
  },
  methods:{
    ExecSql(){
      this.dynamicTableShow = false;
      this.tableHeaders = ['t1','t2','t3'];
      this.tableData = [{t1:1,t2:2,t3:3},{t1:4,t2:5,t3:6}];
      this.$nextTick(() => {
          // DOM现在更新了
          this.dynamicTableShow = true
        })

    }
  }
};
</script>

<style>
</style>