<script setup>
import SimpleCard from "@/components/SimpleCard.vue";
import HeaderCatalog from "@/components/HeaderCatalog.vue";
import NotFound from "./NotFound.vue";
import useDiscover from "@/composables/useDiscover";
import { ref, watchEffect } from "vue";
import { Paginator } from "primevue";
import { PhCaretCircleDoubleLeft, PhCaretCircleDoubleRight, PhCaretCircleLeft, PhCaretCircleRight } from "@phosphor-icons/vue";

const props = defineProps({
  filter: String,
  query: String,
  title: String,
});

const currentPage = ref(0);
const moviesContainer = ref([]);
const error = ref(null);
const loading = ref(false);

watchEffect(() => {
  const { movies, error, loading } = useDiscover(props.filter, props.query, currentPage.value + 1);
  moviesContainer.value = movies;
  error.value = error;
  loading.value = loading;
});

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog :title="`${props.title}'s Movies`" />
      <Paginator v-model:first="currentPage" :rows="1" :totalRecords="moviesContainer?.value?.total_pages"
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
        <p v-if="loading">Loading...</p>
        <div v-else-if="error">
          <NotFound subTitle="Error while searching movies" />
        </div>
        <div v-else-if="!loading && moviesContainer?.value?.length === 0">
          <NotFound subTitle="No movies found" />
        </div>
        <div v-else-if="moviesContainer" class="w-full flex flex-wrap justify-center gap-8">
          <SimpleCard :movies="moviesContainer?.value?.results.filter(movie => movie.poster_path !== null)" />
        </div>
      </transition>
      <Paginator v-model:first="currentPage" :rows="1" :totalRecords="moviesContainer?.value?.total_pages"
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