import { useState } from 'react';

import { EMAIL_REGEX } from '../utils/constants';

type FormFields = Record<string, FieldState>;

interface FieldState {
   value: string;
   error: string;
}
type Validator = (value: string, form?: FormFields) => string;

const FORM_FIELDS = {
   loginForm: ['email', 'password'],
   registerForm: ['username', 'email', 'password', 'confirmPassword'],
} as const;

const VALIDATORS: Record<string, Validator> = {
   email: (value) => (EMAIL_REGEX.test(value.trim()) ? '' : 'Invalid email format'),

   password: (value) => (value.length >= 8 ? '' : 'Password must be at least 8 characters'),

   username: (value) => (value.replaceAll(' ', '').length >= 4 ? '' : 'Username must be at least 4 characters'),

   confirmPassword: (value, form) =>
      form?.password?.value && value !== form.password.value ? 'Passwords do not match' : '',
};

const createInitialState = (fields: readonly string[]): FormFields =>
   Object.fromEntries(fields.map((id) => [id, { error: '', value: '' }]));

const validateField = (id: string, value: string, form: FormFields): string => VALIDATORS[id]?.(value, form) ?? '';

const isFormValid = (fields: FormFields): boolean =>
   Object.values(fields).every(({ error, value }) => !error && value.trim());

export const useFormValidation = (formType: keyof typeof FORM_FIELDS) => {
   const [fields, setFields] = useState<FormFields>(() => createInitialState(FORM_FIELDS[formType]));

   const updateField = (id: string, value: string) => {
      setFields((prev) => {
         const updated: FormFields = {
            ...prev,
            [id]: { value, error: validateField(id, value, prev) },
         };

         const shouldRevalidateConfirm = id === 'password' && updated.confirmPassword !== undefined;

         if (shouldRevalidateConfirm) {
            const { value: confirmValue } = updated.confirmPassword;
            updated.confirmPassword = {
               value: confirmValue,
               error: validateField('confirmPassword', confirmValue, updated),
            };
         }

         return updated;
      });
   };

   return {
      fields,
      updateField,
      isFormValid: isFormValid(fields),
   };
};
