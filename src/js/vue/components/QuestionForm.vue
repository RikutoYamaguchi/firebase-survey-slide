<template>
  <form @submit.prevent="onSubmit" class="form">
    <div v-if="submitted">
      <p class="form__message">投稿ありがとうございました！</p>
      <div class="form__row">
        <div class="form__buttons">
          <a class="form__button" href="javascript:;" @click="$emit('end')">閉じる</a>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="form__errors">
        <p v-if="errors.subject">{{ errors.subject }}</p>
        <p v-if="errors.answers">{{ errors.answers }}</p>
      </div>
      <div class="form__row">
        <p class="form__label">質問内容</p>
        <input type="text" class="form__input-text" v-model="subject">
      </div>
      <div class="form__row">
        <p class="form__label">回答</p>
        <template v-for="(answer, i) in answers">
          <div class="form__answer-row form__flex">
            <p class="form__answer-number">{{ i+1 }}. </p>
            <input
              type="text"
              class="form__input-text"
              :value="answer.context"
              @input="onChangeContext($event, i)"
            >
            <a class="form__answer-delete" href="javascript:;" @click="onClickDelete(i)">削除</a>
          </div>
        </template>
        <div class="form__answer-add">
          <a class="form__button"
             href="javascript:;"
             :class="{ 'form__button--disabled': limitAnswersCount }" @click="onClickAdd">+ 回答を追加する</a>
        </div>
      </div>
      <div class="form__row">
        <div class="form__buttons">
          <button class="form__button" type="submit">投稿する</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import _ from 'lodash'

  export default {
    name: 'QuestionForm',
    data() {
      return {
        subject: '',
        answers: [],
        submitted: false,
        errors: {}
      }
    },
    computed: {
      ...mapGetters(['currentProject']),
      limitAnswersCount() {
        return this.answers.length >= 4
      }
    },
    methods: {
      onClickDelete(i) {
        this.answers.splice(i, 1);
      },
      onClickAdd() {
        if(this.limitAnswersCount)
          return false

        this.answers.push({
          context: ''
        });
      },
      onChangeContext(event, i) {
        this.answers[i].context = event.target.value
      },
      onSubmit() {
        const { subject, answers } = this;

        if (this.submitted) {
          return false
        }

        this.errors = {}

        if (subject === '') {
          this.errors.subject = '質問内容は必須です。'
        }

        const answersCount = _.filter(answers, answer => answer.context != '').length
        if (answersCount < 2) {
          this.errors.answers = '回答は2つ以上必要です。'
        }

        if (!_.isEmpty(this.errors)) {
          return false
        }

        try {
          const postData = {
            subject, answers: _.filter(answers, answer => answer.context != '')
          }
          const postKey = this.$database.ref(`projects/${this.currentProject}`).child('posts').push().key;
          this.$database.ref(`projects/${this.currentProject}/postQuestions/${postKey}`).update(postData)
          this.submitted = true
        } catch (e) {
          this.submitted = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../style/common/import";

  .form {
    &__message {
      font-size: 18px;
      text-align: center;
      margin: 80px 0;
    }

    &__errors {
      color: #ff4366;
      margin-bottom: 10px;
    }

    &__row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__label {
      font-style: italic;
      color: #666;
      margin-bottom: 5px;
    }

    &__input-text {
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
    }

    &__flex {
      display: flex;
      align-items: center;
    }

    &__answer-number {
      margin-right: 10px;
      font-weight: bold;
      font-style: italic;
    }

    &__answer-delete {
      display: block;
      width: 70px;
      text-align: center;
    }

    &__answer-add {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }

    &__answer-row {
      margin-bottom: 10px;
    }

    &__button {
      @include MaterialShadow(1);
      width: 160px;
      height: 44px;
      margin: 0 10px 10px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #eee;
      text-decoration: none!important;
      border-radius: 10px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:hover {
        @include MaterialShadow(2)
      }
      &--disabled {
        background: #666;
      }
    }
    &__buttons {
      display: flex;
      justify-content: center;
    }
  }
</style>