const isNumeric = (value: string) => /^-?\d+$/.test(value);

export const validateUrlSearchParams = (searchParams: URLSearchParams) => {
   const newSearchParams = new URLSearchParams(searchParams);

   if (newSearchParams.has('page')) {
      const pageValue = newSearchParams.get('page');

      if (pageValue && (!isNumeric(pageValue) || Number(pageValue) < 1)) {
         newSearchParams.delete('page');
      }
   }

   return newSearchParams;
};
