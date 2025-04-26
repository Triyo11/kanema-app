<script setup>
import useFavorite from "@/composables/useFavorite";
import SimpleCard from "@/components/SimpleCard.vue";
import HeaderCatalog from "@/components/HeaderCatalog.vue";
import NotFound from "../NotFound.vue";

const { favorites, error, loading } = useFavorite();
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-7xl flex flex-col items-center gap-8">
      <HeaderCatalog title="My Favorite" />
      <transition name="fade" mode="out-in">
        <p v-if="loading">Loading...</p>
        <div v-else-if="error">
          <NotFound subTitle="Error while searching favorites" />
        </div>
        <div v-else-if="!loading && favorites.length === 0">
          <NotFound subTitle="No favorite movies or series found" />
        </div>
        <div v-else-if="favorites" class="w-full flex flex-wrap justify-center gap-8">
          <SimpleCard :movies="favorites" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
