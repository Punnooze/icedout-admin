export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/order',
    '/customers',
    '/products',
    '/support',
    '/marketing',
  ],
};
