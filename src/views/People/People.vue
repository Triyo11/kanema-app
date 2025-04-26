<!-- TODO : create discover by casts and crews, at Detail page and People page -->
<script setup>
import { PhUser } from '@phosphor-icons/vue';
import { usePeopleDetails } from './composable';
import LongPeopleCard from '@/components/peopleCard/LongPeopleCard.vue';
import DynamicLongPeopleCard from '@/components/peopleCard/DynamicLongPeopleCard.vue';

const {
  casts,
  crews,
  movieInfo,
} = usePeopleDetails();

function groupByJob(crews) {
  const grouped = crews.reduce((acc, crew) => {
    if (!acc[crew.job]) {
      acc[crew.job] = [];
    }
    acc[crew.job].push(crew);
    return acc;
  }, {});

  const sorted = {};
  if (grouped['Director']) {
    sorted['Director'] = grouped['Director'];
    delete grouped['Director'];
  }
  if (grouped['Producer']) {
    sorted['Producer'] = grouped['Producer'];
    delete grouped['Producer'];
  }
  return { ...sorted, ...grouped };
}
</script>

<style scoped>
.people-container {
  padding: 1rem 15rem;
}

@media (max-width: 1411px) {
  .people-container {
    padding: 1rem 2rem;
  }
}
</style>

<template>
  <div class="people-container w-full h-full flex max-[1411px]:flex-col max-[1411px]:items-center gap-4">
    <div class="w-full min-[850px]:w-1/3 h-full flex flex-col max-[850px]:items-center gap-4">
      <img :src="`https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`" alt="Movie Poster"
        class="min-w-[280px] max-w-[400px] min-h-[350px] max-h-[600px] object-cover" />
      <div class="flex flex-wrap flex-col max-[1411px]:items-center gap-2">
        <h2 v-if="movieInfo?.original_title !== movieInfo?.title"
          class="movie-title flex flex-col gap-1 text-[var(--green)] hyphens-auto" style="padding-bottom: .25rem;">
          <span class="text-4xl font-bold">{{ movieInfo?.title }}</span>
          <span class="text-lg">Original title: {{ movieInfo?.original_title }}</span>
        </h2>
        <h2 v-else class="text-4xl font-bold text-[var(--green)] hyphens-auto" style="padding-bottom: .25rem;">
          {{ movieInfo?.title }}
        </h2>
        <p class="font-semibold text-4xl">{{ movieInfo?.release_date?.split("-")[0] }}</p>
      </div>
    </div>
    <div
      class="w-full min-[850px]:w-2/3 h-full flex max-[850px]:flex-col max-[850px]:items-center gap-4 max-[850px]:gap-16">
      <div class="w-full min-[850px]:w-1/2 flex flex-col gap-2">
        <h2 class="text-3xl font-bold text-[var(--green)]">
          Casts ({{ casts.length }})
        </h2>
        <div class="flex flex-col gap-4">
          <LongPeopleCard :people="casts" />
        </div>
      </div>
      <div class="w-full min-[850px]:w-1/2 flex flex-col min-[850px]:max-[1411px]:items-end gap-2">
        <h2 class="text-3xl font-bold text-[var(--green)]">Crews ({{ crews.length }})</h2>
        <div class="flex flex-col gap-4">
          <div v-for="(crewGroup, job) in groupByJob(crews)" :key="job"
            class="w-full h-fit flex flex-col min-[850px]:max-[1411px]:items-end gap-4">
            <h3 class="text-xl font-bold text-[var(--green)] min-[850px]:max-[1411px]:text-right">{{ job }}</h3>
            <DynamicLongPeopleCard :people="crewGroup" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>