<script setup>
import { SignedOut, SignInButton, UserButton, useUser, useAuth, SignOutButton, SignedIn } from '@clerk/vue';
import { computed, ref, watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { PhBookmarks, PhList } from '@phosphor-icons/vue';
import router from '../router';
import AiDialogSearch from './AiDialogSearch.vue';
import DialogSearch from './DialogSearch.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { usePaginatorStore } from '../stores/paginatorStore';
import LangSwitcher from './LangSwitcher.vue';

const { user } = useUser();
const userStore = useUserStore();
const dialogSearchStore = useDialogSearchStore();
const paginatorStore = usePaginatorStore();
const { isSignedIn } = useAuth();
const toast = useToast();

const userName = computed(() => {
  console.log(userStore.user?.imageUrl);
  return userStore.user?.firstName;
})

const profileImage = computed(() => {
  return userStore.user?.imageUrl;
});

const searchQuery = ref('');
const isDropdownOpen = ref(false);
const isDropdownProfileOpen = ref(false);

const handleGoToSearchPage = (query) => {
  if (!query) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a title.', life: 3000 });
    return;
  }
  router.push({ name: 'Search', params: { query } });
  searchQuery.value = '';
  paginatorStore.setCurrentPage(0);
};

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleDropdownProfile = () => {
  isDropdownProfileOpen.value = !isDropdownProfileOpen.value;
};

watch(user, (user) => {
  userStore.setUser(user);
})
</script>

<template>
  <div class="padding-navbar sticky top-0 z-100 bg-[var(--black)] w-full max-h-max flex justify-between items-center">
    <Toast position="top-right" :baseZIndex="10000" :style="{ zIndex: 10000 }" />
    <RouterLink to="/">
      <h2 class="logo text-[var(--green)] text-3xl font-bold">Kanema</h2>
    </RouterLink>
    <div class="lg:hidden flex" style="gap: .5rem;">
      <LangSwitcher />
      <button @click="handleDropdown"
        class="menu-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
        style="padding: .25rem .25rem;">
        <PhList :size="24" weight="bold" />
      </button>
      <div v-if="isDropdownOpen"
        class="dropdown-menu absolute top-13 right-8 bg-[var(--dark-green)] text-[var(--green)] rounded-md shadow-lg z-50"
        style="margin-top: .15rem;">
        <ul class="dropdown-menu-list flex flex-col gap-2" style="padding: 1rem;">
          <li class="dropdown-menu-item">
            <button @click="() => {
              dialogSearchStore.openDialog();
              isDropdownOpen = false;
            }" class="dropdown-menu-button cursor-pointer">{{ $t('navbar.search') }}</button>
          </li>
          <li class="dropdown-menu-item">
            <button @click="() => {
              dialogSearchStore.openDialogAi();
              isDropdownOpen = false;
            }" class="dropdown-menu-button cursor-pointer">{{ $t('navbar.search_by_ai') }}</button>
          </li>
          <li v-if="!isSignedIn" class="dropdown-menu-item">
            <SignedOut>
              <SignInButton>
                <button class="dropdown-menu-button cursor-pointer">{{ $t('navbar.sign_in') }}</button>
              </SignInButton>
            </SignedOut>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <button @click="() => {
                router.push({ name: 'Favorite' });
                isDropdownOpen = false;
              }" class="dropdown-menu-button cursor-pointer">{{ $t('navbar.favorites') }}</button>
            </SignedIn>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <button @click="() => {
                router.push({ name: 'Profile' });
                isDropdownOpen = false;
              }" class="dropdown-menu-button cursor-pointer">{{ $t('navbar.manage_account') }}</button>
            </SignedIn>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <SignOutButton>
                <button class="dropdown-menu-button cursor-pointer">{{ $t('navbar.sign_out') }}</button>
              </SignOutButton>
            </SignedIn>
          </li>
        </ul>
        <div class="dropdown-menu-overlay" @click="isDropdownOpen = false"></div>
      </div>
    </div>
    <div class="hidden search-bar lg:flex lg:absolute w-1/3 left-1/2 transform lg:-translate-x-1/2">
      <form @submit.prevent="handleGoToSearchPage(searchQuery)" class="w-full flex">
        <input type="text" :placeholder="$t('navbar.search_placeholder')" v-model="searchQuery"
          class="search-input relative border-2 border-[var(--green)] focus:outline-none focus:border-[var(--green)] rounded-md w-full text-[var(--white)]"
          style="padding-top: .375rem; padding-bottom: .375rem; padding-left: .5rem; padding-right: 4.3rem;" />
        <button type="submit"
          class="search-button absolute right-0 bg-[var(--green)] text-[var(--black)] w-fit h-full rounded-r-md ml-2 cursor-pointer"
          style="padding: .25rem .5rem;">
          {{ $t('navbar.search') }}
        </button>
      </form>
    </div>
    <div class="lg:flex items-center justify-between gap-4 hidden">
      <LangSwitcher />
      <button @click="dialogSearchStore.openDialogAi()"
        class="search-ai-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
        style="padding: .25rem .75rem;">
        {{ $t('navbar.search_by_ai') }}
      </button>
      <div>
        <!-- Signed In start -->
        <div class="flex items-center gap-2">
          <button @click="handleDropdownProfile" class="profile-button cursor-pointer">
            <img v-if="profileImage" :src="profileImage" alt="Profile Image"
              class="profile-image object-cover rounded-full w-7 h-7" />
          </button>
          <div v-if="isDropdownProfileOpen"
            class="profile-dropdown absolute top-14 right-8 bg-[var(--dark-green)] text-[var(--green)] rounded-md shadow-lg z-50"
            style="margin-top: .15rem;">
            <ul class="profile-dropdown-list flex flex-col gap-2" style="padding: 1rem;">
              <li class="profile-dropdown-item">
                <button @click="() => {
                  router.push({ name: 'Favorite' });
                  isDropdownProfileOpen = false;
                }" class="profile-dropdown-button cursor-pointer">{{ $t('navbar.favorites') }}</button>
              </li>
              <li class="profile-dropdown-item">
                <button @click="() => {
                  router.push({ name: 'Profile' });
                  isDropdownProfileOpen = false;
                }" class="profile-dropdown-button cursor-pointer">{{ $t('navbar.manage_account') }}</button>
              </li>
              <li class="profile-dropdown-item">
                <SignOutButton>
                  <button @click="isDropdownProfileOpen = false" class="profile-dropdown-button cursor-pointer">{{
                    $t('navbar.sign_out') }}</button>
                </SignOutButton>
              </li>
            </ul>
            <div class="profile-dropdown-overlay" @click="isDropdownProfileOpen = false">
              <!-- Overlay to close the dropdown when clicking outside -->
            </div>
          </div>
        </div>
        <!-- Signed In end -->
        <!-- Signed Out start -->
        <SignedOut>
          <SignInButton>
            <button class="sign-in-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
              style="padding: .25rem .75rem;">
              {{ $t('navbar.sign_in') }}
            </button>
          </SignInButton>
        </SignedOut>
        <!-- Signed Out end -->
      </div>
    </div>
  </div>
  <AiDialogSearch />
  <DialogSearch />
</template>

<style scoped>
.padding-navbar {
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .padding-navbar {
    padding: 1rem 1rem;
  }
}
</style>