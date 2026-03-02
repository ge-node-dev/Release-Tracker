'use client';

import { Database } from '@db/types/database';
import { useState } from 'react';

import { submitResetPasswordMail, updateProfileData } from '@/modules/profile/services/profileActions';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import FormContainer from '@/shared/ui/FormContainer';
import FormErrorText from '@/shared/ui/FormErrorText';
import Input from '@/shared/ui/Input';

import styles from './ProfileSettings.module.scss';

const ProfileSettings = ({ profile }: { profile: Database['public']['Tables']['profiles']['Row'] }) => {
   const { fields, isFormValid, updateField } = useFormValidation('updateUsernameForm');
   const { id, email, username: currentUsername } = profile;
   const [error, setError] = useState('');
   const [isDirty, setIsDirty] = useState(false);

   const updateProfileUsername = async (username: string) => {
      setError('');
      const { error } = await updateProfileData({ email, username, userId: id });
      if (error) setError(error);
   };

   const resetUsername = () => {
      setError('');
      setIsDirty(false);
      updateField('username', currentUsername);
   };

   return (
      <div className={styles.container}>
         <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Change username</h2>
            <FormContainer
               onSubmit={(e) => {
                  e.preventDefault();
                  updateProfileUsername(fields.username?.value);
               }}
            >
               <Input
                  type="text"
                  id="username"
                  name="username"
                  label="Username"
                  required={false}
                  placeholder={'Username'}
                  error={fields.username?.error}
                  icon={'/assets/icons/user.svg'}
                  value={isDirty ? fields.username?.value : currentUsername}
                  onChange={(e) => {
                     setIsDirty(true);
                     setError('');
                     updateField('username', e.target.value);
                  }}
               />
               <div className={styles.actionButtons}>
                  <ActionButton
                     type="submit"
                     size="medium"
                     variant="filled"
                     disabled={!isDirty || !isFormValid || fields.username?.value === currentUsername}
                  >
                     {'Update username'}
                  </ActionButton>
                  <ActionButton
                     type="button"
                     size="medium"
                     disabled={!isDirty}
                     variant="transparent"
                     onClick={resetUsername}
                  >
                     {'Reset'}
                  </ActionButton>
               </div>
               {error && <FormErrorText error={error} />}
            </FormContainer>
         </section>

         <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Change Password</h2>
            <ActionButton size="medium" variant="filled" onClick={() => submitResetPasswordMail(profile.email)}>
               Change Password
            </ActionButton>
         </section>
      </div>
   );
};

export default ProfileSettings;
