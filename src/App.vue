<script setup lang="ts">
import { Toaster } from 'vue-sonner'
</script>

<template>
  <section class="max-w-2xl px-4 mx-auto min-h-screen bg-[#161616] relative">
    <Toaster position="top-right" rich-colors />
    <router-view />
  </section>
</template>
