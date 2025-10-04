export function RightSidebar() {
  return (
    <aside className="hidden lg:flex w-[275px] shrink-0">
      <div className="fixed flex flex-col gap-4 w-[275px] px-6 py-2">
        {/* Premium */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-4">
          <h2 className="text-xl font-bold mb-2">Subscribe to Premium</h2>
          <p className="mb-3 text-sm">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
          <button className="rounded-full bg-black dark:bg-white text-white dark:text-black font-bold px-4 py-2 text-sm">
            Subscribe
          </button>
        </div>

        {/* Trends */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-4">
          <h2 className="text-xl font-bold mb-4">Trends for you</h2>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between group">
                <div>
                  <div className="text-sm text-gray-500">Trending in Japan</div>
                  <div className="font-bold">トレンド {i}</div>
                  <div className="text-sm text-gray-500">100K posts</div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                  •••
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}