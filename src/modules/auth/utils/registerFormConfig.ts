import { AuthFormConfig } from '@/modules/auth/components/AuthForm';

export const registerConfig: AuthFormConfig = {
   submitLabel: 'Sign Up',
   formType: 'registerForm',
   submitAction: 'registerRequest',
   headerText: 'Create your account',
   headerSubText: 'Join us - it only takes a minute',
   fields: [
      {
         type: 'text',
         id: 'username',
         name: 'username',
         label: 'username',
         placeholder: 'username',
         autoComplete: 'username',
         icon: '/assets/icons/user.svg',
      },
      {
         id: 'email',
         name: 'email',
         type: 'email',
         label: 'email',
         autoComplete: 'email',
         placeholder: 'name@example.com',
         icon: '/assets/icons/email-icon.svg',
      },
      {
         id: 'password',
         name: 'password',
         type: 'password',
         label: 'password',
         placeholder: 'password',
         autoComplete: 'new-password',
         icon: '/assets/icons/password-icon.svg',
      },
      {
         type: 'password',
         id: 'confirmPassword',
         name: 'confirmPassword',
         label: 'confirm password',
         autoComplete: 'new-password',
         placeholder: 'confirm password',
         icon: '/assets/icons/password-icon.svg',
      },
   ],
} as const;
