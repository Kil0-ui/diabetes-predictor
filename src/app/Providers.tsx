'use client'

import { RendererProvider, createDOMRenderer, SSRProvider, FluentProvider, webLightTheme, webDarkTheme } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import { ThemeMode } from "./LayoutWrapper";

const renderer = createDOMRenderer();

export function Providers({ children, theme }: { children: React.ReactNode, theme: ThemeMode }) {
    // Declare a state variable named 'hasMounted' and a function named 'setHasMounted' to update it.
    const [hasMounted, setHasMounted] = useState(false);

    // Use the 'useEffect' hook to set 'hasMounted' to true once the component has mounted.
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // If the component hasn't mounted yet, return nothing.
    if (!hasMounted) {
        return null;
    }

    // If the component has mounted, return a set of providers.
    return (
        <RendererProvider renderer={renderer || createDOMRenderer()}>
            <SSRProvider>
                <FluentProvider style={{ height: '100%' }} theme={theme === "dark" ? webDarkTheme : webLightTheme}>
                    {children}
                </FluentProvider>
            </SSRProvider>
        </RendererProvider >
    );
}
