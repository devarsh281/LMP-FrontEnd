import { createContext, ReactNode } from "react";

export type Theme = "dark" | "light" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

