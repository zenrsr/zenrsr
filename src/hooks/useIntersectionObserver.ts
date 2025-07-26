import { useEffect, useState, useRef } from 'react';

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
}

interface UseIntersectionObserverReturn {
    isIntersecting: boolean;
    intersectionRatio: number;
}

export const useIntersectionObserver = (
    targetRef: React.RefObject<Element>,
    options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [intersectionRatio, setIntersectionRatio] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

        if (!targetRef.current) return;

        // Clean up previous observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Create new observer with performance optimizations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setIsIntersecting(entry.isIntersecting);
                    setIntersectionRatio(entry.intersectionRatio);
                }
            },
            {
                threshold,
                root,
                rootMargin,
            }
        );

        observerRef.current.observe(targetRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [targetRef, options.threshold, options.root, options.rootMargin]);

    return { isIntersecting, intersectionRatio };
}; 