<template>
  <div class="orders">
    <ProfileOrder
      @removeOrder="removeOrder"
      v-for="order in orders"
      :order="order"
      :key="order.id"
    />
  </div>
</template>

<script>
import ProfileOrder from '@/views/Pages/UserProfile/ProfileOrder.vue';

export default {
  name: 'ProfileOrdersList',
  components: { ProfileOrder },
  props: {
    orders: Array,
  },

  methods: {
    removeOrder(id) {
      this.$emit('removeOrder', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.orders {
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 596px;
  width: 100%;
  @media screen and (max-width: 992px) {
    max-width: unset;
  }
  @media screen and (max-width: 480px) {
    gap: 22px;
  }
}
</style>
