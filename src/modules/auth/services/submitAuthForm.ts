import { forgotPassword, FormState } from '@/modules/auth/services/authActions';

export const submitAuthForm = async (
   action: 'loginRequest' | 'registerRequest' | 'forgotPasswordRequest',
   formData: FormData,
): Promise<FormState> => {
   if (action === 'forgotPasswordRequest') {
      return forgotPassword(formData);
   }

   const endpoint = action === 'loginRequest' ? '/api/auth/login' : '/api/auth/register';

   const response = await fetch(endpoint, {
      body: formData,
      method: 'POST',
   });

   const result = await response.json();

   return result as FormState;
};
