<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <header class="flex items-center justify-between py-5">
    <button class="size-10 rounded-2xl bg-black flex items-center justify-center">
      <Icon icon="solar:user-broken" class="text-[#fff] size-7 cursor-pointer" />
    </button>
    <div class="flex items-center gap-2">
      <button class="">
        <Icon icon="solar:wallet-2-bold" class="text-[#ff3939] size-10 cursor-pointer" />
      </button>
      <router-link to="/all">
        <button class="size-10 rounded-2xl bg-black flex items-center justify-center">
          <Icon icon="solar:magnifer-outline" class="text-[#fff] size-6 cursor-pointer" />
        </button>
      </router-link>
    </div>
  </header>
</template>
