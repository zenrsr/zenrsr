import { useState, useEffect } from 'react';

/**
 * Hook to detect if user prefers reduced motion for accessibility
 * Respects system preferences and provides fallback for browsers without support
 */
export const useReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check if the browser supports prefers-reduced-motion
        if (typeof window === 'undefined' || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        // Set initial value
        setPrefersReducedMotion(mediaQuery.matches);

        // Create handler for media query changes
        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches);
        };

        // Add listener for changes
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
        }

        // Cleanup function
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                // Fallback for older browsers
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return prefersReducedMotion;
}; 