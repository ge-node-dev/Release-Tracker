import { AuthFormConfig } from '@/modules/auth/components/AuthForm';
import { EmailIcon } from '@/shared/ui/Icons';

export const forgotPasswordConfig: AuthFormConfig = {
   submitLabel: 'Reset Password',
   formType: 'forgotPasswordForm',
   submitAction: 'forgotPasswordRequest',
   headerText: 'Forgot your password?',
   headerSubText: 'Enter your email to reset your password',
   fields: [
      {
         id: 'email',
         name: 'email',
         type: 'email',
         label: 'email',
         icon: EmailIcon,
         autoComplete: 'email',
         placeholder: 'name@example.com',
      },
   ],
} as const;
