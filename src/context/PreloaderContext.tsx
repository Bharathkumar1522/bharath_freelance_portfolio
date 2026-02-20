"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface PreloaderContextType {
    isLoading: boolean;
    progress: number;
    setProgress: (progress: number) => void;
    markComplete: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
    isLoading: true,
    progress: 0,
    setProgress: () => { },
    markComplete: () => { },
});

export const usePreloader = () => useContext(PreloaderContext);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgressRaw] = useState(0);

    const setProgress = useCallback((p: number) => {
        setProgressRaw(Math.min(100, Math.max(0, p)));
    }, []);

    const markComplete = useCallback(() => {
        setProgressRaw(100);
        // Set isLoading false IMMEDIATELY — Hero animations need to start
        // BEFORE the preloader fades away, so the content is already animating
        // when it becomes visible
        setIsLoading(false);
    }, []);

    const value = useMemo(() => ({
        isLoading,
        progress,
        setProgress,
        markComplete,
    }), [isLoading, progress, setProgress, markComplete]);

    return (
        <PreloaderContext.Provider value={value}>
            {children}
        </PreloaderContext.Provider>
    );
}
