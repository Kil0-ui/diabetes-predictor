"use client"

import React, { useState } from "react";
import { Providers } from "./Providers";
import Navbar from "./components/Navbar";

export type ThemeMode = "light" | "dark"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>(global?.localStorage?.getItem("diabetesPredictor/theme") as ThemeMode);

    const _setTheme = (newTheme: ThemeMode) => {
        setTheme(newTheme);
        global?.localStorage?.setItem("diabetesPredictor/theme", newTheme);
    }

    return (
        <Providers theme={theme} >
            <Navbar theme={theme} setTheme={_setTheme} />
            {children}
        </Providers>
    )
}
