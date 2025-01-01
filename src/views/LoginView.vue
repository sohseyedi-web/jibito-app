<script setup lang="ts">
import type { LoadingMode } from '../types/commonTypes'
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../components/base/AppButton.vue'
import AppForm from '../components/base/AppForm.vue'
import AppInput from '../components/base/AppInput.vue'
import useValid, { loginSchema } from '../composable/useValid'
import api from '../server/api'
import { SIGNIN_URL } from '../server/urls'
import { showToast } from '../utils/showToast'

const { errors, validateForm, values } = useValid({ email: '', password: '' }, loginSchema)
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
      const { data } = await api.post(SIGNIN_URL, values.value)
      localStorage.setItem('token', data.token)
      showToast('success', 'خوش اومدی')
      isLoading.value = 'RESOLVED'
      router.push('/')
    }
  }
  catch {
    isLoading.value = 'FAILED'
    showToast('error', 'خطا در ورود کاربر ')
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
      سلام،<br> خوش اومدی
    </h3>
    <p class="text-sm opacity-80 my-3">
      برای استفاده اول وارد حسابت شو
    </p>
    <AppForm class="space-y-3" @submit="onSubmit">
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
      <AppButton title="ورود به جیبیتو" type="submit" :loading="isLoading" class="bg-[#a3e632]" />
      <router-link to="/register" class="-tracking-tighter">
        حساب کاربری نداری؟<span class="text-[#a3e632] cursor-pointer">ثبت نام</span>
      </router-link>
    </AppForm>
  </section>
</template>
