<template>
  <DashboardCard class="support">
    <div class="support-card-header mb-4 d-flex">
      <img
        class="support-card-icon mr-2"
        src="@/assets/img/icons/inform-outline.svg"
      />
      <div class="support-card-title">FLG ПОДДЕРЖКА</div>
    </div>
    <div class="support-card-content">
      <slot></slot>
    </div>
  </DashboardCard>
</template>

<script>
import DashboardCard from './DashboardCard.vue';
export default {
  components: {
    DashboardCard,
  },
  props: {
    paragraphs: Array,
  },
};
</script>

<style lang="scss">
.support {
  max-width: clamp(200px, 20vw, 300px);
}
.support-card-title {
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 120%;
  letter-spacing: 0.03em;
  color: #828282;
}
.support-card-icon {
  line-height: 1rem;
}
.support-cart-parapgraph {
  font-weight: 400;
  font-size: clamp(11px, 2.5vw, 15px);
  line-height: 115%;
  letter-spacing: 0.03em;
  color: #000;
  &:not(:last-child) {
    margin-bottom: 1.05rem;
  }
}
</style>
