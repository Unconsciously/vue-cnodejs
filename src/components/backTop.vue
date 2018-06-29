<template>
  <div class="back-top" @click="goBackTop">
      ↑
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBackTop() {
      if (document.body.scrollTop) {
        document.body.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = 0;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.back-top {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #80bd01;
  color: #fff;
  line-height: 70px;
  text-align: center;
  position: fixed;
  bottom: 66px;
  right: 15px;
  z-index: 9;
}
</style>