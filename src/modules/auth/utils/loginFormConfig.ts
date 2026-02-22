import { AuthFormConfig } from '@/modules/auth/components/AuthForm';

import { loginUserAccount } from '../services/authService';

export const loginConfig: AuthFormConfig = {
   formType: 'loginForm',
   submitLabel: 'Sign In',
   headerText: 'Welcome back',
   submitAction: loginUserAccount,
   headerSubText: 'Enter your credentials to access your account',
   fields: [
      {
         id: 'email',
         type: 'text',
         name: 'email',
         autoComplete: 'email',
         label: 'Email Address',
         placeholder: 'name@example.com',
         icon: '/assets/icons/email-icon.svg',
      },
      {
         id: 'password',
         name: 'password',
         type: 'password',
         label: 'Password',
         placeholder: 'Password',
         autoComplete: 'current-password',
         icon: '/assets/icons/password-icon.svg',
      },
   ],
} as const;
