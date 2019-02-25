<template>
  <div class="slide">
    <transition name="transition--slide" mode="out-in">
      <component
        :is="currentSlideName"
        :initialized="initialized"
        :questionId="currentSlideQuestionId"
        :buttonCounts="buttonCounts"
      />
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Slide1 from './Slide1'
  import Slide2 from './Slide2'
  import Slide3 from './Slide3'
  import Slide4 from './Slide4'
  import Slide5 from './Slide5'
  import SlideQuestion from './SlideQuestion'
  import SlideAnswer from './SlideAnswer'

  import fixedSlidesData from './fixedSlidesData'

  export default {
    props: ['initialized', 'buttonCounts'],
    components: {
      Slide1,
      Slide2,
      Slide3,
      SlideQuestion,
      SlideAnswer,
      Slide4,
      Slide5
    },
    data() {
      return {
        currentSlideIndex: null,
        slides: []
      }
    },
    computed: {
      ...mapGetters(['currentProject']),
      currentSlideName() {
        if (this.slides.length === 0) {
          return null
        }
        const targetSlide = this.slides[this.currentSlideIndex]
        if (!targetSlide) {
          return null
        }
        return targetSlide.component || null
      },
      currentSlideQuestionId() {
        if (this.slides.length === 0) {
          return null
        }
        const targetSlide = this.slides[this.currentSlideIndex]
        if (!targetSlide) {
          return null
        }
        return targetSlide.questionId || null
      },
    },
    methods: {
      setSlides(slides) {
        this.slides = slides.concat(fixedSlidesData)
      }
    },
    watch: {
      async initialized(nextValue) {
        if (!nextValue) {
          return false
        }
        const currentSlideIndexRef = this.$database.ref(`projects/${this.currentProject}/currentSlideIndex`)
        const slidesRef = this.$database.ref(`projects/${this.currentProject}/slides`)
        slidesRef.on('value', data => {
          this.setSlides(data.val())
        })
        await slidesRef.once('value', data => {
          this.setSlides(data.val())
        })
        currentSlideIndexRef.on('value', data => {
          this.currentSlideIndex = data.val()
        })
      }
    }
  }
</script>

<style lang="scss">
  .slide {
    width: 100%;
    height: 100%;
  }
</style>
