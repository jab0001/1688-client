<template>
  <div class="new-order__block">
    <div class="new-order__box">
      <div class="new-order__header">
        <div class="new-order__heading">Введите данные</div>
        <label class="new-order__label">
          Обязательно вводите корректные данные, мы будем использовать их чтобы
          связаться с вами для уточнении деталей заказа</label
        >
      </div>

      <div class="new-order__form-container">
        <div class="form-item">
          <span class="label-text">ФИО</span>
          <input
            type="text"
            v-model="name"
            class="profile-order__input form-control rounded-sm text-dark"
            required
          />
        </div>
        <div class="form-item">
          <span class="label-text">Номер телефона:</span>
          <input
            type="text"
            v-mask="'+# (###) ###-##-##'"
            v-model="phone"
            :class="isValidPhone"
            class="profile-order__input form-control rounded-sm text-dark"
            required
          />
        </div>
        <div class="form-item">
          <span class="label-text">Email:</span>
          <input
            type="text"
            v-model="email"
            :class="[isValidEmail]"
            class="profile-order__input form-control rounded-sm text-dark"
            required
          />
        </div>
        <div class="form-item">
          <div class="form_item__heading">
            <span class="label-text">Комментарии к заказу (если нужно)</span>
            <label class="profile-order__input__file">
              Прикрепить файл
              <input type="file" @change="showFiles" />
            </label>
          </div>
          <textarea
            :value="comments"
            @input="updateComments"
            class="profile-order__input__comments form-control rounded-sm text-dark"
            placeholder="Комментарии..."
          />

          <div
            class="mt-2"
            v-if="!file && editableOrderImage && editableOrderUrl"
          >
            <h4 v-if="editableOrderImage">Прикрепленное изображение</h4>

            <a
              :href="editableOrderUrl"
              target="_blank"
              class="profile-order__link-name"
              >{{ editableOrderFileName }}</a
            >
            <span class="cursor-pointer ml-1" @click="detachEditableFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path
                  d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                ></path>
              </svg>
            </span>
          </div>
          <div class="mt-2" v-if="file && !editableOrderImage">
            <div class="previewImgPlace" ref="imageplace" name="imageplace">
              <h4 v-if="fileInOrder">Прикрепленное изображение</h4>
              <div class="previewMiniature">
                <div
                  class="cursor-pointer ml-1 detachImage"
                  @click="detachFile"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                    ></path>
                  </svg>
                </div>
                <img v-if="fileInOrder" :src="imageSrc" class="previewImage" />
                <div class="profile-order__file-name">{{ file.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new-order__box-btns">
      <div class="new-order__btn-place">
        <Btn :btnData="prevStep_btn_data" @actionBtn="prevStepBtnPressed" />
      </div>
      <div class="new-order__btn-place">
        <Btn :btnData="nextStep_btn_data" @actionBtn="nextStepBtnPressed" />
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/ButtonUniver.vue';

export default {
  name: 'OrderComponentProfile',
  props: [
    'courses',
    'nextStep_btn_data',
    'prevStep_btn_data',
    'clientPhone',
    'clientEmail',
    'clientName',
    'phoneInOrder',
    'emailInOrder',
    'clientNameInOrder',
    'commentsInOrder',
    'fileInOrder',
    'editableOrderIsUsed',
  ],
  emits: ['prevStep', 'nextStep'],
  components: {
    Btn,
  },

  data() {
    return {
      user_info: {},
      phone: '',
      email: '',
      name: '',
      file: null,
      comments: '',
      isImageLoaded: false,
      maxFileSize: 2000000,
      editableOrderImage: false,
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },

  computed: {
    isValidPhone() {
      return this.phone === ''
        ? ''
        : this.phone.length === 18
        ? 'is-valid'
        : 'is-invalid';
    },

    isValidEmail() {
      return this.email === ''
        ? ''
        : this.reg.test(this.email)
        ? 'is-valid'
        : 'is-invalid';
    },

    editableOrderFileName() {
      if (this.editableOrderIsUsed) {
        return this.$store.getters['editableOrder/editableOrderImageName'];
      }
    },

    editableOrderUrl() {
      if (this.editableOrderIsUsed) {
        return this.$store.getters['editableOrder/editableOrderImageUrl'];
      }
    },

    imageSrc() {
      return URL.createObjectURL(this.fileInOrder);
    },
  },

  methods: {
    updateComments(e) {
      this.$store.commit('parsing/SET_COMMENTS', e.target.value);
    },

    prevStepBtnPressed() {
      this.sendDataToVuex();
      this.$emit('prevStep');
    },

    nextStepBtnPressed() {
      this.sendDataToVuex();
      this.$emit('nextStep');
    },

    sendDataToVuex() {
      this.$store.commit('parsing/SET_PHONE', this.phone);
      this.$store.commit('parsing/SET_EMAIL', this.email);
      this.$store.commit('parsing/SET_CLIENT_NAME', this.name);
    },

    showFiles(event) {
      if (event.target.files[0].size < this.maxFileSize) {
        // проверяем размер файл
        this.$store.commit('parsing/SET_FILE', event.target.files[0]); // сохраняем во Vuex
        this.file = event.target.files[0];
        this.$notify({
          type: 'success',
          message: 'Файл успешно прикреплен',
        });
        if (this.file.type.split('/')[0] === 'image') {
          this.isImageLoaded = true;
          URL.revokeObjectURL(this.file); // удаляем ссылку на файл
        }
      } else {
        this.$notify({
          type: 'warning',
          message: 'Размер файла не должен превышать 2Мб!',
        });
      }
      this.$store.commit('parsing/SET_FILE', event.target.files[0]);
      this.file = event.target.files[0];
      this.editableOrderImage = false;
    },

    detachFile() {
      if (
        this.file.type.split('/')[0] === 'image' &&
        this.$refs.imageplace.lastChild.classList.contains('previewLoadImg')
      ) {
        this.$refs.imageplace.lastChild.remove();
      }
      this.file = null;
      this.isImageLoaded = false;
    },

    detachEditableFile() {
      this.file = null;
      this.editableOrderImage = false;
    },
  },

  created() {
      this.comments = this.commentsInOrder;
  },

  mounted() {
    if (!this.phoneInOrder) {
      this.phone = this.clientPhone && this.clientPhone.length > 0 ? this.clientPhone : '';
    } else {
      this.phone = this.phoneInOrder;
    }
    if (!this.emailInOrder) {
      this.email = this.clientEmail && this.clientEmail.length > 0 !== '' ? this.clientEmail : '';
    } else {
      this.email = this.emailInOrder;
    }
    if (!this.clientNameInOrder) {
      this.name = this.clientName !== '' ? this.clientName : '';
    } else {
      this.name = this.clientNameInOrder;
    }

    this.file = this.fileInOrder ? this.fileInOrder : null;

    if (this.editableOrderIsUsed) {
      this.editableOrderImage = true;
      this.comments = this.commentsInOrder;
    }
  },
};
</script>

<style lang="scss" scoped>
.new-order {
  &__header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 440px;
    margin-bottom: 20px;
  }

  &__heading {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: #000000;
    text-transform: none;
  }

  &__label {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #6b6b6b;
    margin-bottom: 0px;
  }

  &__form-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 530px;
  }

  .form_item {
    width: 100%;

    &__heading {
      display: flex;
      align-items: center;
      gap: 12px;
    }
  }
}
.profile-order__input {
  max-height: 42px;
  width: 100%;
  //padding: 0.5rem;
  text-align: center;

  &__comments {
    height: 85px;
    resize: none;
  }

  &__file {
    cursor: pointer;
    font-family: 'SF UI Display';
    font-style: normal;
    font-weight: 600;
    font-size: 8.5863px;
    line-height: 10px;
    display: flex;
    align-items: center;
    letter-spacing: 0.03em;
    text-decoration-line: underline;
    color: #292824;

    input[type='file'] {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    max-width: 100%;
    max-height: 8.75vw;
    font-size: 2.92vw;
  }
}
.label-text {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-bottom: 8px;
}

.profile-order {
  &__file-name {
    font-size: 0.8rem;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    bottom: 0;
    width: 120px;
    background-color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    opacity: 0.8;
    padding: 3px 5px;
  }
  &__link-name {
    font-size: 0.8rem;
    color: #000;
  }
}
.previewLoadImg img {
  max-width: 100%;
}
.previewLoadImg {
  width: 60%;
  height: auto;
}
.imageplace {
  width: 90%;
}

.previewMiniature {
  display: block;
  width: 120px;
  position: relative;
}
.detachImage {
  position: absolute;
  right: 0;
  cursor: pointer;
  background-color: #ffffff;
  opacity: 0.8;
  padding: 0 5px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.previewImage {
  max-width: 120px;
  border-radius: 4px;
}
</style>
