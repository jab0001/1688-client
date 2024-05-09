<template>
  <form class="success-auth">
    <div class="success-auth__logo">
      <img src="@/assets/img/icons/logo.svg" />
    </div>

    <div>
      <h2 class="success-auth__title">Успех!</h2>
      <p class="success-auth__description">
        {{ description }}
      </p>
    </div>

    <button
      @click.prevent="onSubmitHandler"
      class="success-auth__btn success-auth__btn-submit"
    >
      {{ modal ? 'Готово' : 'Войти' }}
    </button>
  </form>
</template>
<script>
export default {
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    description() {
      let text = '';
      if (this.$route.params.verify === 'signup') {
        text = 'Вы успешно зарегестрировались на платформе FLG';
      } else {
        text = 'Вы успешно поменяли пароль на платформе';
      }

      return text;
    },
  },
  methods: {
    onSubmitHandler() {
      this.$emit('onSubmit');
    },
  },
};
</script>

<style lang="scss" scoped>
.success-auth {
  padding: 46px 38px 66px 38px;
  min-width: 384px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__logo {
    width: 87px;
    height: 31px;
    border-radius: 36px;
    background: #fed255;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    img {
      position: absolute;
      top: 5px;
    }
  }

  &__title {
    margin: 0;
    margin-top: 43px;
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
    color: #000000;

    text-align: center;
  }

  &__description {
    margin: 0;
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;

    color: #000000;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    height: 45px;
    border-radius: 5px;
    color: #000;

    margin-top: 36px;
    text-decoration: none;
    background: #f7db69;
  }
}
</style>
