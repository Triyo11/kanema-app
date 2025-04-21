<script setup>
import { ref, reactive, watchEffect } from 'vue';
import { getGeminiResponse } from '../utils/useGemini';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { Dialog, Button, MultiSelect, InputText, Textarea } from 'primevue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import router from '../router';

const dialogSearchStore = useDialogSearchStore();
const toast = useToast();

const isDialogSearchAIOpen = ref(null);

watchEffect(() => {
  isDialogSearchAIOpen.value = dialogSearchStore.isDialogSearchAiOpen;
});

const propertySearchByAI = reactive({
  genre: null,
  year: null,
  casts: null,
  synopsis: null,
});

const genreTypes = [
  { name: 'Action', value: 'action' },
  { name: 'Animation', value: 'animation' },
  { name: 'Adventure', value: 'adventure' },
  { name: 'Biography', value: 'biography' },
  { name: 'Comedy', value: 'comedy' },
  { name: 'Crime', value: 'crime' },
  { name: 'Documentary', value: 'documentary' },
  { name: 'Drama', value: 'drama' },
  { name: 'Fantasy', value: 'fantasy' },
  { name: 'Heroes', value: 'heroes' },
  { name: 'History', value: 'history' },
  { name: 'Horror', value: 'horror' },
  { name: 'Mystery', value: 'mystery' },
  { name: 'Religion', value: 'religion' },
  { name: 'Romance', value: 'romance' },
  { name: 'Sci-Fi', value: 'sci-fi' },
  { name: 'Thriller', value: 'thriller' },
  { name: 'War', value: 'war' },
];

const handleSearchByAI = async () => {
  const { genre, synopsis } = propertySearchByAI;

  if (!genre || genre.length === 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'I need the genre to find it.', life: 3000 });
    return;
  }

  if (!synopsis || synopsis.trim() === '') {
    toast.add({ severity: 'error', summary: 'Error', detail: "Hhmm... I can't understand, please write the story that you remembered.", life: 4000 });
    return;
  }

  await getGeminiResponse(propertySearchByAI).then((response) => {
    if (response) {
      if (response.length > 0) {
        dialogSearchStore.setSearchedResults(response);
        router.push({ name: 'SearchAi' });
      } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No results found.', life: 3000 });
      }
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data.', life: 3000 });
    }
  }).catch((error) => {
    console.error('Error fetching data:', error);
    toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred.', life: 3000 });
  });
  // Reset the form after submission
  propertySearchByAI.genre = null;
  propertySearchByAI.year = null;
  propertySearchByAI.casts = null;
  propertySearchByAI.synopsis = null;
  dialogSearchStore.closeDialogAi();
};
</script>

<template>
  <div class="card flex justify-center">
    <Toast position="top-right" :baseZIndex="10000" :style="{ zIndex: 10000 }" />
    <Dialog v-model:visible="isDialogSearchAIOpen" modal :style="{
      width: '50vw', height: '60vh',
      padding: '.5rem',
      backgroundColor: 'var(--black)',
      borderRadius: '1rem',
      border: '3px solid var(--dark-green)',
    }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :closeOnEscape="true" :dismissableMask="true" @hide="dialogSearchStore.closeDialogAi()">
      <template #header>
        <h2 class="font-semibold text-2xl text-[var(--green)]">Search by AI</h2>
      </template>
      <span class="text-lg block" style="margin-bottom: 1.5rem;">
        Please give some information about the movie you want to watch.
      </span>
      <div class="card flex justify-center items-center gap-20 w-full md:w-80" style="margin-bottom: .5rem;">
        <MultiSelect id="genre" v-model="propertySearchByAI.genre" :options="genreTypes" optionLabel="name"
          placeholder="Genre" display="chip" class="flex-auto w-full md:w-80 focus:border-8" />
      </div>
      <div class="card flex" style="margin-bottom: .5rem;">
        <InputText id="year" v-model="propertySearchByAI.year" placeholder="Year (optional)"
          class="flex-auto w-full md:w-80" autocomplete="off" />
      </div>
      <div class="card flex" style="margin-bottom: .5rem;">
        <InputText id="casts" v-model="propertySearchByAI.casts" placeholder="Casts (optional)"
          class="flex-auto w-full md:w-80" autocomplete="off" />
      </div>
      <div class="card flex" style="margin-bottom: .5rem;">
        <Textarea id="synopsis" v-model="propertySearchByAI.synopsis" rows="5" cols="30" placeholder="Tell me the story"
          class="flex-auto w-full md:w-80" autocomplete="off" />
      </div>
      <template #footer>
        <Button label="Find it!" @click="handleSearchByAI()" raised />
      </template>
    </Dialog>
  </div>
</template>