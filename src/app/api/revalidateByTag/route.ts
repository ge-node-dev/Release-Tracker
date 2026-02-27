import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
   const authHeader = req.headers.get('Authorization');

   if (authHeader !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
   }

   const { tag } = await req.json();

   if (!tag || typeof tag !== 'string') {
      return NextResponse.json({ message: 'Field "tag" is required and must be type of string' }, { status: 400 });
   }

   try {
      revalidateTag(tag, 'default');

      return NextResponse.json({
         tag,
         revalidated: true,
         timestamp: new Date().toISOString(),
      });
   } catch (err) {
      console.error('Revalidating error', err);
      return NextResponse.json({ message: 'Revalidating error' }, { status: 500 });
   }
};
