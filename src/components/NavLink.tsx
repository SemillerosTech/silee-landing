"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { LinkProps } from "next/link";

interface NavLinkCompatProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className"
> {
  to: LinkProps["href"];
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const toPath = typeof to === "string" ? to : (to?.pathname ?? "");
    const isActive = toPath ? pathname === toPath : false;
    const isPending = false;

    const classes = cn(
      className,
      isActive && activeClassName,
      isPending && pendingClassName,
    );

    return <Link ref={ref} href={to} className={classes} {...props} />;
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
