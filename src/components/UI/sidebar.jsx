import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementRef, forwardRef } from "react";

export interface SidebarNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  href?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  isCollapsed?: boolean;
}

export interface SidebarNavProps {
  items: SidebarNavItemProps[];
  isCollapsed: boolean;
}

export const SidebarNav = ({ items, isCollapsed }: SidebarNavProps) => {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", isCollapsed ? "items-center" : "px-3")}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 w-full justify-start gap-2 rounded-lg p-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent font-semibold" : "",
                item.disabled && "cursor-not-allowed opacity-80",
                isCollapsed ? "px-2 py-3 justify-center" : "px-3 py-2"
              )}
            >
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        );
      })}
    </div>
  );
};

export const SidebarHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4">
    <div className="text-xl font-bold">{children}</div>
  </div>
);

export const SidebarFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-auto p-4 border-t">{children}</div>
);

export const SidebarContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 overflow-auto py-2">{children}</div>
);