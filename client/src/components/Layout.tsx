import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isDashboard = location === "/dashboard";

  // For dashboard page, don't show footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}
