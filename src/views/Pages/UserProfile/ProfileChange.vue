<template>
  <ul class="profile-card__list">
    <div class="profile-card__buttons">
      <button
        class="profile-card__button btn base-button text-dark"
        @click="sendChangeProfile"
      >
        Сохранить профиль
      </button>
      <button
        class="profile-card__button btn cancel-button text-dark"
        @click="$emit('changeComponent')"
      >
        Отменить
      </button>
    </div>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Маркировка: </span>
      <span class="profile-card__item__span--second">
        {{ user_info.data.client.marking }}
      </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Никнейм: </span>
      <span class="profile-card__item__span--second"
        >@{{ user_info.data.client.tag }}</span
      >
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first"> Id профиля: </span>
      <span class="profile-card__item__span--second">{{ tg_id }}</span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <input
        type="text"
        :class="[isValidPhone]"
        class="rounded-sm text-dark form-control"
        v-model="phone"
        v-mask="'+# (###) ###-##-##'"
        @input="phoneInput"
        placeholder="Номер телефона"
      />
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <input
        v-model="email"
        :class="[isValidEmail]"
        class="rounded-sm text-dark form-control"
        placeholder="Email"
      />
      <span> </span>
    </li>
    <li class="profile-card__item d-flex">
      <div class="profile-card__circle"></div>
      <span class="profile-card__item__span--first" style="flex: 1">
        Разница с Москвой:
      </span>
      <div class="dropdown align-self-end" v-click-outside="closeDropDown">
        <button class="dropdown-button__custom" @click="isOpen = !isOpen">
          {{ selectedOption }}
          <span class="arrow" :class="{ up: isOpen }"></span>
        </button>
        <ul v-show="isOpen" class="dropdown-menu__custom shadow">
          <li
            v-for="(option, index) in options"
            :key="index"
            @click="handleSelect(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProfileChange',
  data() {
    return {
      options: [
        '-1',
        '0',
        '+1',
        '+2',
        '+3',
        '+4',
        '+5',
        '+6',
        '+7',
        '+8',
        '+9',
      ],
      selectedOption: '',
      email: '',
      phone: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      isOpen: false,
      phoneValid: '',
      user_info: {},
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
    tg_id() {
      return store.getters['auth/userTelegramId'];
    },
  },

  methods: {
    closeDropDown() {
      this.isOpen = false;
    },

    handleSelect(option) {
      this.selectedOption = option;
      this.isOpen = false;
    },

    async sendChangeProfile() {
      await this.$http
        .post(`/client/update`, {
          email: this.email,
          phone: this.phone,
          difference_with_moscow: this.selectedOption,
        })
        .then((res) => {
          this.user_info.data.client.phone = this.phone;
          this.user_info.data.client.email = this.email;
          this.user_info.data.client.difference_with_moscow =
            this.difference_with_moscow;
          store.commit('auth/SET_USER', this.user_info);
          this.$emit('changeComponent');
        });
    },

    phoneInput(e) {
      let phone = e.target.value.replace(/\D/g, '');

      if (phone.length > 10) {
        phone = phone.substring(0, 11);
        phone = phone.replace(
          /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
          '+$1 ($2) $3-$4-$5'
        );
        this.phone = phone;
      } else {
        this.phoneValid = false;
      }
    },
  },
  mounted() {
    this.user_info = store.getters['auth/user'];
  },
};
</script>

<style lang="scss" scoped>
.dropdown-button__custom {
  border: 1px solid #dee2e6;
  background: white;
  padding: 8px;
  height: 42px;
  width: 100px;
  border-radius: 10px;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #9ca4b1;
}

.arrow.up {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-menu__custom {
  background: white;
  list-style: none;
  padding: 0;
  margin-top: 4px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  max-height: 300px;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 1;

  & li {
    text-align: center;
    padding: 8px;
  }

  & li:hover {
    background: #e6e6e6;
    cursor: pointer;
  }
}

.shadow {
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}

.profile-card {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  &__inner {
    width: 80%;
    border-radius: 0.375rem;
    padding: 30px 0px;
    box-shadow: 2px 2px 8px 0px rgb(34 60 80 / 20%);
  }

  &__percent {
    padding: 10px 20px;
    border: 1px solid #b6c0ca;
    color: #212529;
    border-radius: 5px;
    font-size: 12px;
    margin-left: 30px;
  }

  &__block {
    display: flex;
    align-items: center;
  }

  &__list {
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 30px;
  }

  &__list:nth-child(1) {
    border-bottom: 1px solid #e5e7eb;
    margin: 30px 30px 0px 30px;
    padding-bottom: 30px;
  }

  &__link {
    text-decoration-line: underline;
    -webkit-text-decoration-line: underline;
    font-style: italic;
    color: #2a272769;
    font-size: 14px;
  }

  &__hr {
    border-bottom: 1px solid #e5e7eb;
  }

  &__item {
    font-size: 16px;
    align-items: center;

    &__span {
      &--first {
        margin-right: 30px;
      }

      &--second {
        flex: 1;
        text-align: right;
      }
    }
  }

  &__avatar {
    width: 80px;
    height: 80px;
    object-position: cover;
    border-radius: 50%;
  }

  &__circle {
    width: 10px;
    height: 10px;
    border-radius: 100px;
    margin-right: 10px;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  }

  &__up {
    padding: 0px 30px 30px 30px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__button {
    width: 100%;
    margin-right: 0px !important;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);
  }

  &__name {
    font-size: 30px;
    margin-top: 20px;
    font-weight: 600;
    color: #212529;
  }
}

.cancel-button {
  background-color: white;
  border: 1px solid #dee2e6;
}
</style>
