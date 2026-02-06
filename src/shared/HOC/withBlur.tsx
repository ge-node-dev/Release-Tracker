import Image, { ImageProps } from 'next/image';

import { getBlurredImageData } from '@/lib/blurImage';

interface WithBlurOptions {
   autoBlur?: boolean;
}

interface BlurImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
   disableBlur?: boolean;
}

const withBlur = (options: WithBlurOptions = {}) => {
   const { autoBlur = true } = options;

   return async function BlurredImage({ alt, src, disableBlur = false, ...props }: BlurImageProps) {
      if (disableBlur || !autoBlur) {
         return <Image src={src} alt={alt} {...props} />;
      }

      if (typeof src !== 'string' || !src.startsWith('http')) {
         return <Image src={src} alt={alt} {...props} />;
      }

      const blurDataURL = await getBlurredImageData(src);

      if (blurDataURL) {
         return <Image src={src} alt={alt} placeholder="blur" blurDataURL={blurDataURL} {...props} />;
      }

      return <Image src={src} alt={alt} {...props} />;
   };
};

const BlurImage = withBlur();

export default BlurImage;
