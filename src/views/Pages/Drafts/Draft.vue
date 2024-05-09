<template>
  <DashboardCard
    class="draft"
    buttonTitle="Продолжить заказ"
    @buttonAction="$emit('openDraft', info.id)"
  >
    <div class="draft__content d-flex justify-content-between mb-2 mb-sm-4">
      <div class="draft__content__data">
        <h3 class="draft__content__title" v-if="!isNameChanged">
          {{ name }}
        </h3>
        <input v-if="isNameChanged" type="text" v-model="newName" />
        <div class="draft__content__created d-sm-block d-none">
          создан: {{ created_data }}
        </div>
      </div>
      <div class="draft__content__actions d-sm-block d-none">
        <div
          @click="renameDraft"
          class="draft-action d-flex align-items-center"
        >
          <img src="@/assets/img/icons/cards/rename.svg" alt="" />
          <span>Переименовать черновик</span>
        </div>
        <div
          @click="$emit('removeDraft', info.id)"
          class="draft-action d-flex align-items-center"
          v-if="isTemplateCard"
        >
          <img src="@/assets/img/icons/cards/bin.svg" alt="" />
          <span>Удалить черновик</span>
        </div>
      </div>
      <div class="draft__right-side__mobile d-sm-none d-block">
        <div class="draft__content__created">создан: {{ created_data }}</div>
      </div>
    </div>
    <div class="draft-hr"></div>
  </DashboardCard>
</template>

<script>
import DashboardCard from '@/views/Dashboard/Cards/DashboardCard.vue';
export default {
  props: {
    info: Object,
    isTemplateCard: Boolean,
  },
  emits: ['removeDraft', 'openDraft'],
  components: {
    DashboardCard,
  },
  data() {
    return {
      isNameChanged: false,
      newName: '',
      name: '',
    };
  },
  computed: {
    created_data() {
      let date = new Date(this.info.created_at);
      return (
        String(date.getFullYear()) +
        '-' +
        this.takeStringFromTime(date.getMonth()) +
        '-' +
        this.takeStringFromTime(date.getDate()) +
        ' ' +
        this.takeStringFromTime(date.getHours()) +
        '-' +
        this.takeStringFromTime(date.getMinutes())
      );
    },
  },
  methods: {
    takeStringFromTime(timeEl) {
      return timeEl + 1 < 10 ? '0' + String(timeEl) : String(timeEl + 1);
    },
    renameDraft() {
      if (this.isNameChanged && this.name !== this.newName) {
        this.name = this.newName;
        let newDraft = JSON.parse(this.info.data);
        newDraft.name = this.name;
        this.changeDraftname(newDraft);
      }
      this.isNameChanged = !this.isNameChanged;
    },
    async changeDraftname(newDraft) {
      await this.$http
        .patch(`/drafts/${this.info.id}`, {
          data: JSON.stringify(newDraft),
        })
        .then((response) => {
          this.$notify({
            type: 'success',
            message: 'Черновик успешно переименован!',
          });
        });
    },
  },
  mounted() {
    this.name = this.info.data.name;
    this.newName = this.name;
  },
};
</script>

<style lang="scss" scoped>
.draft {
  max-width: 100%;
  &__content__created {
    font-size: 0.93rem;
    color: #797979;
    font-size: clamp(10px, 2.5vw, 14px);
    letter-spacing: 0.03em;
  }
  &__content__title {
    font-weight: 400;
    line-height: 123%;
    color: #000;
    margin-bottom: 0;
    letter-spacing: 0.03em;
    font-size: clamp(12px, 3.5vw, 18px);
  }
  &-hr {
    background: #f3f4f6;
    height: 1px;
  }
}
.draft-action {
  column-gap: 9px;
  justify-content: flex-end;
  color: #3e3e3a;
  letter-spacing: 0.03em;
  & span {
    font-size: 0.875rem;
    font-weight: 400;
  }
}
input {
  height: 23px;
  width: 250px;
}
</style>
