<template></template>

<script>
export default {
  layout: 'UserDebug',

  methods: {
    async debugApi() {
      const data = {
        data: { ...localStorage },
      };

      await this.$http
        .post(`/client/debug`, data)
        .then(() => {
          this.$router.push('/profile');
        });
    },
  },
  async mounted() {
    await this.debugApi();
  },
};
</script>
