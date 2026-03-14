'use client';
import { useState } from 'react';

import { submitResetPasswordMail } from '@/modules/profile/services/profileActions';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import FormErrorText from '@/shared/ui/FormErrorText';

import styles from '../ProfileSettings.module.scss';

const UpdatePasswordBlock = ({
   email,
   isLoading,
   onLoadingChange,
}: {
   email: string;
   isLoading: boolean;
   onLoadingChange: (loading: boolean) => void;
}) => {
   const [error, setError] = useState('');

   const handleSubmitResetPasswordMail = async () => {
      setError('');
      onLoadingChange(true);

      const { error } = await submitResetPasswordMail(email);
      if (error) {
         setError(error);
         onLoadingChange(false);
         return;
      }

      onLoadingChange(false);
   };
   return (
      <div className={styles.inputGroup}>
         <label className={styles.fieldLabel}>Security</label>
         <ActionButton size="medium" variant="secondary" disabled={isLoading} onClick={handleSubmitResetPasswordMail}>
            Update Password
         </ActionButton>
         {error && <FormErrorText error={error} align="start" disableTopMargin={true} />}
      </div>
   );
};

export default UpdatePasswordBlock;
