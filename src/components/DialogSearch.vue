<script setup>
import { ref, watchEffect } from 'vue';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { Dialog, Button, InputText } from 'primevue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { defineProps } from 'vue';
import router from '../router';

const dialogSearchStore = useDialogSearchStore();
const toast = useToast();

const isDialogSearchOpen = ref(null);
const searchQuery = ref('');

watchEffect(() => {
  isDialogSearchOpen.value = dialogSearchStore.isDialogSearchOpen;
});

const handleGoToSearchPage = (query) => {
  if (!query) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please enter a title.', life: 3000 });
    return;
  }
  router.push({ name: 'Search', params: { query } });
  dialogSearchStore.closeDialog();
  searchQuery.value = '';
  // toast.add({ severity: 'success', summary: 'Success', detail: `Searching for "${query}"...`, life: 3000 });
};
</script>

<template>
  <div class="card flex justify-center">
    <Toast position="top-right" :baseZIndex="10000" :style="{ zIndex: 10000 }" />
    <Dialog v-model:visible="isDialogSearchOpen" modal :style="{
      width: '50vw', height: 'fit-content',
      padding: '.5rem',
      backgroundColor: 'var(--black)',
      borderRadius: '1rem',
      border: '3px solid var(--dark-green)',
    }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closeOnEscape="true" :dismissableMask="true"
      @hide="dialogSearchStore.closeDialog()">
      <template #header>
        <h2 class="font-semibold text-2xl text-[var(--green)]">Search</h2>
      </template>
      <div class="card flex" style="margin-bottom: .5rem;">
        <InputText id="year" v-model="searchQuery" placeholder="Enter the title"
          class="flex-auto w-full md:w-80" autocomplete="off" />
      </div>
      <template #footer>
        <Button label="Find it!" @click="handleGoToSearchPage(searchQuery)" raised />
      </template>
    </Dialog>
  </div>
</template>