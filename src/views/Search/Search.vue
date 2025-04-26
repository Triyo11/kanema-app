<script setup>
import useSearch from '@/composables/useSearch';
import SimpleCard from '@/components/SimpleCard.vue';
import HeaderCatalog from '@/components/HeaderCatalog.vue';
import NotFound from '../NotFound.vue';

const props = defineProps({
  query: String
});

const { dataSearch, error, loading } = useSearch();
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog :title='`Search results for "${props.query}"`' />
      <transition name="fade" mode="out-in">
        <div v-if="loading" class="text-center">
          <p class="text-2xl font-bold text-[var(--green)]">Loading...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <NotFound :subTitle="`Error while searching for movies`" />
        </div>
        <div v-else-if="dataSearch.length === 0">
          <NotFound :subTitle="`Search results not found`" />
        </div>
        <div v-else-if="dataSearch" class="w-full flex flex-wrap justify-center gap-8">
          <SimpleCard :movies="dataSearch" />
        </div>
      </transition>
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