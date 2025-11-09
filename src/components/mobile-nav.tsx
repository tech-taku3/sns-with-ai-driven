"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Bell, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

type MobileNavProps = React.HTMLAttributes<HTMLElement>

export function MobileNav({ className, ...props }: MobileNavProps) {
  const pathname = usePathname();
  const { user } = useUser();
  
  const items = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Mail, label: "Messages", href: "/messages" },
    { 
      icon: User, 
      label: "Profile", 
      href: user?.username ? `/${user.username}` : "/sign-in"
    },
  ];

  return (
    <nav className={cn(
      "z-50 bg-background border-t border-black/10 dark:border-white/10",
      className
    )} {...props}>
      <div className="flex justify-around items-center h-14">
        {items.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                "text-black/50 dark:text-white/50 hover:text-foreground",
                isActive && "text-foreground"
              )}
            >
              <Icon className="h-6 w-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}