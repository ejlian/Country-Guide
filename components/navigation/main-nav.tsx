"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Explore" },
  { href: "/saved", label: "Saved" },
  { href: "/profile", label: "Profile" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 text-sm font-medium">
      {NAV_ITEMS.map((item) => {
        const isActive = isPathActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/country");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
