<template>
  <div class="support container">
    <div class="support__inner">
      <div class="support__up">
        <h1 class="support__title">Контакты</h1>
      </div>
      <div class="support__bottom">
        <ul class="support__list">
          <div class="support__item">
            <svg
              class="support__icon"
              width="46"
              height="46"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <rect width="33" height="33" fill="url(#pattern0)"></rect>
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_621_243"
                    transform="scale(0.016129)"
                  ></use>
                </pattern>
                <image
                  id="image0_621_243"
                  width="62"
                  height="62"
                  xlink:href="data:image/png;base64,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"
                ></image>
              </defs>
            </svg>
            <div class="support__elem">
              <a href="tel:+78003028131">8 800 301 17 25</a>
            </div>
          </div>
          <div class="support__item">
            <svg
              class="support__icon"
              width="46"
              height="46"
              viewBox="0 0 35 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M17.5 0C7.8321 0 0 8.05703 0 18C0 27.943 7.83323 36 17.5 36C27.1679 36 35 27.943 35 18C35 8.05703 27.1668 0 17.5 0ZM26.0953 12.3317L23.2231 26.2533C23.0108 27.2404 22.4395 27.4796 21.6424 27.0151L17.2674 23.6985L15.1573 25.7888C14.9247 26.028 14.7271 26.2312 14.2755 26.2312L14.586 21.6511L22.6935 14.1166C23.0469 13.7973 22.6156 13.6161 22.1494 13.9355L12.1292 20.4236L7.81065 19.037C6.87242 18.7328 6.85097 18.072 8.00823 17.6075L24.8805 10.915C25.664 10.6246 26.3482 11.1112 26.0942 12.3306L26.0953 12.3317Z"
                fill="black"
              ></path>
            </svg>
            <div class="support__elem">
              <a href="https://t.me/FLG_group_bot">Написать в Telegram</a>
            </div>
          </div>
          <div class="support__item">
            <svg
              class="support__icon"
              width="46"
              height="46"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3333 3333"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm941 1201c14-47 0-81-66-81h-220c-56 0-82 30-96 62 0 0-112 272-270 449-51 51-74 67-102 67-14 0-35-16-35-63v-435c0-56-15-81-62-81h-345c-35 0-56 26-56 50 0 53 79 65 87 214v324c0 71-13 84-41 84-74 0-256-274-363-587-21-61-42-85-98-85H721c-63 0-75 30-75 62 0 58 74 347 347 729 182 261 437 402 670 402 140 0 157-31 157-85v-197c0-63 13-75 57-75 33 0 88 16 219 142 149 149 174 216 257 216h220c63 0 94-31 76-93-20-62-91-151-185-257-51-61-128-126-151-158-33-42-23-61 0-98 0 0 268-377 296-505z"
              ></path>
            </svg>
            <div class="support__elem">
              <a href="https://vk.com/full.logistic">Написать во Вконтакте</a>
            </div>
          </div>
          <div class="support__item">
            <svg
              class="support__icon"
              width="46"
              height="46"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3333 3333"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M1667 0c920 0 1667 746 1667 1667 0 920-746 1667-1667 1667C747 3334 0 2588 0 1667 0 747 746 0 1667 0zm-390 752h780c293 0 532 237 532 525v778c0 289-239 525-532 525h-780c-293 0-532-236-532-525v-778c0-289 240-525 532-525zm385 421c285 0 516 231 516 516s-231 516-516 516-516-231-516-516 231-516 516-516zm0 174c188 0 341 153 341 341s-153 341-341 341c-189 0-341-153-341-341s153-341 341-341zm499-246c46 0 84 37 84 84 0 46-37 84-84 84-46 0-84-37-84-84 0-46 37-84 84-84zm-820-200h652c245 0 445 199 445 443v656c0 244-200 443-445 443h-652c-245 0-445-199-445-443v-656c0-244 200-443 445-443z"
              ></path>
            </svg>
            <div class="support__elem">
              <a href="https://instagram.com/full.logistic"
                >Наша страница Instagram</a
              >
            </div>
          </div>
        </ul>
      </div>
      <div class="support__footer">© 2023 ИП ХВАН ГИ ВОН</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Support',
  mounted() {
    if (localStorage.getItem('user_active') == 'no') {
      this.$router.push({ path: '/first_auth' });
    }
  },
};
</script>

<style lang="scss" scoped>
.support {
  display: flex;
  justify-content: center;
  align-items: center;

  &__inner {
    max-width: 700px;
    width: 100%;
    padding: 40px 40px 60px 40px;
    border-radius: 5px;
    box-shadow: 2px 2px 8px 0px rgb(34 60 80 / 20%);
    margin-top: 100px;
    margin-bottom: 50px;
    background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);

    @media screen and (max-width: 480px) {
      max-width: 100%;
      padding: 4.17vw 4.17vw 8.33vw 4.17vw;
      border-radius: 1.04vw;
      margin-top: 20.83vw;
      margin-bottom: 10.42vw;
    }
  }

  &__item {
    display: flex;
    gap: 30px;
    align-items: center;

    @media screen and (max-width: 480px) {
      gap: 5.21vw;
    }

    & svg {
      @media screen and (max-width: 480px) {
        width: 8.33vw;
        height: 8.33vw;
      }
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 66px;
    margin-bottom: 50px;

    @media screen and (max-width: 480px) {
      margin-top: 10.42vw;
      margin-bottom: 10.42vw;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 0;
    margin-bottom: 0;

    @media screen and (max-width: 480px) {
      gap: 5.21vw;
    }
  }

  &__title {
    font-size: 40px;
    text-align: center;
    color: #1c1c1c;
    margin-bottom: 0;

    @media screen and (max-width: 480px) {
      font-size: 7.08vw;
    }
  }

  &__up {
    border-bottom: 1px solid #d9b601;
    padding-bottom: 30px;

    @media screen and (max-width: 480px) {
      padding-bottom: 4.17vw;
    }
  }

  &__elem {
    border-radius: 5px;
    background-color: #1c1c1c;
    padding: 20px 50px;
    color: #fff;
    font-size: 22px;
    max-width: 383px;
    width: 100%;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;

    @media screen and (max-width: 480px) {
      border-radius: 1.04vw;
      padding: 4.17vw 8.33vw;
      max-width: 80.17vw;
      font-size: 3.33vw;
    }

    & > a {
      color: #fff;
    }
  }

  &__footer {
    text-align: center;
    padding: 50px 0px 0px 0px;
    border-top: 1px solid #d9b601;

    @media screen and (max-width: 480px) {
      font-size: 3.75vw;
      padding-top: 8.33vw;
    }
  }
}
</style>
