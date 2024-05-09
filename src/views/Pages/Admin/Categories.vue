<template>
  <div class="categories_inner">
    <div class="categories_table">
      <div class="categories_table-thead">
        <div class="categories_table-tr">
          <div class="categories_table-col">
            <span>Категория</span>
          </div>
          <div class="categories_table-col">
            <span>+$ за 1 кг</span>
          </div>
        </div>
      </div>
      <div class="categories_table-tbody">
        <div
          class="categories_table-tr"
          v-for="(categoryItem, index) in categories"
          :key="index"
        >
          <div class="categories_table-col">
            <div class="icons">
              <div
                class="icon"
                @click="deleteCategories(categoryItem.id)"
                v-if="isUpdateCategory !== index"
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
              <div class="icon" @click="isUpdateCategory = null" v-else>
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
                @click="updateForm(index, categoryItem)"
                v-if="isUpdateCategory !== index"
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
              <div class="icon" @click="updateCategory(index)" v-else>
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
            <span v-if="isUpdateCategory !== index">{{
              categoryItem.title
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="Название"
              type="text"
              v-model="formUpdate.title"
              v-else
            />
          </div>
          <div class="categories_table-col">
            <span class="number" v-if="isUpdateCategory !== index">{{
              categoryItem.price
            }}</span>
            <input
              class="rounded-sm text-dark form-control"
              placeholder="$ за 1 кг"
              type="number"
              v-model="formUpdate.price"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
    <form class="categories_form">
      <div class="categories_form-inner">
        <div class="categories_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="Название"
            type="text"
            v-model="form.title"
          />
        </div>
        <div class="categories_form-item">
          <input
            class="rounded-sm text-dark form-control"
            placeholder="$ за 1 кг"
            type="number"
            v-model="form.price"
          />
        </div>
      </div>
      <button
        class="promo-code_add btn base-button text-dark"
        @click.prevent.stop="addCategories"
      >
        Добавить упаковку
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: {},
      form: {
        title: '',
        price: null,
      },
      formUpdate: {
        title: '',
        price: null,
      },
      isUpdateCategory: null,
    };
  },
  methods: {
    async getCategories() {
      await this.$http.get(`/admin/settings/categories`).then((response) => {
        this.categories = response.data.data.categories;
      });
      this.$notify({
        type: 'success',
        message: 'Категории успешно получены',
      });
    },

    async addCategories() {
      await this.$http
        .post(`/admin/settings/categories`, this.form)
        .then((response) => {
          this.getCategories();
          this.form = {
            title: '',
            price: null,
          };
          this.$notify({
            type: 'success',
            message: 'Категория успешно добавлена',
          });
        });
    },
    async deleteCategories(id) {
      await this.$http
        .delete(`/admin/settings/categories/${id}`)
        .then((response) => {
          this.getCategories();
          this.$notify({
            type: 'success',
            message: 'Категория успешно удалена',
          });
        });
    },
    updateForm(index, category) {
      this.isUpdateCategory = index;
      this.formUpdate = {
        id: category.id,
        title: category.title,
        price: category.price,
      };
    },
    async updateCategory(index) {
      await this.$http
        .patch(
          `/admin/settings/categories/${this.formUpdate.id}`,
          this.formUpdate
        )
        .then((response) => {
          this.getCategories();
          this.isUpdateCategory = null;
          this.$notify({
            type: 'success',
            message: 'Данные успешно обновлены',
          });
        });
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style lang="scss" scoped>
.categories {
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
    }
    &-tbody {
      display: flex;
      flex-direction: column;
      gap: 20px;

      & .categories_table-col {
        &:nth-child(1) {
          display: flex;
          align-items: center;
          gap: 15px;
        }
      }
      & span {
        font-weight: 600;
        color: #000;
      }
      & .number {
        background-color: #fff;
        border: 1px solid #b5b9c4;
        padding: 5px 70px;
        border-radius: 6px;
        height: 36px;
        align-items: center;
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
</style>
