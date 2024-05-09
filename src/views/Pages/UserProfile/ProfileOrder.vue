<template>
  <div class="order bg-white">
    <div class="order__header">
      <div class="order__header-info">
        <div class="order__code">
          {{ order.marking }}
        </div>
        <div class="order__date">оформлен: {{ orderDate }}</div>
      </div>
      <div class="order__status">
        <div class="order__status-block">
          <div class="order__small-circle"></div>
          <div>
            <div class="order__status-mobile-title">текущий статус</div>
            <div class="order__status-title">{{ order.status_product }}</div>
          </div>
        </div>
        <p class="order__status-description">статус заказа</p>
      </div>
    </div>

    <div class="order__status-bar">
      <div
        class="order__status"
        v-for="(step, idx) of statusSteps"
        :key="step.id"
      >
        <div
          class="order__circle"
          :class="{
            active: step.text === order.status_product,
            last: step.id === statusSteps.length - 1,
            done:
              idx <
              statusSteps.findIndex(
                (item) => item.text === order.status_product
              ),
          }"
        ></div>
      </div>
    </div>
    <div class="order__footer">
      <button
        class="order__button btn base-button text-dark"
        @click="$router.push(`/order/${order.id}`)"
      >
        Подробнее о заказе
      </button>
      <div class="order__trouble">
        <img
          class="order__help-icon"
          src="../../../assets/img/icons/help-outline.svg"
        />
        <a
          href="https://t.me/FLG_group_bot"
          target="_blank"
          class="order__help-link"
          >Проблема с заказом</a
        >
      </div>
    </div>
    <div v-if="isDev" class="orders-btn__container">
      <button
        @click="$emit('removeOrder', order.id)"
        class="order__button order-btn__delete text-dark btn base-button btn-warning"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileOrder',
  props: {
    order: {
      type: Object,
    },
  },
  data() {
    return {
      isDev: false,
      statusSteps: [
        {
          id: 0,
          text: 'Проверка заказа',
        },
        {
          id: 1,
          text: 'Ожидает оплаты',
        },
        {
          id: 2,
          text: 'Выкуп товара',
        },
        {
          id: 3,
          text: 'Поступил на склад в Китае',
        },
        {
          id: 4,
          text: 'Движется на таможню',
        },
        {
          id: 5,
          text: 'Проверка на таможне',
        },
        {
          id: 6,
          text: 'Движется в сторону Москвы',
        },
        {
          id: 7,
          text: 'Прибыл в Москву',
        },
        {
          id: 8,
          text: 'Доставлено',
        },
      ],
    };
  },

  computed: {
    orderDate() {
      const date = new Date(this.order.created_at);
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '.' + mm + '.' + yyyy;

      return formattedToday;
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-btn__container {
  display: flex;
  flex-direction: column-reverse;

  .order-btn__delete {
    margin: 0;
  }

  button:first-child {
    margin-bottom: 8px;
  }
}

.order {
  height: 233px;
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.03);
  padding: 32px 24px 30px 24px;
  border-radius: 5px;
  @media screen and (max-width: 992px) {
    padding: 24px 20px;
  }
  @media screen and (max-width: 480px) {
    height: 100%;
    width: 100%;
  }

  &__date {
    margin-bottom: 0px;
    font-size: 14px;
    margin-top: 4px;
    font-size: 10px;
    line-height: 17px;
    letter-spacing: 0.03em;
    color: #797979;
    @media screen and (max-width: 992px) {
      margin-top: 0px;
      margin-bottom: 10px;
    }

    @media screen and (max-width: 480px) {
      font-size: 12px;
      margin-bottom: 20px;
      margin-top: 4px;
    }
  }

  &__button {
    margin-right: 0px;
    margin-top: 0px;
    text-align: center;
    font-size: 14px;
    width: 177px;
    height: 37px;
    text-decoration: underline;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    padding: 0;
  }

  &__circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #d9dce2;
    position: relative;
    @media screen and (max-width: 992px) {
      width: 16px;
      height: 16px;
    }

    @media screen and (max-width: 480px) {
      width: 16px;
      height: 16px;
    }

    &::before {
      content: '';
      background-color: #d9dce2;
      width: 51px;
      left: 14px;
      display: block;
      height: 2px;
      position: absolute;
      top: 40%;

      @media screen and (max-width: 992px) {
        width: 40px;
        top: 40%;
        left: 12px;
      }
    }

    &.active {
      border: 2px solid #f5dd6d;
    }

    &.active::before {
      background-color: #d9dce2;
    }

    &.done {
      background-color: #f5dd6d;
      border: 2px solid #f5dd6d;
    }
    &.done::after {
      content: url('../../../assets/img/icons/check.svg');
      color: #000;
      display: flex;
      margin: -6px 2px;
      @media screen and (max-width: 992px) {
        margin: -6px 2px;
      }

      @media screen and (max-width: 480px) {
        margin: -6px 2px;
      }
    }
    &.done::before {
      border: 2px dashed #f5dd6d;
      background-color: #fff;
    }
    &.last::before {
      width: 0px !important;
      height: 0px !important;
      border: 0px;
    }
    &.active.last {
      background-color: #f5dd6d;
    }
    &.active.last:after {
      content: url('../../../assets/img/icons/check.svg');
      color: #000;
      display: flex;
      margin: -6px 2px;
      @media screen and (max-width: 992px) {
        margin: -6px 2px;
      }

      @media screen and (max-width: 480px) {
        margin: -6px 2px;
      }
    }
  }

  &__code {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.03em;
    font-weight: 400;
    color: #000;
    @media screen and (max-width: 992px) {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 17px;
    }

    @media screen and (max-width: 480px) {
      font-size: 14px;
    }
  }

  &__status-bar {
    display: flex;
    justify-content: flex-start;
    justify-content: space-between;
    gap: 37px;
    margin: 20px 0 50px 0;

    @media screen and (max-width: 992px) {
      gap: 37px;
    }

    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > button {
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    }
    @media screen and (max-width: 992px) {
      flex-direction: row;
    }

    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  &__button {
    @media screen and (max-width: 480px) {
      font-size: 0.625rem;
      padding: 0.5rem 1.25rem;
    }
    &.btn-secondary {
      order: 2;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 480px) {
      display: block;
    }
  }

  &__status {
    @media screen and (max-width: 480px) {
      border: 1px solid #e7e9ec;
      border-radius: 3px;
      padding: 10px 16px;
    }
  }

  &__small-circle {
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    width: 7px;
    height: 7px;
    border-radius: 25px;
    @media screen and (max-width: 480px) {
      width: 20px;
      height: 20px;
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
      &::after {
        content: url('../../../assets/img/icons/check.svg');
        color: #000;
        display: flex;
        margin: 2px 10px;

        @media screen and (max-width: 480px) {
          margin: 0 6px;
        }
      }
    }
  }

  &__status-block {
    display: flex;
    align-items: center;
  }

  &__status-mobile-title {
    color: #000000;
    margin-left: 8px;
    font-size: 8px;
    display: none;
    @media screen and (max-width: 480px) {
      display: block;
    }
  }
  &__status-title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    color: #000;
    margin-left: 8px;
    @media screen and (max-width: 992px) {
      font-size: 14px;
    }

    @media screen and (max-width: 480px) {
      font-size: 10px;
      line-height: 12px;
    }
  }

  &__status-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
    color: #797979;
    margin-top: 4px;
    margin-bottom: 0px;
    text-align: right;
    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  &__trouble {
    display: flex;
  }

  &__help-icon {
    margin-right: 5px;
    width: 11px;
  }

  &__help-link {
    color: #292824;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.03em;
  }
}
</style>
