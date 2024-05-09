import Vue from 'vue';
import axios from 'axios';

const state = {
  headerTitle: 'Новый заказ', // заголовок страницы заказ: Новый заказ, заказ, черновик
  commissionPercent: 10, // комиссия по умолчанию, до применения промокодов и льготных комиссий юзера
  belayPercent: 2, // страхование - процент от стоимости товара
  isBelay: false, // нужно ли страховать товар
  courses: {
    // курсы валют для расчетов
    cny_rub: 99,
    usd_rub: 82,
  },
  isKnowBoxCount: false, // клиент знает количество коробок для упаковки заказанного товара
  orders: [], // массив предлагаемых товаров
  items: [], // массив заказанных товаров
  sendMethods: [], // способы отправки груза
  checkMethods: [
    // способы проверки товаров
    {
      id: 1,
      title: 'Отдельное фото/видео каждого товара',
      price: '3-5',
      priceBy: 'count',
      priceType: 'range',
      description:
        'Данная услуга подойдет для вас, если вы хотите быть уверены, что товар пришел от продавца в надлежащем качестве. Например, вы заказали сумки и хотите быть уверены, что швы сшиты качественно, замки работают и нет дефектов.<br>В таком случае мы попросим вас ответить на несколько вопросов о том как нам необходимо для вас сфотографировать товар, с каких ракурсов, на что необходимо сделать акцент в фото и видео.<br> Стоимость данной услуги – 5 юаней за одно фото/видео. При необходимости сделать более 10 фото/видео – 3 юаня.',
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
      title: 'Услуга пересчета товара на соответствие таблице вашего заказа',
      price: '0',
      priceBy: 'count',
      priceType: 'static',
      isActive: false,
      isShow: false,
      count: '',
      totalPrice: 0,
    },
  ],

  packagePrice: 0,
  totalPrice: 0,
  totalDeliveryPrice: 0,
  productPrice: 0, // стоимость заказанных товаров

  parsing: null,

  density: 0,
  totalWeight: 0,
  boxes: [],
  boxesPrice: 0,
  sendMethod: {},
  volume: 0,
  volumePrice: 0,

  address: {},
  productName: '',
  productUrl: [],
  phone: '',
  email: '',
  boxCoef: 0,
  boxTypePrice: 0,
  steps: [
    {
      id: 1,
      name: 'OrderComponentParsing',
      isReady: false,
    },
    {
      id: 2,
      name: 'OrderComponentInfo',
      isReady: false,
    },
    {
      id: 3,
      name: 'OrderComponentSend',
      isReady: false,
    },
    {
      id: 4,
      name: 'OrderComponentPackage',
      isReady: false,
    },
    {
      id: 5,
      name: 'OrderComponentReceive',
      isReady: false,
    },
    {
      id: 6,
      name: 'OrderComponentAdditionally',
      isReady: false,
    },
    {
      id: 7,
      name: 'OrderComponentProfile',
      isReady: false,
    },
    {
      id: 8,
      name: 'OrderComponentReady',
      isReady: false,
    },
  ],

  defaultPackageMethods: [],
  additionalPackageMethods: [],
  stocks: [
    {
      id: 1,
      city: 'Москва',
      country: 'РФ',
      home: '22',
      type: 'default',
      street: 'Подольских курсантов',
      name: 'Наш склад фулфилмента',
      isActive: false,
    },
  ],
  customAddress: [],
  clientName: '',
  comments: '',
  file: null,
  activePackageMethod: [],
};

const mutations = {
  /* удалить */
  SET_PRICE: (state, price) => {
    state.productPrice = price;
  },

  SET_PARSING(state, parsing) {
    state = parsing;
  },
  /* удалить */

  SET_COURSES: (state, payload) => {
    //TODO: Убрать if
    if (payload) {
      state.courses = payload;
    }
  },

  SET_COMMISSION: (state, payload) => {
    state.commissionPercent = payload;
  },

  SET_STOCKS: (state, payload) => {
    state.stocks = payload;
  },

  ADD_NEW_STOCK_ADDRESS: (state, payload) => {
    state.stocks = [...state.stocks, payload];
  },

  SET_ACTIVE_ADDRESS: (state, payload) => {
    if (!payload.isActive) {
      state.stocks.forEach((element) => (element.isActive = false));
      state.address = {};
    } else {
      state.stocks.forEach((element) => (element.isActive = false));
      state.stocks.filter((item) => item.id === payload.id)[0].isActive = true;
      state.address = state.stocks.filter((item) => item.id === payload.id)[0];
    }
  },

  SET_ACTIVE_TEMPLATE: (state, payload) => {
    state.headerTitle = 'Черновик';
    state.orders = payload.orders;
    state.isKnowBoxCount = payload.dontKnow;
    state.isBelay = payload.isBelay;
    state.boxes = payload.boxes;
    state.sendMethods = payload.sendMethods;
    state.defaultPackageMethods = payload.defaultPackageMethods;
    state.additionalPackageMethods = payload.additionalPackageMethods;

    let packageMethods = payload.defaultPackageMethods.concat(
      payload.additionalPackageMethods
    );

    state.activePackageMethod = packageMethods.filter((item) => item.isActive);
    state.checkMethods = payload.checkMethods;
    state.comments = payload.comments;
    state.items = payload.totalItems;
  },

  SET_ACTIVE_PACKAGE_METHOD: (state, payload) => {
    state.activePackageMethod = payload;
  },

  SET_ACTIVE_EDITABLE_ORDER: (state, payload) => {
    state.orders = payload.orderItems.map((orderItem) => {
      let itemsProp = [];
      let itemPrice = null;
      let itemCount = null;

      orderItem.items.forEach((item) => {
        if (item.model_id) {
          itemsProp.push(item.model_id);
        }
        if (item.option_id) {
          itemsProp.push(item.option_id);
        }
        itemCount = item.count;
        itemPrice = item.price;
      });
      const adaptedOrderItems = {
        url: orderItem.id,
        skus: {
          model: orderItem.items.map((item) => ({
            id: item.model_id,
            title: item.model_title,
            img: item.img,
          })),
          options: orderItem.items.map((item) => ({
            id: item.option_id,
            title: item.option_title,
          })),
        },

        skus_data: {
          [orderItem.items.map((item) => item.itemSkusKey)]: {
            prop: itemsProp,
            quantity: itemCount,
            price: itemPrice,
          },
        },

        title: orderItem.title,
        price: `¥${orderItem.items[0].price}`,
        image: orderItem.items[0].img,
      };
      return adaptedOrderItems;
    });

    const convertedObjects = state.orders.map((obj) => {
      const skusKey = Object.keys(obj.skus_data)[0];
      const sku = obj.skus_data[skusKey];
      const item = {
        id: obj.url,
        title: obj.title,
        items: [
          {
            id: `${sku.prop.join('-')}`,
            model_title: obj.skus.model[0].title,
            model_id: obj.skus.model[0].id,
            modelCount: String(sku.quantity),
            url: obj.url,
            itemSkusKey: skusKey,
            img: obj.image,
            option_title: obj.skus.options[0].title,
            option_id: obj.skus.options[0].id,
            variant: obj.skus.options[0].title,
            marker: Date.now(),
            count: sku.quantity,
            price: sku.price,
            sum: sku.price,
            delivery_china: 0,
            percent_commission: 10,
            course: 12.1,
          },
        ],
      };

      return item;
    });

    state.items = convertedObjects;

    //TODO: to utils
    const checkValuesEquality = (sendMethod, comparisonArray) => {
      const matchingObject = comparisonArray.find(
        (obj) =>
          obj.sendDate.includes(sendMethod.match(/\((.*?)\)/)?.[1]?.trim()) &&
          obj.title.trim() === sendMethod.replace(/\(.*?\)/, '').trim()
      );

      if (matchingObject) {
        matchingObject.isActive = true;
        return matchingObject;
      }

      return null;
    };

    state.isKnowBoxCount = payload.isKnowBoxCount;
    state.isBelay = payload.isBelay;
    state.boxes = payload.boxes;

    state.sendMethod = checkValuesEquality(
      payload.sendMethod,
      state.sendMethods
    );

    state.checkMethods = payload.checking;

    const packageMethods = state.defaultPackageMethods.concat(
      state.additionalPackageMethods
    );

    const filteredMethod = packageMethods.filter((method) => {
      if (method.id === payload.package) {
        return method;
      }
    });

    filteredMethod[0]['isActive'] = true;

    state.activePackageMethod = filteredMethod;

    state.productPrice = payload.totalProductPrice;
  },

  SET_CUSTOM_ADDRESS: (state, payload) => {
    state.customAddress = payload;
  },

  SET_DEFAULT_PACKAGE_METHODS: (state, payload) => {
    state.defaultPackageMethods = payload;
  },

  SET_ADDITIONAL_PACKAGE_METHODS: (state, payload) => {
    state.additionalPackageMethods = payload;
  },

  SET_CHECK_METHODS: (state, payload) => {
    state.checkMethods = payload;
  },

  SET_SEND_METHODS: (state, payload) => {
    state.sendMethods = payload;
  },

  CHOOSE_SEND_METHODS: (state, payload) => {
    state.sendMethods.forEach((element) => (element.isActive = false));
    state.sendMethod = {};
    if (payload.isActive) {
      state.sendMethods.filter((item) => item.id === payload.id)[0].isActive =
        payload.isActive;
    }
  },

  CHOOSE_DEFAULT_PACKAGE: (state, payload) => {
    state.defaultPackageMethods.forEach(
      (element) => (element.isActive = false)
    );
    state.additionalPackageMethods.forEach(
      (element) => (element.isActive = false)
    );
    state.defaultPackageMethods.filter(
      (item) => item.id === payload.id
    )[0].isActive = payload.isActive;
  },

  CHOOSE_ADDITIONAL_PACKAGE: (state, payload) => {
    state.defaultPackageMethods.forEach(
      (element) => (element.isActive = false)
    );
    state.additionalPackageMethods.forEach(
      (element) => (element.isActive = false)
    );
    state.additionalPackageMethods.filter(
      (item) => item.id === payload.id
    )[0].isActive = payload.isActive;
  },

  CLEAN_ORDER_DATA: (state) => {
    state.headerTitle = 'Новый заказ';
    state.productPrice = 0;
    state.packagePrice = 0;
    state.density = 0;
    state.totalWeight = 0;
    state.isBelay = false;
    state.boxes = [];
    state.boxesPrice = 0;
    state.sendMethod = {};
    state.isKnowBoxCount = false;
    state.totalPrice = 0;
    state.volume = 0;
    state.volumePrice = 0;
    state.totalDeliveryPrice = 0;
    state.address = {};
    state.productName = '';
    state.productUrl = [];
    state.orders = [];
    state.phone = '';
    state.email = '';
    state.items = [];
    state.boxCoef = 0;
    state.boxTypePrice = 0;
    state.sendMethods = [];
    state.checkMethods = [
      {
        id: 1,
        title: 'Отдельное фото/видео каждого товара',
        price: '3-5',
        priceBy: 'count',
        priceType: 'range',
        description:
          'Данная услуга подойдет для вас, если вы хотите быть уверены, что товар пришел от продавца в надлежащем качестве. Например, вы заказали сумки и хотите быть уверены, что швы сшиты качественно, замки работают и нет дефектов.<br>В таком случае мы попросим вас ответить на несколько вопросов о том как нам необходимо для вас сфотографировать товар, с каких ракурсов, на что необходимо сделать акцент в фото и видео.<br> Стоимость данной услуги – 5 юаней за одно фото/видео. При необходимости сделать более 10 фото/видео – 3 юаня.',
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
          'Данная услуга подойдет для вас, если вы хотите проверить каждую единицу товара на визуальный брак перед отправкой. <br>Целесообразно только при определенной цене товара. <br>Естественно, если у вас тысячи позиций со стоимостью 0.5 юаня за единицу, эта услуга не может быть актуальна. <br>Проще заложить некий процент брака или пересорта товара. <br>Эта услуга наиболее востребована, когда товар идет в индивидуальной упаковке. <br>Чтобы проверить каждую позицию, наши сотрудники бережно откроют каждую упаковку, осмотрят товар и запакуют его обратно. <br>И так по каждой единице товара из всей партии. <br>Если вы заказываете данную услугу, то после проверки товара наша компания несет ответственность за отсутствие бракованных позиций, которые мы должны выявить при проверке. К примеру, если вы заказали из партии 200 штук проверить только 10 штук, то мы гарантируем отсутствие 10 бракованных позиций. За брак, если такой обнаружится, среди остальных 190 позиций мы ответственности не несем. <br>Стоимость данной услуги — 3 юаня/шт., согласно вашему техническому заданию на проверку.',
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
          'Данная услуга подойдет для вас, если вы заказываете брендовый товар люкс качества и электронику или любой другой товар, который требует сложной детальной проверки и тестирования. <br>Приведем пару примеров: <br>— Вы заказали бредовую одежду/обувь/сумки и хотите быть уверены в качестве каждой единицы, чтобы убедиться, что вещи сшиты из качественных материалов, швы идеальные, размеры и цвет соответствуют заявленным при заказе, а все бирки на своих местах и соответствуют оригиналам. <br>— Вы заказали производство беспроводных наушников. Вам необходимо убедиться в работоспособности товара, проверить комплектацию и качество исполнения. <br>Это скрупулёзная и емкая по объему работ проверка, которая требует намного больше времени и особой внимательности. <br>При этом, вам не обязательно заказывать детальную проверку каждой позиции (если это конечно не брендовый товар). <br>Достаточно детально протестировать 1 изделие из партии, а для остальных позиций заказать услугу визуальной проверки на брак. <br>Для такой проверки мы с вами составим четкое техническое задание, по которому наши сотрудники на складе смогут выполнить данную проверку. <br>Стоимость данной услуги – 25 юаней/шт.',
        isActive: false,
        isShow: false,
        count: '',
        totalPrice: 0,
      },
      {
        id: 4,
        title:
          'Услуга пересчета товара на соответсветсвие таблице вашего заказа',
        price: '0',
        priceBy: 'count',
        priceType: 'static',
        isActive: false,
        isShow: false,
        count: '',
        totalPrice: 0,
      },
    ];
    state.defaultPackageMethods = [];
    state.additionalPackageMethods = [];
    state.stocks = [
      {
        id: 1,
        city: 'Москва',
        country: 'РФ',
        home: '22',
        type: 'default',
        street: 'Подольских курсантов',
        name: 'Наш склад фулфилмента',
        isActive: false,
      },
    ];
    state.customAddress = [];
    state.clientName = '';
    state.comments = '';
    state.file = null;
  },

  SET_PARSING: (state, parsing) => {
    state.parsing = parsing;
  },
  SET_VOLUME_PRICE: (state, price) => {
    state.volumePrice = price;
  },

  SET_DENSITY: (state, payload) => {
    state.density = payload;
  },
  SET_BELAY: (state, isBelay) => {
    state.isBelay = isBelay;
  },
  SET_SEND_METHOD: (state, payload) => {
    state.sendMethod = payload;
  },
  SET_TOTAL_WEIGHT: (state, payload) => {
    state.totalWeight = payload;
  },
  SET_KNOW_BOX_COUNT: (state, isKnow) => {
    state.isKnowBoxCount = isKnow;
  },
  SET_BOXES: (state, boxes) => {
    state.boxes = boxes;
  },

  SET_CHECK_METHODS: (state, payload) => {
    state.checkMethods = payload;
  },

  SET_VOLUME: (state, payload) => {
    state.volume = payload;
  },

  SET_PACKAGE_PRICE: (state, payload) => {
    state.packagePrice = payload;
  },

  SET_BOXES_PRICE: (state, payload) => {
    state.boxesPrice = payload;
  },
  SET_TOTAL_DELIVERY_PRICE: (state, payload) => {
    state.totalDeliveryPrice = payload;
  },

  SET_ADDRESS: (state, payload) => {
    state.address = payload;
  },
  SET_TOTAL_PRICE: (state, payload) => {
    state.totalPrice = payload;
  },
  SET_PRODUCT_NAME: (state, payload) => {
    state.productName = payload;
  },
  SET_PRODUCT_URL: (state, payload) => {
    state.productUrl = payload;
  },
  SET_ORDERS: (state, payload) => {
    state.orders = payload;
  },
  SET_PHONE: (state, payload) => {
    state.phone = payload;
  },
  SET_EMAIL: (state, payload) => {
    state.email = payload;
  },
  SET_CLIENT_NAME: (state, payload) => {
    state.clientName = payload;
  },
  SET_COMMENTS: (state, payload) => {
    state.comments = payload;
  },
  SET_FILE: (state, payload) => {
    state.file = payload;
  },
  SET_ITEMS: (state, payload) => {
    state.items = payload;
  },
  SET_BOX_COEF: (state, payload) => {
    state.boxCoef = payload;
  },
  SET_BOX_TYPE_PRICE: (state, payload) => {
    state.boxTypePrice = payload;
  },
  SET_STEPS: (state, payload) => {
    state.steps = payload;
  },
  SET_HEADER_TITLE: (state, title) => {
    state.headerTitle = title;
  },
};

const actions = {
  parsing_info({ commit, dispatch }, queryUrl) {
    return axios.get(`${url}/?url=${queryUrl}`).then((parsing) => {
      console.log(parsing);
      // commit('SET_PARSING', parsing);
    });
  },

  async apiSendMethods({ commit }) {
    await Vue.prototype.$http
      .get(`/settings`)
      .then((response) => {
        commit('SET_SEND_METHODS', response.data.data.settings.delivery);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async apiPackageMethods({ commit }) {
    await Vue.prototype.$http
      .get(
        `${process.env.APP_API_BASE_URL}settings?tg_id=${localStorage.getItem(
          'vue-authenticate.vueauth_access_token'
        )}&api_key=${localStorage.getItem('auth_key')}`
      )
      .then((response) => {
        commit(
          'SET_DEFAULT_PACKAGE_METHODS',
          response.data.data.settings.packages.filter((item) => !item.option)
        );
        commit(
          'SET_ADDITIONAL_PACKAGE_METHODS',
          response.data.data.settings.packages.filter((item) => item.option)
        );
      })
      .catch((error) => {
        console.log('e', error);
      });
  },
};

const getters = {
  draftTotalPrice: (state) => {
    let totalPrice = 0;
    for (let item of state.items) {
      for (let el of item.items) {
        totalPrice += el.price * el.modelCount * state.courses.cny_rub;
      }
    }
    return Math.round(totalPrice);
  },
  // стоимость товаров в заказе
  productPrice: (state) => {
    let totalPrice = 0;
    for (let item of state.items) {
      for (let el of item.items) {
        totalPrice += el.price * el.count * state.courses.cny_rub;
      }
    }
    return Math.round(totalPrice);
  },
  // возвращаем размер комиссии по заказу
  commission: (state, getters) =>
    Math.round((getters.productPrice * state.commissionPercent) / 100),
  // нужно ли страховать груз
  isBelay: (state) => state.isBelay,
  // сумма страхования  товаров в пути
  belaySum: (state, getters) =>
    state.isBelay
      ? Math.round((getters.productPrice * state.belayPercent) / 100)
      : 0,
  // сумма стоимости товара, комиссии и страховки
  orderItemSum: (state, getters) =>
    Math.round(getters.productPrice + getters.commission + getters.belaySum),
  // клиенту известно количество коробок в заказе
  isKnowBoxCount: (state) => state.isKnowBoxCount,
  // количество коробок в заказе
  boxesCount: (state) => {
    let bc = 0;
    state.boxes.forEach((item) => {
      bc += Number(item.count);
    });
    return bc;
  },
  //стоимость проверки товара
  checkingPrice: (state, getters) => {
    let active = state.checkMethods.filter((item) => item.isActive);
    let sum = 0;
    active.forEach((method) => {
      if (method.priceType === 'static' && method.priceBy === 'percent') {
        sum += (getters.orderItemSum * Number(method.price)) / 100;
      }
      if (method.priceType === 'static' && method.priceBy === 'count') {
        sum +=
          Number(method.count) * Number(method.price) * state.courses.cny_rub;
      }
      if (method.priceType === 'range' && method.priceBy === 'count') {
        let min = method.price.split('-')[0];
        let max = method.price.split('-')[1];

        if (method.count > 10) {
          sum += Number(
            (
              Number(min) *
              Number(method.count) *
              state.courses.cny_rub
            ).toFixed(2)
          );
        } else {
          sum += Number(
            (
              Number(max) *
              Number(method.count) *
              state.courses.cny_rub
            ).toFixed(2)
          );
        }
      }
    });
    return Math.round(sum);
  },
  // общая стоимость заказа
  totalPrice: (state, getters) =>
    Math.round(
      getters.orderItemSum +
        getters.checkingPrice +
        getters.deliveryPrice +
        getters.totalPackagePrice
    ),
  // данные для калькулятора
  orderDataForCalculator: (state, getters, _, rootGetters) => {
    // TODO: REFACTORING
    const commissionByPrice = [
      {
        orderPrice: 0,
        commission: 10
      },
      {
        orderPrice: 100_000,
        commission: 7
      },
      {
        orderPrice: 300_000,
        commission: 5
      },
      {
        orderPrice: 600_000,
        commission: 3
      },
      {
        orderPrice: 1_000_000,
        commission: 1.5
      },
    ]

    const findClosest = (object) => Object.values(object).reduce((prev, curr) => {
      return getters.productPrice - curr.orderPrice >= 0 ? curr : prev;
    });

    const commission = Math.min(rootGetters['auth/userLongPromoPercent'], findClosest(commissionByPrice).commission)
    //

    return {
      cny_rub: state.courses.cny_rub, // курс йены к рублю
      usd_rub: state.courses.usd_rub, // курс доллара к рублю
      orderSum: getters.productPrice, // сумма заказанной продукции
      userCommission: commission, // размер комиссии %
      orderCommission: Math.round(
        (getters.productPrice * commission) / 100
      ), // сумма комиссии по текущему заказу
      isBelay: state.isBelay, // выбрано ли страхование
      orderBelay: getters.belaySum, // сумма страхового платежа
      packagePrice: state.packagePrice, // стоимость упаковки
      deliveryPrice: getters.deliveryPrice, // стоимость доставки
      checkingPrice: getters.checkingPrice, // стоимость проверки товаров
      totalPrice: getters.totalPrice, // сумма заказа, итого
      warningText:
        'Внимание!! Указана предварительная стоимость доставки груза по маршруту Китай-Москва, исходя из заданных характеристик. Фактическая стоимость доставки может отличаться. За&nbsp;предварительным расчётом можете обратиться к нашим менеджерам. Не&nbsp;является публичной офертой',
      attentionText:
        'Стоимость доставки из Китая в РФ будет известна после поступления товара на склад',
    };
  },
  parsing: (state) => state.parsing,

  boxes: (state) => state.boxes,

  activePackages: (state) => state.activePackageMethod,
  volume: (state) => Number(state.volume),

  sendMethod: (state) => {
    if (state.sendMethods.filter((item) => item.isActive).length > 0) {
      return (state.sendMethod = state.sendMethods.filter(
        (item) => item.isActive
      )[0]);
    } else {
      return {};
    }
  },
  comments: (state) => state.comments,
  totalWeight: (state) => state.totalWeight,
  density: (state) => Number(state.density),
  volumePrice: (state) => state.volumePrice,
  packagePrice: (state) => Number(state.packagePrice.toFixed(2)),
  boxesPrice: (state) => state.boxesPrice,
  totalPackagePrice: (state) =>
    Number((state.boxesPrice + state.packagePrice).toFixed(2)),
  totalDeliveryPrice: (state) => Number(state.totalDeliveryPrice.toFixed(2)),
  address: (state) => state.address,
  productName: (state) => state.productName,
  productUrl: (state) => state.productUrl,
  orders: (state) => state.orders,
  phone: (state) => state.phone,
  email: (state) => state.email,
  items: (state) => state.items,
  boxCoef: (state) => state.boxCoef,
  boxTypePrice: (state) => state.boxTypePrice,
  deliveryPrice: (state) =>
    Math.round(Number(state.boxTypePrice) + Number(state.volumePrice)),
  usedPromo: (a, b, c, rootGetters) => {
    return !!rootGetters['auth/userLongPromo']
  },
  promo: (a, b, c, rootGetters) => {
    return rootGetters['auth/userLongPromo']
  },
  promoPercent: (a, b, c, rootGetters) => {
    return rootGetters['auth/userLongPromoPercent']
  },
  promoMinPrice: (a, b, c, rootGetters) => {
    return rootGetters['auth/userLongPromoMinPrice']
  },
  steps: (state) => state.steps,
  sendMethods: (state) => state.sendMethods,
  checkMethods: (state) => state.checkMethods,
  additionalPackageMethods: (state) => state.additionalPackageMethods,
  defaultPackageMethods: (state) => state.defaultPackageMethods,
  stocks: (state) => state.stocks,
  customAddress: (state) =>
    state.stocks.filter((stock) => stock.type === 'custom'),
  defaultAdress: (state) =>
    state.stocks.filter((stock) => stock.type === 'default'),
  file: (state) => state.file,
};

const parsing = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default parsing;
