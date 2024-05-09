<template>
  <div class="wrapper">
    <notifications></notifications>
    <div class="main-content d-flex flex-column">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>
      <div class="h-100 d-flex flex-grow-1" @click="$sidebar.displaySidebar(false)">
        <DashboardMenu />
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 1000);
  }
}

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import { FadeTransition } from 'vue2-transitions';
import DashboardMenu from '@/views/Layout/DashboardMenu.vue';
import Vuex from 'vuex';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
    DashboardMenu,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        initScrollbar('sidenav');
      }
    },
  },
  computed: {
    ...Vuex.mapState({}),
  },
  watch: {
    isVisible(val) {
      this.$store.commit('SET_VISIBLE_MENU', val);
    },
  },

  mounted() {
    this.$http.get(`/client/info`).then((response) => {
      let resUser = response.data;
      this.$store.commit('auth/SET_USER', resUser);
    });
  }
};
</script>
<style lang="scss">
body.g-sidenav-hidden {

  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 8px;
    margin-right: 8px;
    padding: 11px 0px;
  }
}

body.g-sidenav-show {

  #purchase-button,
  #demo-button,
  #star-button,
  #docs-button {
    margin-left: 20px;
    margin-right: 20px;
    padding: 11px 0px;
  }
}

.btn {
  &-visible {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
    position: fixed;
    margin-left: 15px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    @media screen and (max-width: 480px) {
      width: 10.42vw;
      height: 10.42vw;
      margin-left: 3.13vw;
      bottom: 4.17vw;
    }

    & svg {
      @media screen and (max-width: 480px) {
        width: 6.25vw;
        height: 6.25vw;
      }
    }
  }
}

.navbar-vertical {
  &.navbar-vertical {
    @media screen and (max-width: 480px) {
      max-width: 14.58vw;
    }
  }
}

.sidenav {
  & .navbar-nav {
    @media screen and (max-width: 480px) {
      gap: 6.25vw;

      & svg {
        @media screen and (max-width: 480px) {
          width: 5vw;
          height: 5vw;
        }
      }
    }
  }
}

.main-content {
  min-height: 100svh;
}</style>
