'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FormState } from '@/modules/auth/services/authService';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import useCurrentPagePath from '@/shared/hooks/useRedirctToCurrentPage';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Input from '@/shared/ui/Input';

import styles from './AuthForm.module.scss';
import { useAuthModal } from '@/shared/providers/AuthModalProvider';

export interface AuthField {
   id: string;
   name: string;
   label: string;
   icon?: string;
   placeholder: string;
   autoComplete?: string;
   type: 'text' | 'email' | 'password';
}

export interface AuthFormConfig {
   headerText: string;
   submitLabel: string;
   fields: AuthField[];
   headerSubText: string;
   formType: 'loginForm' | 'registerForm';
   submitAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
}

interface AuthFormProps {
   config: AuthFormConfig;
   onSuccessRegister?: () => void;
   onFormPending: (pending: boolean) => void;
}

const AuthForm = ({ config, onFormPending, onSuccessRegister }: AuthFormProps) => {
   const { formType, headerText, submitLabel, submitAction, headerSubText, fields: configFields } = config;

   const [state, setState] = useState<FormState>({ error: '', success: false });
   const [isPending, setIsPending] = useState(false);
   const { handleCloseModal } = useAuthModal();

   const { fields, isFormValid, updateField } = useFormValidation(formType);
   const isRegisterForm = formType === 'registerForm';
   const path = useCurrentPagePath();
   const router = useRouter();

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

      setState({ error: '', success: false });
      setIsPending(true);
      onFormPending(true);

      const result = await submitAction(state, new FormData(e.currentTarget));
      if (result) setState(result);

      const isSuccess = result?.success;

      if (isSuccess && isRegisterForm) {
         onSuccessRegister?.();
         return;
      }

      onFormPending(false);

      if (isSuccess) {
         handleCloseModal();
         router.push(path);
      }

      setIsPending(false);
   };

   if (state.success && isRegisterForm) {
      return (
         <div className={styles.successRegisterWrapper}>
            <p className={styles.mainText}>Check your email</p>
            <p className={styles.secondaryText}>
               We sent a verification link to <strong>{state.email ?? fields.email?.value}</strong>.<br /> Please check
               your inbox and click the link to confirm your account.
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
                     setState({ error: '', success: false });
                  }}
               />
            ))}
            {state.error && <p className={styles.error}>{state.error}</p>}
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
