import { Suspense } from 'react';

import AuthContent from '@/modules/auth/components/AuthContent';

const AuthPage = () => {
   return (
      <div>
         <Suspense>
            <AuthContent />
         </Suspense>
      </div>
   );
};

export default AuthPage;
