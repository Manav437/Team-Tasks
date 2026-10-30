"use client";

import { PiSun, PiMoon } from "react-icons/pi";
import { useTheme } from "./theme-provider";
import styles from "./theme-switch.module.css";

export default function ThemeSwitch() {
    const { theme, selectTheme } = useTheme();
    return <div className={styles.switch} role="group" aria-label="Color theme">
        <button type="button" aria-label="Use light theme" aria-pressed={theme === "light"} onClick={() => selectTheme("light")}>
            <PiSun size={15} aria-hidden="true" />
            {/* <span>Light</span>*/}
        </button>
        <button type="button" aria-label="Use dark theme" aria-pressed={theme === "dark"} onClick={() => selectTheme("dark")}>
            <PiMoon size={15} aria-hidden="true" />
            {/* <span>Dark</span>*/}
        </button>
    </div>;
}
