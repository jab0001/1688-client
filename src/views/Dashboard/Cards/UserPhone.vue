<template>
  <div class="user-address">
    <DasboardCard>
      <div class="user-address__content">
        <div class="user-address__header d-flex justify-content-between">
          <div class="user-address__content__username dashboard-card-title">
            Пароль и телефон
          </div>
        </div>
        <hr class="dashboard-card-hr" />
        <div class="user-address__section dashboard-card-section">
          <div class="dashboard-card-info-title" style="margin-bottom: 12px">
            Ваш текущий телефон
          </div>
          <div class="dashboard-card-info-data cursor-pointer">
            {{ formatPhoneNumber(userPhone) }}
          </div>
        </div>
        <div class="change-wrapper">
          <button class="change-btn" @click="$emit('switchPhoneModal')">Поменять телефон</button>
          <button class="change-btn" @click="$emit('switchPasswordModal')">
            Поменять пароль
          </button>
          <button class="change-btn change-btn--red" @click="logout">
            Выйти
          </button>
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
    return {};
  },

  created() {},

  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      location.reload();
    },
    formatPhoneNumber(phoneNumber) {
      const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
      if (cleanedPhoneNumber.length === 11) {
        const formattedPhoneNumber = `+7 ${cleanedPhoneNumber.slice(
          1,
          4
        )} ${cleanedPhoneNumber.slice(4, 7)} ${cleanedPhoneNumber.slice(
          7,
          9
        )} ${cleanedPhoneNumber.slice(9, 11)}`;

        return formattedPhoneNumber;
      } else {
        return phoneNumber;
      }
    },
  },

  computed: {
    ...mapGetters('auth', ['userPhone']),
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

.change-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 29px 0px 34px 9px;
}

.change-btn {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.03em;
  text-align: center;
  width: fit-content;
  border: none;
  background-color: #ffcf4f;
  padding: 4.5px 15px;
  align-items: center;
  border-radius: 3px;

  &:hover {
    background-color: #fcecab;
  }

  &--red {
    background: #fd6b57;

    &:hover {
      background: #ff8572;
    }
  }
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
