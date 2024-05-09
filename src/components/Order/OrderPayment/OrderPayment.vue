<template>
  <div class="payment-product">
    <h2 class="payment-product__title">Оплаты</h2>
    <ul class="payment-product__list">
      <li
        :class="`payment-product__item payment-product__item-${paymentProps.product}`"
      >
        <div class="payment-product__wrapper box-left">
          <div class="box-left__circle">
            <img
              :class="`box-left__img box-left__img-box box-left__img-box-${paymentProps.product}`"
              src="@/assets/img/order/box.png"
            />
          </div>
          <p class="box-left__text">оплата товара</p>
        </div>
        <div class="payment-product__wrapper-text box-right">
          <p class="box-right__title">{{ titleText.product }}</p>
          <p class="box-right__text">
            {{ mainText.product }}
          </p>
          <img
            v-if="paymentProps.product === 'success'"
            class="box-right__success"
            src="@/assets/img/icons/successOrder.svg"
          />
          <div
            class="box-right__action"
            v-if="paymentProps.product === 'active'"
          >
            <p class="box-right__summ">
              {{ formatNumber(paymentProps.productSum) }}
            </p>
            <button
              @click="handleClickIndividual('product')"
              class="box-right__btn box-right__btn-first"
            >
              Оплатить как Физ Лицо
            </button>
            <button
              @click="handleClickCompany('product')"
              class="box-right__btn box-right__btn-second"
            >
              Оплатить как Юр Лицо
            </button>
          </div>
        </div>
      </li>
      <li
        :class="`payment-product__item payment-product__item-${paymentProps.delivery}`"
      >
        <div class="payment-product__wrapper box-left">
          <div class="box-left__circle">
            <img
              :class="`box-left__img box-left__img-truck box-left__img-truck-${paymentProps.delivery}`"
              src="@/assets/img/order/truck.png"
            />
          </div>
          <p class="box-left__text">оплата доставки</p>
        </div>
        <div class="payment-product__wrapper-text box-right">
          <p class="box-right__title">{{ titleText.delivery }}</p>
          <p class="box-right__text">
            {{ mainText.delivery }}
          </p>
          <img
            v-if="paymentProps.delivery === 'success'"
            class="box-right__success"
            src="@/assets/img/icons/successOrder.svg"
          />
          <div
            class="box-right__action"
            v-if="paymentProps.delivery === 'active'"
          >
            <p class="box-right__summ">
              {{ formatNumber(paymentProps.deliverySum) }}
            </p>
            <button
              @click="handleClickIndividual('delivery')"
              class="box-right__btn box-right__btn-first"
            >
              Оплатить как Физ Лицо
            </button>
            <button
              @click="handleClickCompany('delivery')"
              class="box-right__btn box-right__btn-second"
            >
              Оплатить как Юр Лицо
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    paymentProps: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    titleText() {
      const dictionaryProduct = {
        active: 'сумма товара подтверждена и сформирована:',
        success: 'товар оплачен:',
      };
      const dictionaryDelivery = {
        active: 'сумма доставки подтверждена и сформирована:',
        success: 'доставка оплачена:',
      };
      return {
        product:
          dictionaryProduct[this.paymentProps.product] ||
          'точная сумма товара не определена',
        delivery:
          dictionaryDelivery[this.paymentProps.delivery] ||
          'сумма доставки не определена',
      };
    },
    mainText() {
      const dictionaryProduct = {
        active:
          'Для продолжения работы, вам необходимо оплатить товар, сумма для оплаты: ',
        success: 'Вы оплатили товар, продолжаем работу над заказом',
      };
      const dictionaryDelivery = {
        active:
          'Для продолжения работы, вам необходимо оплатить доставку, сумма для оплаты: ',
        success: 'Вы оплатили доставку, продолжаем работу над заказом',
      };

      return {
        product:
          dictionaryProduct[this.paymentProps.product] ||
          'Цена товара и возможность оплаты появиться при точном расчете товара менеджером',
        delivery:
          dictionaryDelivery[this.paymentProps.delivery] ||
          'Цена доставки и возможность оплаты появиться при поступлении вашего груза к нам на склад',
      };
    },
  },
  methods: {
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
    },
    handleClickIndividual(choose) {
      if (choose === 'product') {
        console.log('IndividualClick-product');
      }

      if (choose === 'delivery') {
        console.log('IndividualClick-delivery');
      }
    },
    handleClickCompany(choose) {
      if (choose === 'product') {
        console.log('CompanyClick-product');
      }

      if (choose === 'delivery') {
        console.log('CompanyClick-delivery');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.payment-product {
  padding: 31px 32px 36px 28px;
  margin-bottom: 46px;
  background-color: #fff;
  &__title {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 24px;
  }
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__item {
    display: flex;
    border-radius: 4px;
    border: 1px dashed #bababa;
    color: #bdbdbd;

    &-active,
    &-success {
      color: #030303;
    }

    &:first-child {
      margin-bottom: 18px;
    }
  }
}
.box-left {
  padding: 15px 20px 13px 17px;
  border-right: 1px dashed #bababa;

  &__text {
    margin-top: 5px;

    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    text-align: center;
  }

  &__circle {
    display: flex;
    border: 1px solid #bababa;
    border-radius: 50%;
    width: 59px;
    height: 59px;
    justify-content: center;
    align-items: center;
  }

  &__img {
    &-truck {
      width: 28px;
      height: 28px;
      filter: grayscale(100%);

      &-active,
      &-success {
        filter: none;
      }
    }
    &-box {
      width: 32px;
      height: 32px;
      filter: grayscale(100%);

      &-active,
      &-success {
        filter: none;
      }
    }
  }
}
.box-right {
  padding: 24px 96.64px 25px 34px;
  position: relative;

  &__title {
    margin-bottom: 4px;

    font-size: 12px;
    font-weight: 300;
    line-height: 14px;
  }

  &__text {
    margin: 0;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }

  &__action {
    display: flex;
    flex-direction: column;
  }

  &__summ {
    margin: 0;
    margin-top: 14px;
    margin-bottom: 16px;

    font-size: 23px;
    font-weight: 700;
    line-height: 28px;
    color: #000;
  }

  &__success {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(-10%, -50%);
  }

  &__btn {
    border: none;
    width: fit-content;

    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    border-radius: 2.5px;
    background: linear-gradient(180deg, #f7db69, #ffcf4f);

    &-first {
      padding: 4.5px 12px;
      margin-bottom: 7.5px;
    }

    &-second {
      padding: 4.5px 14.5px;
    }

    &:hover {
      background: linear-gradient(180deg, #dac66a 0%, #ffcd4d 100%);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
