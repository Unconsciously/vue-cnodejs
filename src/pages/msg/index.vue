<template>
	<div class="contain msg-wrap">
		<ul>
      <li v-for="(collect, idx) in collectedList" :key="collect.id">
        <router-link :to="{name: 'topic',params:{id:collect.id}}">
          COLLECT{{idx+1}}: {{collect.title}}
        </router-link>
      </li>
    </ul>
	</div>
</template>
<script>
export default {
  data() {
    return {
      collectedList: []
    };
  },
  components: {},
  mounted() {
    this.getCollected();
  },
  methods: {
    getUser() {
      if (window.sessionStorage.user) {
        let name = "";
        this.$store.dispatch(
          "setUserInfo",
          JSON.parse(window.sessionStorage.user)
        );
        name = JSON.parse(window.sessionStorage.user).loginname;
        return name;
      } else {
        this.$router.push({
          path: "login"
        });
        return;
      }
    },
    getCollected() {
      let userName = this.getUser();
      this.$api.get(`/api/v1/topic_collect/${userName}`).then(res => {
        if (res.status == 200) {
          console.log(res.data.data);
          this.collectedList = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.msg-wrap {
  ul {
    padding: 25px 15px;
    li {
      padding: 15px 0;
      line-height: 40px;
      font-size: 18px;
      color: #333;
    }
  }
}
</style>
