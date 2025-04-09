<script setup>
import { SignedOut, SignInButton, UserButton, useUser } from '@clerk/vue';
import { computed, reactive, ref, watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { getGeminiResponse } from '../utils/useGemini';
import { PhBookmarks } from '@phosphor-icons/vue';
import { Button, Dialog, InputText, MultiSelect, Textarea } from 'primevue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import router from '../router';

const { user } = useUser();
const userStore = useUserStore();
const dialogSearchStore = useDialogSearchStore();
const toast = useToast();

const userName = computed(() => {
  return userStore.user?.firstName;
})

const searchQuery = ref('');
const isDialogSearchOpen = ref(false);
const propertySearchByAI = reactive({
  genre: null,
  year: null,
  casts: null,
  synopsis: null,
});

const genreTypes = ref([
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
]);

const handleGoToSearchPage = (query) => {
  window.location.href = `/search/${query}`;
};

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
  isDialogSearchOpen.value = false;
};

watch(user, (user) => {
  userStore.setUser(user);
})
</script>

<template>
  <div class="sticky top-0 z-50 bg-[var(--black)] w-full max-h-max flex justify-between items-center py-4 px-8">
    <a href="/">
      <h2 class="logo text-[var(--green)] text-3xl font-bold">NetFilm</h2>
    </a>
    <div class="search-bar flex absolute w-1/3 left-1/2 transform -translate-x-1/2">
      <form @submit.prevent="handleGoToSearchPage(searchQuery)" class="w-full flex">
        <input type="text" placeholder="Search..." v-model="searchQuery"
          class="search-input relative border-2 border-[var(--green)] focus:outline-none focus:border-[var(--green)] rounded-3xl w-full px-4 py-1.5 text-[var(--white)]" />
        <button @click="handleGoToSearchPage(searchQuery)"
          class="search-button absolute right-0 bg-[var(--green)] text-[var(--black)] w-fit h-full px-2 py-1 rounded-r-3xl ml-2 cursor-pointer">
          Search
        </button>
      </form>
    </div>
    <div class="flex items-center justify-between gap-4">
      <button @click="isDialogSearchOpen = true"
        class="search-ai-button bg-[var(--green)] text-[var(--black)] px-3 py-1 rounded-md cursor-pointer">
        Search by AI
      </button>
      <div>
        <!-- Signed In start -->
        <div class="flex items-center gap-2">
          <p>{{ userName }}</p>
          <UserButton :appearance="{
            elements: {
              userButtonPopoverCard: {
                backgroundColor: 'var(--black)',
                width: '300px',
                height: 'fit-content',
              }
              // userButtonAvatarBox: {
              //   width: '32px',
              //   height: '32px',
              // },
            },
          }" userProfileMode='navigation' , userProfileUrl='/profile'>
            <UserButton.MenuItems>
              <UserButton.Link label="Favorites" href="/favorite">
                <template #labelIcon>
                  <PhBookmarks size={20} weight="fill" />
                </template>
              </UserButton.Link>
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
        </div>
        <!-- Signed In end -->
        <!-- Signed Out start -->
        <SignedOut>
          <SignInButton>
            <button class="sign-in-button bg-[var(--green)] text-[var(--black)] px-3 py-1 rounded-md cursor-pointer">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <!-- Signed Out end -->
      </div>
    </div>
  </div>
  <div class="card flex justify-center">
    <Toast position="top-right" :baseZIndex="10000" :style="{ zIndex: 10000 }" />
    <Dialog v-model:visible="isDialogSearchOpen" modal
      :style="{ width: '60vw', height: '60vh', padding: '14px', backgroundColor: 'var(--black)', borderRadius: '1rem', border: '3px solid var(--dark-green)' }">
      <template #header>
        <h2 class="font-semibold text-2xl text-[var(--green)]">Search by AI</h2>
      </template>
      <span class="text-lg block mb-6">
        Please give some information about the movie you want to watch.
      </span>
      <div class="card flex justify-center items-center gap-4 mb-2 w-full md:w-80">
        <MultiSelect id="genre" v-model="propertySearchByAI.genre" :options="genreTypes" optionLabel="name"
          placeholder="Genre" display="chip" class="flex-auto w-full md:w-80 focus:border-8" />
      </div>
      <div class="card flex mb-2">
        <InputText id="year" v-model="propertySearchByAI.year"
          placeholder="Year (optional)" class="flex-auto w-full md:w-80"
          autocomplete="off" />
      </div>
      <div class="card flex mb-2">
        <InputText id="casts" v-model="propertySearchByAI.casts"
          placeholder="Casts (optional)" class="flex-auto w-full md:w-80"
          autocomplete="off" />
      </div>
      <div class="card flex mb-2">
        <Textarea id="synopsis" v-model="propertySearchByAI.synopsis" rows="5" cols="30"
          placeholder="Tell me the story" class="flex-auto w-full md:w-80"
          autocomplete="off" />
      </div>
      <template #footer>
        <!-- <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
        <Button label="Save" outlined severity="secondary" @click="visible = false" autofocus /> -->
        <Button label="Find it!" @click="handleSearchByAI()" raised/>
      </template>
    </Dialog>
  </div>
</template>