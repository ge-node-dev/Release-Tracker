'use client';

import { useRef, useState } from 'react';

import { updateProfileAvatar } from '@/modules/profile/services/profileActions';
import AvatarCropModal from '@/shared/ui/AvatarCropModal';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

const ChangeAvatarButton = ({ userId, disabled = false }: { userId: string; disabled?: boolean }) => {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [imageSrc, setImageSrc] = useState<null | string>(null);
   const [isUploading, setIsUploading] = useState(false);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setImageSrc(URL.createObjectURL(file));
   };

   const handleConfirm = async (blob: Blob) => {
      setIsUploading(true);
      const file = new File([blob], `avatar-${userId}.jpg`, { type: 'image/jpeg' });

      await updateProfileAvatar(file, userId);

      setImageSrc(null);

      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   const handleCancel = () => {
      setImageSrc(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   return (
      <>
         <ActionButton
            size="medium"
            type="button"
            variant="secondary"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
         >
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
