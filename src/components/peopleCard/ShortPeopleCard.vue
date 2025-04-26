<script setup>
import { RouterLink } from 'vue-router';
import { PhUser } from '@phosphor-icons/vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    value: ['cast', 'crew'],
  },
  people: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div v-for="person in people" :key="person?.id" class="flex flex-col w-full max-h-fit items-center">
    <div v-if="person?.profile_path" class="h-32 min-w-32 rounded-full overflow-hidden">
      <img :src="`https://image.tmdb.org/t/p/w500${person?.profile_path}`" alt="Cast Image"
        class="w-full h-full object-cover">
    </div>
    <div v-else
      class="h-32 min-w-32 rounded-full flex items-center justify-center bg-[var(--dark-green)] text-[var(--green)]]">
      <PhUser :size="100" weight="fill" />
    </div>
    <RouterLink v-if="type === 'cast'" :to="`/discover/with_cast/${person?.name}/${person.id}`"
      class="text-lg text-[var(--green)] font-semibold text-center underline underline-offset-4">
      {{ person?.name }}
    </RouterLink>
    <RouterLink v-if="type === 'crew'" :to="`/discover/with_crew/${person?.name}/${person.id}`"
      class="text-lg text-[var(--green)] font-semibold text-center underline underline-offset-4">
      {{ person?.name }}
    </RouterLink>
    <p class="text-lg text-[var(--white)] text-center">{{ person?.character }}</p>
  </div>
</template>