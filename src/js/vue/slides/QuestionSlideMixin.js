import Cookies from 'js-cookie'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Question from '../components/Question'
import QuestionResult from '../components/QuestionResut'

export default {
  components: {
    Question,
    QuestionResult
  },
  props: {
    initialized: {
      type: Boolean,
      default: false
    },
    questionId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      answered: false,
      question: {},
      answeredIndex: null,
      answerCounts: {}
    }
  },
  computed: {
    ...mapGetters(['currentProject']),
    cookieAnsweredName() {
      return `answered-${this.questionId}`
    }
  },
  watch: {
    initialized(newValue) {
      if (!newValue) {
        return false
      }
      this.getQuestion()
    }
  },
  methods: {
    onAnswered(index) {
      if(this.answered) {
        return false;
      }
      Cookies.set(this.cookieAnsweredName, index)
      this.answered = true
      this.setSelectedAnswer(index)
      const answersRef = this.$database.ref(`projects/${this.currentProject}/answers/${this.questionId}`)
      answersRef.transaction(answerCounts => {
        const counts = {}
        if (!answerCounts) {
          // 初期状態を作成する
          _.times(this.question.answers.length, i => {
            counts[i] = 0;
          })

          counts[index] = 1;

          return counts
        }
        answerCounts[index]++
        return answerCounts
      })
    },
    setSelectedAnswer(index) {
      if (index === null || index === undefined) {
        return false
      }
      const answered = { ...this.question.answers[index], selected: true }
      this.question.answers.splice(index, 1, answered)
    },
    getQuestion() {
      const questionRef = this.$database.ref(`projects/${this.currentProject}/questions/${this.questionId}`)
      const answerCountRef = this.$database.ref(`projects/${this.currentProject}/answers/${this.questionId}`)
      questionRef.once('value', data => {
        this.question = data.val()
        this.setSelectedAnswer(this.answeredIndex)
      })
      answerCountRef.once('value', data => {
        const answerCounts = {};
        const databaseCounts = data.val()
        if(databaseCounts === null) {
          return false;
        }
        _.times(databaseCounts.length, i => {
          answerCounts[i] = databaseCounts[i]
        })
        this.answerCounts = answerCounts
      })
    }
  },
  created() {
    const answered = Cookies.get(this.cookieAnsweredName)
    this.answered = answered !== undefined
    this.answeredIndex = answered
    if (this.initialized) {
      this.getQuestion()
    }
  }
}
