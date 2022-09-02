<template>
  <div
    style="height: 100%"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
  >
    <el-container>
      <el-aside width="200px">
        <el-menu
          ref="menu"
          :default-active="currentIndexStrs"
          text-color="#b9c3d1"
          active-text-color="#5a9cf8"
          background-color="#334054"
          @select="handleSelect"
        >
          <el-submenu v-for="(menu, index1) in menuItems" :index="index1">
            <template slot="title"
              ><i class="el-icon-discover"></i>{{ menu.name }}</template
            >
            <el-menu-item
              v-for="(submenu, index2) in menu.subMenus"
              :index="index1 + '-' + index2"
              >{{ submenu.name }}</el-menu-item
            >
          </el-submenu>
          <!-- <el-menu-item index="1">
            <template><i class="el-icon-info"></i>公告管理</template>
          </el-menu-item>
          <el-menu-item index="2">
            <template><i class="el-icon-user-solid"></i>用户管理</template>
          </el-menu-item> -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 15px">
          <span class="setTitle">{{ title }}</span>
          <span style="font-size: 15px">当前用户：</span
          ><span style="color: #5a9cf8"
            ><strong>{{ currentUser }}</strong></span
          >
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="modifyPass"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item divided @click.native="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "management",
  data() {
    return {
      title: "管理后台",
      // titles: ["管理后台", "公告管理", "用户管理"],
      currentUser: "",
      // currentIndex: "",
      menuItems: [],
      fullscreenLoading: false,
      currentIndexStrs: "",
    };
  },
  created() {
    // 刷新后停留在当前页面
    // this.currentIndex = localStorage.getItem("currentIndex");
    // this.title = this.titles[this.currentIndex];

    // 发送网络请求获取菜单栏
    this.fullscreenLoading = true;
    axios.get("/api/admin/menus").then((res) => {
      // console.log(res.data);
      this.menuItems = res.data;

      let strs = localStorage.getItem("indexStrs");
      if (strs != "") {
        let strsAfterSplit = strs.split(",");
        this.title =
          this.menuItems[strsAfterSplit[0]].subMenus[strsAfterSplit[1]].name;
        this.$router.push(
          this.menuItems[strsAfterSplit[0]].subMenus[strsAfterSplit[1]].path
        );
        this.currentIndexStrs = strsAfterSplit[0] + "-" + strsAfterSplit[1];
      }

      this.fullscreenLoading = false;
    });

    // 发送网络请求获取当前用户名
    axios
      .get("/api/users/current")
      .then((res) => {
        // console.log(res.data.name);
        this.currentUser = res.data.name;
      })
      .catch((err) => {
        this.$router.push("/admin/login");
      });
  },
  methods: {
    handleSelect(index) {
      // console.log(index);
      let indexStrs = index.split("-");
      localStorage.setItem("indexStrs", indexStrs);
      // console.log(indexStrs);
      // console.log(indexStrs[0]); //一级菜单栏的索引
      // console.log(indexStrs[1]); //二级菜单栏的索引
      this.title = this.menuItems[indexStrs[0]].subMenus[indexStrs[1]].name;
      this.$router.push(
        this.menuItems[indexStrs[0]].subMenus[indexStrs[1]].path
      );
      // console.log(this.menuItems[indexStrs[0]].subMenus[indexStrs[1]].path);
      // console.log(this.menuItems[indexStrs[0]].subMenus[indexStrs[1]].name);
      // switch (index) {
      //   case "0":
      //     this.$router.push("/admin/dashboard");
      //     localStorage.setItem("currentIndex", 0);
      //     break;
      //   case "1":
      //     this.$router.push("/announceManage");
      //     localStorage.setItem("currentIndex", 1);
      //     break;
      //   case "2":
      //     this.$router.push("/userManagement");
      //     localStorage.setItem("currentIndex", 2);
      //     break;
      // }
    },
    modifyPass() {
      this.$router.push("/modifyPassword");
    },
    logout() {
      localStorage.setItem("TOKEN", "");
      this.$router.push("/admin/login");
      this.$message({
        type: "success",
        message: "登出成功!",
      });

      // axios
      //   .post("/api/admin/logout")
      //   .then((res) => {
      //     // console.log(res);
      //     this.$router.push("/admin/login");
      //     this.$message({
      //       type: "success",
      //       message: "登出成功!",
      //     });
      //   })
      //   .catch((err) => {
      //     this.$message.error("登出失败");
      //   });
    },
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-header {
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  color: #333;
  line-height: 60px;
}

.el-header .setTitle {
  position: absolute;
  left: 20px;
  top: 0;
  font-size: 20px;
  font-weight: 700;
}

.el-aside {
  background-color: #364052;
  color: #333;
  height: 100%;
}

.el-menu {
  width: 100%;
  height: 100%;
  border-right: none;
}

/* 下拉菜单 */
.el-dropdown-link {
  cursor: pointer;
  color: black;
  margin-left: 25px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>