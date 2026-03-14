'use client';
import { useState } from 'react';

import { updateProfileData } from '@/modules/profile/services/profileActions';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import FormContainer from '@/shared/ui/FormContainer';
import { UserIcon } from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';

import styles from './ChangeUsernameForm.module.scss';

const ChangeUsernameForm = ({
   email,
   userId,
   isLoading,
   currentUsername,
   onLoadingChange,
}: {
   email: string;
   userId: string;
   isLoading: boolean;
   currentUsername: string;
   onLoadingChange: (loading: boolean) => void;
}) => {
   const [isDirty, setIsDirty] = useState(false);
   const { fields, isFormValid, updateField } = useFormValidation('updateUsernameForm');

   const updateProfileUsername = async (username: string) => {
      onLoadingChange(true);
      const { error } = await updateProfileData({ email, userId, username });
      if (error) {
         onLoadingChange(false);
         return;
      }
      setIsDirty(false);
      updateField('username', username);
      onLoadingChange(false);
   };

   const resetUsername = () => {
      setIsDirty(false);
      updateField('username', currentUsername);
   };

   return (
      <FormContainer
         className={styles.changeUsernameForm}
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
            disabled={isLoading}
            placeholder="Username"
            error={fields.username?.error}
            className={styles.changeUsernameInput}
            value={isDirty ? fields.username?.value : fields.username?.value || currentUsername}
            onChange={(e) => {
               setIsDirty(true);
               updateField('username', e.target.value);
            }}
         />
         <div className={styles.actionButtons}>
            <ActionButton
               type="submit"
               size="medium"
               variant="secondary"
               disabled={!isDirty || !isFormValid || fields.username?.value === currentUsername || isLoading}
            >
               Update username
            </ActionButton>
            <ActionButton
               type="button"
               size="medium"
               variant="primary"
               onClick={resetUsername}
               disabled={!isDirty || isLoading}
            >
               Reset
            </ActionButton>
         </div>
      </FormContainer>
   );
};

export default ChangeUsernameForm;
