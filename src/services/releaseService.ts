import { createSupabaseServerClient } from '@/lib/supabase/server';

export const getReleasesList = async () => {
   const supabase = await createSupabaseServerClient();

   const { data, error } = await supabase.from('releases').select(`
        id,
        title,
        cover_url,
        fans_number,
        rating_avg,
        release_date,
        release_artists (
          artists (
            id,
            name
          )
        ),
        comments(count)
      `);

   if (error) {
      console.error('Ошибка запроса:', error);
      throw error;
   }

   return data;
};

export const getReleaseById = async (id: string) => {
   const supabase = await createSupabaseServerClient();

   const { data, error } = await supabase
      .from('releases')
      .select(
         `
        id,
        title,
        cover_url,
        fans_number,
        rating_avg,
        release_date,
        release_artists (
          artists (
            id,
            name
          )
        ),
        release_tracks (
          position,
          tracks (
            id,
            title,
            deezer_track_id
          )
        )
      `,
      )
      .eq('id', id)
      .order('position', { ascending: true, referencedTable: 'release_tracks' });

   if (error) {
      console.error('Ошибка запроса:', error);
      throw error;
   }

   return data[0];
};
