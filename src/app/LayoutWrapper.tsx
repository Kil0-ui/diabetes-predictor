"use client"

import React, { useState } from "react";
import { Providers } from "./Providers";
import Navbar from "./components/Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    return (
        <Providers theme={theme} >
            <Navbar theme={theme} setTheme={setTheme} />
            {children}
        </Providers>
    )
}
