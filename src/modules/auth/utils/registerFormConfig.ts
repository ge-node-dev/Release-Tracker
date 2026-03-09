import { AuthFormConfig } from '@/modules/auth/components/AuthForm';
import { EmailIcon, PasswordIcon, UserIcon } from '@/shared/ui/Icons';

export const registerConfig: AuthFormConfig = {
   submitLabel: 'Sign Up',
   formType: 'registerForm',
   submitAction: 'registerRequest',
   headerText: 'Create your account',
   headerSubText: 'Join us - it only takes a minute',
   fields: [
      {
         type: 'text',
         icon: UserIcon,
         id: 'username',
         name: 'username',
         label: 'username',
         placeholder: 'username',
         autoComplete: 'username',
      },
      {
         id: 'email',
         name: 'email',
         type: 'email',
         label: 'email',
         icon: EmailIcon,
         autoComplete: 'email',
         placeholder: 'name@example.com',
      },
      {
         id: 'password',
         name: 'password',
         type: 'password',
         label: 'password',
         icon: PasswordIcon,
         placeholder: 'password',
         autoComplete: 'new-password',
      },
      {
         type: 'password',
         icon: PasswordIcon,
         id: 'confirmPassword',
         name: 'confirmPassword',
         label: 'confirm password',
         autoComplete: 'new-password',
         placeholder: 'confirm password',
      },
   ],
} as const;
