import { useActionState } from 'react';

import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Input from '@/shared/ui/Input';

import { createUserAccount } from '../../services/authService';

import styles from './SignIn.module.scss';

const Register = () => {
   const [state, formAction, isPending] = useActionState(createUserAccount, { error: '' });
   const { fields, isFormValid, updateField } = useFormValidation('registerForm');

   return (
      <>
         <div className={styles.headerTextContent}>
            <p className={styles.mainText}>Welcome back</p>
            <p className={styles.secondaryText}>Enter your credentials to access your account</p>
         </div>
         <form action={formAction} className={styles.formContainer}>
            <Input
               type="text"
               id="username"
               name="username"
               label="username"
               placeholder="username"
               autoComplete="username"
               icon="/assets/icons/user.svg"
               error={fields.username.error}
               value={fields.username.value}
               onChange={(e) => updateField('username', e.target.value)}
            />
            <Input
               id="email"
               type="email"
               name="email"
               label="email"
               autoComplete="email"
               error={fields.email.error}
               value={fields.email.value}
               placeholder="name@example.com"
               icon="/assets/icons/email-icon.svg"
               onChange={(e) => updateField('email', e.target.value)}
            />
            <Input
               id="password"
               name="password"
               type="password"
               label="password"
               placeholder="Password"
               error={fields.password.error}
               value={fields.password.value}
               icon="/assets/icons/password-icon.svg"
               onChange={(e) => updateField('password', e.target.value)}
            />
            <Input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               label="confirm password"
               placeholder="Confirm password"
               error={fields.confirmPassword.error}
               value={fields.confirmPassword.value}
               icon="/assets/icons/password-icon.svg"
               onChange={(e) => updateField('confirmPassword', e.target.value)}
            />
            {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
            <ActionButton type="submit" title="Sign Up" variant="filled" disabled={isPending || !isFormValid}>
               Sign Up
            </ActionButton>
         </form>
      </>
   );
};

export default Register;
