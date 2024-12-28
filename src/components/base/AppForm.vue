<script setup lang="ts">
defineEmits<{ submit: [] }>()
</script>

<template>
  <form novalidate class="app-form" @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<style scoped>
.app-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
