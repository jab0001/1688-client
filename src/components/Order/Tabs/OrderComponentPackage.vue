<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Выберите метод упаковки для данной отправки
        </label>
        <label class="new-order__label package-danger">
          Упаковка влияет на вес, плотность и итоговую стоимость доставки
          (точные данные по весу и обьему будет известны только после
          поступления груза на склад и его упаковки)
        </label>
        <div class="new-order__methods-container">
          <div class="new-order__section">
            <div class="title">Основная упаковка</div>
            <div class="devider-line"></div>
          </div>
          <div
            class="method-item"
            @click="method.isShow = !method.isShow"
            :class="{ active: method.isActive }"
            :key="method.id"
            v-for="method in defaultPackageMethods"
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
              <div class="price" v-if="!$store.getters['parsing/boxes'].length">
                {{ method.price }} $ / кор.
              </div>

              <div class="price" v-else>
                <template
                  v-if="method.type === 'box' || method.type === 'pallet'"
                >
                  {{ $store.getters['parsing/volume'] }} м3 x
                  {{ method.price }} $ =
                  {{ $store.getters['parsing/volume'] * method.price }} $
                </template>

                <template v-else>
                  {{ Number(boxesCount) }} кор. x {{ method.price }} $ =
                  {{ boxesCount * method.price }} $
                </template>
              </div>
              <label @click.stop class="switch">
                <input
                  v-model="method.isActive"
                  @change="onChangeChoosePackage(method)"
                  :checked="method.id"
                  type="checkbox"
                  :style="method.isActive ? 'checked' : ''"
                />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="method-description" v-if="method.isShow">
              <div class="description">{{ method.description }}</div>
              <div class="method-img__container">
                <template v-if="method.type === 'standard'">
                  <img :src="require('~/img/order/package/standart-1.webp')" />
                  <img :src="require('~/img/order/package/standart-2.webp')" />
                  <img :src="require('~/img/order/package/standart-3.webp')" />
                </template>
              </div>
            </div>
          </div>

          <div class="new-order__section">
            <div class="title mt-4">Дополнительные опции</div>
            <div class="devider-line"></div>
          </div>
          <div class="other">
            <div
              class="method-item"
              @click="method.isShow = !method.isShow"
              :class="{ active: method.isActive }"
              :key="method.id"
              v-for="method in additionalPackageMethods"
            >
              <div class="method-container" style="max-height: 44px">
                <div class="type" style="line-height: 1">
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
                <div class="w-100 d-flex justify-content-end">
                  <div class="price">{{ method.price }} $ / кор.</div>

                  <!-- <div class="price" v-else>
                    <template
                      v-if="method.type === 'box' || method.type === 'pallet'"
                    >
                      {{ $store.getters['parsing/volume'].toFixed(3) }} м3 x
                      {{ method.price }} $ =
                      {{
                        Math.round(
                          $store.getters['parsing/volume'] * method.price
                        )
                      }}
                      $
                    </template>

                    <template v-else>
                      {{ Number(boxesCount) }} кор. x {{ method.price }} $ =
                      {{ boxesCount * method.price }} $
                    </template>
                  </div> -->

                  <label class="switch">
                    <input
                      v-model="method.isActive"
                      :id="method.id"
                      @change="onChangeChoosePackage(method)"
                      type="checkbox"
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
              <div class="method-description" v-if="method.isShow">
                <div class="description">{{ method.description }}</div>
                <div class="method-img__container">
                  <template v-if="method.type === 'lathing'">
                    <img :src="require('~/img/order/package/lathing-1.webp')" />
                    <img :src="require('~/img/order/package/lathing-2.webp')" />
                    <img :src="require('~/img/order/package/lathing-3.webp')" />
                  </template>
                  <template v-if="method.type === 'pallet'">
                    <img :src="require('~/img/order/package/pallet-1.webp')" />
                    <img :src="require('~/img/order/package/pallet-2.webp')" />
                    <img :src="require('~/img/order/package/pallet-3.webp')" />
                  </template>
                  <template v-if="method.type === 'box'">
                    <img :src="require('~/img/order/package/box.webp')" />
                  </template>
                  <template v-if="method.type === 'bubbles'">
                    <img :src="require('~/img/order/package/bubbles-1.webp')" />
                    <img :src="require('~/img/order/package/bubbles-2.webp')" />
                  </template>
                  <template v-if="method.type === 'corners'">
                    <img :src="require('~/img/order/package/corners-1.webp')" />
                    <img :src="require('~/img/order/package/corners-2.webp')" />
                    <img :src="require('~/img/order/package/corners-3.webp')" />
                  </template>
                </div>
              </div>
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
  name: 'OrderComponentPackage',
  props: [
    'courses',
    'defaultPackageMethods',
    'additionalPackageMethods',
    'boxesCount',
    'nextStep_btn_data',
    'prevStep_btn_data',
  ],
  data() {
    return {
      isPicked: false,
    };
  },
  mounted() {
    const defaultMethod = this.defaultPackageMethods.find((item) => item.isActive);
    if (defaultMethod) this.onChangeChoosePackage(defaultMethod);
  },
  methods: {
    onChangeChoosePackage(method) {
      this.$store.commit('parsing/SET_ACTIVE_PACKAGE_METHOD', [method]);
      this.$emit('choosePackageMethod', {
        id: method.id,
        isActive: method.isActive,
      });
    },
  },
  emits: ['prevStep', 'nextStep', 'choosePackageMethod'],
  components: {
    Btn,
  },
};
</script>

<style lang="scss" scoped>
.new-order {
  font-family: 'SF UI Display', sans-serif;

  &__box {
    padding: 24px 24px 18px 24px;
  }
}
.package-danger {
  margin: 30px 0 !important;
  color: #c91c1c;
  font-size: 14px;
  font-weight: 600;
  max-width: 80%;
  @media screen and (max-width: 480px) {
    margin-top: 6.25vw !important;
    font-size: 2.92vw;
    max-width: 100%;
  }
}
.method-img__container {
  display: flex;
  padding-left: 30px;
  flex-wrap: wrap;
  gap: 10px;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 20px;
  @media screen and (max-width: 480px) {
    padding-left: 0;
    gap: 2.08vw;
  }
  img {
    max-width: 250px;
    max-height: 250px;
    @media screen and (max-width: 480px) {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.new-order__methods-container {
  display: flex;
  flex-direction: column;
  .new-order__section {
    margin-bottom: 15px;
    @media screen and (max-width: 480px) {
      margin-bottom: 3.13vw;
    }
    .title {
      padding: 0 0 4px 6px;
      margin-bottom: 15px;
      @media screen and (max-width: 480px) {
        padding: 0 0 0.83vw 1.25vw;
        margin-bottom: 3.13vw;
        font-size: 2.92vw;
      }
    }
    .devider-line {
      width: 100%;
      height: 1px;
      background-color: #d3dce6;
    }
  }
  .method-item {
    position: relative;
    height: fit-content;
    cursor: pointer;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 480px) {
      padding: 4.17vw;
      border-radius: 0.83vw;
      margin-bottom: 1.25vw;
    }
    .devider-line {
      width: 100%;
      margin-top: 5px;
      margin-bottom: 5px;
      height: 1px;
      background-color: #d3dce6;
      @media screen and (max-width: 480px) {
        margin-top: 2.08vw;
        margin-bottom: 2.08vw;
      }
    }
    .method-description {
      width: 100%;
      background-color: #ffffff;
      position: absolute;
      z-index: 1;
      top: 100%;
      border: 1px solid #dee2e6;
      .description {
        color: #393939;
        border-left: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;

        font-size: 15px;
        padding: 20px 30px 0;
        @media screen and (max-width: 480px) {
          padding-left: 0;
          padding-right: 0;
          font-size: 2.92vw;
          margin: 4.17vw 0px;
        }
      }
    }
    .method-container {
      padding: 0;
      color: black;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: 480px) {
        gap: 4.17vw;
        flex-wrap: wrap;
        padding: 0;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    .type {
      .info-icon {
        width: 24px;
        height: 24px;
        display: flex;
        margin-right: 10px;
        @media screen and (max-width: 480px) {
          width: 5vw;
          height: 5vw;
          margin-right: 2.08vw;
        }
      }
      font-weight: 600;
      max-width: 440px;
      width: 100%;
      display: flex;
      align-items: center;
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
        max-width: 100%;
      }
    }
    .price {
      margin-right: 15px;
      display: flex;
      align-items: center;
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
      }
    }
    .desc {
      max-width: 284px;
      width: 100%;
      text-align: center;
    }
  }
}
.new-order__methods-container .method-item .method-container {
  width: 100%;
  color: #000;
  padding: 8px 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /* -webkit-box-pack:justify; */
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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
.other {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 20px;
}
</style>
