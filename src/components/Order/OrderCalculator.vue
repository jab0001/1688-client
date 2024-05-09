<template>
  <div class="calc1">
    <div class="calc1__inner bg-white">
      <div class="calc1__header">
        <h2 class="calc1__title">Предварительный расчет стоимости</h2>
      </div>
      <!-- <div class="calc1__courses">
        <div class="calc1__course" style="">
          1 ¥ =  {{ orderData.cny_rub || 15}} ₽
        </div>
        <div class="calc1__course" style="">
          1 $ =  {{ orderData.usd_rub || 100}} ₽
        </div>
      </div> -->
      <div class="calc1__body">
        <ul class="calc1__list">
          <li class="calc1__item">
            <div class="calc1__item__name">Сумма <br /> заказа:</div>
            <span> {{ orderData.orderSum || 0}} ₽ </span>
          </li>
          <li class="calc1__item">
            <div class="calc1__item__name">Комиссия <br /> ({{ orderData.userCommission ?? 10}}%)</div>
            <span> {{ orderData.orderCommission || 0}} ₽ </span>
          </li>
          <li class="calc1__item"
              v-if="orderData.isBelay">
              <div class="calc1__item__name">Страховой сбор <br /> (2%)</div>
            <span> {{  orderData.orderBelay || 0 }} ₽ </span>
          </li>
          <li class="calc1__item" >
            <div class="calc1__item__name">Стоимость доставки</div>
            <span> {{ orderData.deliveryPrice || 0 }}  ₽ </span>
          </li>
          <li class="calc1__item" v-if="orderData.packagePrice > 0" >
            <div class="calc1__item__name">Стоимость упаковки</div>
            <span>{{ orderData.packagePrice || 0 }} ₽ </span>
          </li>
          <li class="calc1__item" v-if="orderData.checkingPrice > 0" >
            <div class="calc1__item__name">Доп.проверка <br /> товара</div>
            <span>{{ orderData.checkingPrice || 0 }} ₽ </span>
          </li>
          <li class="calc1__item calc1__text--bold">
            <div class="calc1__item__name">Итого по <br /> заказу:</div>
            <span> {{ orderData.totalPrice || 0 }} ₽ </span>
          </li>
        </ul>
      </div>
      <div class="calc1__hr"></div>
      <div class="calc1__footer">
        <h2 class="calc1__attention"  v-html="orderData.attentionText"></h2>
      </div>
      <div class="calc1__hr"></div>
      <OrderPromo />
      <div class="calc1__wantCodeLink">
        <a href="https://dkhvan.ru/"><span class="calc1__wantCodeLink__link"> хочу промокод </span></a>
      </div>
    </div>
    <div class="calc1__outher">
      <div class="calc1__outher__body" v-html="orderData.warningText"></div>
    </div>
  </div>
</template>

<script>
// импортируем компонент применения промо-кода
import OrderPromo from '@/components/Order/OrderPromo.vue';

export default {
  props: ['orderData'],
  components: { OrderPromo },
};
</script>

<style lang="scss" scoped>
.calc1 {
  color: #000000;
  background-color: #F8F9FE;
  max-width: 382px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 992px) {
    max-width: 98%;
  }

  &__outher {
    width: 100%;
    padding: 21px 28px 10px 28px;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.71px;
    letter-spacing: 0.03em;
    color: #3F3E3B;
    opacity: 0.5;

    @media screen and (min-width: 1001px)  and (max-width: 1300px){
      padding: 15px 20px 7px 20px;
      font-size: 7px;
      line-height: 8.8px;
    }

    @media screen and (min-width: 767px)  and (max-width: 1000px){
      padding: 1.2vw 1.8vw 0 1.8vw;
      font-size: 0.7vw;
      line-height: 0.88vw;
    }

    @media screen  and (max-width: 766px){
      padding: 1.2vw 1.8vw 0 1.8vw;
      font-size: 1vw;
      line-height: 1.1vw;
      margin-bottom: 3vw;
    }
  }

  &__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 22px 20.5px 22px 19.5px;

    @media screen and (min-width: 1001px)  and (max-width: 1300px){
      padding: 12.2% 3.25% ;
    }

    @media screen and (min-width: 851px)  and (max-width: 1000px){
      padding: 1.1vw  0.3vw;
    }

    @media screen and (min-width: 767px)  and (max-width: 850px){
      padding: 1vw  0.25vw;
    }

    @media screen and (min-width: 481px)  and (max-width: 766px){
      padding: 1vw  0.25vw;
    }

    @media screen and (max-width: 480px) {
      padding: 1.5vw 0.5vw;
      gap: 1vw;
    }
  }

  &__header {
    width: 100%;
    padding: 0 11% 0 11%;
    margin-bottom: 20px;
    user-select: none;

    @media screen and (min-width: 851px)  and (max-width: 1000px){
      margin-bottom: 1.75vw;
    }
    @media screen and (min-width: 767px)  and (max-width: 850px){
      margin: 1vw 0 1.5vw 0;
    }
    @media screen and (min-width: 481px)  and (max-width: 766px){
      margin: 2vw 0 1.5vw 0;
    }
    @media screen and (max-width: 480px) {
      margin: 2vw 0 1.5vw 0;
    }
  }

  &__title {
    font-style: normal;
    font-weight: 600;
    font-size: 16.5px;
    line-height: 19px;
    text-align: center;
    user-select: none;
    @media screen and (min-width: 1441px)  and (max-width: 1520px){
      font-size: 1vw;
      line-height: 1.15vw;
    } 
    @media screen and (min-width: 1441px)  and (max-width: 1520px){
      font-size: 16.5px;
      line-height: 19.5px;
    } 
    @media screen and (min-width: 1301px)  and (max-width: 1440px){
      font-size: 16px;
      line-height: 19px;
    } 
    @media screen and (min-width: 1001px)  and (max-width: 1300px){
      font-size: 14px;
      line-height: 17px;
    }
    @media screen and (min-width: 767px)  and (max-width: 1000px){
      font-size: 1.2vw;
      line-height: 1.28vw;
    }
    @media screen and (min-width: 481px)  and (max-width: 766px){
      font-size: 3vw;
      line-height: 3.3vw;
    }
    @media screen and (max-width: 480px) {
      font-size: 5vw;
      line-height: 5.5vw;
    }
  }

  &__courses {
    display: flex;
    justify-content: center;
    padding: 0 10.5%;
    width: 100%;
    margin-bottom: 20px;

    @media screen and (max-width: 1350px){
      padding: 0 10%;
    } 

    @media screen and (max-width: 480px) {
      padding: 0 15%;
    }
  }

  &__course {
    border: 1px solid #D7D7D7;
    border-radius: 1px;
    padding: 4px 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: 0.03em;
    user-select: none; 


    @media screen and (min-width: 1521px)  and (max-width: 1920px){
      font-size: 0.7vw;
      line-height: 0.82vw;
    } 
    @media screen and (min-width: 1250px)  and (max-width: 1520px){
      font-size: 12px;
      line-height: 14px;
    } 
    @media screen and (min-width: 1201px)  and (max-width: 1250px){
      font-size: 11.5px;
      line-height: 13.5px;
    }  
    @media screen and (min-width: 1151px)  and (max-width: 1200px){
      font-size: 8.5px;
      line-height: 10.8px;
      padding: 5px 8px;
    }
    @media screen and (min-width: 1061px)  and (max-width: 1150px){
      font-size: 8.3px;
      line-height: 10.5px;
      padding: 5px 8px;
    }
    @media screen and (min-width: 1001px)  and (max-width: 1060px){
      font-size: 8px;
      line-height: 10px;
      padding: 4px 6px;
    }
    @media screen and (min-width: 767px)  and (max-width: 1000px){
      font-size: 0.6vw;
      line-height: 0.7vw;
      padding: 0.4vw 0.6vw;
    }
    @media screen and (min-width: 481px)  and (max-width: 766px){
      font-size: 2vw;
      line-height: 2.2vw;
      padding: 1vw 2vw;
      border-radius: 0;
    }

    @media screen and (max-width: 480px) {
      font-size: 2.7vw;
      line-height: 3.2vw;
      padding: 1vw 2vw;
      border-radius: 0;
    }
  }
  
  &__hr {
    height: 1px;
    opacity: 0.6;
    border: 1px solid #D9DCE2;
    width: 100%;
  }

  &__footer {
    padding: 20px 16px 20px 16px;

    @media screen and (min-width: 1001px)  and (max-width: 1200px){
      padding: 16px 10px;
    }

    @media screen and (min-width: 851px)  and (max-width: 1000px){
      padding: 12px 8px;
    }

    @media screen and (min-width: 767px)  and (max-width: 850px){
      padding: 0.9vw 0.6vw;
    }

    @media screen and (max-width: 766px) {
      padding: 2vw 1vw;
    }
  }

  &__attention {
    font-style: normal;
    font-weight: 700;
    font-size: 13.5px;
    line-height: 15px;
    letter-spacing: 0.03em;
    text-align: left;
    user-select: none;
    @media screen and (min-width: 1521px)  and (max-width: 1920px){
      font-size: 0.7vw;
      line-height: 0.82vw;
    } 
    @media screen and (min-width: 1441px)  and (max-width: 1520px){
      font-size: 11px;
      line-height: 14.32px;
    } 
    @media screen and (min-width: 1251px)  and (max-width: 1440px){
      font-size: 11px;
      line-height: 14px;
    } 
    @media screen and (min-width: 1201px)  and (max-width: 1250px){
      font-size: 10px;
      line-height: 13px;
    }  
    @media screen and (min-width: 1001px)  and (max-width: 1200px){
      font-size: 10px;
      line-height: 12.5px;
    }
    @media screen and (min-width: 767px)  and (max-width: 1000px){
      font-size: 0.8vw;
      line-height: 1vw;
    }
    @media screen and (max-width: 766px) {
      font-size: 2.2vw;
      line-height: 2.6vw;
    }
  }

  
  &__body {
    padding: 0px 9px 0px 9px;

    @media screen and (max-width: 480px) {
      padding: 6.25vw 6.25vw 0 6.25vw;
    }
  }

  &__list {
    padding-left: 0px;
    list-style: none;
    gap: 8px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 480px) {
      gap: 3vw;
    }
  }

  &__item {
      display: flex;
      justify-content: space-between;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 17px;
      letter-spacing: 0.03em;
      user-select: none;
      @media screen and (min-width: 1521px)  and (max-width: 1920px){
        font-size: 0.7vw;
        line-height: 0.8vw;
      } 
      @media screen and (min-width: 1441px)  and (max-width: 1520px){
        font-size: 15px;
        line-height: 17.5px;
      } 
      @media screen and (min-width: 1301px)  and (max-width: 1440px){
        font-size: 14px;
        line-height: 17px;
      } 
      @media screen and (min-width: 1201px)  and (max-width: 1300px){
        font-size: 13px;
        line-height: 16px;
      }
      @media screen and (min-width: 1121px)  and (max-width: 1200px){
        font-size: 10px;
        line-height: 14px;
      }
      @media screen and (min-width: 1051px)  and (max-width: 1120px){
        font-size: 9px;
        line-height: 11px;
      }
      @media screen and (min-width: 1001px)  and (max-width: 1050px){
        font-size: 8.2px;
        line-height: 9.8px;
      }
      @media screen and (min-width: 767px)  and (max-width: 1000px){
        font-size: 0.6vw;
        line-height: 0.88vw;
      }
      @media screen and (min-width: 481px) and (max-width: 766px) {
        font-size: 2.2vw;
        line-height: 2.6vw;
      }
      @media screen and (max-width: 480px) {
        font-size: 2.7vw;
      }

      &__name{
        max-width: 131px;
      }
    }

  &__text {
    font-style: normal;
    font-weight: 700;
font-size: 14px;
line-height: 17px;
      letter-spacing: 0.03em;

    &--bold {
      font-weight: 700;
      font-size: 15px;
      line-height: 17px;
      letter-spacing: 0.03em;
      margin-top: 12px;
      @media screen and (min-width: 1521px)  and (max-width: 1920px){
        font-size: 0.7vw;
        line-height: 0.8vw;
      } 
      @media screen and (min-width: 1441px)  and (max-width: 1520px){
        font-size: 14,5px;
        line-height: 17.5px;
      } 
      @media screen and (min-width: 1301px)  and (max-width: 1440px){
        font-size: 14px;
        line-height: 17px;
      } 
      @media screen and (min-width: 1201px)  and (max-width: 1300px){
        font-size: 13px;
        line-height: 13px;
      }
      @media screen and (min-width: 1001px)  and (max-width: 1200px){
        font-size: 10px;
        line-height: 12px;
      }
      @media screen and (min-width: 767px)  and (max-width: 1000px){
        font-size: 0.6vw;
        line-height: 0.88vw;
      }
      @media screen and (min-width: 481px) and (max-width: 766px) {
        font-size: 2.2vw;
        line-height: 2.6vw;
      }
      @media screen and (max-width: 480px) {
        font-size: 2.7vw;
      }
    }
 }

  &__wantCodeLink {
    width: 100%;
    display: flex;
    justify-content: center;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;


    &__link {
      text-decoration-line: underline;
      color: #000000;
    }
  }

  &__block {
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    @media screen and (max-width: 480px) {
      padding: 0 6.25vw;
      margin-top: 6.25vw;
    }
  }

  &__promo {
    border: none;
    width: 90%;
    outline: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 0px 10px;

    @media screen and (max-width: 480px) {
      font-size: 2.92vw;
      padding: 0 2.08vw;
    }

    &__button {
      background: transparent;
      border: none;
      outline: none;
      padding: 0;

      & > svg {
        width: 24px;
        height: 24px;

        @media screen and (max-width: 480px) {
          width: 5vw;
          height: 5vw;
        }
      }
    }
  }
}
</style>
