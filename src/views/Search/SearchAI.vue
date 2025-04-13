<script setup>
import NotFound from '../NotFound.vue';
import { useDialogSearchStore } from '../../stores/dialogSearchStore';

import { ref, watchEffect } from 'vue';
import { PhArrowSquareUpRight } from '@phosphor-icons/vue';
import { RouterLink } from 'vue-router';

const searchedResult = ref([]);
const dialogSearchStore = useDialogSearchStore();

watchEffect(() => {
  searchedResult.value = dialogSearchStore?.searchedResults;
});
</script>

<template>
  <div class="w-[70vw] flex flex-col justify-center gap-8 mx-auto my-10">
    <h2 class="text-[var(--green)] font-bold text-xl">Here's the result of search by AI</h2>
    <div v-for="(item, index) in searchedResult" :key="index" class="w-full flex flex-col gap-4">
      <!-- use router-link instead of tag a -->
      <!-- to make not full-reload page -->
      <!-- full-reload page can cause reset state of store pinia -->
      <div class="flex flex-wrap items-center gap-2 text-xl font-semibold">
        <h3 class="text-[var(--green)]">{{ item.title }} <span>({{ item.year }})</span></h3>
        <RouterLink :to="`/search/${item.title}`">
          <PhArrowSquareUpRight :size="24" weight="fill"
            class="hover:text-[var(--dark-green)] transition-all ease-in-out duration-300" />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-2">
        <p>type: {{ item.type }}</p>
        <p class="">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>