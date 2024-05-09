<template>
  <div>
    <div class="main-content">
      <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
        <router-view></router-view>
      </zoom-center-transition>
    </div>
  </div>
</template>
<script>
import { BaseNav } from '@/components';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    BaseNav,
    ZoomCenterTransition,
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page',
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open');
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
    setBackgroundColor() {
      document.body.classList.add('bg-default-yellow');
    },
    removeBackgroundColor() {
      document.body.classList.remove('bg-default-yellow');
    },
    updateBackground() {
      if (/login/.test(window.location.href)) {
        this.setBackgroundColor();
      } else {
        this.removeBackgroundColor();
      }
    },
  },
  beforeDestroy() {
    this.removeBackgroundColor();
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.updateBackground();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background: linear-gradient(180deg, #f5dd6d, #ffcd4d);
  padding: 180px 30px 250px 30px;

  @media screen and (max-width: 768px) {
    padding-top: 130px;
  }
  @media screen and (max-width: 480px) {
    padding: 25vw 0 4.17vw 0;
  }

  & p {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 0;

    @media screen and (max-width: 480px) {
      font-size: 3.54vw;
    }
  }
}
.text-xl {
  font-size: 32px !important;

  @media screen and (max-width: 480px) {
    font-size: 6.67vw !important;
  }
}
.navbar-brand {
  margin-right: 25px;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
}
.navbar-brand,
.navbar-horizontal .navbar-nav .nav-link {
  font-size: 14px;

  @media screen and (max-width: 480px) {
    font-size: 3.75vw;
  }
}
.navbar-horizontal {
  & .navbar-nav .nav-link {
    padding-bottom: 5px;
  }
  & .collapse-brand {
    @media screen and (max-width: 992px) {
      font-weight: 600;
    }
    & a {
      @media screen and (max-width: 992px) {
        font-size: 32px;
        color: #242424;
      }
      @media screen and (max-width: 480px) {
        font-size: 6.67vw;
      }
    }
  }
  & .navbar-collapse {
    & .nav-link {
      @media screen and (max-width: 992px) {
        padding: 10px 0;
        color: #242424;
      }
      @media screen and (max-width: 480px) {
        padding: 2.08vw 0;
      }
    }
    &-header {
      @media screen and (max-width: 992px) {
        padding-bottom: 0;
        border-bottom: none;
        margin-bottom: 20px;
      }
      @media screen and (max-width: 480px) {
        margin-bottom: 4.17vw;
      }
    }
    & .navbar-toggler {
      @media screen and (max-width: 992px) {
        width: 25px;
        height: 25px;
      }
      @media screen and (max-width: 480px) {
        width: 5.21vw;
        height: 5.21vw;
      }

      & span {
        @media screen and (max-width: 992px) {
          height: 3px;
          border-radius: 3px;
          background: #242424;
        }
        @media screen and (max-width: 480px) {
          height: 0.63vw;
          border-radius: 0.63vw;
        }
      }
    }
  }
}
</style>
