<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onBack = () => router.back()
</script>

<template>
  <button class="rounded-2xl bg-[#202020]  cursor-pointer" @click="onBack">
    <Icon icon="mdi:chevron-right" class=" text-[#a3e632] size-10" />
  </button>
</template>
