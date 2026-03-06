'use client';

import { useRef, useState } from 'react';

import { updateProfileAvatar } from '@/modules/profile/services/profileActions';
import AvatarCropModal from '@/shared/ui/AvatarCropModal';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

const ChangeAvatarButton = ({ userId }: { userId: string }) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [imageSrc, setImageSrc] = useState<null | string>(null);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState(false);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setImageSrc(URL.createObjectURL(file));
   };

   const handleConfirm = async (blob: Blob) => {
      setIsUploading(true);
      setError(false);
      const file = new File([blob], `avatar-${userId}.jpg`, { type: 'image/jpeg' });

      const { error } = await updateProfileAvatar(file, userId);
      if (error) {
         setError(true);
      } else {
         setImageSrc(null);
      }

      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   const handleCancel = () => {
      setImageSrc(null);
      setError(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   return (
      <>
         <ActionButton size="medium" type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
            Change avatar
         </ActionButton>
         <input
            type="file"
            name="avatar"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
         />
         {imageSrc && (
            <AvatarCropModal
               error={!!error}
               imageSrc={imageSrc}
               onCancel={handleCancel}
               isUploading={isUploading}
               onConfirm={handleConfirm}
            />
         )}
      </>
   );
};

export default ChangeAvatarButton;
