<template>
  <div class="order">
    <div class="order__inner">
      <h1 class="order__header">Мои заказы</h1>
      <div class="order__box">
        <div>
          <div class="order__payment">
            <OrderPayment v-if="orderPayment" :paymentProps="paymentProps" />
          </div>
          <div class="order__card">
            <div class="order-item">
              <h2 class="order-item-title border-bottom">Описание</h2>
              <div class="order__description-list">
                <div class="order__description-col">
                  <div class="order__description-item">
                    <p class="order__description-title">Объем:</p>
                    <p class="order__description-description">
                      {{ orderOptions.volume || 'Не указан' }}
                    </p>
                  </div>
                  <div class="order__description-item">
                    <p class="order__description-title">Вес:</p>
                    <p class="order__description-description">
                      {{ orderOptions.weight || 'Не указан' }}
                    </p>
                  </div>
                </div>
                <div class="order__description-col">
                  <div class="order__description-item">
                    <p class="order__description-title">Упаковка:</p>
                    <p class="order__description-description">
                      {{ packageTypes || 'Не указано' }}
                    </p>
                  </div>
                  <div class="order__description-item">
                    <p class="order__description-title">Кол-во коробок:</p>
                    <p class="order__description-description">
                      {{ order['the_number_of_boxes'] || 'Не указано' }}
                    </p>
                  </div>
                </div>
                <div class="order__description-col">
                  <div class="order__description-item">
                    <p class="order__description-title">Задачи менеджеру:</p>
                    <p class="order__description-description">
                      {{ checking || 'Не указано' }}
                    </p>
                  </div>
                  <div class="order__description-item">
                    <p class="order__description-title">Транспорт:</p>
                    <p class="order__description-description">
                      {{ orderOptions.sendMethod || 'Не указано' }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="order__description-last-item border-bottom">
                <div class="order__description-item">
                  <p class="order__description-title">Адрес доставки:</p>
                  <p class="order__description-description">
                    {{ order['delivery_address'] }}
                  </p>
                </div>
              </div>
            </div>
            <div class="order-item border-bottom mb-4">
              <h2 class="order-item-title order-item-title-box">
                Данные по коробкам:
              </h2>
              <div class="order__box-list">
                <div
                  class="order__box-item"
                  v-for="(box, index) in this.orderOptions.boxes"
                  :key="box.id"
                >
                  <span>{{ index + 1 }}.</span>
                  Коробки: {{ box.count }}шт., {{ box.length || 0 }}см x
                  {{ box.width || 0 }}см x {{ box.height || 0 }}см ({{
                    getVolume(box.length, box.width, box.height)
                  }}м3), {{ box.weight || 0 }}кг [Всего:
                  {{
                    getTotalVolume(
                      box.count,
                      box.length,
                      box.width,
                      box.height
                    )
                  }}м3, {{ box.count * box.weight }}кг]
                </div>
              </div>
            </div>
            <div class="order-item"></div>
            <div class="order-item">
              <div
                class="order_composition-top-side d-flex justify-content-between"
              >
                <h2 class="order-item-title">Состав заказа</h2>
                <button
                  class="order__edit-btn"
                  @click="editOrder()"
                  v-if="!forEdit"
                >
                  Редактировать
                </button>
              </div>
              <div
                class="order_composition-bottom-side"
                style="overflow-x: auto"
              >
                <div class="order__table">
                  <div class="order__table-thead">
                    <div class="order__table-tr">
                      <div v-if="forEdit" class="order__table-th">Удалить</div>

                      <div
                        class="order__table-th"
                        v-for="item of tableThead"
                        :key="item.id"
                      >
                        {{ item.text }}
                      </div>
                    </div>
                  </div>

                  <div class="order__table-tbody">
                    <div
                      class="order__table-tr"
                      v-for="(item, index) in orderItems"
                      :key="index"
                    >
                      <div class="order__table-td order__table-td-title">
                        {{ orderTitle(index) }}
                      </div>
                      <div class="order__table-td">
                        <img :src="item.img" alt="" />
                      </div>
                      <div class="order__table-td">
                        {{ orderItemTitle(item) }}
                      </div>
                      <div class="order__table-td">
                        <template v-if="forEdit">
                          <input
                            style="max-width: 120px"
                            type="number"
                            v-model="itemCount"
                            @input="removeLeadingZero(itemCount)"
                          />
                        </template>

                        <template v-else>
                          {{ removeLeadingZero(item.modelCount) }}
                        </template>
                      </div>
                      <div class="order__table-td">{{ item.price }} ¥</div>
                      <div class="order__table-td">
                        {{ item.modelCount * item.price }}
                        ¥
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order__card">
          <h2 class="order-item-title">Статус заказа</h2>
          <div class="order__status-bar">
            <div
              class="order__status"
              v-for="(step, idx) of status"
              :key="step.id"
              :class="{
                active: step.text === order.status_product,
                last: step.id === status.length - 1,
                done:
                  idx <
                  status.findIndex(
                    (step) => step.text === order.status_product
                  ),
              }"
            >
              <div
                class="order__circle"
                :class="{
                  active: step.text === order.status_product,
                  last: step.id === status.length - 1,
                  done:
                    idx <
                    status.findIndex(
                      (step) => step.text === order.status_product
                    ),
                }"
              ></div>
              <div class="order__status-text">{{ step.text }}</div>
            </div>
          </div>
        </div>
        <div class="order__card">
          <div class="order__info">
            <div class="order__info_inner">
              <div class="order__info-header border-bottom">
                <div class="order__info-top">
                  <div>
                    <div class="order__info-title">Заказ:</div>
                    <div class="order__info-marking">
                      {{ order.marking }}
                    </div>
                  </div>
                  <div>
                    <div class="order__info-date">{{ daysDate }}</div>
                    <div class="order__info-time">{{ timesDate }}</div>
                  </div>
                </div>
                <div class="order__info-customer border-bottom">
                  <span>Заказчик:</span>
                  <div class="order__info-customer-info">
                    <span class="order-info-customer-name">
                      {{ order.name }}
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="order__info-status mr-5">
                    {{ order.status_product }}
                  </div>
                  <div class="order__info-customer-discount">
                    <span>{{ order.commission_percent }}%</span>
                  </div>
                </div>
              </div>
              <div class="order__info_body">
                <div class="order__info_list">
                  <div class="order__info-item">
                    <p class="order__info-item-title">Заказ:</p>
                    <div class="order__info-item-subparagraphs border-bottom">
                      <div
                        class="order__info-item-subparagraph order__info-item-flex"
                      >
                        <div>Сумма заказа:</div>

                        <div>{{ totalItemsSumCount }} p.</div>
                      </div>
                      <div
                        class="order__info-item-subparagraph order__info-item-flex"
                      >
                        Комиссия:
                        <span>{{ commissionSumCount }} p.</span>
                      </div>
                    </div>
                    <div
                      class="order__info-item-result order__info-item-flex border-bottom"
                    >
                      Итого по заказу:
                      <span>{{ totalOrderSumCount }} p.</span>
                    </div>
                  </div>
                  <div class="order__info-item">
                    <p class="order__info-item-title">
                      Доставка
                      <span class="order__info-item-description"
                        >(оплачивается отдельно)</span
                      >
                    </p>
                    <div class="order__info-item-subparagraphs border-bottom">
                      <div
                        class="order__info-item-subparagraph order__info-item-flex"
                      >
                        <div>Упаковка и погр. работы</div>

                        <div>{{ packagingPriceCount }} p.</div>
                      </div>

                      <div
                        class="order__info-item-subparagraph order__info-item-flex"
                      >
                        <div>Доставка до РФ</div>

                        <div>{{ deliveryPriceCount }} p.</div>
                      </div>

                      <div
                        class="order__info-item-subparagraph order__info-item-flex"
                      >
                        <div>Задания менеджеру</div>

                        <div>{{ managerJobCount }} p.</div>
                      </div>
                    </div>
                    <div
                      class="order__info-item-result order__info-item-flex border-bottom"
                    >
                      Итого по доставке (примерно):
                      <span
                        >{{
                          orderOptions.sendAndPackagePrice +
                          orderOptions.deliveryPrice +
                          Math.round(orderOptions.additionalPrice)
                        }}
                        p.</span
                      >
                    </div>
                    <div class="order__info-item-total order__info-item-flex">
                      ИТОГО:
                      <span>{{ totalSumCount }} p.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="order__info_footer d-none">
                <div class="order__info-prompt">
                  Внимание!! Указана предварительная стоимость доставки груза по
                  маршруту Китай-Москва, исходя из заданных характеристик.
                  Фактическая стоимость доставки может отличаться. За
                  предварительным расчётом можете обратиться к нашим менеджерам.
                  Не является публичной офертой
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { isEqual } from 'lodash';
import OrderPayment from '@/components/Order/OrderPayment/OrderPayment.vue';

const MINIMUM_ORDER_PRICE = 50000;

export default {
  name: 'OrderPageId',

  components: {
    OrderPayment,
  },
  data() {
    return {
      paymentProps: {
        product: 'active1',
        delivery: 'active1',
        productSum: 6893324,
        deliverySum: 293324,
      },
      order: {},
      forEdit: false,
      orderOptions: {},
      status: [
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
      tableThead: [
        {
          id: 1,
          text: 'Название',
        },
        {
          id: 2,
          text: 'Изображение',
        },
        {
          id: 3,
          text: 'Модель',
        },
        {
          id: 4,
          text: 'Количество',
        },
        {
          id: 5,
          text: 'Цена',
        },
        {
          id: 6,
          text: 'Итог',
        },
      ],
      toggleValue: false,
      orderItems: [],
      totalItemsSum: null || 0,
      commissionSum: null,
      orderTotalSumCount: null,
    };
  },

  async mounted() {
    this.loadOrderInfo();
    this.removeLeadingZero();
    this.getSettings();
  },

  methods: {
    openTable() {
      window.open(this.order.spreadsheet_url, '_blank').focus();
    },

    async getSettings() {
      //  получение установочных данных для пользователя от сервера
      await this.$http.get(`/settings`).then((response) => {
        this.settings = response.data.data.settings;

        this.$store.commit(
          'parsing/SET_DEFAULT_PACKAGE_METHODS',
          this.settings.packages.filter((item) => !item.option)
        );
        this.$store.commit(
          'parsing/SET_ADDITIONAL_PACKAGE_METHODS',
          this.settings.packages.filter((item) => item.option)
        );
      });
    },

    async loadOrderInfo() {
      await this.$http
        .get(`/orders/${this.$route.params.id}`, {
          params: {
            client_id: store.getters['auth/userName'],
          },
        })
        .then((response) => {
          this.order = response.data.data.order;

          this.orderOptions = response.data.data.order.options;

          for (let item of this.orderOptions.orderItems) {
            if (item.items) {
              this.orderItems = [...this.orderItems, ...item.items];
            } else {
              this.orderItems = [...this.orderItems, item];
            }
          }
        });
    },

    editOrder() {
      this.$store.commit('editableOrder/SET_USING_EDITABLE_ORDER', true);

      this.$store.commit('editableOrder/SET_EDITABLE_ORDER_IS_USED', true);

      this.$store.commit(
        'editableOrder/SET_ACTIVE_EDITABLE_ORDER',
        this.orderOptions
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_PACKAGE_METHOD',
        this.orderOptions.package
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_ADDRESS',
        this.order.delivery_address
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_TITLE',
        this.order.marking
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_IMAGE_NAME',
        this.order.file
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_IMAGE_URL',
        this.order.file_url
      );

      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_COMMENT',
        this.order.comment
      );

      this.$store.commit('editableOrder/SET_EDITABLE_ORDER_ID', this.order.id);
      this.$store.commit(
        'editableOrder/SET_EDITABLE_ORDER_AMO_ID',
        this.order.id_amo
      );
      this.$router.push({ path: '/new_order' });
    },

    removeItem(index) {
      this.orderOptions.orderItems.splice(
        this.orderOptions.orderItems.indexOf(index),
        1
      );
      this.orderItems.splice(this.orderItems.indexOf(index), 1);
    },

    getVolume(l, w, h) {
      return ((l * w * h) / 1_000_000).toFixed(2);
    },

    getTotalVolume(count, l, w, h) {
      return ((count * (l * w * h)) / 1_000_000).toFixed(2);
    },

    removeLeadingZero(str) {
      return Number(str).toString();
    },

    orderItemTitle(item) {
      const model = item.model ?? item.model_title;
      const option = item.option ?? item.option_title;

      if (model.includes(option)) {
        return model;
      }

      if (option.includes(model)) {
        return model;
      }

      if (model && option) {
        return `${model} (${option})`;
      }

      return '';
    },

    orderTitle(idx) {
      return this.orderOptions.orderItems[idx]?.title || '';
    },
  },

  computed: {
    orderPayment() {
      return true;
    },
    daysDate() {
      const date = new Date(this.order.created_at);
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1; // Months start at 0!
      let dd = date.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '.' + mm + '.' + yyyy;

      return formattedToday;
    },

    timesDate() {
      const date = new Date(this.order.created_at);

      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      if (h < 10) h = '0' + h;
      if (m < 10) m = '0' + m;
      if (s < 10) s = '0' + s;

      let res = h + ':' + m + ':' + s;

      return res;
    },

    checking() {
      let res = [];
      let title = '';
      if (this.orderOptions.checking) {
        this.orderOptions.checking.forEach((item) => {
          if (item.is_active) {
            res.push(item.title);
          }
        });
      }

      return `${res.join(', ')}.`;
    },

    packageTypes() {
      if (this.orderOptions.package) {
        const packageTypes = this.$store.getters[
          'parsing/defaultPackageMethods'
        ].concat(this.$store.getters['parsing/additionalPackageMethods']);
        const packageTypeTitle = packageTypes.filter((type) => {
          if (type.id === this.orderOptions.package_id) {
            return type;
          }
        })[0].title;
        return packageTypeTitle;
      }
    },

    boxesCount() {
      return this.order['the_number_of_boxes'];
    },

    itemSumCount() {
      for (let orderItem of this.orderItems) {
        orderItem.sum = orderItem.modelCount * orderItem.price;
      }
      this.orderOptions.orderItems = this.orderItems;
    },

    totalItemsSumCount() {
      this.totalItemsSum = 0;

      if (!this.orderItems.length) return 0;
      for (let orderItem of this.orderItems) {
        let commissionCount = orderItem.course ? orderItem.course : 10;
        this.totalItemsSum += orderItem.sum * commissionCount;
      }
      return Math.round(this.totalItemsSum);
    },

    commissionSumCount() {
      let commissionCount = this.order.commission_percent
        ? this.order.commission_percent
        : 10;
      this.commissionSum = this.totalItemsSum / commissionCount;
      return Math.round(this.commissionSum);
    },

    totalOrderSumCount() {
      this.orderTotalSumCount = this.totalItemsSum + this.commissionSum;
      return Math.round(this.orderTotalSumCount);
    },

    itemCount: {
      get() {
        return this.orderItems.map((item, idx) => {
          return item.modelCount;
        });
      },
      set(newValue) {
        const removeLeadingZero = Number(newValue).toString();
        this.orderItems.forEach((item, idx) => {
          item.modelCount = removeLeadingZero;
        });
      },
    },

    packagingPriceCount() {
      return this.orderOptions.sendAndPackagePrice || 0;
    },

    deliveryPriceCount() {
      return this.orderOptions.deliveryPrice || 0;
    },

    managerJobCount() {
      return Math.round(this.orderOptions.additionalPrice) || 0;
    },

    deliveryApproximateCount() {
      return (
        this.orderOptions.sendAndPackagePrice +
          this.orderOptions.deliveryPrice +
          Math.round(this.orderOptions.additionalPrice) || 0
      );
    },

    totalSumCount() {
      return this.orderOptions.totalPrice || this.totalOrderSumCount;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-i__delete svg,
order-i__arrow svg {
  width: 24px;
  height: 24px;
  cursor: pointer;
  @media screen and (max-width: 480px) {
    width: 5vw;
    height: 5vw;
  }
}

.order {
  color: #212529 !important;
  & > h2 {
    font-size: 24px;
    font-weight: 600;
    color: #212529;
    margin-bottom: 40px;
  }

  &__inner {
    margin-top: 46px;
    padding: 0 12px 20px 30px;
  }

  &__header {
    font-size: 24px;
    line-height: 29px;
    color: #292824;
    margin-bottom: 25px;
  }
  &__box {
    display: grid;
    grid-template-columns: 1fr fit-content(30%) 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 24px;
    grid-row-gap: 0px;
  }

  &__card {
    background-color: #ffffff;
    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
    padding: 32px 32px 45px 24px;
    height: fit-content;
  }
  &__description {
    &-list {
      margin-top: 24px;
      display: grid;
      grid-template-columns: fit-content(200px) 1fr fit-content(200px);
      grid-column-gap: 60px;
      grid-row-gap: 24px;
    }

    &-col {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    &-last-item {
      padding: 24px 0;
    }

    &-title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 4px;
    }
    &-description {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 0;
    }
  }
  &-item {
    &-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 24px;
      &-box {
        margin-top: 24px;
      }
    }
  }
  &__box {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media screen and (max-width: 480px) {
        gap: 4.17vw;
      }
    }
    &-item {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 0;
      border: 2px solid #e5e7eb;
      padding: 15px;
      border-radius: 15px;
      transition: all 0.2s ease-in;
      margin-bottom: 16px;
      &:hover {
        border-color: #212529;
        transition: all 0.2s ease-in;
      }
      & span {
        font-weight: 600;
      }
    }
  }
  &__edit-btn {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-decoration: underline;
    padding: 5px 19px;
    border: none;
    outline: none;
    background: #d9dce2;
    border-radius: 3px;
    transition: all 0.2s ease-in;
    margin-bottom: 40px;

    @media screen and (max-width: 480px) {
      font-size: 0.625rem;
      padding: 0.5rem 1.25rem;
      border-radius: 3.13vw;
      margin-bottom: 8.33vw;
    }

    &:hover {
      background-color: #bcc0c5;
      transition: all 0.2s ease-in;
    }
  }
  &__info {
    &-header {
      padding-bottom: 16px;

      @media screen and (max-width: 1200px) {
        padding: 20px;
      }
      @media screen and (max-width: 480px) {
        padding: 4.17vw;
      }
    }
    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &-status {
      text-decoration: underline;
      padding: 3px 10px;
      border-radius: 15px;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#f5dd6d),
        to(#ffcd4d)
      );
      background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
      -webkit-box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
    }
    &-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      margin-bottom: 4px;
    }
    &-marking {
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
    }
    &-date {
      text-align: right;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 4px;
    }
    &-time {
      text-align: right;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }
    &-customer {
      padding-bottom: 16px;
      margin-bottom: 16px;
      color: #292824;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;

      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
        gap: 2.08vw;
      }

      &-info {
        display: flex;
        align-items: center;
        gap: 5px;

        @media screen and (max-width: 480px) {
          font-size: 2.92vw;
          gap: 1.04vw;
        }
      }
      &-name {
        font-weight: 700;
        text-decoration: underline;
      }

      &-avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;

        @media screen and (max-width: 480px) {
          width: 4.17vw;
          height: 4.17vw;
        }
      }

      &-discount {
        text-decoration: underline;
        height: fit-content;
        padding: 3px 10px;
        border-radius: 15px;
        background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
        box-shadow: 0 7px 14px rgb(50 50 93 / 10%), 0 3px 6px rgb(0 0 0 / 8%);

        @media screen and (max-width: 480px) {
          font-size: 2.92vw;
          padding: 0.63vw 2.08vw;
          border-radius: 3.13vw;
          margin-bottom: 3.13vw;
        }
      }
    }
    &__body {
      padding: 40px 40px 0 40px;

      @media screen and (max-width: 1200px) {
        padding: 20px 20px 0 20px;
      }

      @media screen and (max-width: 480px) {
        padding: 4.17vw 4.17vw 0 4.17vw;
      }
    }
    &__courses {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;

      @media screen and (max-width: 480px) {
        gap: 4.17vw;
      }
      &-left-side {
        display: flex;
        gap: 10px;

        @media screen and (max-width: 480px) {
          gap: 2.08vw;
        }
      }
      &-right-side {
        display: flex;
        align-items: center;
        gap: 15px;

        @media screen and (max-width: 480px) {
          gap: 3.13vw;
        }
        & span {
          @media screen and (max-width: 480px) {
            font-size: 2.92vw;
          }
        }
        & .toggle {
          width: 50px;
          height: 26px;
          background-color: #e5e7eb;
          border-radius: 15px;
          display: flex;
          align-items: center;
          padding: 0 2px;
          position: relative;
          transition: all 0.3s ease-in;
          border: 2px solid #e5e7eb;

          @media screen and (max-width: 480px) {
            width: 10.42vw;
            height: 5.42vw;
            border-radius: 3.13vw;
            padding: 0 0.42vw;
          }

          & div {
            width: 22px;
            height: 20px;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;

            @media screen and (max-width: 480px) {
              width: 4.58vw;
              height: 4.17vw;
            }
          }

          &.active {
            background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
            transition: all 0.3s ease-in;
            border-color: linear-gradient(180deg, #f5dd6d, #ffcd4d);

            & div {
              background-color: #fff;
              right: 0;
            }
          }
        }
      }
    }
    &__course {
      color: #e5e7eb;
      font-weight: 800;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 13px;

      &-pink {
        background-color: #b8185a;
      }
      &-green {
        background-color: #99dd2b;
        color: #212529;
      }
    }
    &-item {
      &-title {
        margin: 16px 0;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
      }
      &-description {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
      }
      &-subparagraphs {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
      }
      &-subparagraph {
        padding-bottom: 12px;
      }
      &-result {
        padding: 16px 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
      }
      &-total {
        margin-top: 16px;
        padding: 15px 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        border: 1px solid #fbd55d;
        border-radius: 5px;
      }
      &-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    &-prompt {
      margin-top: 16px;
      color: #c91c1c;
      font-size: 14px;
      font-weight: 600;

      display: flex;
      flex-direction: column;

      button {
        margin-top: 12px;
        background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
        color: black;
      }

      @media screen and (max-width: 1200px) {
        padding: 20px;
      }

      @media screen and (max-width: 480px) {
        padding: 4.17vw;
        font-size: 2.92vw;
      }
    }
  }
  &__table {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 20px;

    @media screen and (max-width: 480px) {
      padding-bottom: 4.71vw;
    }

    &-thead {
      margin-bottom: 20px;

      @media screen and (max-width: 480px) {
        margin-bottom: 4.71vw;
      }
    }
    &-tr {
      display: flex;
      gap: 20px;
      width: max-content;

      @media screen and (max-width: 480px) {
        gap: 6.25vw;
      }

      &:not(:last-child) {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e5e7eb;

        @media screen and (max-width: 480px) {
          margin-bottom: 6.25vw;
          padding-bottom: 4.17vw;
        }
      }
    }
    &-th {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
      }
    }
    &-td {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      word-break: break-all;
      & img {
        width: 100%;
        height: auto;
        border-radius: 15px;

        @media screen and (max-width: 480px) {
          border-radius: 3.13vw;
        }
      }
    }
    &-tbody {
    }
    &-th,
    &-td {
      &:first-child {
        width: 72px;
      }
      &:nth-child(2) {
        width: 102px;
      }
      &:nth-child(3) {
        width: 72px;
      }
      &:nth-child(4) {
        text-align: center;
        width: 81px;
      }
      &:nth-child(5) {
        text-align: center;
        width: 40px;
      }
      &:nth-child(5) {
        text-align: center;
        width: 40px;
      }
      &-title {
        max-width: 72px;
      }
      & img {
        max-width: 94px;
      }
    }
    &-tr {
      width: 100%;
    }
    &:last-child {
      width: max-content;
    }
  }
  &__status-text {
    font-size: 14px;
    margin-left: 14px;
  }

  &__circle {
    min-width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #d9dce2;
    background-color: #d9dce2;
    position: relative;
    @media screen and (max-width: 992px) {
      width: 20px;
      height: 20px;
    }

    @media screen and (max-width: 480px) {
      width: 20px;
      height: 20px;
    }

    &.done {
      background-color: #f5dd6d;
      border: 2px solid #f5dd6d;
      min-width: 20px;
      max-width: 20px;
      height: 20px;
    }
    &.done::after {
      content: url('../../assets/img/icons/check.svg');
      color: #000;
      display: flex;
      margin: -4px 4px;
      @media screen and (max-width: 992px) {
        margin: -4px 4px;
      }

      @media screen and (max-width: 480px) {
        margin: -4px 4px;
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
    &.last.active {
      background-color: #f5dd6d;
      min-width: 20px;
      max-width: 20px;
      height: 20px;
    }
    &.last.active::after {
      content: url('../../assets/img/icons/check.svg');
      color: #000;
      display: flex;
      margin: -4px 4px;
      @media screen and (max-width: 992px) {
        margin: -4px 4px;
      }

      @media screen and (max-width: 480px) {
        margin: -4px 4px;
      }
    }
    &.active {
      border: 2px solid #f5dd6d;
      background-color: #f5dd6d;
      min-width: 20px;
      max-width: 20px;
      height: 20px;
    }
    &.active:after {
      content: url('../../assets/img/icons/check.svg');
      color: #000;
      display: flex;
      margin: -4px 4px;
      @media screen and (max-width: 992px) {
        margin: -4px 4px;
      }

      @media screen and (max-width: 480px) {
        margin: -4px 4px;
      }
    }
  }

  &__status {
    position: relative;
    display: flex;
    &::before {
      content: '';
      background-color: #d9dce2;
      left: 8px;
      height: calc(100% + 22px);
      display: block;
      width: 2px;
      position: absolute;
      top: 24px;

      @media screen and (max-width: 992px) {
        width: 40px;
        top: 9px;
        left: 22px;
      }
    }
    &.done::before {
      border: 2px dashed #f5dd6d;
      background-color: #fff;
    }
    &.active::before {
      border: 2px dashed #f5dd6d;
      background-color: #fff;
    }
    &.last::before {
      width: 0px !important;
      height: 0px !important;
      border: 0px;
    }
  }
  &__status-bar {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 44px;
    @media screen and (max-width: 992px) {
      gap: 40px;
    }

    @media screen and (max-width: 480px) {
      display: none;
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
          margin: 5px 6px;
        }
      }
    }
  }
}
.border-bottom {
  border-bottom: 1px solid #d9dce2 !important;
}
</style>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
