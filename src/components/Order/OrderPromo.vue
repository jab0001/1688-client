<template>
  <div class="promo-container">
    <div class="promo-container-text">У меня есть промокод</div>
    <input
      type="text"
      v-model="promo"
      class="form-control text-dark promo-input"
    />
    <div class="btn-place">
      <Btn 
        :btnData="checkPromo_btn_data" 
        @actionBtn="checkPromo" 
      />
    </div>
  </div>
</template>

<script>
import Btn from '@/components/ButtonUniver.vue';
import store from '@/store';

export default {
  components: {  Btn },                              // Компонент кнопка с дизайном
  data() {
    return {
      promo: '',
    };
  },
  computed: {
    checkPromo_btn_data() {                         // Параметры, передаваемые в кнопку
      return {
        name: 'Применить',                    // Текст на кнопке
        btnStyleName: ' checkPromoBtn',       // Название  класса стиля, (ex. "__styleNew") применяемого к  кнопкe, если нестандарт
        btnTextStyleName: ' btnTextStyle',    // Название  класса стиля, применяемого к тексту кнопки
      };
    },
  },
  methods: {                                      //Функция, привязанная к нажатию кнопки
    async checkPromo() {
      await this.$http
        .get(`/promo/${this.promo}/set`)
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Промокод успешно применен',
          });
          store.commit('auth/SET_USER_LONG_PROMO', response.data.data);
          this.promo = '';
        })
        .catch((error) => {
          this.promo = '';
          this.$notify({
            type: 'error',
            message: 'Сожалеем, промокод не был принят',
          });
        });
    },
  },
};
</script>

<style lang="scss">
.promo-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0 10px 0;

  @media screen and (min-width: 1001px) and (max-width: 1300px) {
    padding: 18px 0 7px 0;
  }

  @media screen and (min-width: 767px) and (max-width: 1000px) {
    padding: 1.6vw 0 0.8vw 0;
  }

  @media screen and (max-width: 767px) {
    padding: 1.8vw 0 1vw 0;
  }
}
.promo-container-text {
  margin-bottom: 5px;
  font-family: 'SF UI Text';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #1a1a1a;

  @media screen and (min-width: 767px) and (max-width: 1000px) {
    font-size: 0.8vw;
    line-height: 1.05vw;
  }
}
.promo-input {
  width: 88%;
  margin-left: 5%;
  margin-bottom: 10px;

  @media screen and (min-width: 1001px) and (max-width: 1200px) {
    width: 92%;
    margin-left: 3%;
    margin-bottom: 9px;
    height: 26px;
  }
  @media screen and (min-width: 901px) and (max-width: 1000px) {
    width: 96%;
    margin-left: 1%;
    margin-bottom: 8px;
    height: 25px;
  }
  @media screen and (min-width: 801px) and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 7px;
    height: 2.4vw;
  }
  @media screen and (min-width: 767px) and (max-width: 800px) {
    width: 100%;
    margin-left: 0;
    margin-bottom: 0.6vw;
    height: 2.4vw;
  }
}
.btn-place {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 17%;

  @media screen and (min-width: 1001px) and (max-width: 1200px) {
    padding: 0 15%;
  }
  @media screen and (min-width: 901px) and (max-width: 1000px) {
    padding: 0 12%;
  }
  @media screen and (min-width: 801px) and (max-width: 900px) {
    padding: 0 9%;
  }
  @media screen and (min-width: 768px) and (max-width: 800px) {
    padding: 0 5%;
  }
}
.checkPromoBtn {
  width: 100%;
  height: 25.27px;

  @media screen and (min-width: 801px) and (max-width: 900px) {
    height: 25px;
  }
  @media screen and (min-width: 768px) and (max-width: 800px) {
    height: 24px;
  }
}
</style>
