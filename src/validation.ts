// Kontrola polí formulářů přihlášení a registrace na straně prohlížeče (bez odeslání)
import { content } from './content'
import type { AuthField } from './types'

export type FieldValues = Record<string, string>
export type FieldErrors = Record<string, string>

// Jednoduchý tvar e-mailu: něco@něco.doména
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Telefon: volitelné +, 9–15 číslic, mezery povolené
const PHONE_PATTERN = /^\+?\d{9,15}$/

// Chyba jednoho pole, prázdný řetězec = v pořádku
export function validateField(field: AuthField, values: FieldValues): string {
  const { authErrors } = content.pages
  const value = (values[field.name] ?? '').trim()
  if (value === '') return authErrors.required
  if (field.type === 'email' && !EMAIL_PATTERN.test(value)) return authErrors.email
  if (field.type === 'tel' && !PHONE_PATTERN.test(value.replace(/\s+/g, ''))) return authErrors.phone
  if (field.minLength !== undefined && value.length < field.minLength) return authErrors.minLength(field.minLength)
  if (field.matches !== undefined && value !== (values[field.matches] ?? '').trim()) return authErrors.match
  return ''
}

// Chyby všech polí podle jména; bez chyb prázdný objekt
export function validateFields(fields: AuthField[], values: FieldValues): FieldErrors {
  const errors: FieldErrors = {}
  fields.forEach((field) => {
    const error = validateField(field, values)
    if (error) errors[field.name] = error
  })
  return errors
}
