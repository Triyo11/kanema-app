<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
  people: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div v-for="person in people" :key="person?.id" class="flex flex-col w-full max-h-fit items-center">
    <img v-if="person?.profile_path" :src="`https://image.tmdb.org/t/p/w500${person?.profile_path}`" alt="Cast Image"
      class="h-32 min-w-32 rounded-full object-cover">
    <img v-else :src="`https://placehold.jp/097969/ffffff/350x350.png?text=%20`" alt="Cast Image"
      class="h-32 min-w-32 rounded-full object-cover">
    <p class="text-lg text-[var(--green)] font-semibold text-center">{{ person?.name }}</p>
    <p class="text-lg text-[var(--white)] text-center">{{ person?.character }}</p>
  </div>
</template>