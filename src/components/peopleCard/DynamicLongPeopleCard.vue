<script setup>
import { RouterLink } from 'vue-router';
import { PhUser } from '@phosphor-icons/vue';

const props = defineProps({
  people: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div v-for="person in people" :key="person.id"
    class="w-full h-fit flex min-[850px]:max-[1411px]:flex-row-reverse items-center gap-2">
    <div v-if="person.profile_path" class="h-18 min-w-18 rounded-full overflow-hidden">
      <img :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`" :alt="`${person?.name} Image`"
        class="h-full w-full object-cover" />
    </div>
    <div v-else
      class="h-18 min-w-18 rounded-full flex items-center justify-center bg-[var(--dark-green)] text-[var(--green)]]">
      <PhUser :size="50" weight="fill" />
    </div>
    <div class="w-fit flex flex-col min-[850px]:max-[1411px]:items-end">
      <h3 class="text-xl text-[var(--green)] font-semibold min-[850px]:max-[1411px]:text-right">{{ person.name
      }}</h3>
      <p class="text-lg min-[850px]:max-[1411px]:text-right">{{ person.job }}</p>
    </div>
  </div>
</template>