<template>
  <div class="dashboard-menu">
    <div class="menu__content h-100 d-flex flex-column">
      <NewOrderButton nav class="menu__button" />
      <div class="menu__content__links">
        <router-link to="/ribbon" class="menu__content__link">
          <img src="@/assets/img/icons/ribbon.svg" alt="" />
          <span class="d-md-block d-none">Лента</span>
        </router-link>
        <router-link to="/my_orders" class="menu__content__link">
          <img src="@/assets/img/icons/orders.svg" alt="" />
          <span class="d-md-block d-none">Заказы</span>
        </router-link>
        <router-link to="/drafts" class="menu__content__link">
          <img src="@/assets/img/icons/drafts.svg" alt="" />
          <span class="d-md-block d-none">Черновики</span>
        </router-link>
        <router-link to="/profile" class="menu__content__link">
          <img src="@/assets/img/icons/profile.svg" alt="" />
          <span class="d-md-block d-none">Профиль</span>
        </router-link>
      </div>
      <!-- <img
        src="@/assets/img/decoration/menu-line.png"
        class="menu-hr d-md-block d-none"
        alt=""
      /> -->
      <a
        href="https://chrome.google.com/webstore/detail/flg/dcfjmednflkgpadfgkdhphggnmmmodnb?hl=ru"
        rel="noopener noreferrer"
        class="menu__extension-info d-flex mx-md-4 mx-0 align-items-center"
        target="_blank"
      >
        <img
          src="@/assets/img/menu/google.png"
          class="google-logo"
          alt="GOOGLE"
        />
        <img src="@/assets/img/icons/logo-menu.svg" class="flg-logo" />
        <div class="d-md-block d-none">
          Наше расширение FLG в Google Chrome. <br />
          Для работы с 1688.com
        </div>
      </a>
      <div class="menu__content__links menu__content__links-helps">
        <a href="http://flg-support.ru/" target="_blank" class="menu__content__link">
          <img src="@/assets/img/icons/helps.svg" alt="" />
          <span class="d-md-block d-none">Помощь</span>
        </a>

        <a href="https://api.whatsapp.com/send/?phone=79993520049&text&type=phone_number&app_absent=0" target="_blank" class="menu__content__link">
          <img src="@/assets/img/icons/helps.svg" alt="" />
          <span class="d-md-block d-none">Оставить заявку</span>
        </a>
      </div>
      <div class="menu__footer d-md-block d-none">
        <a href="https://flgchina.ru" target="_blank">flgchina.ru</a>
        <a href="https://flgchina.ru/dogovor-oferty/" target="_blank"
          >Публичная оферта</a
        >
        <a href="">FLG 2023</a>
      </div>
    </div>
  </div>
</template>

<script>
import NewOrderButton from '@/views/Components/buttons/NewOrderBtn.vue';
export default {
  components: {
    NewOrderButton,
  },
};
</script>

<style lang="scss">
// style -> src\assets\sass\core\navs\dashboard-menu.scss
.menu__content__links-helps {
  margin-top: auto;
}

.menu__content__link {
  cursor: pointer;
}
</style>
