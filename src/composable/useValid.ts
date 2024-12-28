import type { ZodTypeAny } from 'zod'
import { ref, type Ref, watch } from 'vue'
import { z } from 'zod'
import {
  ENUM_CATEGORY_VALUE,
  ENUM_TYPE_VALUE,
  ENUM_WALLET_VALUE,
} from '../constant/optionsValue'

// Constant Message
const ERROR_MESSAGE = (field: string) => `${field} اجباری است`

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
  type: z.enum(ENUM_TYPE_VALUE, { message: ERROR_MESSAGE('نوع') }),
  wallet: z.enum(ENUM_WALLET_VALUE, { message: ERROR_MESSAGE('کیف پول') }),
  category: z.enum(ENUM_CATEGORY_VALUE, {
    message: ERROR_MESSAGE('دسته بندی'),
  }),
  amount: z
    .string()
    .min(1, ERROR_MESSAGE('مبلغ'))
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
    .min(1, ERROR_MESSAGE('مبلغ'))
    .regex(/^[1-9]\d*$/, 'مبلغ با صفر نباید شروع بشه')
    .refine(
      val => Number.parseInt(val, 10) > 0,
      'مبلغ باید بزرگتر از صفر باشه',
    ),
})
