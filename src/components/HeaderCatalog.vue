<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <h2 class="text-3xl font-bold text-[var(--green)] pt-4">
    {{ title }}
  </h2>
</template>