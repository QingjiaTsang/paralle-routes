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
  /**
   * 需要分别尝试这几个事情来理解：
   * 1. 访问 /
   *  * 你会看到parallel routes的字面意思，会在同一个layout里同时、平行地渲染多个page
   * 2. 点击路由link跳转到 /settings
   *  * 你会看到所谓的 partial render，只有settings page被重新渲染，而layout和analytics page没有被重新渲染
   * 3. 跳转到路由 /settings 后，刷新页面
   *  * 你会看到当@analytics文件夹下没有settings路由的时候，会显示@analytics/default.tsx的内容，因为此时并没有命中其下的任何路由，但在layout中analytics slot仍然需要被渲染，因此需要default.tsx来兜底
   */

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
