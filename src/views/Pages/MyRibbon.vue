<template>
  <div class="ribbon">
    <h2 class="ribbon__page-name">Лента</h2>
    <div class="ribbon__side ribbon__side-left">
      <h3 class="ribbon__title ribbon__title-status">Уведомления</h3>
      <div class="ribbon__wrapper-status">
        <img src="@/assets/img/icons/inform.svg" alt="" />
        <p class="ribbon__text ribbon__text-information">
          {{ getNotice.text }}
        </p>
      </div>
      <h3 class="ribbon__title ribbon__title-orders">Статусы ваших заказов</h3>
      <ul class="ribbon__list ribbon__list-orders">
        <li class="ribbon__item ribbon__item-orders" v-if="!getOrders">
          <p class="ribbon__text ribbon__text-order" style="border: none">
            Пока у вас еще нет заказов
          </p>
        </li>
        <router-link
          tag="li"
          :to="`/order/${order.id}`"
          class="ribbon__item ribbon__item-orders"
          v-else
          v-for="order in getOrders"
          :key="order.id"
        >
          <p class="ribbon__text ribbon__text-order">
            {{ formatDateTime(order.updated_at) }}
            <span class="ribbon__text-decoration">{{ order.marking }}</span>
          </p>
          <div class="ribbon__line"></div>
          <p class="ribbon__text-status">{{ order.status_product }}</p>
        </router-link>
      </ul>
    </div>
    <div class="ribbon__side ribbon__side-right">
      <h3 class="ribbon__title ribbon__title-information">Важная инфомация</h3>
      <ul class="ribbon__list ribbon__list-information">
        <li
          class="ribbon__item ribbon__item-information"
          v-for="(banner, index) in getFeeds"
          :key="index"
        >
          <img
            :src="formattedUrl(banner.image.path)"
            v-if="banner?.image.path"
          />
          <span v-else class="ribbon__text-banner">Банер {{ index }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      banners: [1, 2, 3, 4],
    };
  },

  computed: {
    getFeeds() {
      return this.$store.getters['ribbon/getFeedsList'];
    },
    getNotice() {
      return this.$store.getters['ribbon/getNotice'];
    },
    getOrders() {
      return this.$store.getters['ribbon/getOrdersList'];
    },
  },
  methods: {
    addLeadingZero(num) {
      return num < 10 ? '0' + num : num;
    },
    formatDateTime(order) {
      let date = new Date(order);
      var year = date.getUTCFullYear();
      var month = this.addLeadingZero(date.getUTCMonth() + 1);
      var day = this.addLeadingZero(date.getUTCDate());
      var hours = this.addLeadingZero(date.getUTCHours());
      var minutes = this.addLeadingZero(date.getUTCMinutes());
      var formattedDate =
        day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ' МСК';
      return formattedDate;
    },
    formattedUrl(link) {
      if (link) {
        const home = process.env.STATIC_FILES_HOST;
        return `${home}/${link}`;
      }
    },
    async getDataFeeds() {
      await this.$store.dispatch('ribbon/fetchFeedsList');
    },
    async getDataNotice() {
      await this.$store.dispatch('ribbon/fetchNotice');
    },
    async getDataOrders() {
      await this.$store.dispatch('ribbon/fetchOrdersList');
    },
  },

  async mounted() {
    await this.getDataNotice();
    await this.getDataFeeds();
    await this.getDataOrders();
  },
};
</script>

<style lang="scss">
ul,
li,
h3,
h2,
p {
  padding: 0;
  margin: 0;
  list-style: none;
}

.ribbon {
  padding: 48px 40px 50px 40px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;

  &__line {
    flex-grow: 1;
    height: 1px;
    background: #e0e0e0;
  }

  &__list {
    display: flex;
    flex-direction: column;

    &-information {
      margin-top: 13px;
      width: 77%;
    }
  }

  &__item {
    border-radius: 4px;
    background: #fff;

    &-orders {
      margin-top: 18px;
      padding: 16px 17px 14px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      border: 1px solid transparent;

      cursor: pointer;

      &:hover {
        border: 1px solid #e5e6eb;
      }
    }

    &-information {
      min-height: 105px;
      max-width: 437px;
      border-radius: 4px;
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 18px;
      }

      img {
        width: 100%;
        max-width: 437px;
        max-height: 105px;
      }
    }
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0.5px;

    color: #000;

    &-information {
      margin-left: 22px;
      padding-right: 15px;
      display: flex;
      align-items: center;
    }

    &-order {
      display: flex;
      flex-direction: column;
      padding: 6px 9px 6px 9px;
      border-radius: 1px;
      border: 1px solid #e0e0e0;
      box-sizing: content-box;
    }

    &-decoration {
      margin-top: 7px;

      font-size: 14px;
      font-weight: 700;
      line-height: 17px;

      color: #000;
    }

    &-status {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 47%;

      padding: 7px 0;

      font-size: 14px;
      font-weight: 700;
      line-height: 17px;
      letter-spacing: 0.5px;

      border: 1px solid #e0e0e0;
      border-radius: 1px;
    }

    &-banner {
      margin-left: 67px;
      font-size: 19px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0.03em;
      opacity: 0.5;

      color: #292824;
    }
  }

  &__wrapper-status {
    margin-top: 13px;
    display: flex;
    background: #fff;
    padding: 23px;
    border-radius: 4px;
    /* max-height: 105px; */
    width: fit-content;
    max-width: 100%;

    img {
      height: fit-content;
    }
  }

  &__side {
    width: 50%;

    &-left {
      padding-right: 55px;
    }

    &-right {
      padding-left: 6px;
    }
  }

  &__title {
    font-size: 17px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.3px;

    color: #292824;

    &-orders {
      margin-top: 36px;
    }
  }

  &__page-name {
    margin-bottom: 23px;

    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    width: 100%;

    color: #292824;
  }
}
</style>
