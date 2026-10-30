"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "team-tasks-theme";

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const apply = (next) => {
            document.documentElement.dataset.theme = next;
            setTheme(next);
        };
        const read = () => {
            let saved;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch {}
            apply(saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light");
        };
        read();
        media.addEventListener("change", read);
        window.addEventListener("storage", read);
        return () => {
            media.removeEventListener("change", read);
            window.removeEventListener("storage", read);
        };
    }, []);

    const selectTheme = (next) => {
        document.documentElement.dataset.theme = next;
        setTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    };
    return <ThemeContext.Provider value={{ theme, selectTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
