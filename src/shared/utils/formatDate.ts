export const formatReleaseDate = (dateString: string, locale: string = 'en'): string => {
   const date = new Date(dateString);

   if (locale === 'en') {
      return date.toLocaleDateString('en-US', {
         day: 'numeric',
         month: 'short',
         year: 'numeric',
      });
   }

   return date.toLocaleDateString('ru-RU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
   });
};
