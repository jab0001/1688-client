<template>
  <div class="delivery_inner">
    <form class="delivery_form">
      <div class="delivery_form-inner">
        <div class="delivery_form-item">
          <span>Транспорт:</span>
          <select
            v-model="form.id"
            @change="clearTr"
            class="rounded-sm text-dark form-control"
          >
            <option v-for="deliveryItem of delivery" :value="deliveryItem.id">
              {{ deliveryItem.title }} ({{ deliveryItem.send_date }} дней)
            </option>
          </select>
        </div>
      </div>
    </form>
    <div class="delivery_table">
      <div class="delivery_table-thead">
        <div class="delivery_table-tr">
          <div class="delivery_table-col">
            <span>От</span>
          </div>
          <div class="delivery_table-col">
            <span>До</span>
          </div>
          <div class="delivery_table-col">
            <span>$ за 1 кг</span>
          </div>
        </div>
      </div>
      <div
        class="delivery_table-tbody"
        v-for="deliveryItem of delivery"
        :key="deliveryItem.id"
        v-if="deliveryItem.id === form.id"
      >
        <div
          class="delivery_table-tr"
          v-for="(deliveryItemValue, index) in deliveryItem.values"
          :key="deliveryItemValue.id"
        >
          <div class="delivery_table-col" style="width: auto; flex: unset">
            <div class="icons">
              <div
                class="icon"
                @click="deleteDeliveryTr(deliveryItem.id, index)"
                v-if="isUpdateDeliveryTr !== index"
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
              <div class="icon" @click="isUpdateDeliveryTr = null" v-else>
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
                @click="updateForm(index, deliveryItemValue)"
                v-if="isUpdateDeliveryTr !== index"
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
              <div
                class="icon"
                @click="
                  updateDeliveryTr(
                    deliveryItem.values[index].id,
                    deliveryItem.id
                  )
                "
                v-else
              >
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
          </div>
          <div
            class="delivery_table-col"
            :class="{ active: isUpdateDeliveryTr === index }"
          >
            <span
              v-if="deliveryItemValue.start > 0 && isUpdateDeliveryTr !== index"
              >{{ deliveryItemValue.start }}</span
            >
            <input
              class="rounded-sm text-dark form-control"
              placeholder="От"
              type="number"
              v-model.number="formUpdate.start"
              v-else-if="isUpdateDeliveryTr === index"
            />
          </div>
          <div
            class="delivery_table-col"
            :class="{ active: isUpdateDeliveryTr === index }"
          >
            <span
              v-if="deliveryItemValue.end > 0 && isUpdateDeliveryTr !== index"
              >{{ deliveryItemValue.end }}</span
            >
            <input
              class="rounded-sm text-dark form-control"
              placeholder="До"
              type="number"
              v-model.number="formUpdate.end"
              v-else-if="isUpdateDeliveryTr === index"
            />
          </div>
          <div
            class="delivery_table-col"
            :class="{ active: isUpdateDeliveryTr === index }"
          >
            <span v-if="isUpdateDeliveryTr !== index">{{
              deliveryItemValue.price
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="$ за 1 кг"
              type="number"
              v-model.number="formUpdate.price"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delivery',

  data() {
    return {
      delivery: [],
      form: {
        id: 1,
      },
      formUpdate: {
        start: -1,
        end: -1,
        price: null,
        is_active: false,
      },
      isUpdateDeliveryTr: null,
    };
  },
  methods: {
    async getDelivery() {
      await this.$http.get(`/admin/settings/deliveries`).then((response) => {
        this.delivery = response.data.data.deliveries;
      });
    },
    async deleteDeliveryTr(deliveryItemId, index) {
      this.delivery[deliveryItemId - 1].values.splice(index, 1);
      await this.$http
        .patch(
          `/admin/settings/deliveries&value=${JSON.stringify(this.delivery)}`
        )
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Плотность успешно удалена',
          });
        });
    },

    updateForm(index, value) {
      this.isUpdateDeliveryTr = index;
      this.formUpdate = {
        start: value.start > 0 ? value.start : null,
        end: value.end > 0 ? value.end : null,
        price: value.price,
      };
    },

    async updateDeliveryTr(deliveryItemValueId, index) {
      await this.$http
        .patch(
          `/admin/settings/deliveries/${index}/values/${deliveryItemValueId}`,
          this.formUpdate
        )
        .then((response) => {
          this.isUpdateDeliveryTr = null;
          this.getDelivery();
          this.$notify({
            type: 'success',
            message: 'Данные успешно обновлены',
          });
        });
    },

    clearTr() {
      this.isUpdateDeliveryTr = null;
    },
  },
  mounted() {
    this.getDelivery();
  },
};
</script>

<style lang="scss" scoped>
.delivery {
  &_inner {
    max-width: 1000px;
    margin: 0 auto;
  }
  &_table {
    margin-top: 30px;
    &-thead {
      margin-bottom: 30px;
      & span {
        font-weight: 700;
      }
    }
    &-tbody {
      display: flex;
      flex-direction: column-reverse;
      gap: 20px;
      & .delivery_table-col {
        align-items: center;
        &:not(:first-child) {
          background-color: #fff;
          border: 1px solid #b5b9c4;
          padding: 5px 70px;
          border-radius: 6px;
          height: 36px;
        }
        &.active {
          background-color: transparent;
          border: none;
          padding: unset;
          border-radius: unset;
          height: auto;
        }
      }
    }
    &-tr {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 0 30px 20px 30px;
      border-bottom: 1px solid #e5e7eb;
    }
    &-col {
      flex: 1;
      display: flex;
      justify-content: center;
    }
  }
  &_form {
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
    }
    & span {
      font-weight: 600;
      color: #000;
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
input {
  width: 100%;
}
</style>
