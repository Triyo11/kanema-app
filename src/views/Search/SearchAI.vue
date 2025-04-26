<script setup>
import { useDialogSearchStore } from '../../stores/dialogSearchStore';

import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

const searchedResult = ref([]);
const dialogSearchStore = useDialogSearchStore();

watchEffect(() => {
  searchedResult.value = dialogSearchStore?.searchedResults;
});
</script>

<template>
  <div class="w-[70vw] flex flex-col justify-center gap-8" style="margin: 2.5rem auto;">
    <h2 class="text-[var(--green)] font-bold text-xl">Here's the result of search by AI</h2>
    <div v-for="(item, index) in searchedResult" :key="index" class="w-full flex flex-col gap-4">
      <!-- use router-link instead of tag a -->
      <!-- to make not full-reload page -->
      <!-- full-reload page can cause reset state of store pinia -->
      <div class="flex flex-wrap items-center gap-2 text-xl font-semibold">
        <RouterLink :to="`/search/${item.title}`">
          <h3 class="text-[var(--green)] underline underline-offset-4">{{ item.title }}
            <span>({{ item.year }})</span>
          </h3>
        </RouterLink>
      </div>
      <div class="flex flex-col gap-2">
        <p>type: {{ item.type }}</p>
        <p class="">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>