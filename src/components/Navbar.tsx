
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavItems } from "./nav/NavItems";
import { UserMenu } from "./nav/UserMenu";
import { MobileMenu } from "./nav/MobileMenu";

export function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Profile", href: "/profile" },
    { title: "Announcements", href: "/announcements" },
  ];

  const studentNavItems = [
    { title: "Mentorship", href: "/mentorship-request" },
    { title: "Referral Requests", href: "/referral-request" },
    { title: "Alumni Directory", href: "/alumni-directory" },
  ];

  const alumniNavItems = [
    { title: "Referrals", href: "/referrals" },
    { title: "Mentorship", href: "/mentorship" },
    { title: "Leaderboard", href: "/leaderboard" },
  ];

  const roleSpecificItems = user?.role === "student" ? studentNavItems : alumniNavItems;
  const allNavItems = [...navItems, ...roleSpecificItems];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Prevent auto-logout after navigation
  if (!user && (
    location.pathname === "/dashboard" || 
    location.pathname === "/profile" ||
    location.pathname === "/announcements" ||
    location.pathname === "/settings" ||
    location.pathname === "/referrals" ||
    location.pathname === "/mentorship" ||
    location.pathname === "/leaderboard" ||
    location.pathname === "/alumni-directory" ||
    location.pathname === "/mentorship-request" ||
    location.pathname === "/referral-request"
  )) {
    return null;
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                AlumniSphere
              </h1>
            </Link>
          </div>

          {!isMobile && (
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <NavItems items={allNavItems} />
            </div>
          )}

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <UserMenu />

            {isMobile && (
              <MobileMenu 
                isOpen={isMenuOpen}
                onToggle={toggleMenu}
                items={allNavItems}
              />
            )}
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <NavItems items={allNavItems} onClick={toggleMenu} />
          </div>
        </div>
      )}
    </nav>
  );
}
