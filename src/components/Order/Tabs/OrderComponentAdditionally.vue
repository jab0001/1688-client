<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Услуги по проверке товара
        </label>
        <div class="new-order__methods-container mt-4">
          <div
            class="method-item"
            @click="method.isShow = !method.isShow"
            :class="{ active: method.isActive }"
            v-for="method in checkMethods"
            :key="method.id"
          >
            <div class="method-container">
              <div class="type">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-8 h-8 text-flg-dark-gray hover:text-black cursor-pointer place-self-end"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                {{ method.title }}
              </div>
              <div class="d-flex">
                <div class="price mr-3" @click.stop>
                  <template v-if="method.priceBy === 'count'">
                    <div class="price-method">{{ method.price }} ¥/шт.</div>

                    <div class="count-container" v-if="method.isActive">
                      <div
                        @click="addCount(method)"
                        class="property-container-count__btn property-container-count__btn--add cursor-pointer"
                      >
                        <img
                          class="property-container-count__icon property-container-count__icon--add"
                          src="@/assets/img/order/add-count.svg"
                        />
                      </div>
                      <input
                        type="number"
                        min="1"
                        oninput="validity.valid||(value='');"
                        v-model.number="method.count"
                        class="property-container-count__items-count"
                      />
                      <div
                        @click="removeCount(method)"
                        class="property-container-count__btn property-container-count__btn--remove cursor-pointer"
                      >
                        <img
                          class="property-container-count__icon remove property-container-count__icon--remove"
                          src="@/assets/img/order/remove-count.svg"
                        />
                      </div>
                      шт.
                    </div>
                  </template>
                  <template v-if="method.priceBy === 'percent'">
                    {{ method.price }}% от стоимости
                  </template>
                </div>
                <label class="switch">
                  <input
                    v-model="method.isActive"
                    type="checkbox"
                    :style="method.isActive ? 'checked' : ''"
                  />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div
              class="method-description"
              v-if="method.description && method.isShow"
            >
              <div class="line"></div>
              <div class="description" v-html="method.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new-order__box-btns">
      <div class="new-order__btn-place">
        <Btn :btnData="prevStep_btn_data" @actionBtn="$emit('prevStep')" />
      </div>
      <div class="new-order__btn-place">
        <Btn :btnData="nextStep_btn_data" @actionBtn="$emit('nextStep')" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'OrderComponentAdditionally',
  props: ['nextStep_btn_data', 'prevStep_btn_data', 'checkMethods'],
  emits: ['prevStep', 'nextStep', 'changeCheckMethod'],
  components: {
    Btn,
  },

  methods: {
    addCount(method) {
      method.count = parseInt(method.count, 10) || 0;
      method.count += 1;
      method.count = String(method.count);
    },

    removeCount(method) {
      method.count = parseInt(method.count, 10) || 0; // Convert string to number, treat empty string as 0
      if (method.count < 1) return 0;
      method.count -= 1; // Decrement the number by 1
      method.count = String(method.count); // Convert back to a string
    },
  },
};
</script>

<style lang="scss" scoped>
.new-order {
  font-family: 'SF UI Display', sans-serif;

  &__box {
    padding: 24px 24px 18px 24px;
  }

  &__label {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
  &__methods-container {
    row-gap: 10px;
    display: flex;
    flex-direction: column;
  }

  .property-container-count {
    display: flex;
    align-items: center;

    &__title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      margin-right: 20px;
    }

    &__items-count {
      cursor: text;
      text-align: center;
      width: 50px;
    }

    &__btn {
      background-color: #e6e6e6;
      background: #d9d9d9;
      width: 17px;
      height: 17px;
      border-radius: 25px;
      &--add {
        color: red;
      }
      &--remove {
        color: blue;
      }
    }

    &__icon {
      margin: auto;
      display: block;
      margin-top: 4px;
      &--add {
        margin-top: 4px;
      }
      &--remove {
        margin-top: 8px;
      }
    }
  }
}
.new-order__methods-container .method-item .method-container {
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* -webkit-box-pack:justify; */
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}
.new-order__methods-container .method-item .type {
  font-weight: 600;
  max-width: 440px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.new-order__methods-container .method-item .type .info-icon {
  width: 24px;
  height: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-right: 10px;
}
.method-item {
  border: 1px solid #d9dce2;
  border-radius: 6px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
}
.description {
  color: #1a1818;
}
.price {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #393939;
  font-size: 14px;
  @media screen and (min-width: 1450px) and (max-width: 1920px) {
    font-size: 1vw;
    line-height: 1.15vw;
  }
  @media screen and (min-width: 870px) and (max-width: 1400px) {
    font-size: 1vw;
    line-height: 1.15vw;
  }
  @media screen and (max-width: 480px) {
    font-size: 2.92vw;
  }
  .count-container::before {
    content: 'X';
    margin: 0 8px;
  }
  .count-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .price-method {
    width: fit-content;
    min-width: 90px;
    text-align: right;
  }
}
</style>
