<script setup lang="ts">
import type { LoadingMode } from '../../types/commonTypes'
import Loading from '../common/Loading.vue'

const { width = '100%' } = defineProps<{
  title: string
  type: 'submit' | 'button' | 'reset'
  width?: string
  loading?: LoadingMode
}>()
</script>

<template>
  <button
    :type
    class="text-[#161616] font-semibold lg:text-lg w-full lg:h-[55px] h-[50px] rounded-2xl flex items-center justify-center cursor-pointer border-none"
    :style="{ width }"
  >
    <Loading v-if="loading === 'LOADING'" />
    <span v-else>{{ title }}</span>
  </button>
</template>
