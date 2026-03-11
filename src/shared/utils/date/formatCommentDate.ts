export const formatCommentDate = (iso: null | string): string => {
   if (!iso) return '';
   const then = new Date(iso).getTime();
   const now = Date.now();
   const diffMs = now - then;
   const diffSec = Math.floor(diffMs / 1000);
   const diffMin = Math.floor(diffSec / 60);
   const diffHour = Math.floor(diffMin / 60);
   const diffDay = Math.floor(diffHour / 24);
   const diffWeek = Math.floor(diffDay / 7);
   const diffMonth = Math.floor(diffDay / 30);
   const diffYear = Math.floor(diffDay / 365);

   if (diffSec < 60) return 'JUST NOW';
   if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'MIN' : 'MINS'} AGO`;
   if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? 'HOUR' : 'HOURS'} AGO`;
   if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? 'DAY' : 'DAYS'} AGO`;
   if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? 'WEEK' : 'WEEKS'} AGO`;
   if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? 'MONTH' : 'MONTHS'} AGO`;
   return `${diffYear} ${diffYear === 1 ? 'YEAR' : 'YEARS'} AGO`;
};
