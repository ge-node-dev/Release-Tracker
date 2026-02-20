import { useActionState } from 'react';

import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Input from '@/shared/ui/Input';

import { loginUserAccount } from '../../services/authService';

import styles from './SignIn.module.scss';

const SignIn = () => {
   const [state, formAction, isPending] = useActionState(loginUserAccount, { error: '' });
   const { fields, isFormValid, updateField } = useFormValidation('loginForm');

   return (
      <>
         <div className={styles.headerTextContent}>
            <p className={styles.mainText}>Welcome back</p>
            <p className={styles.secondaryText}>Enter your credentials to access your account</p>
         </div>
         <form action={formAction} className={styles.formContainer}>
            <Input
               id="email"
               type="text"
               name="email"
               autoComplete="email"
               label="Email Address"
               value={fields.email.value}
               error={fields.email.error}
               placeholder="name@example.com"
               icon="/assets/icons/email-icon.svg"
               onChange={(e) => updateField('email', e.target.value)}
            />
            <Input
               id="password"
               name="password"
               type="password"
               label="Password"
               placeholder="Password"
               value={fields.password.value}
               error={fields.password.error}
               icon="/assets/icons/password-icon.svg"
               onChange={(e) => updateField('password', e.target.value)}
            />
            {state.error && <p className={styles.error}>{state.error}</p>}
            <ActionButton type="submit" title="Sign In" variant="filled" disabled={isPending || !isFormValid}>
               Sign In
            </ActionButton>
         </form>
      </>
   );
};

export default SignIn;
