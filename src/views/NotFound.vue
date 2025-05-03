<script setup>
const props = defineProps({
  subTitle: {
    type: String,
    default: 'Page not found',
  },
})
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div class="w-full flex flex-col items-center gap-8">
      <img src="/error.svg" alt="error" width="350" height="350" />
      <h1 class="text-3xl font-semibold text-[var(--green)] text-center">
        {{ $t(props.subTitle) }}
      </h1>
    </div>
  </div>
</template>