<template>
  <div class="topic-wrap">
      <div class="header-box">
        <div class="h-left">
          <div class="h-title">{{topic.title}}</div>
          <ul class="h-info">
            <li>▶ 发布于  2天前</li>
            <li>▶ 作者  {{topic.author.loginname}}</li>
            <li>▶ {{topic.visit_count}}次浏览</li>
            <li>▶ 来自  {{topic.tab}}</li>
          </ul>
          
        </div>
        <div class="h-right">
          <img :src="topic.author.avatar_url" alt="">
          <div class="h-col" @click="goCollectTopic" v-if="isCollected">已收藏</div>
           <div class="h-col" @click="goCollectTopic" v-else>收藏</div>
        </div>
      </div>
      <section class='markdown-body content-box' v-html="topic.content"></section>
      <div class="reply-num">回复  {{topic.reply_count}}</div>
      <ul class="replys-box">
        <li v-for="(item, i) in topic.replies" :key="item.id">
          <reply-item :replyItem="item" :idx="i" @reply="goReply"></reply-item>
          
        </li>
      </ul>
      <div class="reply-num">添加回复</div>
      <div class="reply-main">
          <mavon-editor v-model="value"/>
          <div class="reply-btn" @click="goReply">回复</div>
      </div>
  </div>
</template>

<script>
import replyItem from "../../components/replyItem";
export default {
  data() {
    return {
      topic: {},
      value: "",
      isCollected: false
    };
  },
  mounted() {
    this.fetchTopicDatas();
  },
  components: {
    replyItem
  },
  methods: {
    fetchTopicDatas() {
      this.$api
        .get(`/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.status == 200) {
            this.topic = res.data.data;
            this.isCollected = this.topic.is_collect;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
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
    goReply(id, val) {
      let replyId = id || null;
      let replyVal = val || this.value;
      let tokenStr = this.getUser();
      let params = {
        accesstoken: tokenStr,
        content: replyVal,
        reply_id: replyId
      };
      this.$api
        .post(`/api/v1/topic/${this.$route.params.id}/replies`, params)
        .then(res => {
          if (res.status == 200) {
            this.replyId = res.data.data;
            this.fetchTopicDatas();
            this.value = "";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    goCollectTopic() {
      let tokenInfo = this.getUser();
      let url;
      if (this.isCollected) {
        url = "/api/v1/topic_collect/de_collect";
      } else {
        url = "/api/v1/topic_collect/collect";
      }
      this.$api
        .post(url, {
          accesstoken: tokenInfo,
          topic_id: this.$route.params.id
        })
        .then(res => {
          if (res.status == 200) {
            console.log(res.data.success);
            if (res.data.success) {
              this.isCollected = !this.isCollected;
        
            } else {
              this.isCollected = this.isCollected;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.topic-wrap {
  .header-box {
    padding: 20px 15px;
    background-color: #fff;
    display: flex;

    .h-left {
      flex: 4;
      border-bottom: 1px dotted #cdcdcd;
      .h-title {
        font-size: 32px;
        font-weight: 700;
        line-height: 45px;
      }
      .h-info {
        padding: 10px 0;
        li {
          float: left;
          padding-right: 5px;
        }
      }
    }
    .h-right {
      flex: 1;
      img {
        width: 150px;
      }
      .h-col {
        text-align: right;
        color: #fff;
        border: 1px solid #ccc;
        width: 130px;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        background-color: #0b7526;
        float: right;
      }
    }
  }
  .content-box {
    padding: 0px 15px;
    overflow: hidden;
  }
  .reply-num {
    margin: 15px 0;
    padding: 15px;
    background-color: #f5f5f5;
  }
  .reply-main {
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
</style>
<style lang="scss">
.markdown-body {
  img {
    width: 100% !important;
  }
}
</style>


