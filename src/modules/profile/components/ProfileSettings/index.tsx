'use client';

import { type Database } from '@db/types/database';
import { useState } from 'react';

import { submitResetPasswordMail, updateProfileData } from '@/modules/profile/services/profileActions';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import { Avatar } from '@/shared/ui/Avatar';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import ChangeAvatarButton from '@/shared/ui/Buttons/ChangeAvatarButton';
import LogoutButton from '@/shared/ui/Buttons/LogoutButton';
import FormContainer from '@/shared/ui/FormContainer';
import FormErrorText from '@/shared/ui/FormErrorText';
import { UserIcon } from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';

import styles from './ProfileSettings.module.scss';

const ProfileSettings = ({ profile }: { profile: Database['public']['Tables']['profiles']['Row'] }) => {
   const { fields, isFormValid, updateField } = useFormValidation('updateUsernameForm');
   const { id, email, avatar_url, username: currentUsername } = profile;
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
      <>
         <div className={styles.absoluteUsername}>{currentUsername}</div>
         <div className={styles.dashboardGrid}>
            <div className={styles.avatarModule}>
               <div className={styles.avatarFrame}>
                  <Avatar size="large" avatarUrl={avatar_url} />
               </div>
               <ChangeAvatarButton userId={id} />
            </div>

            <div className={styles.formStack}>
               <div className={styles.inputGroup}>
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
                        icon={UserIcon}
                        label="USERNAME"
                        required={false}
                        placeholder="Username"
                        error={fields.username?.error}
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
                           variant="secondary"
                           disabled={!isDirty || !isFormValid || fields.username?.value === currentUsername}
                        >
                           Update username
                        </ActionButton>
                        <ActionButton
                           type="button"
                           size="medium"
                           variant="primary"
                           disabled={!isDirty}
                           onClick={resetUsername}
                        >
                           Reset
                        </ActionButton>
                     </div>
                     {error && <FormErrorText error={error} />}
                  </FormContainer>
               </div>

               <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Security</label>
                  <ActionButton size="medium" variant="secondary" onClick={() => submitResetPasswordMail(email)}>
                     Update Password
                  </ActionButton>
               </div>

               <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Exit</label>
                  <LogoutButton size="medium" variant="primary" />
               </div>
            </div>
         </div>
      </>
   );
};

export default ProfileSettings;
