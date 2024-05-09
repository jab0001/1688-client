<template>
  <div class="profile-card">
    <div class="profile-card__inner bg-white">
      <div class="profile-card__up">
        <div class="profile-card__block">
          <img class="profile-card__avatar" src="/img/user.png" />
          <div class="profile-card__percent">
            {{ userCommission }}% {{ rank }}
          </div>
        </div>
        <p class="profile-card__name">{{ user_info.client.username }}</p>
        <div class="promo-container" v-if="isPromo">
          <input
            type="text"
            v-model="promo"
            class="form-control text-dark promo-input"
            placeholder="Промокод"
          />
          <div class="promo-btn__submit" @click="submitPromo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 h-6 ml-2 flex-shrink-0 hover:bg-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>

        <button
          v-else
          class="profile-card__button btn base-button text-dark"
          @click="isPromo = true"
        >
          У меня есть промокод
        </button>
        <a href="/loyalty" class="profile-card__link"
          >Как сделать скидку больше?</a
        >
      </div>

      <div class="profile-card__hr"></div>

      <div class="pofile-card__body">
        <component
          @changeComponent="changeComponent"
          :is="currentComponent"
          :user_info="user_info.client"
        >
        </component>

        <ul class="profile-card__list">
          <li class="profile-card__item d-flex">
            <div class="profile-card__circle"></div>
            <span class="profile-card__item__span--first"> Комиссия: </span>
            <span class="profile-card__item__span--second">
              {{ userCommission }} %
            </span>
          </li>
          <li class="profile-card__item d-flex">
            <div class="profile-card__circle"></div>
            <span class="profile-card__item__span--first">
              Мин. сумма заказа:
            </span>
            <span class="profile-card__item__span--second">
              {{ userMinPrice }} ₽
            </span>
          </li>
          <li class="profile-card__item d-flex">
            <div class="profile-card__circle"></div>
            <span class="profile-card__item__span--first"> Заказов: </span>
            <span class="profile-card__item__span--second">
              {{ user_info.client.orders_count }}
            </span>
          </li>
          <li class="profile-card__item d-flex">
            <div class="profile-card__circle"></div>
            <span class="profile-card__item__span--first"> По заказам: </span>
            <span class="profile-card__item__span--second"> 0 ₽ </span>
          </li>
          <li class="profile-card__item d-flex">
            <div class="profile-card__circle"></div>
            <span class="profile-card__item__span--first"> По доставке: </span>
            <span class="profile-card__item__span--second"> 0 ₽ </span>
          </li>
        </ul>
      </div>

      <div class="profile-card__hr"></div>

      <div
        class="profile-card__footer"
        v-if="currentComponent === 'ProfileView'"
      >
        <div class="profile-card__buttons">
          <button
            class="profile-card__button btn base-button text-dark"
            @click="changeComponent"
          >
            Изменить профиль
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileView from '@/views/Pages/UserProfile/ProfileView.vue';
import ProfileChange from '@/views/Pages/UserProfile/ProfileChange.vue';
export default {
  name: 'ProfileCard',
  components: { ProfileView, ProfileChange },
  data() {
    return {
      currentComponent: 'ProfileView',
      promo: '',
      isPromo: false,
      userCommission: 10,
      rank: 'Заказчик',
      userMinPrice: 50000,
    };
  },
  props: {
    user_info: {
      type: Object,
      required: false,
    },
  },

  computed: {
    userOrdersCount() {
      return store.getters['auth/userOrdersCount'];
    },
  },

  methods: {
    changeComponent() {
      if (this.currentComponent === 'ProfileView') {
        this.currentComponent = 'ProfileChange';
      } else {
        this.currentComponent = 'ProfileView';
      }
    },

    async submitPromo() {
      await this.$http
        .get(`/promo/${this.promo}/set`)
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Промокод успешно применен',
          });
          this.$store.commit('auth/SET_USER_LONG_PROMO', response.data.data );
          this.userCommission = store.getters['auth/userLongPromoPercent'];
          this.rank = store.getters['auth/userLongPromoRank'];
          this.userMinPrice = store.getters['auth/userLongPromoMinPrice'];
  
          this.isPromo = false;
          this.$forceUpdate();
        })
        .catch((error) => {
          this.promo = '';
          this.isPromo = false;
        });
    },
  },
  mounted() {
    if (store.getters['auth/userLongPromo']) {
      this.userCommission = store.getters['auth/userLongPromoPercent'];
      this.userMinPrice = store.getters['auth/userLongPromoMinPrice'];
      if (store.getters['auth/userLongPromoRank']) {
        this.rank = store.getters['auth/userLongPromoRank'];
      } else {
        this.rank = 'Заказчик';
      }
    } else {
      this.userCommission = 10;
      this.userMinPrice = 50000;
      this.rank = 'Заказчик';
    }
    this.tg_id = store.getters['auth/userTelegramId'];
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 1200px) {
    margin-bottom: 50px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 10.42vw;
  }

  &__inner {
    width: 80%;
    border-radius: 0.375rem;
    padding: 30px 0px;
    box-shadow: 2px 2px 8px 0px rgb(34 60 80 / 20%);

    @media screen and (max-width: 1200px) {
      width: 100%;
    }

    @media screen and (max-width: 480px) {
      padding: 6.25vw 0;
    }
  }

  &__percent {
    padding: 10px 20px;
    border: 1px solid #b6c0ca;
    color: #212529;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 30px;

    @media screen and (max-width: 480px) {
      padding: 2.08vw 4.17vw;
      border-radius: 1.04vw;
      font-size: 2.5vw;
      margin-left: 2.92vw;
    }
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

    @media screen and (max-width: 480px) {
      gap: 2.08vw;
      margin: 6.25vw;
    }
  }

  &__list:nth-child(1) {
    border-bottom: 1px solid #e5e7eb;
    margin: 30px 30px 0px 30px;
    padding-bottom: 30px;

    @media screen and (max-width: 480px) {
      margin: 6.25vw 6.25vw 0 6.25vw;
      padding-bottom: 6.25vw;
    }
  }

  &__link {
    text-decoration-line: underline;
    -webkit-text-decoration-line: underline;
    font-style: italic;
    color: #2a272769;
    font-size: 14px;
    margin-top: 10px;
    display: inline-block;

    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      margin-top: 3.13vw;
    }
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

    @media screen and (max-width: 480px) {
      width: 16.67vw;
      height: 16.67vw;
    }
  }

  &__circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background: linear-gradient(180deg, #f5dd6d, #ffcd4d);

    @media screen and (max-width: 480px) {
      width: 2.08vw;
      height: 2.08vw;
      margin-right: 2.08vw;
    }
  }

  &__up {
    padding: 0px 30px 30px 30px;

    @media screen and (max-width: 480px) {
      padding: 0 6.25vw 6.25vw 6.25vw;
    }
  }

  &__buttons {
    padding: 30px 30px 0px 30px;

    @media screen and (max-width: 480px) {
      padding: 6.25vw 6.25vw 0 6.25vw;
    }
  }

  &__button {
    width: 100%;
    margin-right: 0px !important;
    background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
  }

  &__name {
    font-size: 30px;
    margin-top: 20px;
    font-weight: 600;
    color: #212529;

    @media screen and (max-width: 480px) {
      font-size: 5vw;
      margin-top: 2.08vw;
      margin-bottom: 2.08vw;
    }
  }

  .promo-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .promo-input {
      width: 100%;
      margin-right: 12px;
    }

    .promo-btn__submit {
      cursor: pointer;
      display: flex;
      width: 36px;
      height: 36px;

      & svg:hover {
        stroke: #3cab79;
      }
    }
  }
}
</style>
