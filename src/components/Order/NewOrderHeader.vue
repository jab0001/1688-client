<template>
    <div class="new-order__header">
        <div class="new-order__header__content">
            <div class="new-order__header__name">
                {{ headerTitle }}
            </div>
            <div class="new-order__header__btnsPlace">
              <div class="new-order__header__btnPlace">
                <Btn :btnData="btn_data1" @actionBtn="$emit('addTemplate','Черновик')"/>
              </div>
              <div class="new-order__header__btnPlace">
                <Btn :btnData="btn_data2" @actionBtn="$emit('removeOrder')"/>
              </div>
            </div>
        </div>
    </div>  
</template>

<script >
// import компонент кнопки
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'NewOrderHeader',
  components: {
    Btn
  },
  props:['headerTitle'],
  emits: ['addTemplate', 'removeOrder'],
  computed: {
    btn_data1(){                                          // Параметры, передаваемые в кнопку
      return {
        name: "Добавить в черновки",                      // Текст на кнопке
        btnStyleName: " styleAddBtn",                     // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт 
        btnColor: "__grey"                                // Название  цветового решения ('__red', '__grey', )
      }  
    },
    btn_data2(){                                          // Параметры, передаваемые в кнопку
      return {
        name: "Отменить заказ",                           // Текст на кнопке
        btnStyleName: " styleRemoveBtn",                  // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт 
        btnColor: "__red"                                 //  Название  цветового решения ('__red', '__grey', )
      }  
    },
  }
}

  
</script>

<style lang="scss" scoped>
.new-order{

    &__header{
    width: 100%;
    margin-top: 46px;

    &__content{
      display: flex;

      @media screen  and (max-width: 766px){
        flex-direction: column;
      }
    }

    &__name{
      margin-left: 15px;
      font-family: "SF UI Display", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 31px;
      color: #292824;
      margin-right: 26px;
      @media screen and (min-width: 1701px)  and (max-width: 1800px){
        font-size: 27px;
        line-height: 29px;
        margin-left: 0  26px 0 15px;
      }
      @media screen and (min-width: 1601px)  and (max-width: 1700px){
        font-size: 26px;
        line-height: 29px;
        margin-left: 0  26px 0 15px;
      }
      @media screen and (min-width: 1441px)  and (max-width: 1600px){
        font-size: 25px;
        line-height: 29px;
        margin-left: 0  26px 0 15px;
      }
      @media screen and (min-width: 1201px)  and (max-width: 1440px){
        font-size: 24px;
        line-height: 29px;
        margin-left: 0  26px 0 15px;
      }
      @media screen and (min-width: 1001px)  and (max-width: 1200px){
        font-size: 23px;
        line-height: 27px;
        margin-left: 0  26px 0 15px;
      }
      @media screen and (min-width: 901px)  and (max-width: 1000px){
        font-size: 23px;
        line-height: 27px;
        margin-left: 0  25px 0 14px;
      }
      @media screen and (min-width: 767px)  and (max-width: 900px){
        font-size: 23px;
        line-height: 27px;
        margin-left: 0  25px 0 14px;
      }
      @media screen and (min-width: 700px)  and (max-width: 766px){
        font-size: 20px;
        line-height: 27px;
        margin-left: 0  25px 0 14px;
      }
    }

    &__btnsPlace{
      display: flex;
    }

    &__btnPlace{
      width: 170px;
      height: 30px;
      margin-left: 14px;
      @media screen and (min-width: 1701px)  and (max-width: 1800px){
        width: 165px;
        height: 29px;
        margin-left: 13px;
      }
      @media screen and (min-width: 1601px)  and (max-width: 1700px){
        width: 160px;
        height: 28px;
        margin-left: 12px;
      }
      @media screen and (min-width: 1441px)  and (max-width: 1600px){
        width: 155px;
        height: 27px;
        margin-left: 11px;
      }
      @media screen and (min-width: 1201px)  and (max-width: 1440px){
        width: 150px;
        height: 27px;
        margin-left: 11px;
      }
      @media screen and (min-width: 700px)  and (max-width: 766px){
        width: 135px;
      }
    }
  }
}

.styleAddBtn{
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  align-items: center;
  letter-spacing: 0.03em;
  text-decoration-line: underline;
}

.styleRemoveBtn{
  width: 100%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;
  letter-spacing: 0.03em;
  text-decoration-line: underline;
  opacity: 0.9
}

</style>