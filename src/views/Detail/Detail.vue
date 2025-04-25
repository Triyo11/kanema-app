<script setup>
import { useMovieDetails } from './composable';
import { useUserStore } from '@/stores/userStore';
import ListFolded from '@/components/ListFolded.vue';
import { PhBookmarkSimple } from '@phosphor-icons/vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  id: String
});

const userStore = useUserStore();

const {
  detailedMovie,
  detailMovieSeriesOmdb,
  videosMovie,
  genresMovie,
  durationMovie,
  castsMovie,
  similarMovies,
  keyPlayedVideo,
  isFavorite,
  playVideo,
  toggleFavorite,
} = useMovieDetails();
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center">
    <div class="h-full w-5/6 flex flex-col items-center">
      <div class="w-full flex flex-col min-[1158px]:flex-row items-center min-[1158px]:items-start gap-2">
        <div class="relative h-fit w-fit min-[1158px]:w-1/4">
          <div class="relative">
            <img :src="`https://image.tmdb.org/t/p/w500${detailedMovie?.poster_path}`" alt="Movie Poster"
              class="min-w-[240px] w-full min-h-[350px] max-h-[600px] object-cover" />
            <button v-if="userStore.user" @click="toggleFavorite"
              class="absolute top-2 right-2 bg-[var(--dark-green)] text-[var(--green)] rounded-md cursor-pointer shadow-md hover:bg-[var(--dark-green)]"
              style="padding: .25rem;">
              <PhBookmarkSimple :size="24" :weight="isFavorite ? 'fill' : 'bold'"
                class="transition-all duration-300 ease-in-out" />
            </button>
          </div>
        </div>
        <div class="flex flex-col w-full min-[1158px]:w-3/4 pl-4">
          <div class="header-detail-movie">
            <h2 v-if="detailedMovie?.original_title !== detailedMovie?.title"
              class="movie-title flex flex-col gap-1 text-[var(--green)] hyphens-auto" style="padding-bottom: .25rem;">
              <span class="text-4xl font-bold">{{ detailedMovie?.title }}</span>
              <span class="text-lg">Original title: {{ detailedMovie?.original_title }}</span>
            </h2>
            <h2 v-else class="text-4xl font-bold text-[var(--green)] hyphens-auto" style="padding-bottom: .25rem;">
              {{ detailedMovie?.title }}
            </h2>
            <div class="flex flex-wrap items-center gap-2">
              <div class="text-lg text-[var(--white)]">
                {{ genresMovie }}
              </div>
              <div v-if="durationMovie" class="w-1.5 h-1.5 rounded-full bg-[var(--white)]"></div>
              <div v-if="durationMovie">{{ durationMovie }}</div>
              <div class="w-1.5 h-1.5 rounded-full bg-[var(--white)]"></div>
              <div>{{ detailedMovie?.release_date?.split("-")[0] }}</div>
            </div>
          </div>
          <div class="body-detail-movie" style="padding-top: 2rem;">
            <p class="text-lg text-[var(--white)] text-justify hyphens-auto">
              {{ detailedMovie?.overview }}
            </p>
          </div>
          <!-- <div class="flex flex-row gap-8 pt-8">
            <div v-if="detailMovieSeriesOmdb?.data.Director" class="flex flex-col gap-2">
              <h2 class="text-lg text-[var(--green)] pb-2">Director</h2>
              <p class="text-lg text-[var(--white)] text-justify hyphens-auto">
                {{ detailMovieSeriesOmdb.data.Director }}
              </p>
            </div>
            <div v-if="!detailMovieSeriesOmdb?.data.Writer === 'N/A'" class="flex flex-col gap-2">
              <h2 class="text-lg text-[var(--green)] pb-2">Writers</h2>
              <p class="text-lg text-[var(--white)] text-justify hyphens-auto">
                {{ detailMovieSeriesOmdb.data.Writer }}
              </p>
            </div>
          </div> -->
          <div class="w-full flex flex-col gap-4" style="padding-top: 2rem;">
            <!-- display casts of movie with horizontal scroll view -->
            <div v-if="castsMovie.length > 0" class="flex flex-col gap-2">
              <div class="flex w-full justify-end items-center">
                <RouterLink :to="`/people/${detailedMovie?.id}`"
                  class="text-lg text-[var(--white)] hover:text-[var(--green)] transition-all duration-300 ease-in-out">
                  See
                  all casts and crews
                </RouterLink>
              </div>
              <div class="flex w-full min-h-max gap-4 overflow-x-auto scroll-style">
                <div v-for="cast in castsMovie" :key="cast?.id" class="flex flex-col w-full max-h-fit items-center">
                  <img v-if="cast?.profile_path" :src="`https://image.tmdb.org/t/p/w500${cast?.profile_path}`"
                    alt="Cast Image" class="h-32 min-w-32 rounded-full object-cover">
                  <img v-else :src="`https://placehold.jp/097969/ffffff/350x350.png?text=%20`" alt="Cast Image"
                    class="h-32 min-w-32 rounded-full object-cover">
                  <p class="text-lg text-[var(--green)] font-semibold text-center">{{ cast?.name }}</p>
                  <p class="text-lg text-[var(--white)] text-center">{{ cast?.character }}</p>
                </div>
              </div>
            </div>
            <!-- display crews of movie with horizontal scroll view -->
            <!-- <div class="flex flex-col gap-2">
              <h2 class="text-lg text-[var(--green)] pb-2">Crews</h2>
              <div class="flex w-full min-h-max gap-4 overflow-x-auto scroll-style">
                <div v-for="crew in crewsMovie" :key="crew?.id" class="flex flex-col w-full max-h-fit items-center">
                  <img v-if="crew?.profile_path" :src="`https://image.tmdb.org/t/p/w500${crew?.profile_path}`"
                    alt="Crew Image" class="h-32 min-w-32 rounded-full object-cover">
                  <img v-else :src="`https://placehold.jp/097969/ffffff/350x350.png?text=%20`" alt="Crew Image"
                    class="h-32 min-w-32 rounded-full object-cover">
                  <p class="text-lg text-[var(--green)] font-semibold text-center">{{ crew?.name }}</p>
                  <p class="text-lg text-[var(--white)] text-center">{{ crew?.job }}</p>
                </div>
              </div>
            </div> -->
          </div>
          <div class="w-full flex items-start gap-8" style="padding-top: 2rem;">
            <div v-if="detailedMovie?.production_companies?.length !== 0" class="basis-1/2 production-companies">
              <h2 class="text-lg text-[var(--green)]" style="padding-bottom: .5rem;">Production Companies</h2>
              <ul class="flex flex-col gap-2">
                <li v-for="company in detailedMovie?.production_companies" :key="company?.id"
                  class="text-lg text-[var(--white)]">
                  <RouterLink :to="`/discover/with_companies/${company?.name}/${company?.id}/1`"
                    class="hover:text-[var(--green)] transition-all duration-300 ease-in-out">
                    {{ company?.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-if="detailedMovie?.production_countries?.length !== 0" class="basis-1/2 production-countries">
              <h2 class="text-lg text-[var(--green)]" style="padding-bottom: .5rem;">Production Countries</h2>
              <ul class="flex flex-wrap gap-4">
                <li v-for="country in detailedMovie?.production_countries" :key="country?.iso_3166_1"
                  class="text-lg text-[var(--white)]">
                  {{ country?.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="videosMovie?.length !== 0" class="w-full h-full flex flex-col items-center gap-2"
        style="padding-top: 2rem; padding-bottom: 1rem;">
        <!-- <h2 class="text-2xl font-semibold text-[var(--green)]">Videos</h2> -->
        <div class="w-full min-[1024px]:w-3/4 h-125 flex flex-col min-[1158px]:flex-row justify-end gap-4">
          <div
            class="flex max-[1158px]:h-22 min-[1158px]:flex-col gap-2 max-[1158px]:overflow-x-auto min-[630px]:overflow-y-auto scroll-style">
            <div v-for="video in videosMovie" :key="video?.id" class="w-full h-full flex flex-col items-center">
              <button @click="playVideo(video?.key)" class="cursor-pointer">
                <img :src="`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`" alt="Video Thumbnail"
                  class="h-18 min-w-26 object-cover" />
              </button>
            </div>
          </div>
          <iframe :src="`https://www.youtube.com/embed/${keyPlayedVideo || videosMovie[0]?.key}`" frameborder="0"
            allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-presentation"
            class="h-full w-full mb-4"></iframe>
        </div>
      </div>
      <div v-if="similarMovies.length !== 0" class="w-full h-full flex flex-col items-center gap-2"
        style="padding-top: 2rem; padding-bottom: 9rem;">
        <ListFolded :titleList="`Similar Movies`" :movies="similarMovies" />
      </div>
    </div>
  </div>
</template>