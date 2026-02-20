import { useState, useCallback } from 'react';

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
   email: (value) => (EMAIL_REGEX.test(value) ? '' : 'Invalid email format'),

   password: (value) => (value.length >= 8 ? '' : 'Password must be at least 8 characters'),

   username: (value) => (value.length >= 4 ? '' : 'Username must be at least 4 characters'),

   confirmPassword: (value, form) => (form?.password && value !== form.password.value ? 'Passwords do not match' : ''),
};

const createInitialState = (fields: readonly string[]): FormFields =>
   fields.reduce((acc, id) => ({ ...acc, [id]: { error: '', value: '' } }), {});

const isFormValid = (fields: FormFields): boolean =>
   Object.values(fields).every(({ error, value }) => !error && value.trim());

export const useFormValidation = (formType: keyof typeof FORM_FIELDS) => {
   const fieldNames = FORM_FIELDS[formType];

   const [fields, setFields] = useState<FormFields>(() => createInitialState(fieldNames));

   const validateField = useCallback(
      (id: string, value: string): string => VALIDATORS[id]?.(value, fields) ?? '',
      [fields],
   );

   const updateField = useCallback(
      (id: string, value: string, customValidator?: Validator) => {
         const error = customValidator ? customValidator(value) : validateField(id, value);
         setFields((prev) => ({ ...prev, [id]: { error, value } }));
         return error;
      },
      [validateField],
   );

   return { fields, updateField, isFormValid: isFormValid(fields) };
};
