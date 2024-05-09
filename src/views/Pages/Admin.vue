<template>
  <div class="container-fluid mt-5">
    <div class="tabs">
      <ul class="tabs_list">
        <li
          class="tabs_item"
          :class="tab.component === activeComponent && `active`"
          v-for="tab of tabs"
          :key="tab.id"
          @click="activeComponent = tab.component"
          :data-component="tab.component"
        >
          {{ tab.text }}
        </li>
      </ul>
      <div class="tabs_content">
        <keep-alive>
          <component :is="activeComponent" :tg_id="tg_id" :api_key="api_key" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Delivery from './Admin/Delivery.vue';
import ExchangeRates from './Admin/ExchangeRates.vue';
import Packages from './Admin/Packages.vue';
import PromoCodes from './Admin/PromoCodes.vue';
import Categories from './Admin/Categories.vue';
export default {
  name: 'Admin',
  data() {
    return {
      activeComponent: '',
      tabs: [
        {
          id: 1,
          text: 'Курсы валют',
          component: 'ExchangeRates',
        },
        {
          id: 2,
          text: 'Промокоды',
          component: 'PromoCodes',
        },
        {
          id: 3,
          text: 'Упаковка',
          component: 'Packages',
        },
        {
          id: 4,
          text: 'Категории',
          component: 'Categories',
        },
        {
          id: 5,
          text: 'Стоимость доставки до РФ',
          component: 'Delivery',
        },
      ],
    };
  },
  components: {
    ExchangeRates,
    PromoCodes,
    Packages,
    Categories,
    Delivery,
  },
  computed: {
    tg_id() {
      return this.$store.getters['auth/userTelegramId'];
    },

    api_key() {
      return this.$store.getters['auth/userAuthKey'];
    },
  },
  created() {
    this.activeComponent = this.tabs[0].component;

    if (this.$route.query['code'] !== null) {
      this.$http.post('/admin/amocrm/auth/integrate', this.$route.query);
    }
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  min-height: 72vh;
  text-align: center;
  &_list {
    list-style: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding-left: 60px;
    padding-right: 60px;
    padding-bottom: 13px;
    margin-bottom: 70px;
    border-bottom: 1px solid #e5e7eb;
  }
  &_item {
    cursor: pointer;
    &.active {
      position: relative;
      color: #000;
      font-weight: 600;
      &::after {
        content: '';
        position: absolute;
        width: calc(100% + 30px);
        height: 4px;
        left: 50%;
        transform: translateX(-50%);
        bottom: -13px;
        background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
  }
}
</style>
