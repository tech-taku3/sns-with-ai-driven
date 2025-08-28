export default function RightSidebar() {
  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[350px] shrink-0 overflow-y-auto px-6 py-2">
      <div className="flex flex-col gap-4">
        {/* Premium */}
        <div className="rounded-2xl bg-black/[.03] dark:bg-white/[.04] p-4">
          <h2 className="text-xl font-bold mb-2">Subscribe to Premium</h2>
          <p className="mb-3">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
          <button className="rounded-full bg-black dark:bg-white text-white dark:text-black font-bold px-4 py-2">
            Subscribe
          </button>
        </div>

        {/* Trends */}
        <div className="rounded-2xl bg-black/[.03] dark:bg-white/[.04] p-4">
          <h2 className="text-xl font-bold mb-4">Trends for you</h2>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <div className="text-sm text-black/50 dark:text-white/50">Trending in Japan</div>
                  <div className="font-bold">トレンド {i}</div>
                  <div className="text-sm text-black/50 dark:text-white/50">100K posts</div>
                </div>
                <button className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
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