<template>
  <transition
    name="transition--fade"
    @afterEnter="afterEnter"
    @beforeEnter="beforeEnter"
  >
    <div v-if="isShow" class="question-modal">
      <div class="question-modal__bg"></div>
      <div class="question-modal__rail">
        <div v-click-outside="onClickOutsideBox" class="question-modal__box">
          <div class="question-modal__header">
            <p class="question-modal__title">アンケートを投稿する</p>
          </div>
          <div class="question-modal__body">
            <question-form
              @end="onEnd"
            />
          </div>
          <div class="question-modal__footer">

          </div>
          <a @click="onClickClose" href="javascript:;" class="question-modal__close">
            <div>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import ClickOutside from 'v-click-outside'
  import Vue from 'vue'
  Vue.use(ClickOutside)

  import QuestionForm from './QuestionForm'

  export default {
    name: 'PostQuestion',
    components: {
      QuestionForm
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        transitioning: false,
      }
    },
    methods: {
      beforeEnter() {
        this.transitioning = true
      },
      afterEnter() {
        this.transitioning = false;
      },
      onClickOutsideBox(event, el) {
        if (this.isShow && !this.transitioning && event.target.className != 'form__button' && event.target.className != 'form__answer-delete') {
          this.$emit('close')
        }
      },
      onEnd() {
        this.$emit('close')
      },
      onClickClose() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  .question-modal {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    &__bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      pointer-events: all;
    }

    &__rail {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      overflow-y: auto;
      text-align: center;
      
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        height: 100%;
      }
    }

    &__box {
      display: inline-block;
      vertical-align: middle;
      width: 600px;
      padding: 30px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      position: relative;
      text-align: left;
      background: #fff;
    }

    &__title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 24px;
    }

    &__close {
      position: absolute;
      right: 10px;
      top: 10px;
      &:hover {
        opacity: .7;
      }

      div {
        position: relative;
        width: 40px;
        height: 40px;

        span {
          position: absolute;
          width: 100%;
          height: 3px;
          background: #666;
          display: block;
          margin: auto;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          &:first-child {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
          }
          &:last-child {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>