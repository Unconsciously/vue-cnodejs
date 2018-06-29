<template>
	<div class="contain find-wrap">
		<p class="f-t">发布主题</p>
    <div class="f-info">
      <div class="f-tabs">
        <span>选择板块: </span>
        <select v-model="tab">
          <option disabled value="">请选择</option>
          <option value="ask">问答</option>
          <option value="share">分享</option>
          <option value="job">招聘</option>
          <option value="dev">客户端测试</option>
        </select>
      </div>
      <div class="f-title">
        <input type="text" v-model="title" placeholder="标题字数10字以上" />
      </div>
      <div class="reply-main">
        <mavon-editor class="me" v-model="content"/>
        <div class="reply-btn" @click="goReplyTopic">提交</div>
      </div>
    </div>
 
     
	</div>
</template>
<script>
export default {
  data() {
    return {
      tab: "",
      title: "",
      content: ""
    };
  },
  components: {},
  methods: {
    getUser() {
      if (window.sessionStorage.user) {
        let token = "";
        this.$store.dispatch(
          "setUserInfo",
          JSON.parse(window.sessionStorage.user)
        );
        token = JSON.parse(window.sessionStorage.user).token;
        return token;
      } else {
        this.$router.push({
          path: "login"
        });
        return;
      }
    },
    goReplyTopic() {
      let tokenStr = this.getUser();
      let params = {
        accesstoken: tokenStr,
        title: this.title,
        tab: this.tab,
        content: this.content
      };

      this.$api
        .post("/api/v1/topics", params)
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.topic_id);

            this.$router.push({
              name: "topic",
              params: { id: res.data.topic_id }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
.find-wrap {
  .f-t {
    background-color: #f5f5f5;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    padding-left: 15px;
    color: #333;
  }
  .f-info {
    margin: 25px 0;
    padding: 0 15px;
    .f-tabs {
      span {
        font-size: 26px;
      }
      select {
        width: 240px;
        border: 1px solid #ccc;
        height: 50px;
        border-radius: 6px;
        outline: none;
        option {
          font-weight: normal;
          display: block;
          white-space: pre;
          min-height: 50px;
          padding: 0px 2px 1px;
          outline: none;
        }
      }
    }
    .f-title {
      height: 50px;
      line-height: 50px;
      padding: 25px 0;
      input {
        width: 93%;
        border: 1px solid #ccc;
        padding: 10px 15px;
        font-size: 18px;
        border-radius: 6px;
        outline: none;
      }
    }
    .reply-main {
      margin-top: 15px;
      .reply-btn {
        width: 80px;
        height: 45px;
        background-color: #0b7526;
        color: #fff;
        text-align: center;
        float: right;
        margin: 15px;
        line-height: 45px;
      }
    }
  }
}
</style>
