<template>
    <div class="orderTabs">
        <ul class="orderTabs__body" >
            <li class="orderTabs__item" v-for="item in tabsData.arr" :key="item.id" >
                <div class="orderTabs__item__card"  >
                    <div class="orderTabs__item__name">
                        {{item.name}}
                    </div>
                    <div class="orderTabs__item__symbols">
                        <div class="orderTabs__item__symbols__cirle" :style=circleStyle(item.id) @click="$emit('changeTab', item.id)">
                                <div class="orderTabs__item__symbols__cirle__done"
                                    :style="item.id<=tabsData.maxStep ? 'display:flex' : 'display:none'">
                                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                         <path d="M3.69714 6.40009L1.45378 4.15673L0.705994 4.90452L3.69714 7.89566L10.1067 1.48607L9.35895 0.738281L3.69714 6.40009Z" fill="black"/>
                                    </svg>
                                </div>
                        </div>
                        <div class="orderTabs__item__symbols__line" :style=lineStyle(item.id) >
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['tabsData'],
  emits: ['changeTab'],
  methods: {
    lineStyle(step) {
      if (step === this.tabsData.arr.length) {
        return 'display:none';
      } else if (step === this.tabsData.maxStep) {
        return 'border: 2px dashed #F5DD6D;';
      } else if (step < this.tabsData.maxStep) {
        return 'border: 2px solid #F5DD6D;';
      } else if (step > this.tabsData.maxStep) {
        return 'border: 2px solid #D9DCE2;';
      } else {
        return 'display:flex';
      }
    },
    circleStyle(step) {
      if (step <= this.tabsData.maxStep) {
        return 'background: linear-gradient(180deg, #F5DD6D 0%, #FFCD4D 100%); cursor:pointer;';
      } else {
        return 'background: #D9DCE2;';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.orderTabs {
  padding: 30px 25px;
  width: 100%;
  border-bottom: 1px solid #d9dce2;

  @media screen and (max-width: 768px) {
    padding: 20px 15px;
  }
  @media screen and (max-width: 700px) {
    padding: 2%;
  }

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  &__item {
    flex-grow: 1;
    padding: 5px;
    list-style-type: none;

    &__card {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__name {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.03em;
      color: #000000;
      margin-bottom: 15px;

      @media screen and (max-width: 1600px) {
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 15px;
      }
      @media screen and (max-width: 1440px) {
        font-size: 14px;
        line-height: 17px;
        margin-bottom: 15px;
      }
      @media screen and (max-width: 1300px) {
        font-size: 1vw;
        line-height: 1.3vw;
        margin-bottom: 13.5px;
      }
      @media screen and (max-width: 1150px) {
        font-size: 0.9vw;
        line-height: 1.2vw;
        margin-bottom: 13.5px;
      }
      @media screen and (max-width: 1000px) {
        font-size: 0.8vw;
        line-height: 1.1vw;
        margin-bottom: 13.5px;
      }
      @media screen and (max-width: 768px) {
        font-size: 7.5px;
        line-height: 8px;
        margin-bottom: 10px;
      }
      @media screen and (max-width: 700px) {
        font-size: 7px;
        line-height: 8px;
        margin-bottom: 10px;
      }
      @media screen and (max-width: 600px) {
        font-size: 6px;
        line-height: 8px;
        margin-bottom: 9px;
      }
      @media screen and (max-width: 550px) {
        font-size: 5px;
        line-height: 6px;
        margin-bottom: 8px;
      }
      @media screen and (max-width: 500px) {
        font-size: 4.5px;
        line-height: 5px;
        margin-bottom: 7px;
      }
      @media screen and (max-width: 480px) {
        display: none;
      }
    }

    &__symbols {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__cirle {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        min-width: 16.44px;
        height: 16.44px;
        border-radius: 50%;
        background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);

        @media screen and (max-width: 400px) {
          min-width: 10px;
          height: 10px;
        }
        @media screen and (max-width: 300px) {
          min-width: 9px;
          height: 9px;
        }
        @media screen and (max-width: 280px) {
          min-width: 8px;
          height: 8px;
        }

        &__done {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
          width: 50%;
          height: 50%;
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: left center;
        }
      }

      &__line {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0 0 0 5px;
        width: 80%;
        height: 0px;
        border: 2px dashed #f5dd6d;
        background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
      }
    }
  }
}
</style>
