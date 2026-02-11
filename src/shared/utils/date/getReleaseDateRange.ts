import { ReleasePeriods } from '@/modules/release/types/releaseTypes';

type DateRange = { to: string; from: string };

const toLocalISOString = (date: Date, type: 'end' | 'start') => {
   const pad = (n: number) => String(n).padStart(2, '0');
   const yyyy = date.getFullYear();
   const mm = pad(date.getMonth() + 1);
   const dd = pad(date.getDate());

   return type === 'start' ? `${yyyy}-${mm}-${dd}T00:00:00.000` : `${yyyy}-${mm}-${dd}T23:59:59.999`;
};

export const getReleaseDateRange = (period: ReleasePeriods): DateRange => {
   const now = new Date();
   const start = new Date(now);
   const end = new Date(now);

   if (period === 'this_week') {
      const day = now.getDay();
      const diffToFriday = 5 - day;

      end.setDate(now.getDate() + diffToFriday);
      start.setDate(end.getDate() - 7);
   } else if (period === 'this_month') {
      start.setDate(1);
      end.setFullYear(now.getFullYear(), now.getMonth() + 1, 0);
   }

   return {
      to: toLocalISOString(end, 'end'),
      from: toLocalISOString(start, 'start'),
   };
};
