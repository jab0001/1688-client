<template>
  <div
    :class="
      btnData.btnStyleName.length > 0
        ? 'btn btn' + btnData.btnColor + btnData.btnStyleName
        : 'btn'
    "
    @click="$emit('actionBtn', $event)"
  >
    <span class="btn__text">
      {{ btnData.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['btnData'],
  emits: ['actionBtn'],
};
</script>

<style lang="scss" scoped>
span {
  opacity: 0.9;
}
.btn:hover {
  background: linear-gradient(180deg, #dac66a 0%, #ffcd4d 100%);
}
.btn:active {
  background: #000000;
  .btn__text {
    color: #fadd56;
    opacity: 0.9;
  }
}

.btn {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  text-align: center;
  background: linear-gradient(180deg, #f5dd6d 0%, #ffcd4d 100%);

  &__text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #000000;
    letter-spacing: 0.03em;
    @media screen and (min-width: 1801px) {
      font-size: 14px;
      line-height: 17px;
    }
    @media screen and (min-width: 1701px) and (max-width: 1800px) {
      font-size: 14px;
      line-height: 17px;
    }
    @media screen and (min-width: 1601px) and (max-width: 1700px) {
      font-size: 14px;
      line-height: 17px;
    }
    @media screen and (min-width: 1441px) and (max-width: 1600px) {
      font-size: 14px;
      line-height: 17px;
    }
    @media screen and (min-width: 1201px) and (max-width: 1440px) {
      font-size: 14px;
      line-height: 17px;
    }
  }

  &__red {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    text-align: center;
    background: linear-gradient(
      180deg,
      #d62e2e 0%,
      #ffae95 188.46%,
      #ffae95 188.46%
    );

    .btn__text {
      color: #ffffff;
      opacity: 0.9;
    }
  }

  &__red:hover {
    background: linear-gradient(
      180deg,
      #ba2e2e 0%,
      #ffae95 188.46%,
      #ffae95 188.46%
    );

    .btn__text {
      color: #ffffff;
      opacity: 0.9;
    }
  }

  &__red:active {
    background: #000000;

    .btn__text {
      color: #ffae95;
      opacity: 0.9;
    }
  }

  &__grey {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    text-align: center;
    background: #d9dce2;

    .btn__text {
      color: #000000;
      opacity: 0.9;
    }
  }

  &__grey:hover {
    background: linear-gradient(
      180deg,
      #c4c6c9 0%,
      #d9dce2 188.46%,
      #d9dce2 188.46%
    );
    .btn__text {
      color: #000000;
      opacity: 0.9;
    }
  }

  &__grey:active {
    background: #000000;
    .btn__text {
      color: #c4c6c9;
      opacity: 0.9;
    }
  }
}
</style>
