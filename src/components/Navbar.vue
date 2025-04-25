<script setup>
import { SignedOut, SignInButton, UserButton, useUser, useAuth, SignOutButton, SignedIn } from '@clerk/vue';
import { computed, ref, watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { PhBookmarks, PhList } from '@phosphor-icons/vue';
import router from '../router';
import AiDialogSearch from './AiDialogSearch.vue';
import DialogSearch from './DialogSearch.vue';

const { user } = useUser();
const userStore = useUserStore();
const dialogSearchStore = useDialogSearchStore();
const { isSignedIn } = useAuth();

const userName = computed(() => {
  return userStore.user?.firstName;
})

const isDropdownOpen = ref(false);

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

watch(user, (user) => {
  userStore.setUser(user);
})
</script>

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

<template>
  <div
    class="padding-navbar fixed md:sticky bottom-0 md:top-0 z-100 bg-[var(--black)] w-full max-h-max flex justify-between items-center">
    <a href="/">
      <h2 class="logo text-[var(--green)] text-3xl font-bold">Kanema</h2>
    </a>
    <div class="lg:hidden">
      <button @click="handleDropdown"
        class="menu-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
        style="padding: .25rem .25rem;">
        <PhList :size="24" weight="bold" />
      </button>
      <div v-if="isDropdownOpen"
        class="dropdown-menu absolute right-2 bg-[var(--dark-green)] text-[var(--green)] rounded-md shadow-lg z-50"
        style="margin-top: .15rem;">
        <ul class="dropdown-menu-list flex flex-col gap-2" style="padding: 1rem;">
          <li class="dropdown-menu-item">
            <button @click="() => {
              dialogSearchStore.openDialog();
              isDropdownOpen = false;
            }" class="dropdown-menu-button">Search</button>
          </li>
          <li class="dropdown-menu-item">
            <button @click="() => {
              dialogSearchStore.openDialogAi();
              isDropdownOpen = false;
            }" class="dropdown-menu-button">Search by AI</button>
          </li>
          <li v-if="!isSignedIn" class="dropdown-menu-item">
            <SignedOut>
              <SignInButton>
                <button class="dropdown-menu-button">Sign In</button>
              </SignInButton>
            </SignedOut>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <button @click="() => {
                router.push({ name: 'Favorite' });
                isDropdownOpen = false;
              }" class="dropdown-menu-button">Favorites</button>
            </SignedIn>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <button @click="() => {
                router.push({ name: 'Profile' });
                isDropdownOpen = false;
              }" class="dropdown-menu-button">Manage Account</button>
            </SignedIn>
          </li>
          <li v-if="isSignedIn" class="dropdown-menu-item">
            <SignedIn>
              <SignOutButton>
                <button class="dropdown-menu-button">Sign Out</button>
              </SignOutButton>
            </SignedIn>
          </li>
        </ul>
        <div class="dropdown-menu-overlay" @click="isDropdownOpen = false"></div>
      </div>
    </div>
    <div class="hidden search-bar lg:flex lg:absolute w-1/3 left-1/2 transform lg:-translate-x-1/2">
      <form @submit.prevent="handleGoToSearchPage(searchQuery)" class="w-full flex">
        <input type="text" placeholder="Search..." v-model="searchQuery"
          class="search-input relative border-2 border-[var(--green)] focus:outline-none focus:border-[var(--green)] rounded-3xl w-full text-[var(--white)]"
          style="padding: .375rem 1rem;" />
        <button @click="handleGoToSearchPage(searchQuery)"
          class="search-button absolute right-0 bg-[var(--green)] text-[var(--black)] w-fit h-full rounded-r-3xl ml-2 cursor-pointer"
          style="padding: .25rem .5rem;">
          Search
        </button>
      </form>
    </div>
    <div class="lg:flex items-center justify-between gap-4 hidden">
      <button @click="dialogSearchStore.openDialogAi()"
        class="search-ai-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
        style="padding: .25rem .75rem;">
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
            <button class="sign-in-button bg-[var(--green)] text-[var(--black)] rounded-md cursor-pointer"
              style="padding: .25rem .75rem;">
              Sign In
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