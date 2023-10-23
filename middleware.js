export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard',
    '/order',
    '/customers',
    '/products',
    '/banners',
    '/coupons',
    '/support',
    '/marketing',
    '/misc',
  ],
};
