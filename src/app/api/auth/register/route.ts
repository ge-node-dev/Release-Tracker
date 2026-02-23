import { NextResponse } from 'next/server';

import { createUserAccount } from '@/modules/auth/services/authActions';

export const POST = async (request: Request) => {
   const formData = await request.formData();

   const result = await createUserAccount({ error: '', success: false }, formData);

   if (!result.success) {
      return NextResponse.json(result, { status: 400 });
   }

   return NextResponse.json(result);
};
