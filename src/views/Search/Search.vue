<script setup>
import useSearch from '@/composables/useSearch';
import SimpleCard from '@/components/SimpleCard.vue';
import HeaderCatalog from '@/components/HeaderCatalog.vue';
import NotFound from '../NotFound.vue';
import { ref, watchEffect } from 'vue';
import { Paginator } from "primevue";
import { PhCaretCircleDoubleLeft, PhCaretCircleDoubleRight, PhCaretCircleLeft, PhCaretCircleRight } from "@phosphor-icons/vue";
import { usePaginatorStore } from '../../stores/paginatorStore';

const props = defineProps({
  query: String,
});

const paginatorStore = usePaginatorStore();

const dataSearchContainer = ref([]);
const error = ref(null);
const loading = ref(false);

watchEffect(() => {
  const { dataSearch, error, loading } = useSearch(props.query);
  dataSearchContainer.value = dataSearch;
  error.value = error;
  loading.value = loading;
});
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog :title="$t('search.title', { query: props.query })" />
      <Paginator v-if="dataSearchContainer?.value?.results.length > 0" v-model:first="paginatorStore.currentPage" :rows="1" :totalRecords="dataSearchContainer?.value?.total_pages"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing page {first} of {totalPages}">
        <template #firsticon>
          <PhCaretCircleDoubleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #previcon>
          <PhCaretCircleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #nexticon>
          <PhCaretCircleRight class="pl-2" :size="38" weight="fill" />
        </template>
        <template #lasticon>
          <PhCaretCircleDoubleRight class="pl-2" :size="38" weight="fill" />
        </template>
      </Paginator>
      <transition name="fade" mode="out-in">
        <div v-if="loading" class="text-center">
          <p class="text-2xl font-bold text-[var(--green)]">Loading...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <NotFound subTitle="search.error" />
        </div>
        <div v-else-if="dataSearchContainer?.value?.results.length === 0">
          <NotFound subTitle="search.empty" />
        </div>
        <div v-else class="w-full flex flex-wrap justify-center gap-8">
          <SimpleCard :movies="dataSearchContainer?.value?.results.filter(movie => movie.poster_path !== null)" />
        </div>
      </transition>
      <Paginator v-if="dataSearchContainer?.value?.results.length > 0" v-model:first="paginatorStore.currentPage" :rows="1" :totalRecords="dataSearchContainer?.value?.total_pages"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing page {first} of {totalPages}">
        <template #firsticon>
          <PhCaretCircleDoubleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #previcon>
          <PhCaretCircleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #nexticon>
          <PhCaretCircleRight class="pl-2" :size="38" weight="fill" />
        </template>
        <template #lasticon>
          <PhCaretCircleDoubleRight class="pl-2" :size="38" weight="fill" />
        </template>
      </Paginator>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>