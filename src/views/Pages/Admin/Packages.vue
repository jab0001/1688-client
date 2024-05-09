<template>
  <div class="package_inner">
    <div class="package_table">
      <div class="package_table-thead">
        <div class="package_table-tr">
          <div class="package_table-col">
            <span>Название</span>
          </div>
          <div class="package_table-col">
            <span>Цена, $</span>
          </div>
          <div class="package_table-col">
            <span>Опция</span>
          </div>
        </div>
      </div>
      <div class="package_table-tbody">
        <div
          class="package_table-tr"
          v-for="(packageItem, index) in packages"
          :key="index"
        >
          <div class="package_table-col">
            <div class="icons">
              <div
                class="icon"
                @click="deletePackage(packageItem.id)"
                v-if="isUpdatePackage !== index"
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
              <div class="icon" @click="isUpdatePackage = null" v-else>
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
                @click="updateForm(index, packageItem)"
                v-if="isUpdatePackage !== index"
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
              <div class="icon" @click="updatePackage(index)" v-else>
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
            <span v-if="isUpdatePackage !== index">{{
              packageItem.title
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Название"
              type="text"
              v-model="formUpdate.title"
              v-else
            />
          </div>
          <div class="package_table-col">
            <span v-if="isUpdatePackage !== index"
              >{{ packageItem.price }} $</span
            >
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Цена"
              type="number"
              v-model="formUpdate.price"
              v-else
            />
          </div>
          <div class="package_table-col">
            <input
              class="rounded-sm text-dark form-control"
              type="checkbox"
              v-model="packageItem.option"
              v-if="isUpdatePackage !== index"
            />
            <input
              class="rounded-sm text-dark form-control"
              type="checkbox"
              v-model="formUpdate.option"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
    <form class="package_form">
      <div class="package_form-inner">
        <div class="package_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Название"
            type="text"
            v-model="form.title"
          />
        </div>
        <div class="package_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Цена"
            type="number"
            v-model="form.price"
          />
        </div>
        <div class="package_form-item">
          <input
            class="rounded-sm text-dark form-control"
            type="checkbox"
            v-model="form.option"
          />
        </div>
      </div>
      <button
        class="promo-code_add btn base-button text-dark"
        @click.prevent.stop="addPackages"
      >
        Добавить упаковку
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Packages',

  data() {
    return {
      packages: {},
      form: {
        title: '',
        description: '1',
        is_active: false,
        is_show: false,
        type: '1',
        price: null,
        option: false,
      },
      formUpdate: {
        title: '',
        price: null,
        option: false,
      },
      isUpdatePackage: null,
    };
  },
  methods: {
    async getPackages() {
      await this.$http.get(`/admin/settings/packages`).then((response) => {
        this.packages = response.data.data.packages;
      });
      this.$notify({
        type: 'success',
        message: 'Упаковки успешно получены',
      });
    },
    async addPackages() {
      await this.$http
        .post(`/admin/settings/packages`, this.form)
        .then((response) => {
          this.getPackages();
          this.form = {
            title: '',
            description: '',
            is_active: false,
            is_show: false,
            type: '',
            price: null,
            option: false,
          };
          this.$notify({
            type: 'success',
            message: 'Упаковка успешно добавлена',
          });
        });
    },
    async deletePackage(index) {
      await this.$http
        .delete(`/admin/settings/packages/${index}`)
        .then((response) => {
          this.getPackages();
          this.$notify({
            type: 'success',
            message: 'Упаковка успешно удалена',
          });
        });
    },
    updateForm(index, packageItem) {
      this.isUpdatePackage = index;
      this.formUpdate = {
        id: packageItem.id,
        title: packageItem.title,
        price: packageItem.price,
        option: packageItem.option,
      };
    },
    async updatePackage(index) {
      await this.$http
        .patch(
          `/admin/settings/packages/${this.formUpdate.id}`,
          this.formUpdate
        )
        .then((response) => {
          this.getPackages();
          this.isUpdatePackage = null;
          this.$notify({
            type: 'success',
            message: 'Данные успешно обновлены',
          });
        });
    },
  },
  mounted() {
    this.getPackages();
  },
};
</script>

<style lang="scss" scoped>
.package {
  &_inner {
    max-width: 800px;
    margin: 0 auto;
  }
  &_table {
    margin-bottom: 30px;
    &-thead {
      margin-bottom: 30px;
      & span {
        font-weight: 700;
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
      &:nth-child(3) {
        display: flex;
        justify-content: center;
      }
    }
    &-tbody {
      display: flex;
      flex-direction: column;
      gap: 20px;

      & .package_table-col {
        &:nth-child(1) {
          display: flex;
          align-items: center;
          gap: 15px;
        }
      }

      & span {
        font-weight: 600;
        color: #000;
        text-align: left;
      }
    }
  }
  &_form {
    &-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 50px;
      padding: 0 30px 0px 30px;
    }
    &-item {
      flex: 1;
      &:nth-child(3) {
        display: flex;
        justify-content: center;
      }
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
input[type='checkbox'] {
  width: 15px;
  height: 15px;
}

button {
  max-width: 500px;
  width: 100%;
  background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  margin-top: 25px;
  margin: 30px 0 0 0;
}
</style>
