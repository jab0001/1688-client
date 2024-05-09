<template>
  <div class="exchange-rates_inner">
    <div class="exchange-rates_view" v-if="isVisible">
      <div class="exchange-rates_items">
        <div class="exchange-rates_item">
          <span>Курс юаня к рублю</span>
          <span>{{ courses.cny_rub }}</span>
        </div>
        <div class="exchange-rates_item">
          <span>Курс юаня к доллару</span>
          <span>{{ courses.usd_rub }}</span>
        </div>
      </div>
      <button
        class="exchange-rates_change btn base-button text-dark"
        @click="isVisible = !isVisible"
      >
        Редактировать курсы
      </button>
    </div>
    <div class="exchange-rates_change" v-else>
      <form class="exchange-rates_form">
        <div class="exchange-rates_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Курс юаня к рублю"
            type="number"
            min="0"
            v-model="form.cny_rub"
          />
        </div>
        <div class="exchange-rates_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Курс юаня к доллару"
            type="number"
            min="0"
            v-model="form.usd_rub"
          />
        </div>
      </form>
      <div class="exchange-rates_btns">
        <button
          class="exchange-rates_change btn base-button text-dark"
          @click="updateExchangeRates"
        >
          Сохранить
        </button>
        <button
          class="exchange-rates_change btn base-button text-dark"
          @click="isVisible = !isVisible"
        >
          Отменить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRates',

  data() {
    return {
      courses: {},
      isVisible: true,
      form: {},
    };
  },

  methods: {
    async getExchangeRates() {
      await this.$http.get(`/admin/settings/courses`).then((response) => {
        this.courses = response.data.data.courses;
      });
    },
    updateExchangeRates() {
      Object.entries(this.form).forEach((entry) => {
        if (entry[1] === '0') {
          this.$notify({
            type: 'danger',
            message: 'Неверный формат данных',
          });
          this.isVisible = true;
          return;
        }

        this.$http
          .patch(`/admin/settings/courses/${entry[0]}`, {
            value: entry[1],
          })
          .then((response) => {
            this.getExchangeRates();
            this.isVisible = true;
            this.$notify({
              type: 'success',
              message: 'Курс валют успешно сохранен',
            });
          });
      });
    },
  },

  mounted() {
    this.getExchangeRates();
    this.$notify({
      type: 'success',
      message: 'Курсы успешно получены',
    });
  },
};
</script>

<style lang="scss" scoped>
.exchange-rates {
  &_items,
  &_form {
    max-width: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
  }
  &_btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    & button {
      &:not(:first-child) {
        margin-top: 0;
      }
    }
  }
}
button {
  max-width: 500px;
  width: 100%;
  background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  margin-top: 25px;
  margin: 30px 0 0 0;
}
input {
  width: 100%;
}
</style>
