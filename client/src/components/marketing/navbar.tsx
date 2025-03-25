import React from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary text-2xl font-bold">SPARK</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400 hidden sm:block">
                Smart Parking
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <NavLink href="/" label="Home" active={location === "/"} />
              <NavLink href="/#features" label="Features" active={false} />
              <NavLink
                href="/#how-it-works"
                label="How It Works"
                active={false}
              />
              <NavLink href="/#about" label="About" active={false} />
              <NavLink href="/#contact" label="Contact" active={false} />
            </nav>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Login/Dashboard buttons */}
            {user ? (
              <div className="flex items-center ml-3 space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logoutMutation.mutate()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="ml-3" size="sm" asChild>
                <Link href="/auth">Login</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-3 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <MobileNavLink
                    href="/"
                    label="Home"
                    active={location === "/"}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    href="/#features"
                    label="Features"
                    active={false}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    href="/#how-it-works"
                    label="How It Works"
                    active={false}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    href="/#about"
                    label="About"
                    active={false}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <MobileNavLink
                    href="/#contact"
                    label="Contact"
                    active={false}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {user ? (
                      <>
                        <Button variant="outline" className="w-full mb-2" asChild>
                          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={() => {
                            logoutMutation.mutate();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium ${
        active
          ? "text-primary dark:text-primary"
          : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, label, active, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 text-base font-medium ${
        active
          ? "text-primary dark:text-primary"
          : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}
