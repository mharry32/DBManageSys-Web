<template>
<div>

    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>最近10条SQL语句</span>
  </div>
    <el-table :data="sqldata" border>
    <el-table-column label="连接地址" prop="conaddress" width="180"></el-table-column>
    <el-table-column label="执行时间" prop="exectime" width="180"></el-table-column>

        <el-table-column label="sql语句" prop="sqltext" ></el-table-column>
  </el-table>
</el-card>


  </div>
</template>

<script>
export default {
 name:"dbReports",
 data(){
    return {
        sqldata:[{
            sqltext:'select * from users where name = "a"',
            exectime : '2022-10-02 22:00:00',
            conaddress:'localhost'
        }]
    }
 }

}
</script>

<style>

</style>