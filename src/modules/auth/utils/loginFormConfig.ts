import { AuthFormConfig } from '@/modules/auth/components/AuthForm';

export const loginConfig: AuthFormConfig = {
   formType: 'loginForm',
   submitLabel: 'Sign In',
   headerText: 'Welcome back',
   submitAction: 'loginRequest',
   headerSubText: 'Enter your credentials to access your account',
   fields: [
      {
         id: 'email',
         name: 'email',
         type: 'email',
         autoComplete: 'off',
         label: 'Email Address',
         placeholder: 'name@example.com',
         icon: '/assets/icons/email-icon.svg',
      },
      {
         id: 'password',
         name: 'password',
         type: 'password',
         label: 'password',
         placeholder: 'password',
         autoComplete: 'off',
         icon: '/assets/icons/password-icon.svg',
      },
   ],
} as const;
