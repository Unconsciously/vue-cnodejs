<template>
	<div class="contain home-wrap">
		<div class="logo-box">
      <img src="../../assets/cnodejs_light.svg" alt="">
    </div>
    <div class="info-box">
      <mt-navbar v-model="selected">
        <mt-tab-item id="all">全部</mt-tab-item>
        <mt-tab-item id="good">精华</mt-tab-item>
        <mt-tab-item id="share">分享</mt-tab-item>
        <mt-tab-item id="ask">问答</mt-tab-item>
        <mt-tab-item id="job">招聘</mt-tab-item>
        <mt-tab-item id="dev">测试</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="loading" 
        infinite-scroll-distance="100">
        
        <mt-tab-container-item id="all">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="good">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="share">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="ask">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="job">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
         <mt-tab-container-item id="dev">
          <div class="list" v-for="item in topics" :key="item.id">
            <router-link :to="{name: 'topic',params:{id:item.id}}">
              <list-item :listItem="item"></list-item>
            </router-link>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="no-more" v-if="noMore">没有更多数据啦~！</div>
    </div>
    <back-top></back-top>
	</div>
</template>
<script>
import listItem from "../../components/listItem";
import backTop from "../../components/backTop";
export default {
  name: "home",
  data() {
    return {
      isLoad: null,
      selected: "all",
      topics: [],
      page: 1,
      noMore: false
    };
  },
  components: {
    listItem,
    backTop
  },
  mounted() {
    this.getTopics(this.page, this.selected);
  },
  methods: {
  
    getTopics(page, tab) {
      let params = {
        page: page,
        limit: 20,
        tab: tab
      };

      this.$api
        .get("/api/v1/topics", {
          params
        })
        .then(res => {

          if (res.status == 200) {
            this.topics = this.topics.concat(res.data.data);
            this.noMore = false;
            if (res.data.data.length < 20) {
              console.log("over----------!!!");
              this.noMore = true;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadMore() {
      this.page++;
      this.getTopics(this.page, this.selected);
    }
  },
  watch: {
    selected(curVal, oldVal) {
      if (curVal != oldVal) {
        this.topics = [];
        this.page = 1;
        this.getTopics(this.page, curVal);
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.home-wrap {
  .logo-box {
    background-color: #444;
    padding: 50px 200px;
  }
}
</style>
