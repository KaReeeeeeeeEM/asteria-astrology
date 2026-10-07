"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Orbit,
  NotebookPen,
  BookOpen,
  Settings,
  Hash,
  Heart,
  LogOut,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "./theme";
import { PWAInstall } from "./pwa";
import { LanguageSwitcher, Text, useLanguage } from "./language";
const nav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My birth charts", href: "/dashboard/charts", icon: Orbit },
  { title: "My journal", href: "/dashboard/journal", icon: NotebookPen },
  { title: "Numerology", href: "/dashboard/numerology", icon: Hash },
  { title: "Compatibility", href: "/dashboard/compatibility", icon: Heart },
  { title: "Daily readings", href: "/dashboard/horoscopes", icon: Sparkles },
  { title: "Today’s sky", href: "/dashboard/sky", icon: Orbit },
  { title: "Learn astrology", href: "/dashboard/learn", icon: GraduationCap },
  { title: "Zodiac signs", href: "/dashboard/zodiac", icon: Sparkles },
  { title: "Saved knowledge", href: "/dashboard/library", icon: BookOpen },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];
type Props = {
  children: React.ReactNode;
  name: string;
  email: string;
  defaultOpen?: boolean;
};
export function DashboardShell({ defaultOpen = true, ...props }: Props) {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="dashboard-shell"
        style={
          {
            "--sidebar-width": "255px",
            "--sidebar-width-icon": "64px",
          } as React.CSSProperties
        }
      >
        <DashboardFrame {...props} />
      </SidebarProvider>
    </TooltipProvider>
  );
}
function DashboardFrame({ children, name, email }: Props) {
  const path = usePathname(),
    router = useRouter(),
    { t } = useLanguage(),
    { open, openMobile, isMobile, setOpenMobile } = useSidebar();
  return (
    <>
      <Sidebar collapsible="icon" className="dashboard-navigation">
        <SidebarHeader className="sidebar-brand">
          <Logo href="/dashboard" />
        </SidebarHeader>
        <SidebarContent>
          <span className="eyebrow sidebar-label">
            <Text>YOUR PERSONAL ORBIT</Text>
          </span>
          <SidebarMenu aria-label={t("Dashboard navigation")}>
            {nav.map((n) => {
              const active =
                path === n.href ||
                (n.href != "/dashboard" && path.startsWith(n.href + "/"));
              return (
                <SidebarMenuItem key={n.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={t(n.title)}
                  >
                    <Link
                      href={n.href}
                      aria-label={t(n.title)}
                      aria-current={active ? "page" : undefined}
                      className="nav-link"
                      onClick={() => setOpenMobile(false)}
                    >
                      <n.icon size={18} />
                      <span>
                        <Text>{n.title}</Text>
                      </span>
                      <span className="nav-underline" aria-hidden="true" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="sidebar-bottom">
            <Link href="/" className="text-link sidebar-public">
              <Text>Visit public site</Text>
              <ArrowUpRight size={16} />
            </Link>
            <div className="sidebar-user">
              <span className="user-avatar">
                {name.slice(0, 1).toUpperCase()}
              </span>
              <div className="sidebar-identity">
                <strong>{name}</strong>
                <span>{email}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Log out")}
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
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="dashboard-body">
        <header className="dashboard-header">
          <div className="dashboard-heading-actions">
            <SidebarTrigger
              aria-label={t("Toggle sidebar")}
              title={t("Toggle sidebar (⌘B / Ctrl+B)")}
              aria-expanded={isMobile ? openMobile : open}
            />
            <div className="dashboard-mobile-brand">
              <Logo href="/dashboard" />
            </div>
            <span className="eyebrow">
              <Text>✦ ASTERIA · YOUR CORNER OF THE COSMOS</Text>
            </span>
          </div>
          <div className="dashboard-theme-actions">
            <LanguageSwitcher compact />
            <ThemeToggle />
          </div>
        </header>
        <main className="dashboard-main" id="dashboard-content">
          {children}
        </main>
        <footer className="dashboard-footer">
          <span>
            <Text>Always free. Your story remains yours.</Text>
          </span>
          <PWAInstall />
          <Link href="/dashboard/privacy">
            <Text>Privacy & your data</Text>
          </Link>
          <LanguageSwitcher />
        </footer>
      </SidebarInset>
    </>
  );
}
