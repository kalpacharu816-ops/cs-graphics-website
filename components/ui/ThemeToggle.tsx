"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full glass" />;
  }

  return (
    <motion.button
      type="button"
      data-magnetic
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="glass flex h-9 w-9 items-center justify-center rounded-full text-sm text-cs-silver hover:glow-violet"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === "dark" ? "☀" : "☾"}
    </motion.button>
  );
}
