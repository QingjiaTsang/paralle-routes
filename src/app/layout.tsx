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
   *  * 你会看到所谓的 partial render，只有team slot对应被命中路由的settings page被重新渲染，而children slot和analytics slot没有被重新渲染
   * 3. 跳转到路由 /settings 后，刷新页面
   *  * 你会看到当@analytics文件夹下没有settings路由的时候，会显示@analytics/default.tsx的内容，因为此时并没有命中其下的任何路由，
   *    但在layout中analytics slot仍然需要被渲染，因此需要default.tsx来兜底，children slot的情况也同理
   * 4. feel free to 删除平行路由里的page或者default来看看效果
   *
   * 做第2和3点实验，是因为在 soft navigation 和 hard reload 两种情况下，平行路由的渲染行为是不同的。
   * soft navigation 会出现 partial render，即，没命中的路由就不重渲染了，仅重渲染命中了的平行路由内容；
   * 但是hard reload的时候，所有路由都不得不在layout中的slot里渲染出来，那么那些没命中的路由也要渲染，那渲染啥，只好渲染兜底的default.tsx了。
   *
   * soft navigation 和 hard reload 这两种情况下截然不同的特性，就使得结合拦截路由使用可以达到小红书网页版那样的效果，
   * 当你点击小红书卡片的时候，出现了modal弹窗，但是当你刷新页面的时候呈现的就不是弹窗了而是该帖子的详情
   *
   * 而弹窗的内容实际上是对应的平行路由中的modal组件的内容，children依然会显示在页面中作为modal弹窗的背景，
   * 这样的效果就类似于本demo里soft navigate到/settings后，页面同时显现先前的的children page(相当于小红书的首页)内容和/settings平行路由里的内容(相当于点击小红书首页的帖子卡片出现的弹窗)
   * 而hard reload刷新/settings页面后，如果children的default.tsx里返回的是null，那么根据平行路由的逻辑，则会不显示children page，仅显示/settings平行路由里的内容，
   * 如果此时/settings这个路由还结合加入了拦截路由功能，在hard reload的情况下，会展示实际/settings里的内容，而不是@team/settings/page.tsx的内容
   *
   *
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
          {children}
          {analytics}
          {team}
        </div>
      </body>
    </html>
  );
}
