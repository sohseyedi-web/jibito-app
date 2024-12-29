import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { router } from './routes'
import en from './utils/translate/en.json'
import fa from './utils/translate/fa.json'
import './style.css'

const i18n = createI18n({
  locale: 'fa',
  fallbackLocale: 'en',
  messages: {
    fa,
    en,
  },
})

createApp(App).use(router).use(i18n).use(createPinia()).mount('#app')
