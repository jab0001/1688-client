<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Выберите метод доставки: Китай - Россия
        </label>
        <div class="new-order__methods-container">
          <div
            class="method-item"
            :class="{ active: method.isActive }"
            :key="method.id"
            v-for="method in sendMethods"
          >
            <div class="icon">
              <svg
                v-if="method.type === 'avia'"
                class="flex-none"
                width="30"
                viewBox="8 4 50 26"
              >
                <path
                  d="M55.057 18.798l-16.71.56a4.173 4.173 0 0 0-.084-.452l5.103-.99a.49.49 0 0 0 .394-.543.5.5 0 0 0-.513-.434l-5.74.276c-.75-1.111-1.916-2.004-3.256-2.455L33.08 6.633a.74.74 0 0 0-1.464 0l-1.184 8.117c-1.355.449-2.536 1.349-3.29 2.47l-5.825-.28a.493.493 0 1 0-.118.976l5.186 1.005a4.51 4.51 0 0 0-.081.436l-16.793-.56a.487.487 0 0 0-.508.452.493.493 0 0 0 .424.53l5.524.751a1.969 1.969 0 0 0-1.097 1.763 1.97 1.97 0 0 0 1.967 1.967 1.97 1.97 0 0 0 1.967-1.967c0-.582-.257-1.107-.66-1.467l3.696.503a1.96 1.96 0 0 0-.73 1.528 1.97 1.97 0 0 0 1.968 1.967 1.97 1.97 0 0 0 1.967-1.967c0-.426-.138-.82-.37-1.143l3.133.426a7.15 7.15 0 0 0 1.227 1.829C29.23 25.278 30.758 26 32.325 26c1.566 0 3.094-.72 4.307-2.031.517-.56.936-1.19 1.235-1.841l3.041-.414c-.232.323-.37.717-.37 1.143a1.97 1.97 0 0 0 1.967 1.967 1.966 1.966 0 1 0 1.237-3.495l3.698-.503a1.96 1.96 0 0 0-.66 1.467 1.97 1.97 0 0 0 1.966 1.967 1.97 1.97 0 0 0 1.967-1.967c0-.772-.448-1.44-1.096-1.763l5.526-.751a.493.493 0 0 0-.086-.981zM15.82 23.274a.982.982 0 0 1 0-1.962.982.982 0 0 1 0 1.962zm6.24.564a.982.982 0 0 1 0-1.962.982.982 0 0 1 0 1.962zm20.444 0a.982.982 0 0 1 0-1.962c.54 0 .981.441.981.981s-.44.981-.98.981zm6.241-.564a.982.982 0 0 1 0-1.962c.54 0 .981.441.981.98 0 .54-.44.982-.98.982zm-16.4-11.385l.352 2.432-.703-.02.35-2.412zm-13.176 8.22l7.119.239c.025.247.066.495.13.747l-7.249-.986zm13.158 4.41c-1.245 0-2.418-.678-3.266-1.607 1.21.29 2.3.438 3.352.438 1.077 0 2.113-.153 3.2-.458-.85.939-2.034 1.627-3.286 1.627zm4.17-2.946a.404.404 0 0 0-.093.025c-2.766 1.005-4.94 1.023-8.21.059-.287-.572-.45-1.166-.45-1.72 0-1.86 2.002-4.018 4.58-4.018 2.581 0 4.583 2.159 4.583 4.017 0 .525-.148 1.092-.41 1.637zm1.738-.493c.062-.249.106-.495.128-.737l7.033-.234-7.16.971z"
                  fill="#000"
                ></path>
                <path
                  d="M31.657 19.355h-1.279a.37.37 0 0 0-.37.37v.55a.37.37 0 0 0 .37.369h1.28a.37.37 0 0 0 .37-.37v-.55a.37.37 0 0 0-.37-.37zm2.778 0h-1.279a.37.37 0 0 0-.37.37v.55a.37.37 0 0 0 .37.369h1.28a.37.37 0 0 0 .37-.37v-.55a.37.37 0 0 0-.37-.37z"
                  fill="#000"
                ></path>
              </svg>
              <svg
                v-if="method.type === 'avto'"
                class="flex-none"
                width="30"
                viewBox="0 0 25 28"
              >
                <path
                  d="M19.057 16.773H6.005a.461.461 0 0 1-.456-.511l.433-3.816c.2-1.43 1.008-1.545 1.964-1.545.096 0 .197 0 .302.002.115 0 .234.003.363.003h7.84c1.22 0 2.482 0 2.629 1.549l.43 3.807a.464.464 0 0 1-.453.511zm-12.539-.917h12.026l-.374-3.305c-.055-.566-.14-.726-1.717-.726H8.611l-.372-.002c-.103 0-.2-.003-.293-.003-.832 0-.958.046-1.057.743l-.37 3.293zm.734 8.814H4.76a.343.343 0 0 0-.344.344v2.21c0 .19.154.344.344.344h2.492c.19 0 .343-.154.343-.344v-2.21a.343.343 0 0 0-.343-.343zm12.914 0h-2.489a.343.343 0 0 0-.343.344v2.21c0 .19.153.344.343.344h2.492c.19 0 .343-.154.343-.344v-2.21a.347.347 0 0 0-.346-.343zm-.866-6.593a.34.34 0 0 0-.314-.041l-1.098.398a1.943 1.943 0 0 0-1.276 1.82v1.783c0 .19.153.344.343.344h2.148c.19 0 .344-.154.344-.344V18.36a.345.345 0 0 0-.147-.282zm-.54 3.619H17.3v-1.44c0-.524.33-.994.822-1.175l.637-.232v2.847zM7.25 18.434l-1.099-.398a.345.345 0 0 0-.46.323v3.68c0 .19.153.344.344.344h2.147c.19 0 .344-.153.344-.343v-1.784c0-.813-.514-1.544-1.277-1.822zm.588 3.262h-1.46v-2.847l.638.232c.492.178.822.65.822 1.175v1.44zm7.719-2.494H9.75a.343.343 0 1 0 0 .688h5.807a.343.343 0 1 0 0-.688zm0 1.3H9.75a.343.343 0 1 0 0 .688h5.807a.343.343 0 1 0 0-.688z"
                ></path>
                <path
                  d="M23.279 1H1.783a.46.46 0 0 0-.458.458v4.479c0 .662.167 1.322.481 1.907l.557 1.03v14.314c0 .183.108.339.264.412v1.176c0 .38.307.688.687.688h18.431a.687.687 0 0 0 .688-.688V23.6a.455.455 0 0 0 .264-.412V8.875l.557-1.031a4.007 4.007 0 0 0 .48-1.907V1.458A.456.456 0 0 0 23.28 1zm-2.707 20.911H4.488v-3.82l.834-6.363.002-.027c.076-.837 1.32-1.58 2.25-1.58h10.172c.928 0 2.175.746 2.25 1.582l.578 6.397v3.811h-.002zm-16.57 2.18v-.75h17.056v.75H4.002zM22.447 7.408l-.612 1.135a.451.451 0 0 0-.055.217v7.412l-.415-4.593c-.147-1.62-2.03-2.832-3.619-2.832H7.575c-1.582 0-3.461 1.203-3.62 2.816l-.675 5.152V8.758a.452.452 0 0 0-.055-.218l-.612-1.134c-.02-.037-.035-.076-.053-.115H22.5c-.019.04-.033.08-.053.117zm.373-1.471c0 .146-.013.293-.034.44H2.342c-.023 0-.043.004-.066.007a3.207 3.207 0 0 1-.037-.447v-4.02h20.58v4.02h.001z"
                ></path>
                <path
                  d="M6.099 5.705H4.384a.46.46 0 0 1-.458-.458.46.46 0 0 1 .458-.458H6.1a.46.46 0 0 1 .458.458.46.46 0 0 1-.458.458zm14.595 0h-1.715a.46.46 0 0 1-.458-.458.46.46 0 0 1 .458-.458h1.715a.458.458 0 1 1 0 .917zm3.501 7.625h-.242a.805.805 0 0 0-.805.805v1.354l-.937.186a.459.459 0 0 0 .179.898l.758-.149v.032a.46.46 0 0 0 .459.459h.935a.46.46 0 0 0 .458-.459v-2.321a.806.806 0 0 0-.805-.805zM2.79 15.675l-.938-.186v-1.354a.805.805 0 0 0-.805-.805H.804a.807.807 0 0 0-.804.805v2.32a.46.46 0 0 0 .458.458h.935a.46.46 0 0 0 .459-.459v-.03l.758.152a.46.46 0 0 0 .179-.9z"
                ></path>
              </svg>
            </div>
            <div class="type">
              {{ method.title }} ({{ method.sendDate }} дней)
            </div>
            <div class="desc" v-if="!$store.getters['parsing/boxes'].length">
              Менеджер уточнит точную стоимость после оформления заказа
            </div>
            <div class="desc" v-else>
              <template v-if="density <= 100">
                {{ boxesCountAndWeight.c }} кор.,
                {{ $store.getters['parsing/volume'].toFixed(3) }} м3 x
                {{ priceForDensity(method).toFixed(2) }} $ =
                {{
                  (
                    $store.getters['parsing/volume'] * priceForDensity(method)
                  ).toFixed(2)
                }}
              </template>

              <template v-else>
                {{ boxesCountAndWeight.c }} кор.,
                {{ boxesCountAndWeight.w }} кг. x
                {{ Number(valueForKg(method)).toFixed(2) }} $ =
                {{
                  (boxesCountAndWeight.w * Number(valueForKg(method))).toFixed(
                    2
                  )
                }}
              </template>
              $
            </div>
            <label class="switch">
              <input
                @change="uncheckOther(method)"
                v-model="method.isActive"
                :id="method.id"
                type="checkbox"
              />
              <span class="slider round"></span>
            </label>
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
  name: 'OrderComponentSend',
  data() {
    return {
      courses: {},
      sendMethods: [],
    };
  },
  props: {
    tg_id: String,
    api_key: String,
    settings: {
      type: Object,
      require: false,
    },
  },

  watch: {
    sendMethods: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_SEND_METHODS', val);
      },
    },

    sendMethodsFromVuex: function (nv) {
      this.sendMethods = nv;
    },
  },

  computed: {
    sendMethodsFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate'].sendMethods;
    },

    steps() {
      return this.$store.getters['parsing/steps'];
    },

    boxCoef() {
      return this.$store.getters['parsing/boxCoef'];
    },

    activeItems() {
      return this.sendMethods.filter((item) => item.isActive);
    },

    density() {
      return this.$store.getters['parsing/density'];
    },

    boxesCountAndWeight() {
      let c = 0;
      let w = 0;
      this.$store.getters['parsing/boxes'].forEach((item) => {
        c += Number(item.count);
        w += Number(item.count) * Number(item.weight);
      });
      return {
        c,
        w,
      };
    },
  },

  methods: {
    async getDelivery() {
      await this.$http
        .get(`/settings?tg_id=${this.tg_id}&api_key=${this.api_key}`)
        .then((response) => {});
    },

    valueForKg(method) {
      for (let item of method.values) {
        if (!item.start || !item.end) {
          return Number(item.price);
        } else {
          if (this.density <= method.minValue) {
            return Number(method.minPrice);
          }

          if (this.density > method.maxValue) {
            return Number(method.price) + Number(this.boxCoef);
          }

          if (this.density >= item.start && this.density <= item.end) {
            return Number(item.price) + Number(this.boxCoef);
          }
        }
      }
    },

    priceForDensity(method) {
      return method.minPrice;
    },

    nextStep() {
      if (this.activeItems.length) {
        if (
          this.activeItems[0].type === 'avia' &&
          this.$store.getters['parsing/density'] < 167
        ) {
          this.$notify({
            type: 'warning',
            message: 'Средняя плотность должна быть не меньше 167',
          });
          return;
        }
        this.steps.find(
          (item) => item.name === 'OrderComponentSend'
        ).isReady = true;
        this.$store.commit('parsing/SET_STEPS', this.steps);
        this.$emit('nextStep');
      } else {
        this.$notify({ type: 'warning', message: 'Выберите метод доставки' });
      }
    },

    uncheckOther(checkbox) {
      if (checkbox.isActive) {
        this.sendMethods.forEach((s) => {
          if (s.id !== checkbox.id) {
            s.isActive = false;
          }
        });
        this.$store.commit('parsing/SET_SEND_METHOD', checkbox);

        if (this.density <= 100) {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.$store.getters['parsing/volume'] *
              this.priceForDensity(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        } else {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.boxesCountAndWeight.w *
              this.valueForKg(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        }
      } else {
        this.$store.commit('parsing/SET_VOLUME_PRICE', 0);
      }
    },
  },
  async mounted() {
    this.sendMethods = this.settings.delivery;
    this.courses = this.settings.courses;
    if (this.$store.getters['profileTemplate/templateIsUsed']) {
      this.sendMethods = this.sendMethodsFromVuex;

      let hasActiveMethod = this.sendMethods.some((item) => item.isActive);

      if (hasActiveMethod) {
        let checkbox = this.sendMethods.find((item) => item.isActive);
        this.$store.commit('parsing/SET_SEND_METHOD', checkbox);

        if (this.density <= 100) {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.$store.getters['parsing/volume'] *
              this.priceForDensity(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        } else {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.boxesCountAndWeight.w *
              this.valueForKg(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.new-order__methods-container {
  display: flex;
  flex-direction: column;
  .method-item {
    color: #393939;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 6px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    @media screen and (max-width: 480px) {
      padding: 4.17vw;
      margin-bottom: 1.25vw;
      border-radius: 0.83vw;
      gap: 4.17vw;
      flex-wrap: wrap;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      @media screen and (max-width: 480px) {
        margin-right: 2.08vw;
        width: 2rem;
        height: 2rem;
      }
    }
    & .type {
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
      }
    }
    .desc {
      max-width: 284px;
      width: 100%;
      text-align: center;
      font-size: 16px;
      color: #393939;
      margin-left: auto;
      margin-right: auto;
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
        max-width: 100%;
      }
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
