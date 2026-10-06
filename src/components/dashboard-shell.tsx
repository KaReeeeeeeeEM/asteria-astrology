"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Orbit,
  NotebookPen,
  BookOpen,
  Settings,
  LogOut,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { PWAInstall } from "./pwa";
const nav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My birth charts", href: "/dashboard/charts", icon: Orbit },
  { title: "My journal", href: "/dashboard/journal", icon: NotebookPen },
  { title: "Saved knowledge", href: "/dashboard/library", icon: BookOpen },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];
export function DashboardShell({
  children,
  name,
  email,
}: {
  children: React.ReactNode;
  name: string;
  email: string;
}) {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboard-shell">
      <aside className={`dashboard-sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>
        <span className="eyebrow sidebar-label">YOUR PERSONAL ORBIT</span>
        <nav aria-label="Dashboard navigation">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              data-active={path === n.href}
              onClick={() => setOpen(false)}
            >
              <n.icon size={18} strokeWidth={1.5} />
              {n.title}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <span>✦</span>
          <p>
            A little space to pause,
            <br />
            notice, and come back to you.
          </p>
          <Link href="/sky">
            Explore today’s sky
            <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <Link href="/" className="text-link">
            Visit public site
            <ArrowUpRight size={16} />
          </Link>
          <div className="sidebar-user">
            <span className="user-avatar">
              {name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <strong>{name}</strong>
              <span>{email}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Log out"
              onClick={async () => {
                await authClient.signOut();
                router.push("/signin");
                router.refresh();
              }}
            >
              <LogOut />
            </Button>
          </div>
        </div>
      </aside>
      <div className="dashboard-body">
        <header className="dashboard-header">
          <Button
            className="mobile-menu"
            size="icon"
            variant="ghost"
            onClick={() => setOpen(true)}
            aria-label="Open dashboard navigation"
          >
            <Menu />
          </Button>
          <span className="eyebrow">✦ ASTERIA · YOUR CORNER OF THE COSMOS</span>
          <PWAInstall />
        </header>
        <main className="dashboard-main">{children}</main>
        <footer className="dashboard-footer">
          <span>Always free. Your story remains yours.</span>
          <Link href="/privacy">Privacy & your data</Link>
        </footer>
      </div>
    </div>
  );
}
