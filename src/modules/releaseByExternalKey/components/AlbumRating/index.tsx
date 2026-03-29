'use client';

import { useState } from 'react';

import { Profile } from '@/modules/profile/types/profileTypes';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { StarIcon } from '@/shared/ui/Icons';
import Modal from '@/shared/ui/Modal';
import { ROUTES } from '@/shared/utils/constants';

import { submitRating } from '../../services/ratingServices';
import { ReleaseRating } from '../../types/ratingTypes';

import RateAlbumModal from './segments/RateAlbumModal';

import styles from './AlbumRating.module.scss';

type AlbumRatingProps = {
   releaseId: string;
   userProfile: Profile;
   releaseExternalKey: string;
   rating: Pick<ReleaseRating, 'id' | 'rating'>[];
};

const AlbumRating = ({ rating, releaseId, userProfile, releaseExternalKey }: AlbumRatingProps) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const ratingValue = rating.length > 0 ? rating.reduce((acc, curr) => acc + curr.rating, 0) / rating.length : 0;
   const ratingDisplay = rating.length > 0 ? ratingValue.toFixed(1) : '0';
   const barFillPercent = Math.min(100, Math.max(0, (ratingValue / 10) * 100));

   const submitRatingHandler = async (rating: number) => {
      setIsSubmitting(true);
      try {
         const result = await submitRating(releaseId, rating, releaseExternalKey);
         if (result.success) {
            setIsModalOpen(false);
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <section aria-label="Album rating" className={styles.wrapper}>
         <div className={styles.scoreRow}>
            <span className={styles.ratingValue}>{ratingDisplay}</span>
            <span aria-hidden={true} className={styles.separator}>
               {'//'}
            </span>
            <span className={styles.scaleMeta}>
               {'10 '}
               {rating.length > 0 && (
                  <span className={styles.votes}>
                     [{rating.length} {rating.length === 1 ? 'VOTE' : 'VOTES'}]
                  </span>
               )}
            </span>
         </div>
         <div role="presentation" className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${barFillPercent}%` }} />
         </div>
         {userProfile && (
            <ActionButton
               type="button"
               size="medium"
               variant="primary"
               aria-haspopup="dialog"
               aria-expanded={isModalOpen}
               className={styles.rateButton}
               onClick={() => setIsModalOpen(true)}
            >
               <StarIcon className={styles.rateButtonIcon} />
               Rate this album
            </ActionButton>
         )}
         {!userProfile && (
            <LinkButton href={ROUTES.AUTH} ariaLabel="Sign in" className={styles.rateButton}>
               <StarIcon className={styles.rateButtonIcon} />
               Rate this album
            </LinkButton>
         )}

         {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)}>
               <RateAlbumModal
                  isSubmitting={isSubmitting}
                  onSubmit={submitRatingHandler}
                  onClose={() => setIsModalOpen(false)}
               />
            </Modal>
         )}
      </section>
   );
};

export default AlbumRating;
