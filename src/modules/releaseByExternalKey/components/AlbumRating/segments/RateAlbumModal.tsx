'use client';

import { useId, useState } from 'react';

import ActionButton from '@/shared/ui/Buttons/ActionButton';
import { StarIcon } from '@/shared/ui/Icons';

import styles from './RateAlbumModal.module.scss';

type RateAlbumModalProps = {
   onClose: () => void;
   isSubmitting?: boolean;
   onSubmit: (rating: number) => void | Promise<void>;
};

const STAR_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const RateAlbumModal = ({ onClose, onSubmit, isSubmitting = false }: RateAlbumModalProps) => {
   const titleId = useId();
   const [selected, setSelected] = useState<null | number>(null);
   const [hover, setHover] = useState<null | number>(null);

   const displayValue = hover ?? selected ?? 0;

   const handleSubmit = async () => {
      if (selected === null) return;
      await onSubmit(selected);
   };

   return (
      <div className={styles.root}>
         <h2 id={titleId} className={styles.title}>
            Rate this album
         </h2>
         <p className={styles.hint}>Click to choose.</p>
         <div role="group" aria-labelledby={titleId} className={styles.starRow} onMouseLeave={() => setHover(null)}>
            {STAR_INDEXES.map((starIndex) => {
               const value = starIndex + 1;
               const isOn = displayValue >= value;
               return (
                  <button
                     type="button"
                     data-on={isOn}
                     key={starIndex}
                     className={styles.starSlot}
                     aria-label={`${value} of 10`}
                     onClick={() => setSelected(value)}
                     onMouseEnter={() => setHover(value)}
                  >
                     <span aria-hidden={true} className={styles.starVisual}>
                        <StarIcon className={styles.starEmpty} />
                        {isOn && <StarIcon className={styles.starFilled} />}
                     </span>
                  </button>
               );
            })}
         </div>
         <p aria-live="polite" className={styles.selectionHint}>
            Selected: {displayValue} / 10
         </p>
         <div className={styles.actions}>
            <ActionButton
               type="button"
               variant="red"
               size="medium"
               onClick={handleSubmit}
               disabled={selected === null || isSubmitting}
            >
               Submit rating
            </ActionButton>
            <ActionButton type="button" size="medium" variant="primary" onClick={onClose} disabled={isSubmitting}>
               Cancel
            </ActionButton>
         </div>
      </div>
   );
};

export default RateAlbumModal;
