<template>
  <div class="o-i-m">
    <div class="o-i-m__inner">
      <div class="o-i-m-left-side">
        <div class="o-i-m__img">
          <img
            :src="option?.img ?? model?.img"
            v-if="option?.img ?? model?.img"
            :alt="model?.title || option?.title"
          />
          <div v-else class="o-i-m__img__not_exist">&nbsp;</div>
        </div>
        <p class="o-i-m__model">
          <template v-if="model && option">
            {{ model.title }} ({{ option.title }})
          </template>

          <template v-else-if="!model && option">
            {{ option.title }}
          </template>

          <template v-else>
            {{ model.title }}
          </template>
        </p>
      </div>
      <div class="o-i-m-center-side">
        <div class="o-i-m__block">
          <div class="o-i-m__minus" @click="minusCount">-</div>
          <input
            class="o-i-m__count"
            @input="charReplace"
            placeholder="0"
            v-model="modelCount"
          />

          <div class="o-i-m__plus" @click="plusCount">+</div>
        </div>
      </div>
      <div class="o-i-m-right-side">
        <div class="o-i-m__block">
          <input class="o-i-m__count" placeholder="0" v-model="inputPrice" />
        </div>
        <div class="o-i-m__price" style="white-space: nowrap">
          {{
            (
              Number(inputPrice) * Number(modelCount) || Number(inputPrice)
            ).toFixed(2)
          }}
          ¥
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'OrderItemModel',
  data() {
    return {
      inputPrice: 0,
    };
  },
  props: {
    skusData: {
      type: Object,
      required: false,
    },

    model: {
      type: Object,
      required: false,
    },
    selected: {
      type: Object,
      required: false,
    },
    option: {
      type: Object,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    courses: {
      type: Object,
      required: false,
    },
    price: String,
    url: String,
    title: String,
  },

  methods: {
    charReplace(e) {
      if (isNaN(e.target.value)) {
        e.target.value = '';
        this.modelCount = 0;
      } else {
        e.target.value = e.target.value.replace(/^$|[^0-9,\s]/g, '');
        this.modelCount = e.target.value.replace(/^$|[^0-9,\s]/g, '');
      }
    },

    plusCount() {
      this.modelCount = Number(this.modelCount) + 1;
    },
    minusCount() {
      if (this.modelCount <= 0) {
        return;
      }
      this.modelCount = Number(this.modelCount) - 1;
    },

    emitCount() {
      const emitObj = {
        id: this.itemId,
        model_title: this.model?.title ?? this.option?.title,
        model_id: this.model?.id ?? this.option?.id,
        modelCount: String(this.modelCount),
        url: this.url,
        itemSkusKey: this.itemSkusKey,
        img: this.option?.img ?? this.model?.img ?? '',
        option_title: this.option?.title ?? this.model?.title,
        option_id: this.option?.id ?? this.model?.id,
        variant: this.option?.title ?? this.model.title,
        marker: Date.now(),
        count: Number(this.modelCount) || 0,
        price: this.inputPrice,
        sum: this.inputPrice * Number(this.modelCount) || 0,
        delivery_china: 0,
        percent_commission: 0,
        course: this.courses.cny_rub,
      };
      if (store.getters.promo) {
        emitObj.percent_commission = store.getters.promoPercent;
      } else if (store.getters['auth/userLongPromo']) {
        emitObj.percent_commission = store.getters.userLongPromoPersent;
      } else {
        emitObj.percent_commission = 10;
      }
      this.$emit('changeCount', emitObj);
    },
  },

  computed: {
    itemSkusKey() {
      let itemKey;
      for (let key in this.skusData) {
        if (
          this.skusData[key].prop.includes(this.option?.id) &&
          this.skusData[key].prop.includes(this.model?.id)
        ) {
          itemKey = Number(key);
          break;
        }
        if (
          this.skusData[key].prop.includes(this.option?.id) &&
          this.skusData[key].prop.length == 1
        ) {
          itemKey = Number(key);
        }
        if (
          this.skusData[key].prop.includes(this.model?.id) &&
          this.skusData[key].prop.length == 1
        ) {
          itemKey = Number(key);
          break;
        }
      }
      return itemKey;
    },

    modelPrice() {
      for (let key in this.skusData) {
        if (this.model) {
          if (this.skusData[key].prop.includes(this.model?.id)) {
            return this.skusData[key].price;
          }
        } else {
          if (this.skusData[key].prop.includes(this.option.id)) {
            return this.skusData[key].price;
          }
        }
      }
    },

    modelCount: {
      get() {
        let quantity;
        for (let key in this.skusData) {
          if (
            this.skusData[key].prop.includes(this.option?.id) &&
            this.skusData[key].prop.includes(this.model?.id)
          ) {
            if (this.skusData[key].quantity === 9999) {
              quantity = '';
              break;
            }
            quantity = Number(this.skusData[key].quantity);
            break;
          }
          if (
            this.skusData[key].prop.includes(this.option?.id) &&
            !this.model
          ) {
            if (this.skusData[key].quantity === 9999) {
              quantity = '';
              break;
            }
            quantity = Number(this.skusData[key].quantity);
          }
        }
        return quantity;
      },
      set(value) {
        for (const key in this.skusData) {
          if (
            this.skusData[key].prop.includes(this.option?.id) &&
            this.skusData[key].prop.includes(this.model?.id)
          ) {
            this.skusData[key].quantity = Number(value);
            break;
          }
          if (
            this.skusData[key].prop.includes(this.option?.id) &&
            !this.model
          ) {
            this.skusData[key].quantity = Number(value);
            break;
          }
        }
      },
    },

    itemId() {
      if (this.option && this.model) {
        return `${this.option.id}-${this.model?.id}`;
      }

      if (this.option && !this.model) {
        return `${this.option.id}-${this.option?.title}`;
      }

      if (!this.option && this.model) {
        return `${this.model?.id}-${this.model?.title}`;
      }
    },
  },

  watch: {
    modelPrice: {
      deep: true,
      immediate: true,
      handler(val) {
        this.inputPrice = val;
      },
    },

    selected: {
      deep: true,
      immediate: true,
      handler(val) {
        for (let item in val) {
          let it = val[item];
          if (typeof it === 'object') {
            if (Object.keys(it).length) {
              for (let el in it) {
                if (el === this.option.id && item === this.model?.id) {
                  this.modelCount = it[el];
                  this.emitCount();
                }
              }
            }
          } else {
            if (item === this.model?.id) {
              this.modelCount = it;
              this.emitCount();
            }
          }
        }
      },
    },

    inputPrice(val) {
      this.emitCount();
    },

    modelCount(val, oldValue) {
      this.emitCount();
    },
  },
};
</script>

<style lang="scss" scoped>
.o-i-m {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;

  &__inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  &-left-side,
  &-right-side,
  &-center-side {
    display: flex;
    align-items: center;
  }
  &-left-side {
    width: 40%;
  }
  &-center-side {
    width: 33%;
    justify-content: center;
  }
  &-right-side {
    width: 25%;
    justify-content: flex-start;
  }

  &__block {
    display: flex;
    & input {
      @media screen and (max-width: 480px) {
        width: 100%;
        font-size: 2.92vw;
      }
    }
  }

  &__minus,
  &__plus {
    cursor: pointer;
    font-size: 1vw;
    border-radius: 0.33vw;
    padding: 0.02vw 0.5vw;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 480px) {
      font-size: 3.75vw;
      border-radius: 1.04vw;
      padding: 1.04vw 3.13vw;
    }
  }
  &__minus {
    margin-right: 1vw;
    @media screen and (max-width: 480px) {
      margin-right: 3.13vw;
    }
  }
  &__plus {
    margin-left: 1vw;
    @media screen and (max-width: 480px) {
      margin-left: 3.13vw;
    }
  }

  &__img {
    max-width: 18.79%;
    margin-right: 10px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
      @media screen and (max-width: 480px) {
        border-radius: 1.04vw;
      }
    }

    &__not_exist {
      margin-right: 40px;
      height: 100%;
    }
    @media screen and (max-width: 480px) {
      width: 14.58vw;
      height: 14.58vw;
    }
  }
  &__count {
    border-radius: 0.33vw;
    border: none;
    outline: navajowhite;
    text-align: center;
    padding: 0.33vw;
    max-width: 4vw;
    height: 100%;
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      border-radius: 1.04vw;
      padding: 1.04vw;
      max-width: 100%;
      height: 8.75vw;
    }
  }
  &__model {
    font-size: 1vw;
    margin-bottom: 0;
    white-space: nowrap;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      width: 20.83vw;
    }
  }
  &__price {
    margin-left: 1vw;
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
    }
  }
}

p {
  font-size: 1vw;
}
</style>
