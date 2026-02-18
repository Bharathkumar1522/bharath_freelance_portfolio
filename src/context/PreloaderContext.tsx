"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface PreloaderContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
    isLoading: true,
    setIsLoading: () => { },
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <PreloaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </PreloaderContext.Provider>
    );
}
