<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top bg-white navbar-expand"
  >
    <router-link to="/ribbon" class="navbar-logo">
      <img src="@/assets/img/logo.svg" alt="FLG" />
    </router-link>
    <ul class="navbar-contacts align-items-center d-sm-flex d-none">
      <a
        href="https://vk.com/full.logistic"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="@/assets/img/icons/navbar/vk.svg" alt="vk"
      /></a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://api.whatsapp.com/send/?phone=79993520049&text&type=phone_number&app_absent=0"
      >
        <img src="@/assets/img/icons/navbar/whatsapp.svg" alt="whatsapp" />
      </a>
      <a
        href="https://t.me/flgchina"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="@/assets/img/icons/navbar/telegram.svg" alt="telegram" />
      </a>
    </ul>
    <ul
      class="navbar-nav align-items-center links navbar-nav_center-side mr-auto"
    >
      <div class="d-flex justify-content-center">
        <p>
          <a href="https://flgchina.ru/about/" target="_blank">О Компании</a>
        </p>
        <p>
          <a href="https://flgchina.ru" target="_blank">Как пользоваться?</a>
        </p>
        <p>
          <a href="https://dkhvan.ru/razbor" target="_blank">Бизнес-разбор</a>
        </p>
        <p>
          <a href="https://flg-box.ru" target="_blank">Фулфилмент</a>
        </p>
        <!-- <p>
          <a
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=79993520049&text&type=phone_number&app_absent=0"
            >Поддержка</a
          >
        </p> -->
      </div>
    </ul>
    <ul
      v-if="title"
      class="navbar-nav align-items-center ml-auto d-sm-block d-none"
    >
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
            <div class="media-body d-lg-block">
              <a class="mb-0 font-weight-500 nav-link__title">{{ title }}</a>
            </div>
            <span class="percent-commission"> {{ percentCommission }}% </span>
          </div>
        </a>
        <template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Добро пожаловать!</h6>
          </div>
          <a href="/profile" class="dropdown-item">
            <i class="ni ni-single-02"></i>
            <span>Профиль</span>
          </a>
          <div class="dropdown-divider"></div>
          <a @click.prevent="logout()" to="" class="dropdown-item">
            <i class="ni ni-user-run"></i>
            <span>Выход</span>
          </a>
        </template>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { BaseNav } from '@/components';

import store from '@/store';

export default {
  components: {
    BaseNav,
  },
  props: {
    type: {
      type: String,
      default: 'default', // default|light
      description:
        'Look of the dashboard navbar. Default (Green) or light (gray)',
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      title: '',
      avatar: null,
      percentCommission: 0,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    async logout() {
      try {
        this.$store.dispatch('auth/logout');
        location.reload();
      } catch (error) {
        this.$notify({
          type: 'danger',
          message: 'Упс! Что-то пошло не так!',
        });
      }
    },
  },
  mounted() {
    if (store.getters['auth/user']) {
      this.title = store.getters['auth/userName'];
      this.percentCommission = store.getters['auth/userLongPromoPercent'];;
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar-top {
  padding: 0;
  height: 50px;
}
.navbar-nav {
  &_left-side,
  &_center-side {
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  &_mobile {
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media screen and (min-width: 1200px) {
      display: none;
    }
    @media screen and (max-width: 480px) {
      gap: 3.13vw;
    }

    & .d-flex {
      @media screen and (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        gap: 15px;
      }
      @media screen and (max-width: 480px) {
        gap: 2.08vw;
      }
    }
    & .btn:not(:last-child) {
      @media screen and (max-width: 768px) {
        margin-right: 0;
      }
    }
    & .btn {
      font-weight: 700;
      background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
      color: #000 !important;
    }
  }
  &.links {
    & > div {
      @media screen and (max-width: 992px) {
        gap: 20px;
      }
      @media screen and (max-width: 768px) {
        gap: 15px;
        flex-direction: column;
        align-items: flex-end;
      }
      @media screen and (max-width: 480px) {
        gap: 2.08vw;
      }
    }
    & a {
      @media screen and (max-width: 480px) {
        font-size: 3.75vw;
      }
    }
  }
}
.navbar-logo img {
  height: 23px;
}
.avatar-sm {
  @media screen and (max-width: 480px) {
    width: 7.5vw;
    height: 7.5vw;
  }
}
.dropdown-header {
  & h6 {
    @media screen and (max-width: 480px) {
      font-size: 0.6rem;
    }
  }
  & .dropdown-menu .dropdown-item {
    @media screen and (max-width: 480px) {
      padding: 0.2rem 1rem;
      font-size: 0.6rem;
    }

    & > i {
      @media screen and (max-width: 480px) {
        margin-right: 0.5rem;
        font-size: 0.8rem;
      }
    }
  }
}
.navbar-contacts {
  column-gap: 0.5rem;
  margin: 0;
}
</style>
