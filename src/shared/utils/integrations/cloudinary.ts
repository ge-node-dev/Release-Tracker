export const getCloudinaryCredentials = () => {
   const { CLOUDINARY_URL, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
   const credentials = Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64');
   return { credentials, CLOUDINARY_URL };
};

export const optimizeCloudinaryUrl = (url: string) => url.replace('/upload/', '/upload/f_auto,q_auto/');
