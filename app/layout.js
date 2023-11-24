'use client';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './providers';
import Sidebar from '../components/Sidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });
export default function Layout({ title, children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <title>{title ? title + ' - Icedout Admin' : 'Icedout Admin'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        {pathname === '/' ? (
          <AuthProvider>{children}</AuthProvider>
        ) : (
          <AuthProvider>
            <Sidebar />
            {children}
          </AuthProvider>
        )}
      </body>
    </html>
  );
}

// 'use client';
// import Sidebar from '@/components/Sidebar';
// import { usePathname } from 'next/navigation';
// import { AuthProvider } from './providers';
// export default function Layout({ children }) {
//   const pathname = usePathname();
//   return (
//     <>
//       {pathname.includes('/') ? (
//         <AuthProvider>{children}</AuthProvider>
//       ) : (
//         <AuthProvider>
//           <Sidebar />
//           {children}
//         </AuthProvider>
//       )}
//     </>
//   );
// }
