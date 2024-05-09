<template>
  <div class="new-order">
    <div class="new-order__inner">
      <NewOrderHeader
        :headerTitle="headerTitle"
        @addTemplate="addTemplate"
        @removeOrder="removeOrder"
      />
      <div class="new-order__desk">
        <div class="new-order__left-side">
          <OrderTabs
            class="bg-white"
            @changeTab="changeTab"
            :tabsData="tabsData"
          />
          <div class="new-order__activeTab bg-white">
            <OrderComponentParsing
              v-if="currStep === 1"
              :courses="courses"
              :orders="orders"
              :activeTemplate="activeTemplate"
              :editableOrderIsUsed="editableOrderIsUsed"
              :nextStep_btn_data="nextStep_btn_data"
              @changeCourseByPrice="changeCourseByPrice"
              @nextStep="nextStep"
            />
            <OrderComponentInfo
              v-if="currStep === 2"
              :courses="courses"
              :types="types"
              :boxesFromVuex="boxes"
              :isKnowBoxCount="isKnowBoxCount"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentSend
              v-if="currStep === 3"
              :sendMethods="sendMethods"
              :courses="courses"
              :density="density"
              :boxes="boxes"
              :volume="volume"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @chacngeSendMethod="chacngeSendMethod"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentPackage
              v-if="currStep === 4"
              :courses="courses"
              :boxesCount="boxesCount"
              :additionalPackageMethods="additionalPackageMethods"
              :defaultPackageMethods="defaultPackageMethods"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @choosePackageMethod="choosePackageMethod"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentReceive
              v-if="currStep === 5"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentAdditionally
              v-if="currStep === 6"
              :checkMethods="checkMethods"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @changeCheckMethod="changeCheckMethod"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentProfile
              v-if="currStep === 7"
              :courses="courses"
              :clientPhone="clientPhone"
              :clientEmail="clientEmail"
              :clientName="clientName"
              :phoneInOrder="phoneInOrder"
              :emailInOrder="emailInOrder"
              :clientNameInOrder="clientNameInOrder"
              :commentsInOrder="comments"
              :fileInOrder="file"
              :editableOrderIsUsed="editableOrderIsUsed"
              :nextStep_btn_data="nextStep_btn_data"
              :prevStep_btn_data="prevStep_btn_data"
              @prevStep="prevStep"
              @nextStep="nextStep"
            />
            <OrderComponentReady
              :file="file"
              :tg_id="tg_id"
              :clientName="clientName"
              :user="user"
              :promo="promo"
              :userCommission="userCommission"
              :orderCommission="orderCommission"
              :orderBelay="orderBelay"
              :defaultPackageMethods="defaultPackageMethods"
              :additionalPackageMethods="additionalPackageMethods"
              :activeTemplate="activeTemplate"
              :templateIsUsed="templateIsUsed"
              :editableOrder="activeEditableOrder"
              :editableOrderIsUsed="editableOrderIsUsed"
              v-if="currStep === 8"
              :prevStep_btn_data="prevStep_btn_data"
              @prevStep="prevStep"
            />
          </div>
        </div>
        <div class="new-order__right-side">
          <OrderCalculator :orderData="orderData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewOrderHeader from '@/components/Order/NewOrderHeader.vue';
import OrderCalculator from '@/components/Order/OrderCalculator.vue';
import OrderTabs from '@/components/Order/OrderTabs.vue';

import OrderComponentParsing from '@/components/Order/Tabs/OrderComponentParsing.vue';
import OrderComponentInfo from '@/components/Order/Tabs/OrderComponentInfo.vue';
import OrderComponentSend from '@/components/Order/Tabs/OrderComponentSend.vue';
import OrderComponentPackage from '@/components/Order/Tabs/OrderComponentPackage.vue';
import OrderComponentReceive from '@/components/Order/Tabs/OrderComponentReceive.vue';
import OrderComponentAdditionally from '@/components/Order/Tabs/OrderComponentAdditionally.vue';
import OrderComponentProfile from '@/components/Order/Tabs/OrderComponentProfile.vue';
import OrderComponentReady from '@/components/Order/Tabs/OrderComponentReady.vue';

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'NewOrder',
  components: {
    NewOrderHeader,
    OrderCalculator,
    OrderTabs,
    OrderComponentParsing,
    OrderComponentInfo,
    OrderComponentSend,
    OrderComponentPackage,
    OrderComponentReceive,
    OrderComponentAdditionally,
    OrderComponentProfile,
    OrderComponentReady,
  },
  data() {
    return {
      currStep: 1, // номер текущего этапа
      maxStep: 1, // номер максимального завершенного этапа
      types: [], // типы товаров для целей упаковки
      templateMenuActive: false,
      settings: {},
      nextStep_btn_data: {
        // Параметры, передаваемые в кнопку
        name: 'Далее', // Текст на кнопке
        btnStyleName: ' new-order__btn-place', // Название  класса стиля, (ex. " styleNew") применяемого к  кнопкe, если нестандарт
      },
      prevStep_btn_data: {
        // Параметры, передаваемые в кнопку
        name: 'Назад', // Текст на кнопке
        btnStyleName: ' new-order__btn-place', // Название  класса стиля, (ex. "styleNew") применяемого к  кнопкe, если нестандарт
        btnColor: '__grey', // Название  цветового решения ('__red', '__grey', )
      },
    };
  },

  computed: {
    // получаем данные из store Vuex
    ...mapState({
      courses: (state) => state.parsing.courses, // курсы валют для расчетов
      orders: (state) => state.parsing.orders,
      isBelay: (state) => state.parsing.isBelay, // выбрано ли страхование товаров клиентом
      boxCoef: (state) => state.parsing.boxCoef, //
      isKnowBoxCount: (state) => state.parsing.isKnowBoxCount, // клиенту известно количество коробок
      packagePrice: (state) => state.parsing.packagePrice, // стоимость услуг по упаковке
      defaultPackageMethods: (state) => state.parsing.defaultPackageMethods,
      additionalPackageMethods: (state) =>
        state.parsing.additionalPackageMethods,
      checkMethods: (state) => state.parsing.checkMethods, // методы проверки товаров
      density: (state) => state.parsing.density, // "плотность" груза - соотношение веса и объема
      volume: (state) => state.parsing.volume, // заявленный объем груза
      boxes: (state) => state.parsing.boxes, // заявленное количество коробок груза
      steps: (state) => state.parsing.steps,
      sendMethods: (state) => state.parsing.sendMethods, // методы/варианты отправки груза
      promoPercent: (state) => state.parsing.promoPercent, // процент промо в Vuex
      promoMinPrice: (state) => state.parsing.promoMinPrice, // минимальная сумма заказа для промо в Vuex
      phoneInOrder: (state) => state.parsing.phone, // номер телефона, указанный в данных нового заказа
      emailInOrder: (state) => state.parsing.email, // email, указанный в данных нового заказа
      clientNameInOrder: (state) => state.parsing.clientName, // имя клиента, указанное в данных нового заказа
      userCommission: (state) => state.parsing.commissionPercent, // процент комисси на заказ
      tg_id: (state) => state.parsing.tg_id,
      user: (state) => state.auth.user,
      templates: (state) => state.profileTemplate.templates, // черновики заказов
      headerTitle: (state) => state.parsing.headerTitle,
      comments: (state) => state.parsing.comments, // комментарии к заказу
      file: (state) => state.parsing.file,
      address: (state) => state.parsing.address, // выбраный для доставки адрес
    }),
    ...mapGetters({
      clientPhone: 'auth/userPhone',
      clientEmail: 'auth/userEmail',
      clientName: 'auth/userName',
      promo: 'auth/userLongPromo',
      promoMinPrice: 'auth/userLongPromoMinPrice',
      productPrice: 'parsing/productPrice', // стоимость товаров в заказе
      orderCommission: 'parsing/commission', // величина комиссии на заказ
      orderBelay: 'parsing/belaySum', // стоимость страховки
      orderItemSum: 'parsing/orderItemSum', // сумма стоимости товара, комиссии и страховки
      boxesCount: 'parsing/boxesCount', // количество коробок в заказе
      activePackages: 'parsing/activePackages', // выбранные методы упаковки груза
      checkingPrice: 'parsing/checkingPrice', // стоимость услуг по проверке товара
      orderForEdit: '',
      sendMethod: 'parsing/sendMethod', // выбранный метод отправки
      activeTemplate: 'profileTemplate/activeTemplate', // редактируемый черновик
      templateIsUsed: 'profileTemplate/templateIsUsed',
      editableOrderIsUsed: 'editableOrder/editableOrderIsUsed',
      activeEditableOrder: 'editableOrder/activeEditableOrder',
      totalPrice: 'parsing/totalPrice', // сумма заказа итого
      orderData: 'parsing/orderDataForCalculator', // входные данные для компонента OrderCalculator
    }),
    userMinPrice() {
      // минимальная сумма заказа в рублях
      return this.promo ? this.promoMinPrice : 100000;
    },
    tabsData() {
      // входные данные для переключателя/индикатора этапов оформления заказа
      return {
        arr: [
          { id: 1, name: 'Ссылка 1688.com' },
          { id: 2, name: 'Данные груза' },
          { id: 3, name: 'Отправка' },
          { id: 4, name: 'Упаковка' },
          { id: 5, name: 'Получение' },
          { id: 6, name: 'Доп услуги' },
          { id: 7, name: 'Ваши данные' },
          { id: 8, name: 'Готово' },
        ],
        currStep: this.currStep,
        maxStep: this.maxStep,
      };
    },

    isSendMethodActive() {
      return this.sendMethods.filter((item) => item.isActive) > 0
        ? true
        : false;
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
      return Math.round(sum);
    },
  },
  methods: {
    async getSettings() {
      //  получение установочных данных для пользователя от сервера
      await this.$http.get(`/settings`).then((response) => {
        this.$store.commit('parsing/CLEAN_ORDER_DATA');
        this.settings = response.data.data.settings;

        this.$store.commit('parsing/SET_COURSES', {
          usd_rub: this.settings.courses.usd_rub[0].course,
          cny_rub: this.settings.courses.cny_rub[0].course
        });

        this.$store.commit(
          'parsing/SET_SEND_METHODS',
          this.settings.delivery
        );
        this.types = this.settings.categories;

        this.$store.commit(
          'parsing/SET_DEFAULT_PACKAGE_METHODS',
          this.settings.packages.filter((item) => !item.option)
        );
        this.$store.commit(
          'parsing/SET_ADDITIONAL_PACKAGE_METHODS',
          this.settings.packages.filter((item) => item.option)
        );

        if (this.templateIsUsed) {
          let activeTemplate = this.activeTemplate.data;
          this.$store.commit('parsing/SET_ACTIVE_TEMPLATE', activeTemplate);
        }

        if (this.editableOrderIsUsed) {
          this.$store.commit(
            'parsing/SET_ACTIVE_EDITABLE_ORDER',
            this.activeEditableOrder
          );

          let preloadedDefaultPackageMethods =
            this.$store.getters['parsing/defaultPackageMethods'];
          let preloadedAdditionslPackageMethods =
            this.$store.getters['parsing/additionalPackageMethods'];

          let storedPackageMethod =
            this.$store.getters['parsing/activePackages'];

          //TODO: to utils
          function checkAndAddToArray(initialArray, targetArray) {
            const modifiedArray = targetArray.map((item) => {
              if (item.id === initialArray[0].id) {
                return { ...item, isActive: initialArray[0].isActive };
              }
              return item;
            });

            return modifiedArray;
          }

          //  TODO: to utils
          function createDeliveryObject(string) {
            const [country, city, street, home] = string.split(', ');

            const locationObject = {
              id: 1,
              isActive: true,
              name: 'Адрес доставки',
              type: 'default',
              country,
              city,
              street,
              home,
            };

            return [locationObject];
          }

          const deliveryFromEditableOrder = createDeliveryObject(
            this.$store.getters['editableOrder/editableOrderAddress']
          );

          this.$store.commit('parsing/SET_STOCKS', deliveryFromEditableOrder);
          this.$store.commit('parsing/SET_ADDRESS', deliveryFromEditableOrder);

          this.$store.commit(
            'parsing/SET_DEFAULT_PACKAGE_METHODS',
            checkAndAddToArray(
              storedPackageMethod,
              preloadedDefaultPackageMethods
            )
          );

          this.$store.commit(
            'parsing/SET_ADDITIONAL_PACKAGE_METHODS',
            checkAndAddToArray(
              storedPackageMethod,
              preloadedAdditionslPackageMethods
            )
          );

          this.$store.commit(
            'parsing/SET_HEADER_TITLE',
            this.$store.getters['editableOrder/editableOrderTitle']
          );

          this.$store.commit(
            'parsing/SET_COMMENTS',
            this.$store.getters['editableOrder/editableOrderComment']
          );
        }
      });
    },

    async changeCourseByPrice() {
      const findClosest = (object) => Object.values(object).reduce((prev, curr) => {
        return this.productPrice - curr.orderPrice >= 0 ? curr : prev;
      });

      this.$store.commit('parsing/SET_COURSES', {
        usd_rub: findClosest(this.settings.courses.usd_rub).course,
        cny_rub: findClosest(this.settings.courses.cny_rub).course
      })
    },

    async addTemplate(name) {
      // отрабатываем нажатие кнопки "Добавить черновик"
      await this.$http
        .post('/drafts', {
          data: JSON.stringify({
            name: name,
            orders: this.orders,
            totalItems: this.$store.getters['parsing/items'],
            isBelay: this.isBelay,
            dontKnow: this.isKnowBoxCount,
            boxes: this.boxes,
            sendMethods: this.sendMethods,
            price: this.productPrice,
            checkMethods: this.checkMethods,
            additionalPackageMethods: this.additionalPackageMethods,
            defaultPackageMethods: this.defaultPackageMethods,
            stocks: this.stocks,
            customAddress: this.customAddress,
            file: this.file,
            comments: this.comments,
          }),
        })
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Черновик успешно сохранен',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async autosaveTemplate() {
      if (!this.templateIsUsed) {
        if (this.activeTemplate && Object.keys(this.activeTemplate).length > 0) {
          await this.$http
            .patch(`/drafts/${this.activeTemplate.id}`, {
              data: JSON.stringify({
                name: 'авто-сохраненная заявка',
                orders: this.orders,
                totalItems: this.$store.getters['parsing/items'],
                isBelay: this.isBelay,
                dontKnow: this.isKnowBoxCount,
                boxes: this.boxes,
                sendMethods: this.sendMethods,
                price: this.productPrice,
                checkMethods: this.checkMethods,
                additionalPackageMethods: this.additionalPackageMethods,
                defaultPackageMethods: this.defaultPackageMethods,
                stocks: this.stocks,
                customAddress: this.customAddress,
                file: this.file,
                comments: this.comments,
              }),
            })
            .then((response) => {
              this.$store.commit(
                'profileTemplate/PUSH_TEMPLATE_TO_ACTIVE',
                response.data.data
              );
            });
        } else {
          await this.$http
            .post('/drafts', {
              data: JSON.stringify({
                name: 'авто-сохраненная заявка',
                orders: this.orders,
                totalItems: this.$store.getters['parsing/items'],
                isBelay: this.isBelay,
                dontKnow: this.isKnowBoxCount,
                boxes: this.boxes,
                sendMethods: this.sendMethods,
                price: this.productPrice,
                checkMethods: this.checkMethods,
                additionalPackageMethods: this.additionalPackageMethods,
                defaultPackageMethods: this.defaultPackageMethods,
                stocks: this.stocks,
                customAddress: this.customAddress,
                file: this.file,
                comments: this.comments,
              }),
            })
            .then((response) => {
              this.$store.commit(
                'profileTemplate/PUSH_TEMPLATE_TO_ACTIVE',
                response.data.data
              );
            });
        }
      }
    },

    removeOrder() {
      // отрабатываем нажатие кнопки "Удалить заказ"
      this.currStep = 1; // номер текущего этапа
      this.maxStep = 1;
      this.$store.commit('parsing/CLEAN_ORDER_DATA');
      this.$store.commit('profileTemplate/CLEAN_ACTIVE_TEMPLATE');
    },

    nextStep() {
      switch (this.currStep) {
        case 1:
          if (this.productPrice >= this.userMinPrice) {
            this.$notify({
              type: 'success',
              message: 'Уточним данные груза!',
            });
            this.currStep = 2;
            this.maxStep = 2;
            this.autosaveTemplate();
          } else {
            let warningMessage =
              'Заказ должен быть больше минимальной суммы ' +
              this.userMinPrice +
              ' руб.!';
            this.$notify({
              type: 'warning',
              message: warningMessage,
            });
          }
          break;
        case 2:
          if (this.isKnowBoxCount || this.boxes.length) {
            if (this.boxes.length) {
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
                this.$notify({
                  type: 'success',
                  message: 'Выберите метод доставки',
                });
                this.currStep = 3;
                this.maxStep = 3;
                this.autosaveTemplate();
              } else {
                this.$notify({
                  type: 'warning',
                  message: 'Проверьте параметры груза',
                });
              }
            } else {
              this.$notify({
                type: 'success',
                message: 'Выберите метод доставки',
              });
              this.currStep = 3;
              this.maxStep = 3;
              this.autosaveTemplate();
            }
          } else {
            this.$notify({
              type: 'warning',
              message: 'Укажите тип груза, размеры, вес и количество коробок',
            });
          }
          break;
        case 3:
          if (Object.keys(this.sendMethod).length > 0) {
            if (
              this.sendMethod.type === 'avia' &&
              this.density < 167 &&
              !this.isKnowBoxCount
            ) {
              this.$notify({
                type: 'warning',
                message: 'Средняя плотность должна быть не меньше 167',
              });
              return;
            }

            this.$notify({
              type: 'success',
              message: 'Теперь выберем упаковку!',
            });
            this.currStep = 4;
            this.maxStep = 4;
            this.autosaveTemplate();
          } else {
            this.$notify({
              type: 'warning',
              message: 'Выберите метод доставки',
            });
          }
          break;
        case 4:
          const check = this.activePackages.some(item => item.isActive)
          if (check) {
            this.currStep = 5;
            this.maxStep = 5;
            this.autosaveTemplate();
          } else {
            this.$notify({
              type: 'warning',
              message: 'Выберите метод упаковки',
            });
          }
          break;
        case 5:
          if (Object.keys(this.address).length > 0) {
            this.currStep = 6;
            this.maxStep = 6;
            this.autosaveTemplate();
          } else {
            this.$notify({
              type: 'warning',
              message: 'Необходимо выбрать адрес доставки',
            });
          }
          break;

        case 6:
        case 7:
          this.nextStepOnly(this.currStep);
          this.autosaveTemplate();
          break;
        default:
          this.currStep = 1;
          this.maxStep = 1;
      }
    },
    prevStep() {
      this.currStep -= 1;
    },
    nextStepOnly(currStep) {
      this.maxStep = ++this.currStep;
    },
    changeTab(step) {
      if (step <= this.maxStep) {
        this.currStep = step;
      }
    },
    valueForKg(methodId) {
      let method = this.sendMethods.filter((item) => item.id === methodId)[0];
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
    priceForDensity(methodId) {
      let method = this.sendMethods.filter((item) => item.id === methodId)[0];
      return method.minPrice;
    },
    chacngeSendMethod(methodData) {
      this.$store.commit('parsing/CHOOSE_SEND_METHODS', methodData);
      if (methodData.isActive) {
        if (this.density <= 100) {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.$store.getters['parsing/volume'] *
              this.priceForDensity(methodData.id) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        } else {
          this.$store.commit(
            'parsing/SET_VOLUME_PRICE',
            this.boxesCountAndWeight.weight *
              this.valueForKg(methodData.id) *
              this.courses.cny_rub *
              this.courses.usd_rub
          );
        }
      } else {
        this.$store.commit('parsing/SET_VOLUME_PRICE', 0);
      }
    },
    choosePackageMethod(methodData) {
      if (
        this.defaultPackageMethods.filter((item) => item.id === methodData.id)
          .length > 0
      ) {
        this.$store.commit('parsing/CHOOSE_DEFAULT_PACKAGE', methodData);
      } else {
        this.$store.commit('parsing/CHOOSE_ADDITIONAL_PACKAGE', methodData);
      }
      this.$store.commit('parsing/SET_PACKAGE_PRICE', this.packagesPrice);
    },

    changeCheckMethod(methodData) {
      console.log(methodData);
    },
  },
  mounted() {
    this.getSettings();
  },

  destroyed() {
    this.$store.commit('profileTemplate/CLEAN_ACTIVE_TEMPLATE');
    if (this.editableOrderIsUsed) {
      this.$store.commit('editableOrder/CLEAN_ACTIVE_EDITABLE_ORDER');
    }
  },
};
</script>

<style lang="scss">
.new-order {
  font-family: 'SF UI Display', sans-serif;
  max-width: 1700px;
  margin: 0 auto 0 25px;
  display: flex;
  flex-grow: 1;

  @media screen and (min-width: 1301px) and (max-width: 1920px) {
    width: calc(100% - 300px);
    margin: 0 25px;
  }

  @media screen and (min-width: 768px) and (max-width: 1300px) {
    width: calc(100% - 255px);
    margin: 0 25px;
  }

  @media screen and (max-width: 767px) {
    margin: 0 30px 0 25px;
  }

  &__inner {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__desk {
    width: 100%;
    display: flex;
    margin-top: 25px;

    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
  }

  &__left-side {
    width: 1207px;
    margin-right: 20px;

    @media screen and (min-width: 1301px) and (max-width: 1920px) {
      width: 860px;
      margin-right: 20px;
    }

    @media screen and (min-width: 767px) and (max-width: 1300px) {
      max-width: 777px;
      width: 74.43%;
    }

    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }

  &__right-side {
    width: 273px;

    @media screen and (min-width: 767px) and (max-width: 1300px) {
      width: 23.56%;
      max-width: 246px;
    }

    @media screen and (max-width: 767px) {
      width: 100%;
      margin-top: 10px;
    }
  }

  &__activeTab {
    width: 100%;
    min-height: 430px;
    display: flex;
    flex-direction: column;
  }

  &__box-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 18px 24px;
  }

  &__btn-place {
    min-width: 141px;
    width: 140px;
    height: 26px;
    font-family: 'SF UI Display', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    letter-spacing: 0.03em;
    text-decoration-line: underline;
    color: #292824;
    opacity: 0.9;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
  margin-bottom: 0 !important;
}

@media screen and (max-width: 480px) {
  .switch {
    width: 12.5vw;
    height: 5.83vw;
  }
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  right: 3px;
  left: 4px;
  bottom: 4px;
  background-color: #fff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

@media screen and (max-width: 480px) {
  .slider:before {
    height: 4.17vw;
    width: 4.17vw;
    right: 0.83vw;
    left: 0.83vw;
    bottom: 0.83vw;
  }
}

input:checked + .slider {
  background-color: #e1c74d;
}

input:focus + .slider {
  -webkit-box-shadow: 0 0 1px #e1c74d;
  box-shadow: 0 0 1px #e1c74d;
}

input:checked + .slider:before {
  -webkit-transform: translateX(30px);
  transform: translate(30px);
}

@media screen and (max-width: 480px) {
  input:checked + .slider:before {
    -webkit-transform: translateX(6.25vw);
    transform: translate(6.25vw);
  }
}

.slider.round {
  border-radius: 34px;
}

@media screen and (max-width: 480px) {
  .slider.round {
    border-radius: 7.08vw;
  }
}

.slider.round:before {
  border-radius: 50%;
}
</style>
