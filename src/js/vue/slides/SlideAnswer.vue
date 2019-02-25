<template>
  <div class="slide__item">
    <question-result
      :initialized="initialized"
      :question="question"
      :answerCounts="answerCounts"
    />
  </div>
</template>

<script>
  import QuestionSlideMixin from './QuestionSlideMixin'

  export default {
    mixins: [QuestionSlideMixin],
  }
</script>

<style lang="scss" scoped>
  @import "../../../style/slide";
</style>
