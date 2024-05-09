<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    class="nav-item"
    :class="{ active: is_active }"
    tag="li"
  >
    <a
      v-if="isMenu"
      class="sidebar-menu-item nav-link"
      :class="{ active: is_active }"
      :aria-expanded="!collapsed"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="nav-link-text text-secondary">
          {{ link.name }} <b class="caret"></b>
        </span>
      </template>
      <template v-else>
        <i :class="link.icon"></i>
        <div v-if="link.name == 'Examples (API)'">
          <span class="nav-link-text text-secondary" style="color: #3cab79"
            >{{ link.name }} <b class="caret"></b
          ></span>
        </div>
        <div v-else>
          <span class="nav-link-text text-secondary"
            >{{ link.name }} <b class="caret"></b
          ></span>
        </div>
      </template>
    </a>

    <collapse-transition>
      <div v-show="!collapsed" class="collapse show">
        <ul class="nav nav-sm flex-column">
          <slot></slot>
        </ul>
      </div>
    </collapse-transition>

    <slot
      name="title"
      v-if="children.length === 0 && !$slots.default && link.path"
    >
      <component
        :to="link.path"
        @click.native="linkClick"
        :is="elementType(link, false)"
        class="nav-link"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
      >
        <template v-if="addLink">
          <span class="nav-link-text text-secondary">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"></i>
          <span class="nav-link-text text-secondary">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "sidebar-item",
  components: {
    CollapseTransition,
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior.",
    },
    opened: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  provide() {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild,
    };
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: !this.opened,
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? "li" : "router-link";
    },
    linkPrefix() {
      if (this.link.name) {
        let words = this.link.name.split(" ");
        return words.map((word) => word.substring(0, 1)).join("");
      }
      return false;
    },
    isMenu() {
      if (!this.$slots.default) {
        return false;
      }
      return this.$slots.default.some((item) =>
        item.tag.endsWith("sidebar-item")
      );
    },
    is_active() {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find((c) =>
          this.$route.path.startsWith(c.link.path)
        );
        if (matchingRoute !== undefined) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    addChild(item) {
      const index = this.$slots.default.indexOf(item.$vnode);
      this.children.splice(index, 0, item);
    },
    removeChild(item) {
      const tabs = this.children;
      const index = tabs.indexOf(item);
      tabs.splice(index, 1);
    },
    elementType(link, isParent = true) {
      if (link.isRoute === true) {
        return isParent ? "li" : "a";
      } else {
        return "router-link";
      }
    },
    linkAbbreviation(name) {
      const matches = name.match(/\b(\w)/g);
      return matches.join("");
    },
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    collapseMenu() {
      this.collapsed = !this.collapsed;
    },
    collapseSubMenu(link) {
      link.collapsed = !link.collapsed;
    },
  },
  mounted() {
    if (this.addLink) {
      this.addLink(this);
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed;
    }
    if (this.is_active && this.isMenu) {
      this.collapsed = true;
    }
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    if (this.removeLink) {
      this.removeLink(this);
    }
  },
};
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
.navbar-dark .sidebar-menu-item.active .nav-link-text {
  color: #cdcdcd;
}
.sidebar-mini {
  text-transform: uppercase;
  width: 30px;
  margin-right: 15px;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  float: left;
  display: initial;
}
</style>
