<template>
  <div class="order-i">
    <div class="order-i__inner" @click="openOrder">
      <div class="order-i__header">
        <div class="order-i__header__left">
          <div class="order-i__delete" @click="$emit('deleteItem', order.url)">
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.81714 6.225L6 7.99167L4.17429 6.225L2.96571 7.4L4.79143 9.16667L2.97429 10.9333L4.18286 12.1083L6 10.3417L7.81714 12.1083L9.02571 10.9333L7.20857 9.16667L9.02571 7.4L7.81714 6.225ZM9 0.833333L8.14286 0H3.85714L3 0.833333H0V2.5H12V0.833333H9ZM0.857143 13.3333C0.857143 14.25 1.62857 15 2.57143 15H9.42857C10.3714 15 11.1429 14.25 11.1429 13.3333V3.33333H0.857143V13.3333ZM2.57143 5H9.42857V13.3333H2.57143V5Z"
                fill="#8C8B8A"
              />
            </svg>
          </div>
          <img
            :src="order.image"
            v-if="order.image"
            class="order-i__img"
            :alt="order.title"
          />
          <div v-else class="order-i__img">&nbsp;</div>
          <a :href="order.url" class="order-i__name" target="_blank">
            <svg
              class="order-i__name__symbol"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.82967 8.68888H1.17933V1.5407H5.0045V0.519531H1.17933C0.572769 0.519531 0.0864258 0.979057 0.0864258 1.5407V8.68888C0.0864258 9.25052 0.572769 9.71005 1.17933 9.71005H8.82967C9.43077 9.71005 9.92258 9.25052 9.92258 8.68888V5.11479H8.82967V8.68888ZM6.09741 0.519531V1.5407H8.05917L2.68754 6.55974L3.45804 7.27967L8.82967 2.26062V4.09362H9.92258V0.519531H6.09741Z"
                fill="black"
              />
            </svg>
            <div class="order-i__name__text">
              {{ order.title }}
            </div>
          </a>
        </div>
        <div class="order-i__arrow" :class="{ active: openOrderBoolean }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            class="mx-2 w-6 text-gray-500 hover:text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      class="order-i__list"
      :class="{ 'order-list__hidden': openOrderBoolean }"
    >
      <template v-if="order.skus.models && order.skus.options">
        <template v-for="model in order.skus.models">
          <OrderItemModel
            v-for="(item, idx) in order.skus.options"
            :key="`${model.id}_${item.id}`"
            @changeCount="changeCount"
            :skus-data="order.skus_data"
            :selected="order.selected"
            :price="orderPrice"
            :model="model"
            :option="item"
            :url="order.url"
            :title="order.title"
            :courses="courses"
          />
        </template>
      </template>
      <template v-if="order.skus.models && !order.skus.options">
        <OrderItemModel
          v-for="(item, idx) in order.skus.models"
          @changeCount="changeCount"
          :key="item.id"
          :skus-data="order.skus_data"
          :price="orderPrice"
          :selected="order.selected"
          :model="item"
          :url="order.url"
          :title="order.title"
          :courses="courses"
        />
      </template>
      <template v-if="!order.skus.models && order.skus.options">
        <OrderItemModel
          v-for="(item, idx) in order.skus.options"
          @changeCount="changeCount"
          :key="item.id"
          :skus-data="order.skus_data"
          :price="orderPrice"
          :selected="order.selected"
          :option="item"
          :url="order.url"
          :title="order.title"
          :image="order.image"
          :courses="courses"
        />
      </template>
    </div>
  </div>
</template>

<script>
import OrderItemModel from '@/components/Order/OrderItemModel.vue';

export default {
  name: 'OrderItem',

  props: {
    order: {
      type: Object,
      required: true,
    },
    courses: {
      type: Object,
      required: true,
    },
    deleteOrderItem: {
      type: Function,
    },
    idItem: {
      type: Number,
    },
  },

  components: {
    OrderItemModel,
  },

  data() {
    return {
      openOrderBoolean: false,
      inputs: [],
      count: 0,
      itemCount: {},
    };
  },

  computed: {
    orderPrice() {
      if (this.order.price.includes('-')) {
        return this.order.price
          .slice(1, this.order.price.indexOf('-'))
          .replace(/[^0-9\.]/g, '');
      } else {
        return this.order.price.replace(/[^0-9\.]/g, '');
      }
    },
  },

  methods: {
    changeCount(val) {
      this.inputs = [...this.inputs, val];
      let filteredArray = [];
      this.inputs.forEach((obj) => {
        let index = filteredArray.findIndex((elem) => elem.id === obj.id);
        if (index === -1) {
          filteredArray.push(obj);
        } else {
          filteredArray.splice(index, 1, obj);
        }
      });
      let itemObj = {
        id: this.order.url,
        title: this.order.title,
        items: filteredArray,
      };
      this.$emit('changeCount', itemObj);
    },
    openOrder() {
      this.openOrderBoolean = !this.openOrderBoolean;
    },
  },
};
</script>

<style lang="scss" scoped>
.order-list__hidden {
  display: none !important;
}

.order-i {
  padding: 1.25% 5.15% 1.56% 4.78%;
  background: #c9ced6;
  border-radius: 6.30585px;
  margin-bottom: 20px;

  @media screen and (max-width: 480px) {
    padding: 4.17vw;
    border-radius: 1.04vw;
  }
  &__delete {
    width: 100%;
    max-width: 12px;
    background-image: url(~/img/order/delete.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    margin-right: 5.24%;
    cursor: pointer;
  }

  &__arrow svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    @media screen and (max-width: 480px) {
      width: 5vw;
      height: 5vw;
    }
  }
  &__arrow {
    transition: 0.3s;
    transform: rotate(180deg);
  }
  &__arrow.active {
    transition: 0.3s;
    transform: rotate(0deg);
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1.2vw;
    margin-top: 30px;
    @media screen and (max-width: 480px) {
      gap: 6.25vw;
      margin-top: 6.25vw;
    }
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    @media screen and (max-width: 480px) {
      gap: 4.17vw;
    }

    &__left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 57.39%;
    }
  }
  &__img {
    max-width: 18.79%;
    border-radius: 3.51923px;
    margin-right: 11.091%;
    @media screen and (max-width: 480px) {
      max-height: 20.83vw;
      max-width: 20.83vw;
    }
  }
  &__name {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__text {
      width: 90.7317%;
      text-align: left;
      font-weight: 400;
      font-size: 1vw;
      line-height: 1.3vw;
      letter-spacing: -0.055em;
      color: #000000;
      opacity: 0.5;

      @media screen and (min-width: 1400px) and (max-width: 1450px) {
        font-size: 13px;
        line-height: 17px;
      }

      @media screen and (min-width: 768px) and (max-width: 1300px) {
        font-size: 1vw;
        line-height: 1.3vw;
      }

      @media screen and (max-width: 767px) {
        line-height: 4.17vw;
        font-size: 2.92vw;
      }
    }

    &__symbol {
      width: 4.56%;
      height: 100%;
      margin-bottom: 8.55%;
    }
  }
}
</style>
