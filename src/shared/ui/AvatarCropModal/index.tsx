'use client';

import type { Area, Point } from 'react-easy-crop';

import { useState } from 'react';
// eslint-disable-next-line no-duplicate-imports
import Cropper from 'react-easy-crop';

import ActionButton from '@/shared/ui/Buttons/ActionButton';
import FormErrorText from '@/shared/ui/FormErrorText';
import Modal from '@/shared/ui/Modal';
import { getCroppedImg } from '@/shared/utils/data/getCroppedImg';

import styles from './AvatarCropModal.module.scss';

interface AvatarCropModalProps {
   error: boolean;
   imageSrc: string;
   isUploading: boolean;
   onCancel: () => void;
   onConfirm: (blob: Blob) => void;
}

const AvatarCropModal = ({ error, imageSrc, onCancel, onConfirm, isUploading }: AvatarCropModalProps) => {
   const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

   const handleConfirm = async () => {
      if (!croppedAreaPixels) return;
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onConfirm(blob);
   };

   return (
      <Modal onClose={onCancel} disableClose={isUploading}>
         <h3 className={styles.title}>Crop avatar</h3>

         <div className={styles.cropContainer}>
            <Cropper
               aspect={1}
               crop={crop}
               zoom={zoom}
               minZoom={1}
               image={imageSrc}
               showGrid={false}
               cropShape="round"
               onCropChange={setCrop}
               onZoomChange={setZoom}
               onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
            />
         </div>

         <div className={styles.controls}>
            <input
               max={3}
               min={1}
               step={0.01}
               type="range"
               value={zoom}
               aria-label="Zoom"
               className={styles.slider}
               onChange={(e) => setZoom(Number(e.target.value))}
            />
         </div>

         <div className={styles.actions}>
            <ActionButton size="medium" type="button" variant="filled" onClick={onCancel} disabled={isUploading}>
               Cancel
            </ActionButton>
            <ActionButton size="medium" type="button" variant="filled" disabled={isUploading} onClick={handleConfirm}>
               {isUploading ? 'Uploading...' : 'Save'}
            </ActionButton>
         </div>
         {error && <FormErrorText error={'Error uploading avatar. Please try again.'} />}
      </Modal>
   );
};

export default AvatarCropModal;
