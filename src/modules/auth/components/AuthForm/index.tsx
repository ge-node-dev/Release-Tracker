'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FormState } from '@/modules/auth/services/authActions';
import { submitAuthForm } from '@/modules/auth/services/submitAuthForm';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Input from '@/shared/ui/Input';

import styles from './AuthForm.module.scss';

export interface AuthFormConfig {
   headerText: string;
   submitLabel: string;
   headerSubText: string;
   formType: 'loginForm' | 'registerForm';
   submitAction: 'loginRequest' | 'registerRequest';
   fields: {
      id: string;
      name: string;
      label: string;
      icon?: string;
      placeholder: string;
      autoComplete?: string;
      type: 'text' | 'email' | 'password';
   }[];
}

interface AuthFormProps {
   config: AuthFormConfig;
   onSuccessRegister?: () => void;
   onFormPending: (pending: boolean) => void;
}

const AuthForm = ({ config, onFormPending, onSuccessRegister }: AuthFormProps) => {
   const { formType, headerText, submitLabel, submitAction, headerSubText, fields: configFields } = config;
   const isRegisterForm = formType === 'registerForm';

   const [formState, setFormState] = useState<FormState>({ error: '', success: false });
   const [isPending, setIsPending] = useState(false);
   const router = useRouter();
   const { fields, isFormValid, updateField } = useFormValidation(formType);

   const { email: formEmail, error: formError, success: formSuccess } = formState;

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setFormState({ error: '', success: false });
      setIsPending(true);
      onFormPending(true);

      try {
         const result = await submitAuthForm(submitAction, new FormData(e.currentTarget));
         setFormState(result);

         if (result?.success) {
            if (isRegisterForm) return onSuccessRegister?.();
            router.refresh();
            router.back();
         }
      } catch (error) {
         setFormState({ success: false, error: error instanceof Error ? error.message : 'An error occurred' });
      } finally {
         setIsPending(false);
         onFormPending(false);
      }
   };

   if (formSuccess && isRegisterForm) {
      return (
         <div className={styles.successRegisterWrapper}>
            <p className={styles.mainText}>Check your email</p>
            <p className={styles.secondaryText}>
               We sent a verification link to <strong>{formEmail ?? fields.email?.value}</strong>.<br />
               Please check your inbox and click the link to confirm your account.
            </p>
         </div>
      );
   }

   return (
      <>
         <div className={styles.headerTextContent}>
            <p className={styles.mainText}>{headerText}</p>
            <p className={styles.secondaryText}>{headerSubText}</p>
         </div>
         <form onSubmit={handleSubmit} className={styles.formContainer}>
            {configFields.map((field) => (
               <Input
                  id={field.id}
                  key={field.id}
                  type={field.type}
                  name={field.name}
                  icon={field.icon}
                  label={field.label}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  error={fields[field.name]?.error}
                  value={fields[field.name]?.value ?? ''}
                  onChange={(e) => {
                     updateField(field.name, e.target.value);
                     setFormState({ error: '', success: false });
                  }}
                  onInput={(e) => {
                     const target = e.target as HTMLInputElement;
                     if (target.value !== fields[field.name]?.value) {
                        updateField(field.name, target.value);
                     }
                  }}
               />
            ))}
            {formError && <p className={styles.error}>{formError}</p>}
            <ActionButton
               type="submit"
               variant="filled"
               className={styles.submitButton}
               disabled={isPending || !isFormValid}
            >
               {submitLabel}
            </ActionButton>
         </form>
      </>
   );
};

export default AuthForm;
