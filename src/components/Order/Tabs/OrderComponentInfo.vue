<template>
  <div class="new-order__tabSecond">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <div class="new-order__header">
          <div>
            <div class="new-order__heading">Данные груза</div>
            <label class="new-order__label text-dark"
              >Укажите данные груза</label
            >
          </div>
          <div>
            <div>
              <label
                v-if="!dontKnow"
                class="new-order__unknown-button cursor-pointer"
                for="dont-know"
              >
                Не знаю количество и размер</label
              >
              <label
                v-else
                class="new-order__know-button cursor-pointer"
                for="dont-know"
              >
                Я знаю количество и размер</label
              >
              <input
                v-model="dontKnow"
                type="checkbox"
                id="dont-know"
                class="new-order__unknown-input"
              />
            </div>
            <div class="belay-container">
              <span class="belay-text">Застраховать груз</span>
              <input class="belay-input" v-model="isBelay" type="checkbox" />
            </div>
          </div>
        </div>
        <div class="hidden-text" v-if="dontKnow">
          Ничего страшного! Менеджер свяжется с вами и уточнит детали
        </div>
        <div class="new-order__switch-container">
          <div
            v-for="(box, id) in boxes"
            :key="box.id"
            class="box-item"
            v-if="!dontKnow && boxes.length"
          >
            <!-- <div class="box-item__container" @click="editBox(box)">
              <div class="box-info" style="color: #2196f3; cursor: pointer">
                {{ id + 1 }}. Коробки: {{ box.count || 0 }} шт.,
                {{ box.type ? box.type + ',' : '' }} {{ box.length || 0 }} см x
                {{ box.width || 0 }} см x {{ box.height || 0 }} см ({{
                  boxSingleVolume(box.length, box.width, box.height)
                }}
                м3), {{ box.weight || 0 }} кг.
                {{ box.isBrand ? 'Брендовый товар' : '' }}
                [Всего:
                {{
                  boxVolume(
                    box.count || 0,
                    box.length || 0,
                    box.width || 0,
                    box.height || 0
                  )
                }}
                м3, {{ boxWeight(box.count, box.weight || 0) }} кг]
              </div>
            </div> -->
            <div v-if="box.forEdit" class="box-edit__form">
              <div class="box-type">
                <div class="box-type__title">Укажите характер груза</div>

                <div
                  class="dropdown align-self-end"
                  v-click-outside="closeDropDown"
                  :data-id="box.id"
                >
                  <button
                    class="dropdown-button__custom rounded-sm"
                    @click="openDrop(box)"
                  >
                    <span
                      v-if="!box.type.length"
                      class="dropdown-button__choose"
                      >Категория</span
                    >
                    {{ box.type }}
                    <span class="arrow" :class="{ up: box.isOpen }"></span>
                  </button>
                  <ul v-show="box.isOpen" class="dropdown-menu__custom shadow">
                    <li
                      v-for="type in types"
                      :key="type.title"
                      @click="handleSelect(box, type)"
                    >
                      {{ type.title }}
                    </li>
                  </ul>
                </div>
              </div>

              <div class="box-properties">
                <div class="property-container">
                  <div class="property-container__title">Длина, см</div>
                  <input
                    placeholder="0"
                    @input="replaceDot"
                    type="number"
                    class="form-control property-container__input rounded-sm text-dark"
                    v-model="box.length"
                  />
                </div>

                <div class="property-container">
                  <div class="property-container__title">Ширина,см</div>
                  <input
                    placeholder="0"
                    type="number"
                    @input="replaceDot"
                    class="form-control property-container__input rounded-sm text-dark"
                    v-model="box.width"
                  />
                </div>

                <div class="property-container">
                  <div class="property-container__title">Высота, см</div>
                  <input
                    placeholder="0"
                    type="number"
                    @input="replaceDot"
                    class="form-control property-container__input rounded-sm text-dark"
                    v-model="box.height"
                  />
                </div>

                <div class="property-container">
                  <div class="property-container__title">Вес, кг</div>
                  <input
                    placeholder="0"
                    type="number"
                    @input="replaceDot"
                    class="form-control property-container__input rounded-sm text-dark"
                    v-model="box.weight"
                  />
                </div>
              </div>

              <div class="box-count">
                <div class="delete-icon" @click="removeBox(box.id)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="right-0 h-6 w-6 text-gray-600 hover:text-red-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
                <div class="property-container-count">
                  <div class="property-container-count__title">
                    Количество, шт
                  </div>
                  <div
                    @click="addBoxCount(box.id)"
                    class="property-container-count__btn property-container-count__btn--add cursor-pointer"
                  >
                    <img
                      class="property-container-count__icon property-container-count__icon--add"
                      src="@/assets/img/order/add-count.svg"
                    />
                  </div>
                  <input
                    type="number"
                    v-model="box.count"
                    class="property-container-count__items-count"
                    readonly
                  />
                  <div
                    @click="removeBoxCount(box.id)"
                    class="property-container-count__btn property-container-count__btn--remove cursor-pointer"
                  >
                    <img
                      class="property-container-count__icon remove property-container-count__icon--remove"
                      src="@/assets/img/order/remove-count.svg"
                    />
                  </div>
                </div>

                <div class="box-count__brand">
                  <input type="checkbox" v-model="box.isBrand" />
                  <span>Брендовый товар</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="box-count__add-btn cursor-pointer"
            @click="addBox"
            v-if="!dontKnow"
          >
            <div class="icon-plus">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                class="right-0 h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <div class="text">Добавить коробку</div>
          </div>
        </div>
      </div>

      <div class="box-info__container" v-if="!dontKnow">
        <p class="box-info__item-total-title">Итого:</p>
        <div class="box-info__item">
          <span class="box-info__item-title">Количество коробок:</span>
          <span class="box-info__item-text">
            <template v-if="boxes.length"> {{ boxes.length }}</template>

            <template v-else> Не указан объём товара </template>
          </span>
        </div>
        <div class="box-info__item">
          <span class="box-info__item-title">Общий объём:</span>
          <span class="box-info__item-text">
            <template v-if="boxes.length">
              {{ totalVolume.toFixed(3) }} м3
            </template>

            <template v-else> Не указан объём товара </template>
          </span>
        </div>
        <div class="box-info__item">
          <span class="box-info__item-title">Общий вес:</span>
          <span class="box-info__item-text" v-if="boxes.length">
            {{ totalWeight }} кг
          </span>
          <span class="box-info__item-text" v-else> Не указан вес товара</span>
        </div>
        <div class="box-info__item">
          <span class="box-info__item-title">Средняя плотность:</span>
          <span
            class="box-info__item-text"
            v-if="boxes.length && totalWeight && totalVolume"
          >
            {{ density }} кг/м3
          </span>
          <span class="box-info__item-text" v-else>
            Не указан вес и объём товара</span
          >
        </div>
      </div>
      <!-- <div class="line"></div> -->

      <!-- <div class="belay-additional__info">
        <p>
          <span>Добровольное страхование</span> - стоимость в 2% от стоимости
          товара. При потере груза, транспортная компания возмещает
          застрахованную сумму и стоимость доставки из Китая до Москвы.
        </p>
        <p>
          <span>Обязательное страхование</span> - в данном случае при потере
          груза транспортная компания возвращает 5$ за кг. Например, если
          потеряется груз весом 10 кг, то транспортная компания возместит 50$ и
          стоимость доставки из Китая до Москвы.
        </p>
      </div> -->
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
// import компонент кнопки
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'OrderComponentInfo',
  props: [
    'courses',
    'types',
    'nextStep_btn_data',
    'prevStep_btn_data',
    'isKnowBoxCount',
    'boxesFromVuex',
  ],
  emits: ['prevStep', 'nextStep'],
  components: {
    Btn,
  },

  data() {
    return {
      dontKnow: false,
      forEdit: true,
      isOpen: false,
      boxes: [],
      isBelay: false,
    };
  },
  computed: {
    totalVolume() {
      let v = 0;
      this.boxes.forEach((item) => {
        v +=
          item.count * ((item.length * item.width * item.height) / 1_000_000);
      });
      v = Math.ceil(v * 1000) / 1000;
      this.$store.commit('parsing/SET_VOLUME', Number(v));
      return v;
    },

    totalWeight() {
      let w = 0;
      this.boxes.forEach((item) => {
        w += item.weight * item.count;
      });
      this.$store.commit('parsing/SET_TOTAL_WEIGHT', Number(w));
      return w;
    },

    density() {
      this.$store.commit(
        'parsing/SET_DENSITY',
        Number(this.totalWeight / Number(this.totalVolume).toFixed(3))
      );
      return Number((this.totalWeight / this.totalVolume).toFixed(3));
    },
  },
  watch: {
    isBelay() {
      // отслеживаем изменение чекбокса страхования
      this.$store.commit('parsing/SET_BELAY', this.isBelay); // отправляем новое значение во Vuex
    },

    packagesPrice(val) {
      this.$store.commit('parsing/SET_PACKAGE_PRICE', val);
    },

    dontKnow(val) {
      if (val) {
        this.boxes.length = 0;
        this.$store.commit('parsing/SET_BOXES_PRICE', 0);
        this.$store.commit('parsing/SET_BOX_TYPE_PRICE', 0);
        this.$store.commit('parsing/SET_BOXES', []);
      }
      this.$store.commit('parsing/SET_KNOW_BOX_COUNT', val);
    },

    boxes: {
      deep: true,
      immediate: true,
      handler(val) {
        let sum = 0;
        val.forEach((item) => {
          item.length = item.length.replace(/,/g, '.');
          item.width = item.width.replace(/,/g, '.');
          item.height = item.height.replace(/,/g, '.');
          item.weight = item.weight.replace(/,/g, '.');

          if (item.type === 'Одежда' || item.type === 'ХОЗ') {
            sum +=
              item.count *
              item.weight *
              this.courses.cny_rub *
              this.courses.usd_rub;
          } else {
            sum +=
              Number(item.count) *
              Number(item.weight) *
              Number(item.price) *
              this.courses.cny_rub *
              this.courses.usd_rub;
          }
        });
        this.$store.commit('parsing/SET_BOX_TYPE_PRICE', sum);
        this.$store.commit('parsing/SET_BOXES', val);
      },
    },
  },

  methods: {
    openDrop(box) {
      // Открывает выпадающее меню с характером груза
      box.isOpen = !box.isOpen;
    },

    handleSelect(box, option) {
      // обрабатываем выборзначения из выпадающего меню
      this.boxes.find((item) => item.id === box.id).isOpen = false;
      box.type = option.title;
      box.price = option.price;
      this.$store.commit('parsing/SET_BOX_COEF', box.price);
      this.isOpen = false;
    },

    checkBoxConditions() {
      let checkedBoxParametrs = [];
      this.boxes.array.forEach((element) => {
        checkedBoxParametrs = [...checkedBoxParametrs, element.length];
      });
      console.log('checkedBoxParametrs');
      console.log(checkedBoxParametrs);
      if (true) {
        return true;
      } else {
        this.$notify({
          type: 'warning',
          message: 'Проверьте параметры груза',
        });
        return false;
      }
    },

    addBox() {
      // добавляем новую коробку в список
      const box = {
        id: this.boxes[this.boxes.length - 1]?.id + 1 || 1,
        type: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        count: 1,
        price: 0,
        isBrand: false,
        forEdit: true,
        isOpen: false,
      };

      if (this.boxes.length > 0) {
        // если список коробок не пуст
        let checkedBoxParametrs = [];
        this.boxes.forEach((box) => {
          checkedBoxParametrs = [
            ...checkedBoxParametrs,
            Number(box.length),
            Number(box.width),
            Number(box.height),
            Number(box.weight),
            Number(box.count),
          ];
        });

        if (
          checkedBoxParametrs.filter((item) => item > 0).length ===
          this.boxes.length * 5
        ) {
          this.boxes = [...this.boxes, box];
        } else {
          this.$notify({
            type: 'warning',
            message: 'Проверьте параметры груза',
          });
        }
      } else {
        this.boxes = [...this.boxes, box];
      }
    },

    editBox(box) {
      // открываем для редактирования
      box.forEdit = !box.forEdit;
    },

    replaceDot(e) {
      // меняем запятые на точки
      e.target.value = e.target.value.replace(/,/g, '.');
    },
    boxSingleVolume(l, w, h) {
      return ((l * w * h) / 1_000_000).toFixed(2);
    },

    boxVolume(count, l, w, h) {
      return (
        Number(count) *
        ((Number(l) * Number(w) * Number(h)) / 1_000_000)
      ).toFixed(2);
    },

    boxWeight(count, w) {
      return (count * w).toFixed(2);
    },

    removeBox(id) {
      this.boxes = this.boxes.filter((b) => b.id !== id);
      if (this.boxes.length) {
        this.$store.commit('parsing/SET_BOX_COEF', this.boxes[0].price);
      } else {
        this.$store.commit('parsing/SET_BOX_COEF', 0);
      }
    },

    addBoxCount(boxId) {
      this.boxes.forEach((b) => {
        if (b.id === boxId) {
          b.count += 1;
        }
      });
    },

    removeBoxCount(boxId) {
      this.boxes.forEach((b) => {
        if (b.count <= 1) {
          this.removeBox(boxId);
        }
        if (b.id === boxId) {
          b.count -= 1;
        }
      });
    },

    closeDropDown(e) {},
  },
  mounted() {
    this.dontKnow = this.isKnowBoxCount;
    this.boxes = this.boxesFromVuex;
    this.isBelay = this.$store.getters['parsing/isBelay'];
    if (this.boxes.length === 0) {
      this.addBox();
    }
  },
};
</script>

<style lang="scss">
.new-order {
  font-family: 'SF UI Display', sans-serif;

  &__box {
    padding: 24px 24px 18px 24px;
  }

  &__heading {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: #000000;
    text-transform: none;
  }

  &__unknown-input {
    display: none;
  }

  &__unknown-button {
    cursor: pointer;
    padding: 8px 19px;
    border-radius: 3px;
    background: #d9dce2;
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #292824;
  }

  &__know-button {
    cursor: pointer;
    padding: 8px 19px;
    border-radius: 3px;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #292824;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
  }
}
.belay-container {
  display: flex;
  justify-content: flex-end;
}
.belay-text {
  margin-left: 6px;
  color: #393939;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-right: 12px;
}
.belay-input {
  width: 17px;
  height: 17px;
}

.belay-additional__info {
  border: 1px solid #d3dce6;
  border-radius: 6px;
  color: #393939;
  padding: 20px 40px;
  @media screen and (max-width: 480px) {
    padding: 4.17vw;
    border-radius: 1.25vw;
  }
  & p {
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
    }
    span {
      font-weight: 600;
    }
  }
}

.line {
  width: 100%;
  margin: 40px 0;
  height: 1px;
  background-color: #d3dce6;
  @media screen and (max-width: 480px) {
    margin: 4.17vw 0;
  }
}
.box-info__container {
  width: fit-content;
  border: 1px solid #d9dce2;
  border-radius: 7px;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-left: auto;
  @media screen and (max-width: 480px) {
    padding: 4.17vw;
    border-radius: 1.04vw;
    align-items: flex-start;
  }
  .box-info__item {
    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
    }

    &-total-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      color: #000000;
    }

    &-title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #393939;
      margin-right: 5px;
      @media screen and (max-width: 480px) {
        margin-right: 1.04vw;
      }
    }

    &-text {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }
}
.box-info {
  @media screen and (max-width: 480px) {
    font-size: 2.92vw;
  }
}
.box-type {
  &__title {
    font-size: 14px;
    line-height: 17px;
    color: #000000;
  }
  @media screen and (max-width: 480px) {
    font-size: 2.92vw;
  }
}
.dropdown-button__custom {
  border: 1px solid #dee2e6;
  background: white;
  height: 30px;
  width: 150px;
  border-radius: 10px;
  @media screen and (max-width: 992px) {
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    font-size: 2.92vw;
    padding: 1.67vw;
    height: 8.75vw;
    border-radius: 2.08vw;
  }
}
.dropdown-button {
  &__choose {
    color: #bbbcbd;
  }
}
.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #9ca4b1;
}
.arrow.up {
  transform: translateY(-50%) rotate(180deg);
}
.dropdown-menu__custom {
  background: white;
  list-style: none;
  padding: 0;
  margin-top: 4px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  white-space: nowrap;
  max-height: 300px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1;
  @media screen and (max-width: 480px) {
    margin-top: 0.83vw;
    border-radius: 1.67vw;
    max-height: 62.5vw;
  }
  & li {
    overflow-x: hidden;
    text-overflow: ellipsis;
    padding: 8px;

    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      padding: 1.67vw;
    }
  }
  & li:hover {
    background: #e6e6e6;
    cursor: pointer;
  }
}
.shadow {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}
.box-edit__form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .box-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 992px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    & .dropdown {
      @media screen and (max-width: 992px) {
        width: 100%;
      }
    }
  }

  .box-properties {
    margin-top: 20px;
    display: flex;
    gap: 12px;
  }
  .property-container {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__title {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
      }
    }

    &__input {
      height: 30px;
      max-width: 130px;
    }
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
      all: unset;
      caret-color: transparent;
      cursor: text;
      text-align: center;
      width: 40px;
    }

    &__btn {
      cursor: pointer;
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
.box-item {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  &__container {
    padding: 20px 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 1px solid #d3dce6;
    display: flex;
    align-items: center;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .delete-icon {
    display: flex;
    margin-right: 6px;
    cursor: pointer;
    @media screen and (max-width: 480px) {
      margin-right: 1.25vw;
    }
    & svg {
      width: 20px;
      height: 20px;
      @media screen and (max-width: 480px) {
        width: 4.17vw;
        height: 4.17vw;
      }
    }
    & svg:hover {
      stroke: red;
    }
  }
}
.icon-plus {
  width: 20px;
  height: 20px;
  display: flex;
  margin-right: 12px;
}
.switch-item {
  margin-bottom: 8px;
  padding: 20px 20px;
  border: 1px solid #d3dce6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    margin-bottom: 1.67vw;
    padding: 4.17vw;
    border-radius: 1.67vw;
    font-size: 2.92vw;
  }
  .hidden-text {
    margin-top: 8px;
  }
  &__content {
    display: flex;
    justify-content: space-between;
  }
  &.switch-btn {
    display: flex;
    align-items: center;
    flex-direction: row;
    cursor: pointer;
    padding: 18px 12px;
    margin-top: 8px;
    @media screen and (max-width: 480px) {
      padding: 3.75vw 2.5vw;
      margin-top: 1.67vw;
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

.box-count {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  &__add-btn {
    margin-top: 32px;
    width: fit-content;
    display: flex;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    color: #292824;

    border-radius: 3px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    padding: 10px 20px;
    user-select: none;
    cursor: pointer;
  }

  &__brand {
    display: flex;
    align-items: center;
    span {
      margin-left: 6px;
      @media screen and (max-width: 480px) {
        font-size: 2.92vw;
        margin-left: 1.25vw;
      }
    }
  }
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
