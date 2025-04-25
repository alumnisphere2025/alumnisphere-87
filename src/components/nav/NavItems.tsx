
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  title: string;
  href: string;
}

interface NavItemsProps {
  items: NavItem[];
  onClick?: () => void;
}

export function NavItems({ items, onClick }: NavItemsProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          onClick={onClick}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive(item.href)
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-muted"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}
