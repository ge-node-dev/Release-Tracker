import { AuthFormConfig } from '@/modules/auth/components/AuthForm';
import { EmailIcon, PasswordIcon } from '@/shared/ui/Icons';

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
         icon: EmailIcon,
         autoComplete: 'email',
         label: 'Email Address',
         placeholder: 'name@example.com',
      },
      {
         id: 'password',
         name: 'password',
         type: 'password',
         label: 'password',
         icon: PasswordIcon,
         placeholder: 'password',
         showForgotPasswordButton: true,
         autoComplete: 'current-password',
      },
   ],
} as const;
