'use client';

import { type Database } from '@db/types/database';
import { useState } from 'react';

import LogoutButton from '@/shared/ui/Buttons/LogoutButton';

import AvatarBlock from './segments/AvatarBlock';
import ChangeUsernameForm from './segments/ChangeUsernameForm';
import UpdatePasswordBlock from './segments/UpdatePasswordBlock';

import styles from './ProfileSettings.module.scss';

const ProfileSettings = ({ profile }: { profile: Database['public']['Tables']['profiles']['Row'] }) => {
   const { id, email, avatar_url, username: currentUsername } = profile;

   const [isLoading, setIsLoading] = useState(false);

   const content = (
      <>
         <div className={styles.tabInfoWrapper}>
            <p className={styles.subtitle}>Configuration Panel</p>
            <h2 className={styles.title}>Profile</h2>
         </div>
         <div className={styles.absoluteUsername}>{currentUsername}</div>
         <div />
         <div />
         <AvatarBlock userId={id} disabled={isLoading} avatarUrl={avatar_url} />
         <div className={styles.formStack}>
            <div className={styles.formInputGroup}>
               <ChangeUsernameForm
                  userId={id}
                  email={email}
                  isLoading={isLoading}
                  onLoadingChange={setIsLoading}
                  currentUsername={currentUsername}
               />
            </div>

            <UpdatePasswordBlock email={email} isLoading={isLoading} onLoadingChange={setIsLoading} />

            <div className={styles.inputGroup}>
               <label className={styles.fieldLabel}>Exit</label>
               <LogoutButton size="medium" variant="red" disabled={isLoading} />
            </div>
         </div>
      </>
   );

   return (
      <>
         <section className={styles.wrapperDesktop}>{content}</section>
         <section className={styles.wrapperMobile}>{content}</section>
      </>
   );
};

export default ProfileSettings;
