<template>
  <div class="user-address">
    <DasboardCard :buttonTitle="isEditable ? 'Сохранить' : ''" @buttonAction="saveData">
      <div class="user-address__content">
        <div class="user-address__header d-flex justify-content-between">
          <div class="user-address__content__username dashboard-card-title">
            Адрес доставки
          </div>
          <img src="@/assets/img/icons/setting.svg" class="dashboard-card-edit" @click="switchEditableState" />
        </div>
        <hr class="dashboard-card-hr" />
        <!-- Editable form -->
        <div v-if="isEditable" class="user-address__section dashboard-card-section">
          <label for="address" class="dashboard-card-info-title">
            Текущий адрес
          </label>
          <input type="text" class="input dashboard-card-info-data" v-model="address" name="address" />
        </div>
        <!-- Info-type form -->
        <div v-else class="user-address__section dashboard-card-section">
          <div class="dashboard-card-info-title">Текущий адрес</div>
          <div @click="switchEditableState" class="dashboard-card-info-data cursor-pointer">
            {{ address || 'Не указан' }}
          </div>
        </div>
        <!--  -->
        <div class="user-address__state mt-4">
          <label class="checkbox mr-2 mt-2 w-13">
            <input type="checkbox" v-model="isChecked" />
            <span class="checkmark"></span>
          </label>
          <div class="dashboard-card-info-title">
            Использовать в последующих заказах
          </div>
        </div>
      </div>
    </DasboardCard>
  </div>
</template>

<script>
import DasboardCard from './DashboardCard.vue';

import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  components: {
    DasboardCard,
  },

  data() {
    return {
      isEditable: false,
      isChecked: false,
      address: '',
    };
  },

  created() {
    this.address = this.userAddress;
    if (localStorage.getItem('isChecked')) {
      this.isChecked = JSON.parse(localStorage.getItem('isChecked'));
    } else {
      localStorage.setItem('isChecked', 'false');
    }
  },

  updated() {
    if (localStorage.getItem('isChecked')) {
      localStorage.setItem('isChecked', this.isChecked);
    }
    this.$store.commit('layout/SET_USE_HOME_ADDRESS', this.isChecked);
  },

  methods: {
    saveData() {
      this.isEditable = !this.isEditable;
      this.$http.post(`/client/update`, {
        address: this.address
      })
      this.$store.commit('auth/SET_USER_ADDRESS', this.address);
    },
    switchEditableState() {
      this.isEditable = !this.isEditable;
    },
  },

  computed: {
    ...mapGetters('auth', ['userAddress']),
    ...mapGetters('parsing', ['customAddress']),
    ...mapGetters('layout', ['useHomeAddress']),
  },
};
</script>

<style lang="scss" scoped>
.user-address {
  width: 556px;

  @media screen and (max-width: 1440px) {
    max-width: 477px;
    max-height: 242px;
  }

  @media screen and (max-width: 768px) {
    max-width: 269px;
    max-height: 217px;
  }
}

.user-address__state {
  display: flex;
  align-items: flex-start;
  max-width: 320px;
}

.dashboard-card-info-title {
  line-height: 130%;
}

.checkmark {
  width: 15px;
  height: 15px;
  top: -2px;
}

.checkbox .checkmark:after {
  left: 4px;
  top: 1px;
}
</style>
