"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-utils";
import { Button } from "../../ui/button";

export function ModeSwitcher() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <Button
            className="relative p-2 rounded-lg "
            size="icon"
            variant="ghost"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 0 : 180,
                        scale: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-5 h-5" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        rotate: !isDark ? 0 : 180,
                        scale: !isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="w-5 h-5" />
                </motion.div>
            </motion.button>
        </Button>
    );
}
