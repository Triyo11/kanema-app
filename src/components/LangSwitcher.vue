<script setup>
import Select from 'primevue/select';
import { useI18n } from 'vue-i18n';
import { ref, watch, watchEffect } from 'vue';

const { locale } = useI18n();

const languages = ref([
  { name: 'en', value: 'en', code: 'gb' },
  { name: 'id', value: 'id', code: 'id' },
]);

const selectedLang = ref(null);
const changeLanguage = (lang) => {
  locale.value = lang.value;
  selectedLang.value = lang;
};

watch(locale, (newLocale) => {
  console.log(newLocale);
});

watchEffect(() => {
  selectedLang.value = languages.value.find(lang => lang.value === locale.value);
});
</script>

<template>
  <div class="flex items-center justify-center">
    <Select v-model="selectedLang" :options="languages" optionLabel="name" class="w-32" placeholder="Select Language"
      @change="changeLanguage($event.value)">
      <template #value="slotProps">
        <div class="flex items-center gap-2 w-fit">
          <img :src="`https://flagcdn.com/w20/${slotProps?.value?.code}.png`" alt="">
          <!-- <span>{{ slotProps.value.name }}</span> -->
        </div>
      </template>
    </Select>
  </div>
</template>