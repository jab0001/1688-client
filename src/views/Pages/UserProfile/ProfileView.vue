<template>
  <ul class="profile-card__list">
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Маркировка: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.marking }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Никнейм: </span>
      <span class="profile-card__item__span--second">
        @{{ user_info.tag }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Id профиля: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.telegram_id }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Номер телефона: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.phone || 'Не указан' }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Почта: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.email || 'Не указана' }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Разница с Москвой: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.difference_with_moscow || 'Не указано' }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      user_info: {},
    };
  },
  mounted() {
    this.user_info = store.getters['auth/user'];
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  &__inner {
    width: 80%;
    border-radius: 0.375rem;
    padding: 30px 0px;
    box-shadow: 2px 2px 8px 0px rgb(34 60 80 / 20%);
  }

  &__percent {
    padding: 10px 20px;
    border: 1px solid #b6c0ca;
    color: #212529;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 30px;
  }

  &__block {
    display: flex;
    align-items: center;
  }

  &__list {
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 30px;
  }

  &__list:nth-child(1) {
    border-bottom: 1px solid #e5e7eb;
    margin: 30px 30px 0px 30px;
    padding-bottom: 30px;
  }

  &__link {
    text-decoration-line: underline;
    -webkit-text-decoration-line: underline;
    font-style: italic;
    color: #2a272769;
    font-size: 14px;
  }

  &__hr {
    border-bottom: 1px solid #e5e7eb;
  }

  &__item {
    font-size: 16px;
    align-items: center;

    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
    }

    &__span {
      &--first {
        margin-right: 30px;

        @media screen and (max-width: 480px) {
          margin-right: 0;
        }
      }

      &--second {
        flex: 1;
        text-align: right;
      }
    }
  }

  &__avatar {
    width: 80px;
    height: 80px;
    object-position: cover;
    border-radius: 50%;
  }

  &__circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);

    @media screen and (max-width: 480px) {
      width: 2.08vw;
      height: 2.08vw;
      margin-right: 2.08vw;
    }
  }

  &__up {
    padding: 0px 30px 30px 30px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px 30px 0px 30px;
  }

  &__button {
    width: 100%;
    margin-right: 0px !important;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  }

  &__name {
    font-size: 30px;
    margin-top: 20px;
    font-weight: 600;
    color: #212529;
  }
}
</style>
