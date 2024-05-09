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
            <div class="line"></div>
          </div>
          <div
            class="method-item"
            @click="method.is_show = !method.is_show"
            :class="{ active: method.is_active }"
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
                  v-model="method.is_active"
                  @change="uncheckOther(method)"
                  :checked="method.id"
                  type="checkbox"
                />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="method-description" v-if="method.is_show">
              <div class="line"></div>
              <div class="description">{{ method.description }}</div>
              <div class="method-img__container">
                <template v-if="method.type === 'standard'">
                  <img src="@/assets/img/order/package/standart-1.webp" />
                  <img src="@/assets/img/order/package/standart-2.webp" />
                  <img src="@/assets/img/order/package/standart-3.webp" />
                </template>
              </div>
            </div>
          </div>

          <div class="new-order__section">
            <div class="title">Дополнительные опции</div>
            <div class="line"></div>
          </div>

          <div
            class="method-item"
            @click="method.is_show = !method.is_show"
            :class="{ active: method.is_active }"
            :key="method.id"
            v-for="method in additionalPackageMethods"
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
                  {{ $store.getters['parsing/volume'].toFixed(3) }} м3 x
                  {{ method.price }} $ =
                  {{
                    Math.round($store.getters['parsing/volume'] * method.price)
                  }}
                  $
                </template>

                <template v-else>
                  {{ Number(boxesCount) }} кор. x {{ method.price }} $ =
                  {{ boxesCount * method.price }} $
                </template>
              </div>

              <label class="switch">
                <input
                  v-model="method.is_active"
                  :id="method.id"
                  @change="uncheckOther(method)"
                  type="checkbox"
                />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="method-description" v-if="method.is_show">
              <div class="line"></div>
              <div class="description">{{ method.description }}</div>
              <div class="method-img__container">
                <template v-if="method.type === 'lathing'">
                  <img src="@/assets/img/order/package/lathing-1.webp" />
                  <img src="@/assets/img/order/package/lathing-2.webp" />
                  <img src="@/assets/img/order/package/lathing-3.webp" />
                </template>
                <template v-if="method.type === 'pallet'">
                  <img src="@/assets/img/order/package/pallet-1.webp" />
                  <img src="@/assets/img/order/package/pallet-2.webp" />
                  <img src="@/assets/img/order/package/pallet-3.webp" />
                </template>
                <template v-if="method.type === 'box'">
                  <img src="@/assets/img/order/package/box.webp" />
                </template>
                <template v-if="method.type === 'bubbles'">
                  <img src="@/assets/img/order/package/bubbles-1.webp" />
                  <img src="@/assets/img/order/package/bubbles-2.webp" />
                </template>
                <template v-if="method.type === 'corners'">
                  <img src="@/assets/img/order/package/corners-1.webp" />
                  <img src="@/assets/img/order/package/corners-2.webp" />
                  <img src="@/assets/img/order/package/corners-3.webp" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="new-order__box-btns">
      <button
        class="new-order__button-prev btn base-button text-dark"
        @click="$emit('prevStep')"
      >
        Назад
      </button>
      <button
        class="new-order__button btn base-button text-dark"
        @click="nextStep"
      >
        Далее
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderComponentPackage',
  data() {
    return {
      courses: {},
      defaultPackageMethods: [],
      additionalPackageMethods: [],
    };
  },
  props: {
    settings: {
      type: Object,
      require: false,
    },
  },
  methods: {
    nextStep() {
      this.steps.find(
        (item) => item.name === 'OrderComponentPackage'
      ).isReady = true;
      this.$store.commit('parsing/SET_STEPS', this.steps);
      this.$emit('nextStep');
    },

    uncheckOther(checkbox) {
      if (checkbox.is_active) {
        this.allMethods.forEach((s) => {
          if (s.id !== checkbox.id) {
            s.is_active = false;
          }
        });
      }
    },
  },

  computed: {
    defaultPackageMethodsFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate']
        .defaultPackageMethods;
    },

    additionalPackageMethodsFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate']
        .additionalPackageMethods;
    },

    steps() {
      return this.$store.getters['parsing/steps'];
    },

    boxesCount() {
      let c = 0;
      this.$store.getters['parsing/boxes'].forEach((item) => {
        c += Number(item.count);
      });

      return c;
    },

    allMethods() {
      return [...this.defaultPackageMethods, ...this.additionalPackageMethods];
    },

    activePackages() {
      let activeAdditional = this.allMethods.filter((item) => item.is_active);
      return [...activeAdditional];
    },

    packagesPrice() {
      let sum = 0;

      for (let item of this.activePackages) {
        if (item.type === 'box' || item.type === 'pallet') {
          sum +=
            this.$store.getters['parsing/volume'] *
            item.price *
            this.courses.cny_rub *
            this.courses.usd_rub;
        } else {
          sum +=
            item.price *
            this.boxesCount *
            this.courses.cny_rub *
            this.courses.usd_rub;
        }
      }

      return sum;
    },
  },

  watch: {
    defaultPackageMethodsFromVuex: function (nv) {
      this.defaultPackageMethods = nv;
    },

    additionalPackageMethodsFromVuex: function (nv) {
      this.additionalPackageMethods = nv;
    },

    defaultPackageMethods: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_DEFAULT_PACKAGE_METHODS', val);
      },
    },

    additionalPackageMethods: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_ADDITIONAL_PACKAGE_METHODS', val);
      },
    },

    activePackages: {
      deep: true,
      handler(val) {
        this.$store.commit('parsing/SET_ACTIVE_PACKAGES', val);
      },
    },

    packagesPrice(val) {
      this.$store.commit('parsing/SET_PACKAGE_PRICE', val);
    },
  },

  async mounted() {
    this.courses = this.settings.courses;
    this.defaultPackageMethods = this.settings.packages.filter(
      (item) => !item.option
    );
    this.additionalPackageMethods = this.settings.packages.filter(
      (item) => item.option
    );
    if (this.$store.getters['profileTemplate/templateIsUsed']) {
      this.defaultPackageMethods = this.defaultPackageMethodsFromVuex;
      this.additionalPackageMethods = this.additionalPackageMethodsFromVuex;
    }
  },
};
</script>

<style lang="scss" scoped>
.package-danger {
  margin: 30px 0 !important;
  color: #c91c1c;
  font-size: 18px;
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
    .line {
      width: 100%;
      height: 1px;
      background-color: #d3dce6;
    }
  }
  .method-item {
    margin-bottom: 6px;
    cursor: pointer;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    @media screen and (max-width: 480px) {
      padding: 4.17vw;
      border-radius: 0.83vw;
      margin-bottom: 1.25vw;
    }
    .line {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
      height: 1px;
      background-color: #d3dce6;
      @media screen and (max-width: 480px) {
        margin-top: 2.08vw;
        margin-bottom: 2.08vw;
      }
    }
    .method-description {
      padding-bottom: 20px;
      @media screen and (max-width) {
        padding-bottom: 4.17vw;
      }
      .description {
        color: #393939;
        padding-left: 30px;
        padding-right: 30px;
        font-size: 15px;
        margin: 20px 0px;
        @media screen and (max-width: 480px) {
          padding-left: 0;
          padding-right: 0;
          font-size: 2.92vw;
          margin: 4.17vw 0px;
        }
      }
    }
    .method-container {
      padding: 14px;
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
    // &.active {
    //   background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    // }
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
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #393939;
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
.new-order__button {
  &-prev {
    margin-top: 60px;
    @media screen and (max-width: 480px) {
      margin-top: 8.33vw;
      margin-right: 0;
    }
  }
  @media screen and (max-width: 480px) {
    margin-top: 0;
  }
}
</style>
