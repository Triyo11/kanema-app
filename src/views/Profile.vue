<script setup>
import { UserProfile } from '@clerk/vue';
</script>

<template>
  <UserProfile :appearance="{
    elements: {
      rootBox: {
        height: '80dvh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5dvh',
      },
      cardBox: {
        margin: 'auto 0',
        width: '90%', // Adjusted for responsiveness
        maxWidth: '60rem', // Added max width for larger screens
        height: '100%',
      },
    },
  }">
  </UserProfile>
</template>
