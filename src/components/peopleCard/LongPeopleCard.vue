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
  }
});
</script>

<template>
  <div v-for="person in people" :key="person?.id" class="w-full h-fit flex items-center gap-2">
    <div v-if="person?.profile_path" class="h-18 min-w-18 rounded-full overflow-hidden">
      <img :src="`https://image.tmdb.org/t/p/w500${person?.profile_path}`" :alt="`${person?.name} Image`"
        class="h-full w-full object-cover" />
    </div>
    <div v-else
      class="h-18 min-w-18 rounded-full flex items-center justify-center bg-[var(--dark-green)] text-[var(--green)]]">
      <PhUser :size="50" weight="fill" />
    </div>
    <div class="w-full flex flex-col">
      <RouterLink v-if="type === 'cast'" :to="`/discover/with_cast/${person?.name}/${person.id}`"
        class="text-xl text-[var(--green)] font-semibold underline underline-offset-4">
        {{ person.name }}
      </RouterLink>
      <RouterLink v-if="type === 'crew'" :to="`/discover/with_crew/${person?.name}/${person.id}`"
        class="text-xl text-[var(--green)] font-semibold underline underline-offset-4">
        {{ person.name }}
      </RouterLink>
      <p class="text-lg">{{ person.character }}</p>
    </div>
  </div>
</template>