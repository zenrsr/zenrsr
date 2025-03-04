import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export const useLocomotiveScroll = () => {
  const scrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.075, // Reduced from 0.1 for faster response
      multiplier: 0.8, // Reduced for better mouse wheel control
      class: 'is-revealed',
      reloadOnContextChange: true,
      tablet: {
        smooth: true,
        breakpoint: 768
      }
    });

    // Update scroll on page load
    setTimeout(() => {
      locomotiveScroll.update();
    }, 500); // Reduced timeout

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return scrollRef;
};