
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavItems } from "./NavItems";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  items: Array<{ title: string; href: string; }>;
}

export function MobileMenu({ isOpen, onToggle, items }: MobileMenuProps) {
  return (
    <>
      <div className="ml-2 md:hidden">
        <Button
          variant="ghost" 
          size="icon"
          onClick={onToggle}
          aria-label="Main menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <NavItems items={items} onClick={onToggle} />
          </div>
        </div>
      )}
    </>
  );
}
