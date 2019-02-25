<template>
  <div class="slide__item">
    <h1>絵文字クリック数</h1>
    <p class="count"><img src="../../../image/feedback_01.png" alt=""><span>{{ buttonCounts.button1 }}</span></p>
    <p class="count"><img src="../../../image/feedback_02.png" alt=""><span>{{ buttonCounts.button2 }}</span></p>
    <p class="count"><img src="../../../image/feedback_03.png" alt=""><span>{{ buttonCounts.button3 }}</span></p>
    <p class="count"><img src="../../../image/feedback_04.png" alt=""><span>{{ buttonCounts.button4 }}</span></p>
  </div>
</template>

<script>
  export default {
    props: {
      buttonCounts: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/slide";
  .count {
    margin-bottom: 10px;
    img {
      width: 50px;
      vertical-align: middle;
      margin-right: 2vw;
    }
    span {
      vertical-align: middle;
    }
  }
</style>
