<template>
  <nav :class="classes" class="navbar">
    <div :class="containerClasses">
      <slot name="brand"></slot>

      <slot name="toggle-button">
        <button
          class="navbar-toggler collapsed"
          v-if="hasMenu"
          type="button"
          @click="toggleMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
      </slot>

      <div
        class="navbar-collapse navbar-custom-collapse collapse show"
        :class="menuClasses"
        v-show="show"
        v-click-outside="closeMenu"
      >
        <slot :close-menu="closeMenu"></slot>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'base-nav',
  props: {
    show: {
      type: Boolean,
      default: false,
      description:
        'Whether navbar menu is shown (valid for viewports < specified by `expand` prop)',
    },
    transparent: {
      type: Boolean,
      default: false,
      description: 'Whether navbar is transparent',
    },
    expand: {
      type: String,
      default: 'lg',
      description: 'Breakpoint where nav should expand',
    },
    menuClasses: {
      type: [String, Object, Array],
      default: '',
      description:
        'Navbar menu (items) classes. Can be used to align menu items to the right/left',
    },
    containerClasses: {
      type: [String, Object, Array],
      default: 'container',
      description:
        'Container classes. Can be used to control container classes (contains both navbar brand and menu items)',
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        return [
          '',
          'dark',
          'success',
          'danger',
          'warning',
          'white',
          'primary',
          'light',
          'info',
          'vue',
        ].includes(value);
      },
      description: 'Navbar color type',
    },
  },
  model: {
    prop: 'show',
    event: 'change',
  },
  computed: {
    classes() {
      let color = `bg-${this.type}`;
      let classes = [
        { 'navbar-transparent': this.transparent },
        { [`navbar-expand-${this.expand}`]: this.expand },
      ];
      if (this.position) {
        classes.push(`navbar-${this.position}`);
      }
      if (!this.transparent) {
        classes.push(color);
      }
      return classes;
    },
    hasMenu() {
      return this.$slots.default;
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('change', !this.show);
    },
    closeMenu() {
      this.$emit('change', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-horizontal {
  & .navbar-collapse {
    @media screen and (max-width: 992px) {
      width: auto;
      height: max-content !important;
      top: 10px;
      left: 15px;
      right: 15px;
      margin: 0;
    }
    @media screen and (max-width: 480px) {
      top: 2.08vw;
      left: 3.13vw;
      right: 3.13vw;
    }
    &.show {
      @media screen and (max-width: 992px) {
        padding: 30px;
        border-radius: 15px;
      }
      @media screen and (max-width: 480px) {
        padding: 6.25vw;
        border-radius: 3.13vw;
      }
    }
  }
}
.navbar-collapse {
  &.navbar-custom-collapse {
    @media screen and (max-width: 480px) {
      gap: 4.17vw;
    }
  }
}
</style>
