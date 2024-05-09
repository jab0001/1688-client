<template>
  <div class="container-fluid">
    <div class="my-orders">
      <h1 class="my-orders__header">Мои заказы</h1>
      <div class="my-orders__content">
        <ProfileOrdersList
          v-if="orders.length"
          @removeOrder="removeOrder"
          :orders="filteredOrders"
        />
        <div v-else class="my-orders__empty">
          <div class="my-orders__empty-header">
            <img
              class="my-orders__empty-icon"
              src="../../assets/img/icons/inform-outline.svg"
            />
            <div class="my-orders__empty-title">НОВЫЙ ЗАКАЗ</div>
          </div>
          <div class="my-orders__empty-content">
            <p class="my-orders__status-desc">
              Тут будут показываться статусы ваших новых заказов
            </p>
            <p class="my-orders__order-desc">
              для совершения нового заказа нажмите кнопку “Новый заказ”
            </p>
            <button
              class="my-orders__button my-orders__empty-button btn base-button text-dark"
              @click="$router.push(`/new_order`)"
            >
              <img
                class="my-orders__empty-button-icon"
                src="../../assets/img/icons/plus-dark.svg"
              />
              Новый заказ
            </button>
          </div>
        </div>
        <div class="my-orders__support">
          <div class="my-orders__support-header">
            <img
              class="my-orders__support-icon"
              src="../../assets/img/icons/inform-outline.svg"
            />
            <div class="my-orders__support-title">FLG ПОДДЕРЖКА</div>
          </div>
          <div class="my-orders__support-content">
            <p>После создания заявки мы свяжемся с вами по вотсапу</p>
            <p>
              Если у вас возникли проблемы с платформой или вопросы по заказу
              свяжитесь с нами:
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://api.whatsapp.com/send/?phone=79993520049&text&type=phone_number&app_absent=0"
              class="my-orders__button my-orders__whatsapp btn base-button"
            >
              <img
                class="my-orders__whatsapp-icon"
                src="../../assets/img/icons/button/whatsapp.svg"
              />
              ПОДДЕРЖКА FLG
            </a>
          </div>
          <div class="my-orders__support-footer">
            <p class="my-orders__schedule-title">
              Время работы<br />поддержки:
            </p>
            <p class="my-orders__schedule-item">ПН - ПТ 10:00 - 19:00</p>
            <p class="my-orders__schedule-item">СБ 11:00 - 17:00</p>
            <p class="my-orders__schedule-item">ВС - ВЫХОДНОЙ</p>
          </div>
        </div>
      </div>
    </div>
    <div ref="observer"></div>
  </div>
</template>
<script>
import 'vue-select/dist/vue-select.css';

import ProfileOrdersList from '@/views/Pages/UserProfile/ProfileOrdersList.vue';

import store from '@/store';

export default {
  layout: 'DashboardLayout',

  components: {
    ProfileOrdersList,
  },

  data() {
    return {
      orders: [],
      page: 0,
    };
  },

  methods: {
    async removeOrder(id) {
      await this.$http
        .delete(`/orders/${id}`, {
          params: {
            id: store.getters['auth/userTelegramId'],
          },
        })
        .then((response) => {
          this.filteredOrders = this.filteredOrders.filter(
            (item) => item.id !== id
          );
          this.$notify({ type: 'success', message: 'Заказ успешно удален' });
          this.$forceUpdate();
        });
    },

    async getOrders() {
      this.page++;
      await this.$http
        .get('/orders', {
          params: {
            id: store.getters['auth/userTelegramId'],
            page: this.page,
            order_by: 'desc',
          },
        })
        .then((response) => {
          this.orders = [...this.orders, ...response.data.data.orders.data];
        });
    },
  },

  computed: {
    filteredOrders() {
      return this.orders;
    },
  },

  async mounted() {
    await this.getOrders();

    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.getOrders();
      }
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(this.$refs.observer);

    if (localStorage.getItem('user_active') == 'no') {
      await this.$router.push({ path: '/first_auth' });
    }
  },
};
</script>

<style lang="scss">
.my-orders {
  margin-top: 46px;
  &__header {
    font-size: 24px;
    line-height: 29px;
    color: #292824;
    margin-bottom: 25px;
  }
  &__search {
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media screen and (max-width: 992px) {
      flex-direction: column;
      gap: 10px;
    }

    @media screen and (max-width: 480px) {
      gap: 2.08vw;
      margin-bottom: 6.25vw;
    }
  }

  &__input {
    width: 50%;
    box-shadow: 2px 2px 8px 0px rgba(34, 60, 80, 0.2);
    height: 50px;
    border-radius: 5px;
    border: 1px solid #e5e7eb;
    padding: 0px 20px;
    outline: none;

    @media screen and (max-width: 992px) {
      width: 100%;
    }

    @media screen and (max-width: 480px) {
      height: 10.42vw;
      padding: 0 4.17vw;
      border-radius: 1.04vw;
      font-size: 2.92vw;
    }
  }

  &__button {
    text-decoration: underline;
  }

  &__support {
    background: #ffffff;
    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
    height: 100%;
    padding: 26px 18px 40px 25px;
    max-width: 316px;
    @media screen and (max-width: 992px) {
      width: 100%;
      margin-top: 25px;
      max-width: 493px;
      display: flex;
      flex-wrap: wrap;
      column-gap: 40px;
    }

    @media screen and (max-width: 992px) {
      width: 100%;
      max-width: 239px;
    }
  }

  &__support-header {
    display: flex;
    margin-bottom: 24px;
    width: 100%;
    @media screen and (max-width: 992px) {
      margin-bottom: 12px;
    }
  }

  &__support-icon {
    @media screen and (max-width: 992px) {
      width: 17px;
    }
  }

  &__support-icon {
    @media screen and (max-width: 992px) {
      width: 17px;
    }
  }

  &__support-title {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 29px;
    letter-spacing: 0.03em;
    color: #828282;
    margin-left: 9px;
    @media screen and (max-width: 992px) {
      font-size: 16px;
      line-height: 19px;
    }
  }

  &__support-content {
    color: #000000;

    p {
      font-size: 16px;
      line-height: 19px;
    }

    @media screen and (max-width: 992px) {
      flex: 1;
    }
  }

  &__support-footer {
    color: #000000;
    margin-top: 25px;
    @media screen and (max-width: 992px) {
      flex: 1;
      margin-top: 0px;
    }

    @media screen and (max-width: 480px) {
      margin-top: 24px;
    }
  }

  &__empty {
    background: #ffffff;
    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
    height: 100%;
    padding: 26px 18px 48px 25px;
    box-sizing: border-box;
    width: 437px;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }

  &__empty-header {
    display: flex;
    align-items: center;
    margin-bottom: 22px;
  }

  &__empty-title {
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 29px;
    letter-spacing: 0.03em;
    color: #828282;
    margin-left: 9px;
    @media screen and (max-width: 992px) {
      font-size: 16px;
      line-height: 19px;
    }
  }

  &__empty-content {
    display: flex;
    flex-direction: column;
    color: #000000;
    padding-right: 100px;
    @media screen and (max-width: 992px) {
      padding-right: 0;
    }
    @media screen and (max-width: 480px) {
    }
  }

  &__status-desc {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.03em;
    margin-bottom: 14px;
    @media screen and (max-width: 992px) {
      padding-bottom: 40px;
    }
  }

  &__order-desc {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    @media screen and (max-width: 992px) {
      padding-right: 40%;
    }
    @media screen and (max-width: 480px) {
      padding-right: 0;
    }
  }

  &__empty-button {
    margin-top: 37px;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    width: 100%;
    text-decoration: none;
    max-width: 167px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 17px;
    padding-right: 17px;
    font-size: 12.7806px;
    line-height: 15px;
    @media screen and (max-width: 992px) {
      max-width: 160px;
      padding: 0;
      height: 25px;
    }
    @media screen and (max-width: 768px) {
      margin-top: 20px;
      max-width: 160px;
    }

    @media screen and (max-width: 992px) {
      max-width: 200px;
    }
  }
  &__empty-button-icon {
    margin-right: 16px;
    width: 11px;
  }
  &__content {
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    @media screen and (max-width: 992px) {
      display: block;
    }

    @media screen and (max-width: 480px) {
      display: block;
    }
  }

  &__whatsapp {
    margin-top: 10px;
    background: linear-gradient(#61c66d);
    color: #fff;
    max-width: 167px;
    padding: 8.5px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    &:hover {
      color: #ffffff;
      text-decoration: underline;
      background: linear-gradient(180deg, #31953d 0%, #61c66d 100%);
    }
    &:active {
      color: #ffffff;
      text-decoration: underline;
      background-color: #31953d;
    }
    @media screen and (max-width: 992px) {
      max-width: 200px;
    }
    @media screen and (max-width: 480px) {
      max-width: 200px;
    }
  }
  &__whatsapp-icon {
    margin-right: 3px;
    width: 17px;
    height: 17px;
  }
  &__schedule-title {
    font-size: 14px;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    margin-bottom: 3px;
  }

  &__schedule-item {
    font-size: 14px;
    line-height: 17px;
    margin-top: 5px;
    margin-bottom: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }

  & .order__footer {
    gap: 35px;

    @media screen and (max-width: 480px) {
      gap: 8.33vw;
    }
  }

  &__empty-icon {
    width: 25px;
    @media screen and (max-width: 992px) {
      width: 17px;
    }
  }
}

p {
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.03em;
  @media screen and (max-width: 992px) {
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
