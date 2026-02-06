'use server';

import { getPlaiceholder } from 'plaiceholder';
import { cache } from 'react';

export const getBlurredImageData = cache(async (src: string) => {
   try {
      const response = await fetch(src);

      if (!response.ok) {
         throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const { base64 } = await getPlaiceholder(buffer, { size: 10 });

      return base64;
   } catch (err) {
      console.error('Error generating blur placeholder:', err);
      return null;
   }
});
