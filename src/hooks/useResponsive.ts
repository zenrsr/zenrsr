import { useState, useEffect, useCallback } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface Breakpoints {
    mobile: number;
    tablet: number;
    desktop: number;
}

interface UseResponsiveReturn {
    screenSize: ScreenSize;
    windowWidth: number;
    windowHeight: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
};

export const useResponsive = (
    breakpoints: Breakpoints = DEFAULT_BREAKPOINTS
): UseResponsiveReturn => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    const getScreenSize = useCallback((width: number): ScreenSize => {
        if (width < breakpoints.mobile) return 'mobile';
        if (width < breakpoints.tablet) return 'tablet';
        return 'desktop';
    }, [breakpoints]);

    const [screenSize, setScreenSize] = useState<ScreenSize>(() =>
        getScreenSize(windowSize.width)
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleResize = () => {
            // Debounce resize events for better performance
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                const newScreenSize = getScreenSize(newWidth);

                setWindowSize({ width: newWidth, height: newHeight });

                // Only update screen size if it actually changed
                if (newScreenSize !== screenSize) {
                    setScreenSize(newScreenSize);
                }
            }, 100);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Initial size check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [getScreenSize, screenSize]);

    return {
        screenSize,
        windowWidth: windowSize.width,
        windowHeight: windowSize.height,
        isMobile: screenSize === 'mobile',
        isTablet: screenSize === 'tablet',
        isDesktop: screenSize === 'desktop',
    };
}; 