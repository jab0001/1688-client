<template>
  <div class="promo-codes_inner">
    <form class="promo-codes_form">
      <div class="promo-codes_form-inner">
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Код"
            type="text"
            v-model="form.value"
          />
        </div>
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Название"
            type="text"
            v-model="form.name"
          />
        </div>
        <div class="promo-codes_form-item">
          <select v-model="form.rank" class="rounded-sm text-dark form-control">
            <option value="Заказчик">Заказчик</option>
            <option value="Партнер">Партнер</option>
            <option value="VIP">VIP</option>
            <option value="VIP Партнёр">VIP Партнёр</option>
          </select>
        </div>
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Мин. сумма заказа"
            type="number"
            v-model="form.min_price"
          />
        </div>
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Комиссия"
            type="number"
            v-model="form.percent"
          />
        </div>
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            type="date"
            v-model="form.expired_at"
          />
        </div>
        <div class="promo-codes_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Кол-во активаций"
            type="number"
            v-model="form.activation_limit"
          />
        </div>
        <div class="promo-codes_form-item">
          <select v-model="form.type" class="rounded-sm text-dark form-control">
            <option value="onetime">Одноразовый</option>
            <option value="long">Вечный</option>
          </select>
        </div>
      </div>
      <button
        class="promo-code_add btn base-button text-dark"
        @click.prevent.stop="addPromo"
      >
        Добавить промокод
      </button>
    </form>
    <div class="promo-codes_table">
      <div class="promo-codes_table-body">
        <div
          class="promo-codes_table-tr"
          v-for="(promo, index) in promos"
          :key="index"
        >
          <div class="promo-codes_table-col">
            <div class="icons">
              <div
                class="icon"
                @click="deletePromo(promo)"
                v-if="isUpdatePromoTr !== index"
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M10 12V17"
                      stroke="#76777e "
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M14 12V17"
                      stroke="#76777e "
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M4 7H20"
                      stroke="#76777e "
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#76777e "
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#76777e "
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div class="icon" @click="isUpdatePromoTr = null" v-else>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#ff0000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </div>
              <div
                class="icon"
                @click="updateForm(index, promo)"
                v-if="isUpdatePromoTr !== index"
              >
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 192 192"
                  xmlns="http://www.w3.org/2000/svg"
                  xml:space="preserve"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67"
                      class="cls-1"
                      style="
                        fill: none;
                        fill-opacity: 1;
                        fill-rule: nonzero;
                        stroke: #76777e;
                        stroke-width: 12;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-dasharray: none;
                        stroke-opacity: 1;
                      "
                      transform="translate(-77.923 40.646)"
                    ></path>
                    <path
                      d="m195.656 33.271-52.882 52.882"
                      style="
                        fill: none;
                        fill-opacity: 1;
                        fill-rule: nonzero;
                        stroke: #76777e;
                        stroke-width: 12;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-miterlimit: 5;
                        stroke-dasharray: none;
                        stroke-opacity: 1;
                      "
                      transform="translate(-77.923 40.646)"
                    ></path>
                  </g>
                </svg>
              </div>
              <div class="icon" @click="updatePromo(promo)" v-else>
                <svg
                  fill="#000000"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  id="check-mark-circle-2"
                  data-name="Flat Line"
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon flat-line"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <polyline
                      id="primary"
                      points="21 5 12 14 8 10"
                      style="
                        fill: none;
                        stroke: #31ba14;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 2;
                      "
                    ></polyline>
                    <path
                      id="primary-2"
                      data-name="primary"
                      d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
                      style="
                        fill: none;
                        stroke: #31ba14;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-width: 2;
                      "
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <span v-if="isUpdatePromoTr !== index" @click="copy(promo.value)">{{
              promo.value
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Код"
              type="text"
              v-model="formUpdate.value"
              v-else
            />
          </div>
          <div class="promo-codes_table-col">
            <span v-if="isUpdatePromoTr !== index">{{ promo.name }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Название"
              type="text"
              v-model="formUpdate.name"
              v-else
            />
          </div>
          <div
            class="promo-codes_table-col"
            style="text-align: left"
            :style="{ width: isUpdatePromoTr !== index ? '25%' : '35%' }"
          >
            <span v-if="isUpdatePromoTr !== index"
              >{{ promo.rank }} (от {{ promo.min_price }},
              {{ promo.percent }}%)</span
            >
            <div style="display: flex; gap: 15px" v-else>
              <select
                v-model="formUpdate.rank"
                class="rounded-sm text-dark form-control"
              >
                <option value="Заказчик">Заказчик</option>
                <option value="Партнер">Партнер</option>
                <option value="VIP">VIP</option>
                <option value="VIP Партнёр">VIP Партнёр</option>
              </select>
              <input
                class="rounded-sm text-dark form-control"
                placeholder="Мин. сумма заказа"
                type="number"
                v-model="formUpdate.min_price"
              />
              <input
                class="rounded-sm text-dark form-control"
                placeholder="Комиссия"
                type="number"
                v-model="formUpdate.percent"
              />
            </div>
          </div>
          <div class="promo-codes_table-col" style="width: 10%">
            <span
              v-if="promo.expired_at != null && isUpdatePromoTr !== index"
              >{{ new Date(promo.expired_at).toLocaleDateString() }}</span
            >
            <input
              class="rounded-sm text-dark form-control"
              type="date"
              v-model="formUpdate.expired_at"
              v-else-if="
                (promo.expired_at != null && isUpdatePromoTr === index) ||
                (promo.expired_at == null && isUpdatePromoTr === index)
              "
            />
          </div>
          <div class="promo-codes_table-col" style="width: 10%">
            <span v-if="isUpdatePromoTr !== index">{{
              promo.activation_left
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Кол-во активаций"
              type="number"
              v-model="formUpdate.activation_limit"
              v-else
            />
          </div>
          <div
            class="promo-codes_table-col"
            style="width: 20%; text-align: right"
          >
            <span v-if="promo.type == 'onetime'">Одноразовый</span>
            <span v-else>Вечный</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromoCodes',
  props: {
    tg_id: Number,
    api_key: String,
  },
  data() {
    return {
      promos: [],
      form: {
        name: '',
        value: '',
        type: '',
        rank: '',
        expired_at: '',
        activation_limit: null,
        percent: null,
        min_price: null,
      },
      formUpdate: {
        name: '',
        value: '',
        rank: '',
        expired_at: '',
        activation_limit: null,
        percent: null,
        min_price: null,
      },
      isUpdatePromoTr: null,
    };
  },
  methods: {
    async getPromos() {
      await this.$http.get(`/admin/promos`).then((response) => {
        this.promos = response.data.data.promos;
        this.$notify({
          type: 'success',
          message: 'Промокоды успешно получены',
        });
      });
    },
    async addPromo() {
      await this.$http.post(`/admin/promos`, this.form).then((response) => {
        this.promos.push(response.data.data.promo);
        this.form = {
          name: '',
          type: '',
          rank: '',
          expired_at: '',
          value: '',
          activation_left: null,
          percent: null,
          min_price: null,
        };
        this.$notify({
          type: 'success',
          message: 'Промокод успешно добавлен',
        });
      });
    },
    async deletePromo(promo) {
      await this.$http
        .delete(`/admin/promos/${promo.value}`)
        .then((response) => {
          this.promos = this.promos.filter(
            (item) => item.value !== promo.value
          );
          this.$notify({
            type: 'success',
            message: 'Промокод успешно удален',
          });
        });
    },
    updateForm(index, promo) {
      this.isUpdatePromoTr = index;
      this.formUpdate = {
        name: promo.name,
        value: promo.value,
        rank: promo.rank,
        expired_at: promo.expired_at,
        activation_limit: promo.activation_left,
        percent: promo.percent,
        min_price: promo.min_price,
      };
    },
    async updatePromo(promo) {
      await this.$http
        .patch(`/admin/promos/${promo.value}`, this.formUpdate)
        .then((response) => {
          this.getPromos();
          this.isUpdatePromoTr = null;
          this.$notify({
            type: 'success',
            message: 'Промокод успешно обновлен',
          });
        });
    },
    copy(value) {
      try {
        navigator.clipboard.writeText(value);
        this.$notify({
          type: 'success',
          message: 'Текст успешно скопирован',
        });
      } catch (e) {
        this.$notify({
          type: 'danger',
          message: 'Упс! Что-то пошло не так!',
        });
      }
    },
  },
  mounted() {
    this.getPromos();
  },
};
</script>

<style lang="scss" scoped>
.promo-codes {
  &_table {
    margin-top: 30px;
    &-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      & .promo-codes_table-tr {
        padding: 0 30px 20px 30px;
        border-bottom: 1px solid #e5e7eb;
        gap: 40px;
      }
    }
    &-tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-col {
      width: 25%;
      text-align: left;
      &:nth-child(1) {
        display: flex;
        align-items: center;
        gap: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-child(3) {
        text-align: center;
      }
      &:nth-child(4),
      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7) {
        text-align: center;
      }
      & span {
        font-weight: 600;
        color: #000;
      }
    }
  }
  &_form {
    &-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 50px;
    }
    &-item {
      flex: 1;
    }
  }
}
.icons {
  display: flex;
  gap: 15px;
  & .icon {
    cursor: pointer;
    height: 30px;
    width: 30px;
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
