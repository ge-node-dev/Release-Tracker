import { ReleasePeriod } from '@/types/releases';

type DateRange = { to: string; from: string };

export const getDateRange = (period: ReleasePeriod): DateRange => {
   const now = new Date();
   const start = new Date(now);
   const end = new Date(now);

   if (period === 'this_week') {
      const day = now.getDay();
      const diff = now.getDate() - (day === 0 ? 6 : day - 1);

      start.setDate(diff);
      start.setHours(0, 0, 0, 0);

      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
   } else if (period === 'this_month') {
      start.setFullYear(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);

      end.setFullYear(now.getFullYear(), now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
   }

   return {
      to: end.toISOString(),
      from: start.toISOString(),
   };
};
