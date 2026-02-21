'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { FormState } from '@/modules/auth/services/authService';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import useCurrentPagePath from '@/shared/hooks/useRedirctToCurrentPage';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Input from '@/shared/ui/Input';

import styles from './AuthForm.module.scss';

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
   onSuccess: () => void;
   config: AuthFormConfig;
   onPending: (pending: boolean) => void;
}

const AuthForm = ({ config, onPending, onSuccess }: AuthFormProps) => {
   const [state, setState] = useState<FormState>({ error: '', success: false });
   const [isPending, setIsPending] = useState(false);

   const { formType, headerText, submitLabel, submitAction, headerSubText } = config;

   const { fields, isFormValid, updateField } = useFormValidation(formType);

   const path = useCurrentPagePath();
   const router = useRouter();

   useEffect(() => {
      onPending(isPending);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isPending]);

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);

      const formData = new FormData(e.currentTarget);

      const result = await submitAction(state, formData);
      if (result) {
         setState(result);
      }

      if (result.success) {
         onSuccess();
         router.push(path);
      }
      setIsPending(false);
   };

   return (
      <>
         <div className={styles.headerTextContent}>
            <p className={styles.mainText}>{headerText}</p>
            <p className={styles.secondaryText}>{headerSubText}</p>
         </div>
         <form onSubmit={handleSubmit} className={styles.formContainer}>
            {config.fields.map((field) => {
               return (
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
                     value={fields[field.name]?.value || ''}
                     onChange={(e) => updateField(field.name, e.target.value)}
                  />
               );
            })}
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
