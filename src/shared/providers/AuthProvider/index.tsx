'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { createSupabaseStaticClient } from '@/lib/supabase/client';

const AuthContext = createContext<null | boolean>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

   useEffect(() => {
      const supabase = createSupabaseStaticClient();

      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
         setIsAuthenticated(!!session);
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
         setIsAuthenticated(!!session);
      });

      return () => subscription.unsubscribe();
   }, []);

   return <AuthContext.Provider value={isAuthenticated}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
