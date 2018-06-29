<template>
  <div class="list-item">
      <div class="li-avatar">
          <img v-lazy="listItem.author.avatar_url" alt="">
      </div>
      
      <div class="li-txt">
          <div class="li-top" v-if="listItem.top">置顶</div>
         <div class="li-info" :class="listItem.top?'act-top':''">
             <p>{{listItem.title}}</p>
            <p>浏览量：{{listItem.visit_count}}</p>
         </div>
         <div class="li-time">回复: {{listItem.reply_count}}</div>
      </div>
      
  </div>
</template>

<script>
export default {
  props: ["listItem"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  padding: 20px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .li-avatar {
    width: 13%;
    max-height: 90px;
    border-radius: 3px;
    img {
      width: 100%;
    }
  }

  .li-txt {
    width: 84%;
    margin-left: 3%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .li-info {
      width: 68%;
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 35px;
      }
    }
    .act-top {
      padding-left: 70px;
    }
    .li-top {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #80bd01;
      color: #fff;
      font-size: 24px;
      padding: 2px 7px;
      border-radius: 6px;
      line-height: 30px;
      height: 30px;
      text-align: center;

      .li-time {
        width: 25%;
        font-size: 18px;
        text-align: right;
      }
    }
  }
}
</style>

