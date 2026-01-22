"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ComponentProps,
} from "react";
import { cn } from "@/lib/utils";

type NextLinkProps = ComponentProps<typeof Link>;

interface NavLinkCompatProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className"
> {
  to: NextLinkProps["href"];
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const toPath = typeof to === "string" ? to : (to?.pathname ?? "");
    const isActive = pathname === toPath;
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
