<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__input-box">
        <label class="new-order__label text-dark">
          Услуги по проверке товара
        </label>
        <div class="new-order__methods-container">
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
              <div class="price" @click.stop>
                <template v-if="method.priceBy === 'count'">
                  <span v-if='+method.price !== 0'>
                    {{ method.price }} ¥/шт.
                  </span>
                  <span v-else>
                    Бесплатно
                  </span>
                  <div class="count-container" v-if="method.isActive">
                    <input
                      v-model="method.count"
                      type="text"
                      class="form-control rounded-sm text-dark"
                      :placeholder="
                        !!method.count ? [[method.count]] : 'Количество'
                      "
                    />
                    шт.
                  </div>
                </template>
                <template v-if="method.priceBy === 'percent'">
                  {{ method.price }}% от стоимости
                </template>
              </div>
              <label class="switch">
                <input v-model="method.isActive" type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="method-description" v-if="method.isShow">
              <div class="line"></div>
              <div class="description">{{ method.description }}</div>
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
  name: 'OrderComponentAdditionally',
  data() {
    return {
      courses: {},
      activeMethods: [],
      checkMethods: [
        {
          id: 1,
          title: 'Отдельное фото/видео каждого товара',
          price: '3-5',
          priceBy: 'count',
          priceType: 'range',
          description:
            'Данная услуга подойдет для вас, если вы хотите быть уверены, что товар пришел от продавца в надлежащем качестве. Например, вы заказали сумки и хотите быть уверены, что швы сшиты качественно, замки работают и нет дефектов. В таком случае мы попросим вас ответить на несколько вопросов о том как нам необходимо для вас сфотографировать товар, с каких ракурсов, на что необходимо сделать акцент в фото и видео. Стоимость данной услуги – 5 юаней за одно фото/видео. При необходимости сделать более 10 фото/видео – 3 юаня.',
          isActive: false,
          isShow: false,
          count: '',
          totalPrice: 0,
        },
        {
          id: 2,
          title: 'Проверка товара на визуальный брак',
          price: '3',
          priceBy: 'count',
          priceType: 'static',
          description:
            'Данная услуга подойдет для вас, если вы хотите проверить каждую единицу товара на визуальный брак перед отправкой. Целесообразно только при определенной цене товара. Естественно, если у вас тысячи позиций со стоимостью 0.5 юаня за единицу, эта услуга не может быть актуальна. Проще заложить некий процент брака или пересорта товара. Эта услуга наиболее востребована, когда товар идет в индивидуальной упаковке. Чтобы проверить каждую позицию, наши сотрудники бережно откроют каждую упаковку, осмотрят товар и запакуют его обратно. И так по каждой единице товара из всей партии. Если вы заказываете данную услугу, то после проверки товара наша компания несет ответственность за отсутствие бракованных позиций, которые мы должны выявить при проверке. К примеру, если вы заказали из партии 200 штук проверить только 10 штук, то мы гарантируем отсутствие 10 бракованных позиций. За брак, если такой обнаружится, среди остальных 190 позиций мы ответственности не несем. Стоимость данной услуги — 3 юаня/шт., согласно вашему техническому заданию на проверку.',
          isActive: false,
          isShow: false,
          count: '',
          totalPrice: 0,
        },
        {
          id: 3,
          title: 'Детальная проверка каждого товара',
          price: '25',
          priceBy: 'count',
          priceType: 'static',
          description:
            'Данная услуга подойдет для вас, если вы заказываете брендовый товар люкс качества и электронику или любой другой товар, который требует сложной детальной проверки и тестирования. Приведем пару примеров: — Вы заказали бредовую одежду/обувь/сумки и хотите быть уверены в качестве каждой единицы, чтобы убедиться, что вещи сшиты из качественных материалов, швы идеальные, размеры и цвет соответствуют заявленным при заказе, а все бирки на своих местах и соответствуют оригиналам. — Вы заказали производство беспроводных наушников. Вам необходимо убедиться в работоспособности товара, проверить комплектацию и качество исполнения. Это скрупулёзная и емкая по объему работ проверка, которая требует намного больше времени и особой внимательности. При этом, вам не обязательно заказывать детальную проверку каждой позиции (если это конечно не брендовый товар). Достаточно детально протестировать 1 изделие из партии, а для остальных позиций заказать услугу визуальной проверки на брак. Для такой проверки мы с вами составим четкое техническое задание, по которому наши сотрудники на складе смогут выполнить данную проверку. Стоимость данной услуги – 25 юаней/шт.',
          isActive: false,
          isShow: false,
          count: '',
          totalPrice: 0,
        },
        {
          id: 4,
          title:
            'Услуга пересчета товара на соответствие таблице вашего заказа',
          price: '0',
          priceBy: 'count',
          priceType: 'static',
          description:
            'Если вам интересна любая из данных услуг, напишите вашему менеджеру, он проконсультирует вас и поможет составить правильное техническое задание.',
          isActive: false,
          isShow: false,
          count: '',
          totalPrice: 0,
        },
      ],
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

  computed: {
    checkMethodsFromVuex() {
      return this.$store.getters['profileTemplate/activeTemplate'].checkMethods;
    },

    steps() {
      return this.$store.getters['parsing/steps'];
    },
  },

  methods: {
    nextStep() {
      this.steps.find(
        (item) => item.name === 'OrderComponentAdditionally'
      ).isReady = true;
      this.$store.commit('parsing/SET_STEPS', this.steps);
      this.$emit('nextStep');
    },
  },

  watch: {
    checkMethodsFromVuex: function (nv) {
      this.checkMethods = nv;
    },

    checkMethods: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$store.commit('parsing/SET_CHECK_METHODS', val);
        const activeArr = val.filter((item) => item.isActive);
        this.activeMethods = activeArr;
        for (let item of this.activeMethods) {
          if (item.priceType === 'static' && item.priceBy === 'percent') {
            item.totalPrice =
              (this.$store.getters['parsing/orderItemSum'] *
                Number(item.price)) /
              100;
          }

          if (item.priceType === 'static' && item.priceBy === 'count') {
            item.totalPrice = item.count * Number(item.price);
          }

          if (item.priceType === 'range' && item.priceBy === 'count') {
            let min = item.price.split('-')[0];
            let max = item.price.split('-')[1];

            if (item.count > 10) {
              item.totalPrice = Number(
                (
                  Number(min) *
                  Number(item.count) *
                  this.courses.cny_rub
                ).toFixed(2)
              );
            } else {
              item.totalPrice = Number(
                (
                  Number(max) *
                  Number(item.count) *
                  this.courses.cny_rub
                ).toFixed(2)
              );
            }
          }
        }
      },
    },

    activeMethods(val) {
      this.$store.commit('parsing/SET_CHECKING', val);
      let sum = 0;
      for (let item of val) {
        sum += Number(item.totalPrice) * this.courses.cny_rub;
      }
      this.$store.commit('parsing/SET_CHECKING_PRICE', sum);
    },
  },
  async mounted() {
    this.courses = this.settings.courses;
    if (this.$store.getters['profileTemplate/templateIsUsed']) {
      this.checkMethods = this.checkMethodsFromVuex;
      this.$forceUpdate();
    }
  },
};
</script>

<style lang="scss" scoped>
.new-order__methods-container {
  display: flex;
  flex-direction: column;

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
    &.active {
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
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
