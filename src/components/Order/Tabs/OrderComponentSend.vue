<template>
  <div class="new-order__tabThird">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <p class="new-order__label text-dark">Выберите метод доставки:</p>
        <p class="new-order__way text-dark">Китай - Россия</p>
        <div class="new-order__methods-container">
          <div
            class="method-item"
            :class="{ active: method.isActive }"
            :key="method.id"
            v-for="method in sendMethods"
          >
            <div class="icon">
              <img
                v-if="method.type === 'avia'"
                src="../../../assets/img/order/airplane.svg"
              />
              <img
                v-if="method.type === 'avto'"
                src="../../../assets/img/order/avto.svg"
              />
            </div>
            <div class="type">
              <p class="type-title">{{ method.title }}</p>
              <p class="type-description">({{ method.sendDate }} дней)</p>
            </div>
            <div class="desc">
              Менеджер уточнит точную стоимость после оформления заказа
            </div>
            <!-- <div class="desc" v-else>
              <template v-if="density <= 100">
                {{ boxesCountAndWeight.quantity }} кор.,
                {{ volume.toFixed(3) }} м3 x
                {{ priceForDensity(method).toFixed(2) }} $ =
                {{ (volume * priceForDensity(method)).toFixed(2) }}
              </template>

              <template v-else>
                {{ boxesCountAndWeight.quantity }} кор.,
                {{ boxesCountAndWeight.weight }} кг. x
                {{ Number(valueForKg(method)).toFixed(2) }} $ =
                {{
                  (
                    boxesCountAndWeight.weight * Number(valueForKg(method))
                  ).toFixed(2)
                }}
              </template>
              $
            </div> -->
            <label class="switch">
              <input
                @change="
                  $emit('chacngeSendMethod', {
                    id: method.id,
                    isActive: method.isActive,
                  })
                "
                v-model="method.isActive"
                :id="method.id"
                type="checkbox"
                :style="method.isActive ? 'checked' : ''"
              />
              <span class="slider round"></span>
            </label>
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
  name: 'OrderComponentSend',
  props: [
    'sendMethods',
    'courses',
    'volume',
    'boxes',
    'density',
    'nextStep_btn_data',
    'prevStep_btn_data',
  ],
  emits: ['prevStep', 'nextStep', 'chacngeSendMethod'],
  components: {
    Btn,
  },
  computed: {
    sendMethodsFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate']?.sendMethods;
    },
    boxCoef() {
      return this.$store.getters['parsing/boxCoef'];
    },
    activeItems() {
      return this.sendMethods.filter((item) => item.isActive);
    },

    boxesCountAndWeight() {
      let quantity = 0;
      let weight = 0;
      this.boxes.forEach((item) => {
        quantity += Number(item.count);
        weight += Number(item.count) * Number(item.weight);
      });
      return { quantity, weight };
    },
  },
  methods: {
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

    uncheckOther(checkbox) {
      if (checkbox.isActive) {
        this.sendMethods.forEach((s) => {
          if (s.id !== checkbox.id) {
            s.isActive = false;
          }
        });
        this.$store.commit('parsing/SET_SEND_METHOD', checkbox);

        if (this.density <= 100) {
          console.log(
            this.volume *
              this.priceForDensity(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.volume *
              this.priceForDensity(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        } else {
          console.log(
            this.boxesCountAndWeight.weight *
              this.valueForKg(checkbox) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.boxesCountAndWeight.weight *
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
    margin-bottom: 8px;
  }
  &__way {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-transform: uppercase;
  }

  .type-title {
    margin-bottom: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
  .type-description {
    margin-bottom: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
}

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

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 35px;
      @media screen and (max-width: 480px) {
        margin-right: 2.08vw;
        width: 2rem;
        height: 2rem;
      }
    }

    .desc {
      max-width: 284px;
      width: 100%;
      text-align: center;
      color: #393939;
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
    }
  }
}
</style>
