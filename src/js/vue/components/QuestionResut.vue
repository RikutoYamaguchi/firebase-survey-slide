<template>
  <div class="question" v-if="hasQuestion">
    <div v-if="answerCountsEmpty">回答がありません</div>
    <div v-else>
      <p class="question__q">{{ question.subject }}</p>
      <div class="question-result__answer" v-for="(answer, i) in question.answers">
        <p class="question-result__subject">{{ answer.context }}</p>
        <span class="question-result__value" :style="{ width: (answerCounts[i] === 0 ?
      0 :
      (answerCounts[i] / allCount) * 100) + '%' }">{{ (answerCounts[i] === 0 ?
        0 :
        Math.round((answerCounts[i] / allCount) * 100)) + '%' }}</span>
      </div>
    </div>
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
      answerCounts: {
        type: Object,
        default: {}
      }
    },
    computed: {
      answerCountsEmpty() {
        return _.isEmpty(this.answerCounts)
      },
      hasQuestion() {
        return !_.isEmpty(this.question)
      },
      allCount() {
        let count = 0;
        _.each(this.answerCounts, v => {
          count += v
        })
        return count
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../style/common/import";
  .question-result {
    $value: null;
    &__subject {
      font-size: 1.5vw;
      margin-bottom: 1vw;
    }
    &__value {
      $value: &;
      margin-bottom: 2vw;
      height: 4vw;
      display: flex;
      align-items: center;
      text-indent: 1vw;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      font-size: 1.5vw;
    }
    &__answer {
      &:nth-of-type(1) {
        #{$value} {
          background: #ACEDFF;
        }
      }
      &:nth-of-type(2) {
        #{$value} {
          background: #B3C2FF;
        }
      }
      &:nth-of-type(3) {
        #{$value} {
          background: #FFE5A9;
        }
      }
      &:nth-of-type(4) {
        #{$value} {
          background: #FFD4A9;
        }
      }
    }
  }
</style>