'use client';
import { usePathname, useSearchParams } from 'next/navigation';

const useCurrentPagePath = () => {
   const path = usePathname();
   const searchParams = useSearchParams();

   const query = searchParams.toString();

   return query ? `${path}?${query}` : path;
};

export default useCurrentPagePath;
