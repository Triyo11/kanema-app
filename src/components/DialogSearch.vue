<script setup>
import { ref, computed, watch } from 'vue';
import { GoogleGenAI } from '@google/genai';
import { useDialogSearchStore } from '../stores/dialogSearchStore';
import { watchEffect } from 'vue';
import { Dialog } from 'primevue';

const dialogSearchStore = useDialogSearchStore();
const isDialogOpen = ref(false);

watchEffect(() => {
  isDialogOpen.value = dialogSearchStore.isDialogOpen;
});
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="isDialogOpen" modal header="Search by AI" :style="{ width: '50vw' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Username</label>
        <InputText id="username" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText id="email" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>