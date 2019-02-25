<template>
  <div class="question" v-if="hasQuestion">
    <p class="question__q">{{ question.subject }}</p>
    <div class="question__buttons">
      <button
        class="question__button"
        v-for="(answer, i) in question.answers"
        :class="{ 'question__button--selected': answer.selected }"
        @click="onClickAnswer(i)"
      >{{ answer.context }}</button>
    </div>
    <div v-if="answered" class="question__answered">回答済み</div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      question: {
        type: Object,
        default: {}
      },
      answered: false
    },
    computed: {
      hasQuestion() {
        return !_.isEmpty(this.question)
      }
    },
    methods: {
      onClickAnswer(index) {
        this.$emit('answered', index)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../style/common/import";

  .question {
    position: relative;
    &__q {
      position: relative;
      font-size: 3vw;
      padding-left: 1.5em;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 80vw;
      margin: 0 auto 3vw;
      &:before {
        content: "Q. ";
        position: absolute;
        left: 0;
      }
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: stretch;
      width: 80vw;
      position: relative;
      margin: auto;
    }

    &__button {
      width: 48%;
      @include MaterialShadow(1);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      text-decoration: none!important;
      border-radius: 10px;
      -webkit-transition: box-shadow .3s;
      -moz-transition: box-shadow .3s;
      -ms-transition: box-shadow .3s;
      -o-transition: box-shadow .3s;
      transition: box-shadow .3s;
      font-size: 2vw;
      margin-bottom: 2vw;
      padding: 2%;

      &:hover {
        @include MaterialShadow(2)
      }

      &--selected {
        background: #e8faff;
      }
    }
    &__answered {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .5);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2vw;
    }
  }
</style>