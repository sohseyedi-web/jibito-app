import type { ZodTypeAny } from 'zod'
import { ref, type Ref, watch } from 'vue'
import { z } from 'zod'
import {
  ENUM_CATEGORY_VALUE,
  ENUM_TYPE_VALUE,
  ENUM_WALLET_VALUE,
} from '../constant/optionsValue'

// Constant Message
const MESSAGE_ERROR = (val: string) => `وارد کردن ' ${val} ' ضروری است`
const PERSIAN_ERROR = `متن وارد شده "فارسی' نمی‌باشد.`
const INVALID_ERROR = (val: string) => `'${val}' وارد شده کوتاه است.`

function useValid<T extends ZodTypeAny>(initialValues: unknown, schema: T) {
  type ZodForm = z.infer<T>

  const values = ref<ZodForm>(initialValues)
  const errors = ref<Record<string, string>>({})

  watch(
    values,
    (newValues: ZodForm) => {
      for (const fieldName of Object.keys(newValues)) {
        const field = fieldName
        validateField(field)
      }
    },
    { deep: true },
  )

  function validateForm() {
    const res = schema.safeParse(values.value) as z.infer<T>
    if (res.success) {
      errors.value = {}
      return true
    }
    else {
      const formErrors: Record<string, string> = {}
      for (const [key, val] of Object.entries(
        res.error.formErrors.fieldErrors,
      )) {
        formErrors[key] = Array.isArray(val) ? val[0] : val
      }
      errors.value = formErrors

      return false
    }
  }

  function validateField(field: keyof ZodForm) {
    try {
      const res = schema.safeParse(values.value) as z.infer<T>
      const error = res.success ? '' : res.error.formErrors.fieldErrors[field]
      errors.value[field as string] = Array.isArray(error) ? error[0] : error
    }
    catch {}
  }

  return {
    values: values as Ref<ZodForm>,
    errors,
    validateField,
    validateForm,
  }
}

export default useValid

export const transactionSchema = z.object({
  type: z.enum(ENUM_TYPE_VALUE, { message: MESSAGE_ERROR('نوع') }),
  wallet: z.enum(ENUM_WALLET_VALUE, { message: MESSAGE_ERROR('کیف پول') }),
  category: z.enum(ENUM_CATEGORY_VALUE, {
    message: MESSAGE_ERROR('دسته بندی'),
  }),
  amount: z
    .string()
    .min(1, MESSAGE_ERROR('مبلغ'))
    .regex(/^[1-9]\d*$/, 'مبلغ با صفر نباید شروع بشه')
    .refine(
      val => Number.parseInt(val, 10) > 0,
      'مبلغ باید بزرگتر از صفر باشه',
    ),
  date: z
    .string()
    .optional()
    .transform(value =>
      value === undefined || value.trim() === '' ? new Date().toString() : value,
    ),
  description: z.string().optional(),
})

export const amountSchema = z.object({
  amount: z
    .string()
    .min(1, MESSAGE_ERROR('مبلغ'))
    .regex(/^[1-9]\d*$/, 'مبلغ با صفر نباید شروع بشه')
    .refine(
      val => Number.parseInt(val, 10) > 0,
      'مبلغ باید بزرگتر از صفر باشه',
    ),
})

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, MESSAGE_ERROR('ایمیل'))
    .email('"ایمیل" وارد شده معتبر نمی‌باشد.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR('رمز عبور'))
    .min(4, INVALID_ERROR('رمز عبور')),
})
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, MESSAGE_ERROR('نام کاربری'))
    .min(4, INVALID_ERROR('نام کاربری'))
    .regex(/^[\u0600-\u06FF\s]+$/, { message: PERSIAN_ERROR }),
  email: z
    .string()
    .min(1, MESSAGE_ERROR('ایمیل'))
    .email('"ایمیل" وارد شده معتبر نمی‌باشد.'),
  password: z
    .string()
    .min(1, MESSAGE_ERROR('رمز عبور'))
    .min(4, INVALID_ERROR('رمز عبور')),
})
