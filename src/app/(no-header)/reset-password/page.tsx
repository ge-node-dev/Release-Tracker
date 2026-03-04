'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { validateCodeForResetPassword } from '@/modules/auth/services/authActions';
import { resetProfilePassword } from '@/modules/profile/services/profileActions';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import FormContainer from '@/shared/ui/FormContainer';
import FormErrorText from '@/shared/ui/FormErrorText';
import Input from '@/shared/ui/Input';

const ResetPasswordForm = () => {
   const { fields, isFormValid, updateField } = useFormValidation('resetPasswordForm');
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   const searchParams = useSearchParams();
   useEffect(() => {
      const code = searchParams?.get('code');
      if (!code) notFound();

      const getCode = async () => {
         const { error } = await validateCodeForResetPassword(code);
         if (error) notFound();
         setLoading(false);
      };
      getCode();
   }, [searchParams]);

   if (loading) {
      return null;
   }

   const handleSubmit = async (e: React.SubmitEvent) => {
      e.preventDefault();
      setError('');
      const { error } = await resetProfilePassword(fields.password.value);
      setError(error);
   };

   return (
      <section>
         <FormContainer onSubmit={handleSubmit}>
            <Input
               id="password"
               type="password"
               label="Password"
               value={fields.password.value}
               error={fields.password.error}
               onChange={(e) => {
                  updateField('password', e.target.value);
                  setError('');
               }}
            />
            <Input
               type="password"
               id="confirmPassword"
               label="Confirm Password"
               value={fields.confirmPassword.value}
               error={fields.confirmPassword.error}
               onChange={(e) => {
                  updateField('confirmPassword', e.target.value);
                  setError('');
               }}
            />
            <ActionButton size="large" type="submit" variant="filled" disabled={!isFormValid}>
               Reset Password
            </ActionButton>
            {error && <FormErrorText error={error} />}
         </FormContainer>
      </section>
   );
};

export default function ResetPasswordPage() {
   return (
      <Suspense fallback={null}>
         <ResetPasswordForm />
      </Suspense>
   );
}
