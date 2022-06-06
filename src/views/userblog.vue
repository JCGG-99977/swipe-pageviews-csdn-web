<template>
  <div class="BrowserUserblog">
    <div class="user_blog_container">
      <p>
        标题： <b>{{ info.title }}</b>
      </p>
      <p>
        链接：<b> {{ info.url }}</b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BrowserUserblog",
  props: ["info"],
  data() {
    return {};
  },
  created() {
  },
  mounted() {},

  methods: {},
};
</script>

<style>
.BrowserUserblog {
  width: 100%;
  background-color: #fff;
}
.user_blog_container {
  width: 100%;
  height: 50px;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
}
.user_blog_container p {
  text-indent: 2em;
}
</style>