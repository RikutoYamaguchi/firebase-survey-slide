<template>
  <div class="facilitation">
    <h2>現在のスライドインデックス： {{ currentSlideIndex }} / {{ maxSlideIndex }}</h2>
    <h2>クリック数</h2>
    <p class="count"><img src="../../../image/feedback_01.png" alt=""><span>{{ buttonCounts.button1 }}</span></p>
    <p class="count"><img src="../../../image/feedback_02.png" alt=""><span>{{ buttonCounts.button2 }}</span></p>
    <p class="count"><img src="../../../image/feedback_03.png" alt=""><span>{{ buttonCounts.button3 }}</span></p>
    <p class="count"><img src="../../../image/feedback_04.png" alt=""><span>{{ buttonCounts.button4 }}</span></p>

    <div v-if="currentQuestion">
      <h2>現在の質問回答</h2>
      <p>{{ currentQuestion.subject }}</p>
      <p v-for="(answer, i) in currentQuestion.answers">
        {{ answer.context }}: {{ currentAnswers[i] || 0 }}
      </p>
    </div>

    <h2>投稿されたアンケート</h2>
    <div class="questions">
      <div class="questions__item" v-for="(question, id) in this.postQuestions">
        <p v-if="question.added" class="questions__item__applied-display">追加ずみ</p>
        <p>質問: {{ question.subject }}</p>
        <div class="questions__item__answers">
          <p v-for="(answer, i) in question.answers">回答{{ i+1 }}: {{ answer.context }}</p>
        </div>
        <button @click="onClickApply(id)">追加する</button>
      </div>
    </div>
  </div>
</template>

<script>
  import PageBaseMixin from '../PageBaseMixin'

  import fixedSlidesData from '../slides/fixedSlidesData'

  export default {
    mixins: [PageBaseMixin],
    data() {
      return {
        initialized: false,
        buttonCounts: {
          button1: 0,
          button2: 0,
          button3: 0,
          button4: 0,
        },
        postQuestions: {},
        slides: [],
        answers: {},
        currentSlideIndex: null,
        questions: {}
      }
    },
    methods: {
      async onClickApply(id) {
        if(this.postQuestions[id].added) {
          return false
        }
        const questionsRef = this.$database.ref(`projects/${this.currentProject}/questions/${id}`)
        const postQuestionRef = this.$database.ref(`projects/${this.currentProject}/postQuestions/${id}`)

        const nextSlideIndex = this.slides.length - fixedSlidesData.length
        const nextQuestionSlideRef = this.$database.ref(`projects/${this.currentProject}/slides/${nextSlideIndex}`);
        const nextAnswerSlideRef = this.$database.ref(`projects/${this.currentProject}/slides/${nextSlideIndex+1}`);

        await questionsRef.set(this.postQuestions[id])
        await postQuestionRef.set({
          ...this.postQuestions[id],
          added: true
        })
        nextQuestionSlideRef.set({
          component: 'SlideQuestion',
          questionId: id
        })
        nextAnswerSlideRef.set({
          component: 'SlideAnswer',
          questionId: id
        })
      },
      setSlides(slides) {
        this.slides = slides.concat(fixedSlidesData)
      }
    },
    computed: {
      maxSlideIndex() {
        return this.slides.length - 1
      },
      currentSlide() {
        if (this.slides.length === 0) {
          return null
        }
        const targetSlide = this.slides[this.currentSlideIndex]
        if (!targetSlide) {
          return null
        }

        return targetSlide
      },
      currentQuestion() {
        if (!this.currentSlide) {
          return null
        }

        return this.questions[this.currentSlideQuestionId] || null
      },
      currentSlideQuestionId() {
        if (!this.currentSlide) {
          return null
        }
        return this.currentSlide.questionId || ''
      },
      currentAnswers() {
        if(!this.currentSlide) {
          return null
        }
        return this.answers[this.currentSlideQuestionId] || {}
      }
    },
    async created() {
      await this.initialize()
      const buttonCountsRef = this.$database.ref(`projects/${this.currentProject}/buttonCounts`)
      const postQuestionsRef = this.$database.ref(`projects/${this.currentProject}/postQuestions`)
      const slidesRef = this.$database.ref(`projects/${this.currentProject}/slides`)
      const answersRef = this.$database.ref(`projects/${this.currentProject}/answers`)
      const questionsRef = this.$database.ref(`projects/${this.currentProject}/questions`)
      const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)

      slidesRef.on('value', data => {
        this.setSlides(data.val())
      })
      slidesRef.once('value', data => {
        this.setSlides(data.val())
      })

      answersRef.on('value', data => {
        this.answers = data.val() || {}
      })
      answersRef.once('value', data => {
        this.answers = data.val() || {}
      })
      currentSlideIndexRef.on('value', data => {
        this.currentSlideIndex = data.val()
      })
      currentSlideIndexRef.once('value', data => {
        this.currentSlideIndex = data.val()
      })

      questionsRef.on('value', data => {
        this.questions = data.val()
      })
      questionsRef.once('value', data => {
        this.questions = data.val()
      })

      await buttonCountsRef.once('value', snapshot => {
        this.buttonCounts = snapshot.val()
      })
      buttonCountsRef.on('child_changed', data => {
        this.buttonCounts[data.key] = data.val()
      })
      postQuestionsRef.on('value', data => {
        this.postQuestions = data.val()
      })
      await buttonCountsRef.once('value', snapshot => {
        this.buttonCounts = snapshot.val()
      })
      await postQuestionsRef.once('value', snapshot => {
        this.postQuestions = snapshot.val()
      })
      this.initialized = true
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .facilitation {
    padding: 20px;
  }
  .count {
    margin-bottom: 10px;
    img {
      width: 30px;
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  button {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .questions {
    &__item {
      margin: 10px 0;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      &__applied-display {
        background: #eee;
        padding: 5px;
      }
    }
  }
</style>
