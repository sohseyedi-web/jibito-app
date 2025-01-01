<script setup lang="ts">
import type { LoadingMode } from '../types/commonTypes'
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../components/base/AppButton.vue'
import AppForm from '../components/base/AppForm.vue'
import AppInput from '../components/base/AppInput.vue'
import useValid, { registerSchema } from '../composable/useValid'
import api from '../server/api'
import { SIGNUP_URL } from '../server/urls'
import { showToast } from '../utils/showToast'

const { errors, validateForm, values } = useValid({ username: '', email: '', password: '' }, registerSchema)
const isLoading = ref<LoadingMode>('INITIAL')
const isSubmitted = ref<boolean>(false)
const router = useRouter()

async function onSubmit() {
  isLoading.value = 'LOADING'
  const isValid = validateForm()

  try {
    if (!isValid) {
      isSubmitted.value = true
      showToast('error', 'خطا در تکمیل فرم')
      isLoading.value = 'FAILED'
    }

    if (isValid) {
      const { data } = await api.post(SIGNUP_URL, values.value)
      localStorage.setItem('token', data.token)
      showToast('success', 'ثبت نام موفق بود')
      isLoading.value = 'RESOLVED'
      router.push('/')
    }
  }
  catch {
    isLoading.value = 'FAILED'
    showToast('error', 'خطا در ثبت نام کاربر ')
  }
  finally {
    isLoading.value = 'INITIAL'
  }
}
provide('isSubmitted', isSubmitted)
</script>

<template>
  <section class="text-white pt-20 space-y-5">
    <h3 class="text-3xl font-semibold leading-10">
      بیا<br>شروع کنیم
    </h3>
    <p class="text-sm opacity-80 my-3">
      لطفا حساب کاربری خودت رو بساز
    </p>
    <AppForm class="space-y-3" @submit="onSubmit">
      <AppInput
        v-model="values.username"
        type="text"
        icon="solar:user-broken"
        :error="errors.username"
        placeholder="نام کاربری"
        name="username"
      />
      <AppInput
        v-model="values.email"
        type="email"
        icon="mdi:alternate-email"
        :error="errors.email"
        placeholder="ایمیل"
        name="email"
      />
      <AppInput
        v-model="values.password"
        type="password"
        icon="solar:lock-keyhole-minimalistic-linear"
        :error="errors.password"
        placeholder="رمز عبور"
        name="password"
      />
      <AppButton title="ثبت نام در جیبیتو" type="submit" :loading="isLoading" class="bg-[#a3e632]" />
      <router-link to="/login" class="-tracking-tighter">
        قبلا ثبت نام کردی؟<span class="text-[#a3e632] cursor-pointer">ورود</span>
      </router-link>
    </AppForm>
  </section>
</template>
