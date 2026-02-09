const isNumeric = (value: string) => /^-?\d+$/.test(value);

export const validateUrlSearchParams = (searchParams: URLSearchParams) => {
   const copiedSearchParams = new URLSearchParams(searchParams);

   if (copiedSearchParams.has('page')) {
      const pageValue = copiedSearchParams.get('page');
      const pageNum = Number(pageValue);

      if (!pageValue || !isNumeric(pageValue) || pageNum < 2) {
         copiedSearchParams.delete('page');
      }
   }

   return copiedSearchParams;
};
