<template>
  <FormLogin @onSubmit="onSubmitHandler" />
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import FormLogin from '../Forms/Auth/FormLogin.vue';

export default {
  components: {
    FormLogin,
  },
  computed: {
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async onSubmitHandler({ phone, password }) {
      const formattedPhone = phone.replace(/\D/g, '');

      try {
        const res = await this.login({
          phone: formattedPhone,
          password,
        });

        if (res.token) {
          this.$router.push({ path: `/` });
        } else {
          this.$router.push({
            name: 'VerifySms',
            params: { phone, verify: 'signin' },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
