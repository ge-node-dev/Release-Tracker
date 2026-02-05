const isNumeric = (value: string) => /^-?\d+$/.test(value);

export const validateUrlSearchParams = (searchParams: URLSearchParams) => {
   if (searchParams.has('page')) {
      const pageValue = searchParams.get('page');

      if (pageValue && (!isNumeric(pageValue) || Number(pageValue) < 1)) {
         searchParams.delete('page');
      }
   }

   return searchParams;
};
