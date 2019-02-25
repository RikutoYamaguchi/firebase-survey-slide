<template>
  <div>
    <div class="screen">
      <div class="slide-area">
        <div class="feedback-symbols">
          <div
            class="feedback-symbol feedback-symbol--left-top"
            :style="button1FeedbackStyle"
          ><img src="../../image/feedback_01.png" alt=""></div>
          <div
            class="feedback-symbol feedback-symbol--right-top"
            :style="button2FeedbackStyle"
          ><img src="../../image/feedback_02.png" alt=""></div>
          <div
            class="feedback-symbol feedback-symbol--left-bottom"
            :style="button3FeedbackStyle"
          ><img src="../../image/feedback_03.png" alt=""></div>
          <div
            class="feedback-symbol feedback-symbol--right-bottom"
            :style="button4FeedbackStyle"
          ><img src="../../image/feedback_04.png" alt=""></div>
        </div>
        <slide
          :initialized="initialized"
          :buttonCounts="buttonCounts"
        />
      </div>
      <div class="operation-area">
        <div class="action-buttons">
          <div class="action-buttons__item">
            <button
              @click="onClickButton(1)"
              class="action-button"><img src="../../image/feedback_01.png" alt=""></button>
          </div>
          <div class="action-buttons__item">
            <button
              @click="onClickButton(2)"
              class="action-button"><img src="../../image/feedback_02.png" alt=""></button>
          </div>
          <div class="action-buttons__item">
            <button
              @click="onClickButton(3)"
              class="action-button"><img src="../../image/feedback_03.png" alt=""></button>
          </div>
          <div class="action-buttons__item">
            <button
              @click="onClickButton(4)"
              class="action-button"><img src="../../image/feedback_04.png" alt=""></button>
          </div>
          <div class="action-buttons__item action-buttons__item--question">
            <button
              @click="onClickQuestion"
              v-if="isShowQuestionPostButton"
              class="action-button">アンケートを<br>投稿する</button>
          </div>
        </div>
      </div>
    </div>

    <post-question
      :is-show="isShowQuestionModal"
      @close="() => { this.isShowQuestionModal = false }"
    />
  </div>
</template>

<script>
  import PostQuestion from './components/PostQuestion'
  import Slide from './slides/Slide'

  import PageBaseMixin from './PageBaseMixin'

  const SHRINK_INTERVAL = 50
  const SPREAD_VALUE = 0.3
  const WILT_VALUE = 0.1
  const MAX_SPREAD_VALUE = 2

  function buttonCountUp(buttonCountsRef, targetNumber) {
    buttonCountsRef.transaction(buttonCounts => {
      if (!buttonCounts) {
        return buttonCounts
      }
      buttonCounts[`button${targetNumber}`]++
      return buttonCounts
    })
  }

  export default {
    name: 'Audience',
    mixins: [PageBaseMixin],
    components: {
      PostQuestion,
      Slide
    },
    data() {
      return {
        initialized: false,
        buttonCounts: {
          button1: 0,
          button2: 0,
          button3: 0,
          button4: 0,
        },
        feedbackScales: {
          button1: 1,
          button2: 1,
          button3: 1,
          button4: 1
        },
        isShowQuestionPostButton: false,
        isShowQuestionModal: false,
      }
    },
    computed: {
      button1FeedbackStyle() {
        return `transform: scale(${this.feedbackScales.button1})`
      },
      button2FeedbackStyle() {
        return `transform: scale(${this.feedbackScales.button2})`
      },
      button3FeedbackStyle() {
        return `transform: scale(${this.feedbackScales.button3})`
      },
      button4FeedbackStyle() {
        return `transform: scale(${this.feedbackScales.button4})`
      },
    },
    methods: {
      onClickButton(number) {
        if(!this.initialized) {
          return false;
        }
        buttonCountUp(this.$database.ref(`projects/${this.currentProject}/buttonCounts`), number)
      },
      onClickQuestion() {
        this.isShowQuestionModal = true;
      }
    },
    watch: {
      'buttonCounts.button1'(next, before) {
        if (next < before || !this.initialized) {
          return
        }
        const spreadValue = this.feedbackScales.button1 + SPREAD_VALUE
        this.feedbackScales.button1 = spreadValue > MAX_SPREAD_VALUE ? MAX_SPREAD_VALUE : spreadValue;
      },
      'buttonCounts.button2'(next, before) {
        if (next < before || !this.initialized) {
          return
        }
        const spreadValue = this.feedbackScales.button2 + SPREAD_VALUE
        this.feedbackScales.button2 = spreadValue > MAX_SPREAD_VALUE ? MAX_SPREAD_VALUE : spreadValue;
      },
      'buttonCounts.button3'(next, before) {
        if (next < before || !this.initialized) {
          return
        }
        const spreadValue = this.feedbackScales.button3 + SPREAD_VALUE
        this.feedbackScales.button3 = spreadValue > MAX_SPREAD_VALUE ? MAX_SPREAD_VALUE : spreadValue;
      },
      'buttonCounts.button4'(next, before) {
        if (next < before || !this.initialized) {
          return
        }
        const spreadValue = this.feedbackScales.button4 + SPREAD_VALUE
        this.feedbackScales.button4 = spreadValue > MAX_SPREAD_VALUE ? MAX_SPREAD_VALUE : spreadValue;
      },
    },
    async created() {
      await this.initialize()
      const buttonCountsRef = this.$database.ref(`projects/${this.currentProject}/buttonCounts`)
      const isShowQuestionPostButtonRef = this.$database.ref(`projects/${this.currentProject}/isShowQuestionPostButton`)

      buttonCountsRef.on('child_changed', data => {
        this.buttonCounts[data.key] = data.val()
      })
      isShowQuestionPostButtonRef.on('value', data => {
        this.isShowQuestionPostButton = data.val()
      })
      await buttonCountsRef.once('value', snapshot => {
        this.buttonCounts = snapshot.val()
      })

      this.initialized = true

      setInterval(() => {
        this.feedbackScales.button1 = this.feedbackScales.button1 > 1 ? this.feedbackScales.button1 - WILT_VALUE : 1;
        this.feedbackScales.button2 = this.feedbackScales.button2 > 1 ? this.feedbackScales.button2 - WILT_VALUE : 1;
        this.feedbackScales.button3 = this.feedbackScales.button3 > 1 ? this.feedbackScales.button3 - WILT_VALUE : 1;
        this.feedbackScales.button4 = this.feedbackScales.button4 > 1 ? this.feedbackScales.button4 - WILT_VALUE : 1;
      }, SHRINK_INTERVAL)
    }
  }
</script>

<style lang="scss">
  @import "../../style/common/import";
  .screen {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .slide-area {
    position: relative;
    flex: 1;
  }
  .operation-area {
    background: #e8faff;
    height: 140px;
  }
  .action-buttons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    &__item {
      text-align: center;
    }
  }
  .action-button {
    @include MaterialShadow(1);
    width: 17vw;
    height: 100px;
    margin: 0 10px 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    text-decoration: none!important;
    border-radius: 10px;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
    font-size: 1.5vw;
    img {
      width: 50px;
    }
    &:hover {
      @include MaterialShadow(2)
    }
  }
  .feedback-symbol {
    @include MaterialShadow(1);
    width: 60px;
    height: 60px;
    background: #fff;
    position: absolute;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-transition: all .1s ease(out-back);
    -moz-transition: all .1s ease(out-back);
    -ms-transition: all .1s ease(out-back);
    -o-transition: all .1s ease(out-back);
    transition: all .1s ease(out-back);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
    }

    &--left-top {
      left: 30px;
      top: 30px;
    }
    &--right-top {
      right: 30px;
      top: 30px;
    }
    &--left-bottom {
      left: 30px;
      bottom: 30px;
    }
    &--right-bottom {
      right: 30px;
      bottom: 30px;
    }
  }
</style>
