<template>
  <div id="dbEditDialog">
    <el-form
      ref="form"
      :model="db"
      :rules="rules"
      status-icon
      label-width="80px"
      v-loading="Loading"
      element-loading-text="拼命加载中"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="db.name"></el-input>
      </el-form-item>
      <el-form-item label="数据库类型" prop="dbtype">
        <el-select v-model="db.databaseType.typeId" placeholder="请选择">
          <el-option
            v-for="item in dbTypeList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接地址" prop="connectUrl">
        <el-input v-model="db.connectUrl"></el-input>
      </el-form-item>
      <el-form-item label="账号名">
        <el-input v-model="db.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="db.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item label="是否监控">
          <el-switch v-model="db.isMonitored"></el-switch>
        </el-form-item>

        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dbEditDialog",
  props: {
    dbId: Number,
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("名称不能为空"));
      } else {
        callback();
      }
    };

    var checkdbtype = (rule, value, callback) => {
      if (value == 0) {
        callback(new Error("必须选择一个数据库类型"));
      } else {
        callback();
      }
    };

    var checkconnectUrl = (rule, value, callback) => {
      if (!value) {
        callback(new Error("连接地址不能为空"));
      } else {
        callback();
      }
    };
    return {
      db: {
        name: "",
        databaseType: {
          typeId: 0,
          typeName: "",
        },
        connectUrl: "",
        userName: "",
        password: "",
        isMonitored: false,
      },
      dbTypeList: [],
      Loading: false,
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        dbtype: [{ validator: checkdbtype, trigger: "blur" }],
        connectUrl: [{ validator: checkconnectUrl, trigger: "blur" }],
      },
    };
  },
  computed: {
    successText() {
      if (this.db == -1) {
        return "创建成功！";
      } else {
        return "编辑成功！";
      }
    },
    errorText() {
      if (this.db == -1) {
        return "创建失败！";
      } else {
        return "编辑失败！";
      }
    },
  },
  created() {
    this.Loading = true;
    axios.get("/api/dbmanage/dbtypes").then((res) => {
      this.dbTypeList = res.data;
      this.Loading = false;
    });
    if (this.dbId != -1) {
      //Retrieve DBData to Edit
    }
  },
  methods: {
    makeRequest() {
      let url = "/api/dbmanage/db";
      if (this.dbId == -1) {
        return axios.post(url, this.db);
      } else {
        return axios.put(url, this.db);
      }
    },
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.Loading = true;
          makeRequest()
            .then((res) => {
              this.Loading = false;
              this.$message(this.successText);
            })
            .catch((err) => {
              this.Loading = false;
              if (err.response.status === 401) {
                this.$router.push("/admin/login");
              } else {
                this.$message(this.errorText);
                console.log(err);
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>