<template>
  <div id='app'>
    <router-view></router-view>
    <n-footer class="footer" :selected='selectedV' v-if="isShow"></n-footer>
  </div>
</template>

<script>
import nFooter from "./components/nFooter";
export default {
  name: "App",
  data() {
    return {
      isShow: true,
      selectedV: ""
    };
  },
  components: {
    nFooter
  },
  watch: {
    $route(to, from) {
      
      if (
        to.path != "/" &&
        to.path != "/home" &&
        to.path != "/msg" &&
        to.path != "/find" &&
        to.path != "/person"
      ) {
        this.isShow = false;
        this.selectedV = "home";
      } else {
        this.isShow = true;
        this.selectedV = to.name;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
body {
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    padding-bottom: 73px;
    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 75px;
    }
  }
}
</style>
