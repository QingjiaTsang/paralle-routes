import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
  analytics,
  team,
}: Readonly<{
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}>) {
  // reference:
  // https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#defaultjs
  return (
    <html lang='en'>
      <body>
        <header className='bg-gray-200 h-16'>
          <div className='flex justify-between items-center h-full'>
            <div className='ml-4 flex gap-4'>
              <Link href='/'>Home</Link>
              <Link href='/settings'>Settings</Link>
            </div>
          </div>
        </header>

        <div className='flex gap-4'>
          <div className='bg-red-500 h-64 w-64'>{children}</div>
          <div className='bg-blue-500 h-64 w-64'>{analytics}</div>
          <div className='bg-green-500 h-64 w-64'>{team}</div>
        </div>
      </body>
    </html>
  );
}
