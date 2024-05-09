<template>
  <div class="card-promo">
    <DasboardCard
      :buttonTitle="isEditable ? 'Сохранить' : ''"
      @buttonAction="usePromocode"
    >
      <div class="user-promo__content">
        <div class="user-promo__header d-flex justify-content-between">
          <div class="user-promo__content__username dashboard-card-title">
            Настройка промокода
          </div>
          <img
            src="@/assets/img/icons/setting.svg"
            class="dashboard-card-edit"
            @click="switchEditableState"
          />
        </div>
        <hr class="dashboard-card-hr" />
        <!-- Editable form -->
        <div
          v-if="isEditable"
          class="user-promo__section dashboard-card-section"
        >
          <label for="promo" class="dashboard-card-info-title"
            >Текущий промокод</label
          >
          <input
            type="text"
            v-model="promocode"
            class="input dashboard-card-title"
            name="promo"
          />
        </div>
        <!-- Info-type form -->
        <div v-else class="user-promo__section dashboard-card-section">
          <div class="dashboard-card-info-title">Текущий промокод</div>
          <div
            class="dashboard-card-info-data cursor-pointer"
            @click="switchEditableState"
          >
            {{ promocode || 'Не указан' }}
          </div>
        </div>
        <!--  -->
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
      promocode: '',
    };
  },
  mounted() {
    this.promocode = this.$store.getters['auth/userLongPromo']?.value || ''
  },
  methods: {
    async usePromocode() {
      await this.$http
      .get(`/promo/${this.promocode}/set`)
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Промокод успешно применен',
          });
          this.$store.commit('auth/SET_USER_LONG_PROMO', response.data.data);
        })
        .catch((error) => {
          this.promocode = '';
          // display error message
          if (error.response.status === 404) {
            this.$notify({
              type: 'danger',
              message: 'Промокод не найден',
            });
          }
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
.card-promo{
  width: 556px;

  @media screen and (max-width: 1440px) {
        max-width: 477px;
        max-height: 178px;
    }

    @media screen and (max-width: 768px) {
        max-width: 269px;
        max-height: 165px;
    }
}
</style>
