export type Json = null | string | number | Json[] | boolean | { [key: string]: Json | undefined };

export type Enums<
   DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
   EnumName extends DefaultSchemaEnumNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
      : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
   : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
     ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
     : never;

export type CompositeTypes<
   PublicCompositeTypeNameOrOptions extends
      | keyof DefaultSchema['CompositeTypes']
      | { schema: keyof DatabaseWithoutInternals },
   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
      : never = never,
> = PublicCompositeTypeNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
   : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
     ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
     : never;

export type TablesInsert<
   DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      : never = never,
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I;
     }
      ? I
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
       }
        ? I
        : never
     : never;

export type TablesUpdate<
   DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      : never = never,
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U;
     }
      ? U
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
       }
        ? U
        : never
     : never;

export type Tables<
   DefaultSchemaTableNameOrOptions extends
      | { schema: keyof DatabaseWithoutInternals }
      | keyof (DefaultSchema['Tables'] & DefaultSchema['Views']),
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof DatabaseWithoutInternals;
   }
      ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
           DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
      : never = never,
> = DefaultSchemaTableNameOrOptions extends {
   schema: keyof DatabaseWithoutInternals;
}
   ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
        Row: infer R;
     }
      ? R
      : never
   : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
     ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
       }
        ? R
        : never
     : never;

export type Database = {
   public: {
      Views: {
         [_ in never]: never;
      };
      Enums: {
         [_ in never]: never;
      };
      Functions: {
         [_ in never]: never;
      };
      CompositeTypes: {
         [_ in never]: never;
      };
      Tables: {
         genres: {
            Relationships: [];
            Row: {
               id: string;
               created_at: string;
               updated_at: string;
               external_key: string;
               title: null | string;
            };
            Insert: {
               id?: string;
               created_at?: string;
               updated_at?: string;
               external_key: string;
               title?: null | string;
            };
            Update: {
               id?: string;
               created_at?: string;
               updated_at?: string;
               external_key?: string;
               title?: null | string;
            };
         };
         tracks: {
            Relationships: [];
            Row: {
               id: string;
               title: string;
               created_at: string;
               updated_at: string;
               external_key: string;
               deezer_track_id: number;
            };
            Insert: {
               id?: string;
               title: string;
               created_at?: string;
               updated_at?: string;
               external_key: string;
               deezer_track_id: number;
            };
            Update: {
               id?: string;
               title?: string;
               created_at?: string;
               updated_at?: string;
               external_key?: string;
               deezer_track_id?: number;
            };
         };
         artists: {
            Relationships: [];
            Row: {
               id: string;
               name: string;
               external_key: string;
               image_url: null | string;
               created_at: null | string;
               updated_at: null | string;
            };
            Insert: {
               id?: string;
               name: string;
               external_key: string;
               image_url?: null | string;
               created_at?: null | string;
               updated_at?: null | string;
            };
            Update: {
               id?: string;
               name?: string;
               external_key?: string;
               image_url?: null | string;
               created_at?: null | string;
               updated_at?: null | string;
            };
         };
         track_genres: {
            Row: {
               genre_id: string;
               track_id: string;
            };
            Insert: {
               genre_id: string;
               track_id: string;
            };
            Update: {
               genre_id?: string;
               track_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['genre_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'genres';
                  foreignKeyName: 'track_genres_genre_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['track_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'tracks';
                  foreignKeyName: 'track_genres_track_id_fkey';
               },
            ];
         };
         track_artists: {
            Row: {
               track_id: string;
               artist_id: string;
            };
            Insert: {
               track_id: string;
               artist_id: string;
            };
            Update: {
               track_id?: string;
               artist_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['artist_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'artists';
                  foreignKeyName: 'track_artists_artist_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['track_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'tracks';
                  foreignKeyName: 'track_artists_track_id_fkey';
               },
            ];
         };
         artists_genres: {
            Row: {
               genre_id: string;
               artist_id: string;
            };
            Insert: {
               genre_id: string;
               artist_id: string;
            };
            Update: {
               genre_id?: string;
               artist_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['artist_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'artists';
                  foreignKeyName: 'artist_genres_artist_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['genre_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'genres';
                  foreignKeyName: 'artist_genres_genre_id_fkey';
               },
            ];
         };
         release_genres: {
            Row: {
               genre_id: string;
               release_id: string;
            };
            Insert: {
               genre_id: string;
               release_id: string;
            };
            Update: {
               genre_id?: string;
               release_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['genre_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'genres';
                  foreignKeyName: 'release_genres_genre_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['release_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'releases';
                  foreignKeyName: 'release_genres_release_id_fkey';
               },
            ];
         };
         release_artists: {
            Row: {
               artist_id: string;
               release_id: string;
            };
            Insert: {
               artist_id: string;
               release_id: string;
            };
            Update: {
               artist_id?: string;
               release_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['artist_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'artists';
                  foreignKeyName: 'release_artists_artist_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['release_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'releases';
                  foreignKeyName: 'release_artists_release_id_fkey';
               },
            ];
         };
         profiles: {
            Relationships: [];
            Row: {
               id: string;
               email: string;
               username: string;
               is_admin: boolean;
               created_at: string;
               updated_at: string;
               avatar_url: null | string;
               telegram_id: null | number;
            };
            Insert: {
               id: string;
               email?: string;
               username?: string;
               is_admin?: boolean;
               created_at?: string;
               updated_at?: string;
               avatar_url?: null | string;
               telegram_id?: null | number;
            };
            Update: {
               id?: string;
               email?: string;
               username?: string;
               is_admin?: boolean;
               created_at?: string;
               updated_at?: string;
               avatar_url?: null | string;
               telegram_id?: null | number;
            };
         };
         release_tracks: {
            Row: {
               position: number;
               track_id: string;
               release_id: string;
            };
            Insert: {
               position: number;
               track_id: string;
               release_id: string;
            };
            Update: {
               position?: number;
               track_id?: string;
               release_id?: string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['release_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'releases';
                  foreignKeyName: 'release_tracks_release_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['track_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'tracks';
                  foreignKeyName: 'release_tracks_track_id_fkey';
               },
            ];
         };
         releases: {
            Relationships: [];
            Row: {
               id: string;
               title: string;
               created_at: string;
               rating_avg: number;
               updated_at: string;
               fans_number: number;
               external_key: string;
               release_date: string;
               cover_url: null | string;
            };
            Insert: {
               id?: string;
               title: string;
               created_at?: string;
               rating_avg?: number;
               updated_at?: string;
               external_key: string;
               fans_number?: number;
               release_date: string;
               cover_url?: null | string;
            };
            Update: {
               id?: string;
               title?: string;
               created_at?: string;
               rating_avg?: number;
               updated_at?: string;
               fans_number?: number;
               external_key?: string;
               release_date?: string;
               cover_url?: null | string;
            };
         };
         comments: {
            Row: {
               id: string;
               user_id: string;
               release_id: string;
               likes: null | number;
               content: null | string;
               parent_id: null | string;
               created_at: null | string;
               updated_at: null | string;
            };
            Insert: {
               id?: string;
               user_id: string;
               release_id: string;
               likes?: null | number;
               content?: null | string;
               parent_id?: null | string;
               created_at?: null | string;
               updated_at?: null | string;
            };
            Update: {
               id?: string;
               user_id?: string;
               release_id?: string;
               likes?: null | number;
               content?: null | string;
               parent_id?: null | string;
               created_at?: null | string;
               updated_at?: null | string;
            };
            Relationships: [
               {
                  isOneToOne: false;
                  columns: ['parent_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'comments';
                  foreignKeyName: 'comments_parent_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['release_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'releases';
                  foreignKeyName: 'comments_release_id_fkey';
               },
               {
                  isOneToOne: false;
                  columns: ['user_id'];
                  referencedColumns: ['id'];
                  referencedRelation: 'profiles';
                  foreignKeyName: 'comments_user_id_fkey';
               },
            ];
         };
      };
   };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export const Constants = {
   public: {
      Enums: {},
   },
} as const;
