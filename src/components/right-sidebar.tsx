import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex sticky top-0 h-screen w-[350px] shrink-0 flex-col gap-4 px-4 py-2">
      <div className="px-2">
        <Input placeholder="Search" />
      </div>

      <Card>
        <CardHeader className="text-xl font-bold">Subscribe to Premium</CardHeader>
        <CardContent>
          <p className="text-sm text-black/70 dark:text-white/70">Unlock new features and if eligible, receive a share of revenue.</p>
          <button className="mt-3 h-9 px-4 rounded-full bg-foreground text-background text-sm">Subscribe</button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="text-xl font-bold">What&#39;s happening</CardHeader>
        <CardContent className="space-y-4">
          {["KARMA shatters records", "Dazzling 'Alight' visuals", "SEVENTEEN electrifying tour"].map((t) => (
            <div key={t} className="text-sm">
              <div className="text-black/60 dark:text-white/60">Entertainment · Trending</div>
              <div className="font-semibold">{t}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

export default RightSidebar;


