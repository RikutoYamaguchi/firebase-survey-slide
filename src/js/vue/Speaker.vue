<template>
  <div>
    <div class="operation">
      <button @click="buttonCountReset">ボタンカウンターリセット</button>
      <button @click="toggleQuestionPostButton">質問を投稿するボタンの表示・非表示</button>
      <button @click="nextSlide">次のスライド</button>
      <button @click="beforeSlide">前のスライド</button>
      <button @click="firstSlide">最初のスライド</button>
    </div>
    <monitor />
  </div>
</template>

<script>
  import PageBaseMixin from './PageBaseMixin'
  import Monitor from './components/Monitor'
  import fixedSlidesData from './slides/fixedSlidesData'

  export default {
    mixins: [PageBaseMixin],
    components: {
      Monitor
    },
    data() {
      return {
        isShowQuestionPostButton: false,
        currentSlideIndex: 0,
        slides: []
      }
    },
    computed: {
      maxSlideIndex() {
        return this.slides.length - 1
      }
    },
    methods: {
      buttonCountReset() {
        const buttonCountsRef = this.$database.ref(`projects/${this.currentProject}/buttonCounts`)
        const update = {
          button1: 0,
          button2: 0,
          button3: 0,
          button4: 0
        }

        buttonCountsRef.update(update)
      },
      toggleQuestionPostButton() {
        const isShowQuestionPostButtonRef = this.$database.ref(`projects/${this.currentProject}/isShowQuestionPostButton`)
        const update = !this.isShowQuestionPostButton

        isShowQuestionPostButtonRef.set(update)
      },
      nextSlide() {
        const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)
        const nextIndex = this.currentSlideIndex + 1 >= this.maxSlideIndex ? this.maxSlideIndex : this.currentSlideIndex + 1
        currentSlideIndexRef.set(nextIndex)
      },
      beforeSlide() {
        const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)
        const beforeIndex = this.currentSlideIndex - 1 < 0 ? 0 : this.currentSlideIndex - 1
        currentSlideIndexRef.set(beforeIndex)
      },
      firstSlide() {
        const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)
        currentSlideIndexRef.set(0)
      },
      setSlides(slides) {
        this.slides = slides.concat(fixedSlidesData)
      }
    },
    async created() {
      await this.initialize()
      const isShowQuestionPostButtonRef = this.$database.ref(`projects/${this.currentProject}/isShowQuestionPostButton`)
      const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)
      const slidesRef = this.$database.ref(`projects/${this.currentProject}/slides`)
      isShowQuestionPostButtonRef.on('value', data => {
        this.isShowQuestionPostButton = data.val()
      })
      currentSlideIndexRef.on('value', data => {
        this.currentSlideIndex = data.val()
      })
      slidesRef.on('value', data => {
        this.setSlides(data.val())
      })
      slidesRef.once('value', data => {
        this.setSlides(data.val())
      })
    }
  }
</script>

<style lang="scss">
  @import "../../style/common/import";
  .operation {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
  }
  button {
    @include MaterialShadow(1);
    width: 45%;
    height: 60px;
    display: flex;
    margin: 2%;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    background: #fff;
    text-decoration: none!important;
    border-radius: 10px;
  }
</style>