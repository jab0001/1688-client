<template>
  <div class="drafts h-100 w-100">
    <h1 class="drafts__title text-dark">Мои черновики</h1>
    <div class="drafts__content d-flex flex-wrap align-items-start">
      <div class="drafts__content__items h-100" v-if="drafts.length > 0">
        <Draft class="drafts__content__item" v-for="draft in drafts" :info="draft" :key="draft.key"
          @removeDraft="removeDraft" @openDraft="openDraft" :isTemplateCard="true" />
      </div>
      <div class="drafts__content__support">
        <SupportCard>
          <div class="support-cart-parapgraph">
            Авто-сохраненные заявки хранятся 24 часа, затем восстановить их
            будет не возможно
          </div>
          <!-- <div class="support-cart-parapgraph">
            Черновики которые вы сохранили, хранятся 24 часа
          </div> -->
        </SupportCard>
      </div>
    </div>
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'; //  импортируем крутилку лоадера

import { mapState } from 'vuex';
import SupportCard from '@/views/Dashboard/Cards/SupportCard.vue';
import Draft from '@/views/Pages/Drafts/Draft.vue';
export default {
  components: {
    SupportCard,
    Draft,
    Loader,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    // получаем данные из store Vuex
    ...mapState({
      drafts: (state) => state.profileTemplate.templates, // черновики заказов
    }),
  },
  methods: {
    async getDraftsFromServer() {
      this.isLoading = true;
      await this.$http
        .get(`/drafts`)
        .then((response) => {
          if (response.data.length > 0) {
            this.$store.commit(
              'profileTemplate/SET_TEMPLATES',
              response.data
            );
            this.$notify({ type: 'success', message: 'Черновики загружены' });
            this.isLoading = false;
          } else {
            this.$notify({
              type: 'success',
              message: 'У вас нет сохраненных черновиков',
            });
            this.isLoading = false;
          }
        })
        .catch((error) => {
          this.$notify({
            type: 'warning',
            message: 'Проблемы с загрузкой черновиков',
          });
          this.isLoading = false;
        });
    },
    async getDraftsFromLS() {
      this.isLoading = true;
      const templates = JSON.parse(localStorage.getItem('templates'));
      this.$store.commit(
        'profileTemplate/SET_TEMPLATES',
        templates
      );
      this.isLoading = false;
    },
    async removeDraft(id) {
      this.isLoading = true;
      await this.$http
        .delete(`/drafts/${id}`)
        .then((response) => {
          this.$store.commit('profileTemplate/DELETE_TEMPLATE', id);
          this.isLoading = false;
        })
        .catch((error) => {
          this.$notify({
            type: 'warning',
            message: 'Проблемы с удалением черновика',
          });
          this.isLoading = false;
        });
    },
    openDraft(id) {
      this.$store.commit('profileTemplate/SET_TEMPLATE_AS_ACTIVE', id);
      this.$store.commit('profileTemplate/SET_TEMPLATE_IS_USED', true);
      this.$router.push('/new_order');
    },
  },
  mounted() {
    this.getDraftsFromServer();
  },
};
</script>

<style lang="scss" scoped>
.drafts {
  padding: 2.875rem 2.5rem;

  &__title {
    margin-bottom: 1.5625rem;
  }

  &__content {
    width: 992px;
    column-gap: 40px;
    row-gap: 22px;

    &__item {
      width: 100%;
      min-height: 219px;

      &:not(:last-child) {
        margin-bottom: 1.375rem;
      }
    }

    &__items {
      flex: 1 1 493px;
    }

    &__support {
      flex: 1 1 316px;
      min-height: 185px;
      letter-spacing: 0.03em;
    }
  }
}

@media (max-width: 1144px) {
  .drafts__content__support {
    & .support {
      max-width: 100%;
    }
  }
}

@media (max-width: 549px) {
  .drafts__content__support {
    & .support {
      max-width: 100%;
    }
  }

  .drafts__content__items {
    flex: 1 0 200px;
  }

  .drafts {
    padding: 1.625rem 1.25rem;
  }
}</style>
