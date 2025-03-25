import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Booking", href: "/booking" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                SP
              </div>
              <span className="ml-2 text-xl font-bold">SPARK</span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium ${
                    location === item.href
                      ? "text-primary"
                      : "hover:text-primary dark:hover:text-primary"
                  } transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side nav items */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Dashboard access */}
            <Link href="/dashboard" className="hidden md:block">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
            
            {/* Login/Profile */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">
                        {user.firstName && user.lastName 
                          ? `${user.firstName[0]}${user.lastName[0]}`
                          : user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user.username}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === item.href
                    ? "bg-gray-100 dark:bg-gray-800 text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
