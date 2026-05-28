"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-[var(--muted)] mb-8">
      <Link href="/" className="hover:text-[#185FA5] transition-colors flex items-center">
        <Home size={16} />
      </Link>

      {paths.map((path, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;
        const formattedPath = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

        return (
          <div key={path} className="flex items-center space-x-2">
            <ChevronRight size={16} />
            {isLast ? (
              <span className="font-medium text-[var(--foreground)]">{formattedPath}</span>
            ) : (
              <Link href={href} className="hover:text-[#185FA5] transition-colors">
                {formattedPath}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
