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
  </div>

          </el-col>
    
    </el-row>
  </div>
</template>

<script>

export default {
  name: "dbCheckDialog",
  data() {
    return {
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
    
  },
};
</script>

<style>
</style>