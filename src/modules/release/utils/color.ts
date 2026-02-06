import sharp from 'sharp';

const getDominantColorFromImage = async (imageBuffer: Buffer): Promise<[number, number, number]> => {
   const { data, info } = await sharp(imageBuffer)
      .resize(50, 50, { fit: 'inside' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

   let r = 0,
      g = 0,
      b = 0;
   const pixelCount = info.width * info.height;

   for (let i = 0; i < data.length; i += 3) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
   }

   return [Math.round(r / pixelCount), Math.round(g / pixelCount), Math.round(b / pixelCount)];
};

const rgbToHsl = (r: number, g: number, b: number) => {
   r /= 255;
   g /= 255;
   b /= 255;

   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   let h = 0,
      s = 0;
   const l = (max + min) / 2;

   if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
         default:
            h = 0;
      }
      h /= 6;
   }

   return {
      h: Math.round(h * 360),
      l: Math.round(l * 100),
      s: Math.round(s * 100),
   };
};

//TODO Определить мапу цветов
const getGlowColorByHsl = (h: number, s: number, l: number): string => {
   //почти черный / темно-серый
   if (l < 25) {
      return 'rgba(112,112,112,0.6)'; //серый
   }

   // // темный, но не черный
   // if (l < 40 && s < 20) {
   //    return 'rgba(99, 102, 241, 0.5)'; // индиго
   // }

   //насыщенные цвета — тень в тон
   if (s > 60 && l < 60) {
      return `hsla(${h}, 80%, 45%, 0.6)`;
   }

   // // светлые
   // if (l > 70) {
   //    return 'rgba(0, 0, 0, 0.6)';
   // }

   return 'rgba(112,112,112,0.6)';
};

export const getGlowColorFromImage = async (buffer: Buffer): Promise<string> => {
   const [r, g, b] = await getDominantColorFromImage(buffer);
   const { h, l, s } = rgbToHsl(r, g, b);

   return getGlowColorByHsl(h, s, l);
};
