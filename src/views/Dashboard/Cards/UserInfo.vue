<template>
  <div class="user-info">
    <DasboardCard
      :buttonTitle="isEditable ? 'Сохранить' : ''"
      @buttonAction="saveUsername"
    >
      <div class="user-info__content">
        <div
          class="user-info__header d-flex justify-content-between align-items-center"
        >
          <input
            v-if="isEditable"
            type="text"
            :value="userInfo.username"
            class="input-lg dashboard-card-title mr-3"
            id="username-input"
          />
          <div
            @click="switchEditableState"
            v-else
            class="user-info__content__username dashboard-card-title cursor-pointer"
          >
            {{ userInfo.username }}
          </div>
          <img
            src="@/assets/img/icons/setting.svg"
            class="dashboard-card-edit"
            @click="switchEditableState"
          />
        </div>
        <hr class="dashboard-card-hr" />
        <div class="dashboard-card-grid">
          <div class="user-info__section dashboard-card-section">
            <div class="dashboard-card-info-title">FLG ID</div>
            <div class="dashboard-card-info-data">
              {{ userInfo.telegram_id }}
            </div>
          </div>
          <div class="user-info__section dashboard-card-section">
            <div class="dashboard-card-info-title">Маркировка</div>
            <div class="dashboard-card-info-data">{{ userInfo.marking }}</div>
          </div>
          <div class="user-info__section dashboard-card-section">
            <div class="dashboard-card-info-title">Мин сумма заказа</div>
            <div class="dashboard-card-info-data">{{ minPrice }}</div>
          </div>
          <div class="user-info__section dashboard-card-section">
            <div class="dashboard-card-info-title">Комиссия</div>
            <div class="dashboard-card-info-data">{{ commissionPercent }}%</div>
          </div>
        </div>
      </div>
    </DasboardCard>
  </div>
</template>

<script>
import DasboardCard from './DashboardCard.vue';
export default {
  data() {
    return {
      isEditable: false,
    };
  },
  props: {
    userInfo: { type: Object, required: true },
  },
  computed: {
    commissionPercent() {
      return this.$store.getters['auth/userLongPromoPercent'];
    },
    minPrice() {
      return this.$store.getters['auth/userLongPromoMinPrice']
    }
  },
  methods: {
    async saveUsername(event) {
      const newUsername = document.getElementById('username-input').value;
      await this.$http
        .post(`/client/update`, {
          username: newUsername
        })
        .then((response) => {
          const newUserData = { ...this.userInfo, username: newUsername };
          this.userInfo.username = newUsername;
          this.$store.commit('auth/SET_USER', newUserData);
          this.$notify({
            type: 'success',
            message: 'Имя пользователя обновлено',
          });
        })
        .catch((error) => {
          this.$notify({
            type: 'danger',
            message: 'Что то пошло не так',
          });
        });
      this.isEditable = !this.isEditable;
    },
    switchEditableState() {
      this.isEditable = !this.isEditable;
    },
  },
  components: {
    DasboardCard,
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  width: 556px;

  @media screen and (max-width: 1440px) {
    max-width: 477px;
    /* max-height: 242px; */
  }

  @media screen and (max-width: 768px) {
    max-width: 269px;
    max-height: 318px;
  }
}
</style>
