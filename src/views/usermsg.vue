<template>
  <div class="BrowserUsermsg">
    <div class="UserMsr">
      <span>
        问答数据：<b>{{ UserMsg.data.ask }}</b></span
      >
      <span>
        博文数据：<b>{{ UserMsg.data.blog }}</b></span
      >
      <span>
        视频数据：<b>{{ UserMsg.data.video }}</b></span
      >
      <span>
        资源数据：<b>{{ UserMsg.data.download }}</b></span
      >
      <span>
        课程数据：<b>{{ UserMsg.data.edu }}</b></span
      >
      <span>
        动态数据：<b>{{ UserMsg.data.blink }}</b></span
      >
    </div>
    <el-button
      v-if="!CheckShow"
      type="primary"
      style="width: 100%; margin-top: 15px"
      @click="GetUserBlog"
      >获取具体博文数据</el-button
    >
    <el-button
      v-if="CheckShow"
      type="primary"
      style="width: 100%; margin-top: 15px"
      @click="CheckUserBlog"
      >开始任务</el-button
    >
    <div style="height: 700px; overflow: auto">
      <UserBlog
        v-for="(item, index) in UserBlogData"
        :key="index"
        :info="item"
      ></UserBlog>
    </div>
    <el-dialog
      title="数据请求结果反馈"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div
        id="overflow"
        style="height: 500px; overflow: auto; width: 100%; overflow-y: auto;background-color:#000"
      >
        <div v-for="(item, index) in MsgShow" :key="index" style="color:#fff;border-bottom:1px solid #fff">
          <p>状态码： {{ item.code }}</p>
          <p>当前索引： {{ item.index }}</p>
          <p>标题： {{ item.title }}</p>
          <p>链接： {{ item.url }}</p>
          <p>次数： {{ item.count }}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="End">结束</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Ublog from "@/views/userblog";
export default {
  name: "BrowserUsermsg",
  props: {
    UserMsg: Object,
    UserId: String,
  },
  components: {
    UserBlog: Ublog,
  },
  data() {
    return {
      UserBlogData: "",
      CheckShow: false,
      dialogVisible: false,
      timer: null,
      MsgShow: [],
    };
  },
  created() {
    console.log(this.UserMsg);
  },
  mounted() {},

  methods: {
    GetUserBlog() {
      if (this.UserMsg.data.blog == 0) {
        this.$message.warning("您的博文数量为零，暂时无法获取！");
      } else {
        this.CheckShow = false;
        const loading = this.$loading({
          lock: true,
          text: "博文数据获取中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        let data = {
          blink: this.UserMsg.data.blink,
          blog: this.UserMsg.data.blog,
          id: this.UserId,
        };
        this.$post("/user/blog", data).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.UserBlogData = res.data;
            loading.close();
            this.$message.success("您的博文数据获取完成！");
            this.CheckShow = true;
          } else {
            this.$message.warning("异常！");
          }
        });
      }
    },
    // 开始
    CheckUserBlog() {
      var count = 0;
      this.dialogVisible = true;
      this.timer = setInterval(() => {
        let index = Math.floor(Math.random() * this.UserBlogData.length);
        let data = {
          url: this.UserBlogData[index].url,
        };
        this.$post("/user/blog/go", data).then((res) => {
          if (res.code === 200) {
            count += 1;
            this.MsgShow.push({
              code: 200,
              index: index,
              title: this.UserBlogData[index].title,
              url: this.UserBlogData[index].url,
              count: count,
            });
            var message = document.getElementById("overflow");
            message.scrollTop = message.scrollHeight;
          }
        });
      }, 1000);
    },
    // 结束
    End() {
      clearInterval(this.timer);
      this.timer = null;
      this.$message.success("共刷了：" + this.MsgShow.length + "次");
      console.log(this.MsgShow.length);
      this.dialogVisible = false;
      this.MsgShow = [];
      this.CheckShow=false
      this.UserBlogData=[]
    },
    handleClose(done) {
      clearInterval(this.timer);
      this.timer = null;
      done();
      this.$message.success("共刷了：" + this.MsgShow.length + "次");
    },
    destroyed() {
      this.timer = null;
      clearInterval(this.timer);
    },
  },
};
</script>

<style>
.BrowserUsermsg {
  width: 100%;
  background-color: skyblue;
  overflow: auto;
}
.UserMsr {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>