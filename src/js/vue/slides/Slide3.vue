<template>
  <div class="slide__item">
    <h2 class="tac">下のボタンを押すと<br>四隅にある絵文字が反応します！！</h2>
    <p class="tac">みんなの反応がリアルタイムに<br>フィードバックされます</p>
    <img class="finger slideInDown" src="../../../image/finger.png" alt="">
  </div>
</template>

<style lang="scss" scoped>
  @import "../../../style/slide";
  .finger {
    width: 4vw;
    position: absolute;
    left: 50%;
    margin-left: -2vw;
    bottom: 30px;
  }

  @-webkit-keyframes slideInDown {
    from {
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInDown {
    from {
      -webkit-transform: translate3d(0, -50%, 0);
      transform: translate3d(0, -50%, 0);
      visibility: visible;
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .slideInDown {
    -webkit-animation: slideInDown .5s linear infinite alternate;
    animation: slideInDown .5s linear infinite alternate;
  }

</style>
