'use client';

import type { User } from '@supabase/supabase-js';

import { createContext, useContext, useEffect, useState } from 'react';

import { createSupabaseStaticClient } from '@/lib/supabase/client';

type AuthContextType = {
   user: User | null;
   isLoading: boolean;
   isAuthenticated: boolean;
};

const AuthContext = createContext<null | AuthContextType>(null);

type AuthState = { user: User | null; isLoading: boolean };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [{ user, isLoading }, setAuthState] = useState<AuthState>({ user: null, isLoading: true });

   useEffect(() => {
      const supabase = createSupabaseStaticClient();

      supabase.auth.getSession().then(({ data: { session } }) => {
         setAuthState({ isLoading: false, user: session?.user ?? null });
      });

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
         setAuthState({ isLoading: false, user: session?.user ?? null });
      });

      return () => subscription.unsubscribe();
   }, []);

   return <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }

   return context;
};
