import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import Card from '@/components/Cards/Card.vue';
import Modal from '@/components/Modal.vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import BaseButton from '@/components/BaseButton.vue';
import Badge from '@/components/Badge.vue';
import RouteBreadcrumb from '@/components/Breadcrumb/RouteBreadcrumb.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import BaseSwitch from '@/components/BaseSwitch.vue';
import BaseRadio from "@/components/Inputs/BaseRadio.vue";
import BaseProgress from "@/components/BaseProgress.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import BaseNav from "@/components/Navbar/BaseNav.vue";
import BaseHeader from '@/components/BaseHeader.vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { Input, Tooltip, Popover } from 'element-ui';
import vSelect from 'vue-select'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseHeader.name, BaseHeader);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseNav.name, BaseNav);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component('v-select', vSelect);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Modal.name, Modal);
    Vue.component(StatsCard.name, StatsCard);
    Vue.component(RouteBreadcrumb.name, RouteBreadcrumb);
    Vue.component(Input.name, Input);
    Vue.component('validation-provider', ValidationProvider)
    Vue.component('validation-observer', ValidationObserver)
    Vue.use(Tooltip);
    Vue.use(Popover);
  }
};

export default GlobalComponents;
