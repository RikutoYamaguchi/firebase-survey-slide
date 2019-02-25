<template>
  <div class="slide__item">
    <question
      :question="question"
      :answered="answered"
      @answered="onAnswered"
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
