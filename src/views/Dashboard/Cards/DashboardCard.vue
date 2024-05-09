<template>
  <div
    class="dashboard-card h-100 bg-white d-flex flex-column justify-content-between"
  >
    <slot></slot>
    <div class="dashboard-card-button">
      <button
        @click="$emit('buttonAction')"
        v-if="buttonTitle"
        class="btn btn-yellow text-underline"
      >
        {{ buttonTitle }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonTitle: String,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-card-button {
  display: flex;
  justify-content: space-between;
}
.draft-action {
  column-gap: 9px;
  justify-content: flex-end;
  color: #3e3e3a;
  letter-spacing: 0.03em;
  text-decoration: underline;
  cursor: pointer;
  & span {
    font-size: 0.875rem;
    font-weight: 400;
  }
}
</style>
