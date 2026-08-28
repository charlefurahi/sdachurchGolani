import { ref, reactive } from 'vue'

export function useForm(initialValues = {}, validationRules = {}) {
  const form = reactive({ ...initialValues })
  const errors = reactive({})
  const isSubmitting = ref(false)
  const isSuccess = ref(false)

  const validate = () => {
    Object.keys(errors).forEach((k) => delete errors[k])
    let valid = true

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = form[field]
      if (rules.required && (!value || value === '')) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        valid = false
      } else if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field] = 'Please enter a valid email address'
        valid = false
      } else if (rules.min && value && value.length < rules.min) {
        errors[field] = `Must be at least ${rules.min} characters`
        valid = false
      }
    })

    return valid
  }

  const reset = () => {
    Object.keys(form).forEach((k) => { form[k] = initialValues[k] ?? '' })
    Object.keys(errors).forEach((k) => delete errors[k])
    isSuccess.value = false
  }

  return { form, errors, isSubmitting, isSuccess, validate, reset }
}
