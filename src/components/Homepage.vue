<template>
  <div class="BrowserHomepage">
    <div class="BrowserHomepage_content">
      <div class="home_title">浏览量测刷</div>
      <div class="home_head">
        <el-input
          placeholder="请输入您的账号ID"
          style="width: 90%; margin-right: 15px; margin-left: 15px"
          v-model="userid"
          clearable
        >
        </el-input>
        <el-button type="primary" @click="GoFirst">下一步</el-button>
      </div>
      <div class="index_img_ts" v-if="!UserShow">
        <el-collapse v-model="activeNames" accordion style="text-align: center">
          <el-collapse-item title="查看您的ID步骤一" name="1">
            <img src="../img/user.png" alt="" />
          </el-collapse-item>
          <el-collapse-item title="步骤二" name="2">
            <img
              src="../img/2.png"
              style="width: 800px; height: 600px"
              alt=""
            />
          </el-collapse-item>
        </el-collapse>
      </div>

      <User v-if="UserShow" :UserMsg="UserMsg" :UserId="userid"></User>
    </div>
  </div>
</template>

<script>
import User from "@/views/usermsg";
export default {
  name: "BrowserHomepage",
  components: {
    User,
  },
  data() {
    return {
      userid: "",
      activeNames: ["1"],
      UserShow: false,
      UserMsg: "",
    };
  },

  mounted() {},

  methods: {
    GoFirst() {
      if (this.userid === "") {
        this.$message.warning("请输入用户ID");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "数据获取中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let data = {
          id: this.userid,
        };
        this.$post("/go", data).then((res) => {
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.UserShow = true;
            this.UserMsg = res.data;
            loading.close();
          } else {
            this.$message.error("异常!");
          }
        });
      }
    },
  },
};
</script>

<style>
.BrowserHomepage {
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
}
.BrowserHomepage_content {
  width: 1200px;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  overflow: auto;
}
.home_title {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  font-family: "楷体";
}
.home_head {
  width: 100%;
  height: 50px;
  background-color: #fff;
  line-height: 50px;
}
.index_img_ts {
  width: 96%;
  margin: 0 auto;
  margin-top: 15px;
}
</style>