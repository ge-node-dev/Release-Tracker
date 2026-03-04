import { Area } from 'react-easy-crop';

export const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
   const image = new Image();
   image.src = imageSrc;
   await new Promise((resolve) => {
      image.onload = resolve;
   });

   const canvas = document.createElement('canvas');
   canvas.width = pixelCrop.width;
   canvas.height = pixelCrop.height;

   const ctx = canvas.getContext('2d')!;
   ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
   );

   return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Canvas empty'))), 'image/jpeg', 0.9);
   });
};
