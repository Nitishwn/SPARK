import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

// Add theme hook
export function useTheme() {
  const [theme, setThemeState] = React.useState<"light" | "dark">(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem("spark-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    
    // Check user preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    
    return "light";
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    localStorage.setItem("spark-theme", theme);
  }, [theme]);

  const setTheme = React.useCallback((theme: "light" | "dark") => {
    setThemeState(theme);
  }, []);

  return { theme, setTheme };
}
