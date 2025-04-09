<script setup>
import { ref, watchEffect } from 'vue';
import { useCatalog } from './composable';
import HeaderCatalog from '@/components/HeaderCatalog.vue';
import SimpleCard from '@/components/SimpleCard.vue';
import NotFound from '../NotFound.vue';
import { Paginator } from 'primevue';
import { PhCaretCircleLeft, PhCaretCircleRight } from '@phosphor-icons/vue';

const props = defineProps({
  category: String,
  title: String,
  movies: {
    type: Array,
    default: () => [],
  }
});

const currentPage = ref(0);
const dataMoviesContainer = ref([]);
const loading = ref(false);
const error = ref(null);

watchEffect(() => {
  const { dataMovies, loading, error } = useCatalog(props.category, currentPage.value + 1);
  dataMoviesContainer.value = dataMovies;
  loading.value = loading;
  error.value = error;
});
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog
        :title="props.category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')" />
      <Paginator v-model:first="currentPage" :rows="20" :totalRecords="dataMoviesContainer.value.total_results"
        template="PrevPageLink CurrentPageReport NextPageLink" currentPageReportTemplate="Showing {first} to {last}">
        <template #previcon>
          <PhCaretCircleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #nexticon>
          <PhCaretCircleRight class="pl-2" :size="38" weight="fill" />
        </template>
      </Paginator>
      <transition name="fade" mode="out-in">
        <p v-if="loading">Loading...</p>
        <div v-else-if="error">
          <NotFound subTitle="Error while display" />
        </div>
        <div v-else-if="!loading && dataMoviesContainer.value.results?.length === 0">
          <NotFound subTitle="No favorite movies or series found" />
        </div>
        <div v-else-if="dataMoviesContainer.value" class="w-full flex flex-wrap gap-8">
          <SimpleCard :movies="dataMoviesContainer.value.results" />
        </div>
        <div v-else>
          <p>Hello World</p>
        </div>
      </transition>
      <Paginator v-model:first="currentPage" :rows="20" :totalRecords="dataMoviesContainer.value.total_results"
        template="PrevPageLink CurrentPageReport NextPageLink" currentPageReportTemplate="Showing {first} to {last}">
        <template #previcon>
          <PhCaretCircleLeft class="pr-2" :size="38" weight="fill" />
        </template>
        <template #nexticon>
          <PhCaretCircleRight class="pl-2" :size="38" weight="fill" />
        </template>
      </Paginator>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
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