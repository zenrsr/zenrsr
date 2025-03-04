
import { useEffect, useState } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  // Handle cursor movement
  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mEnter = () => {
      setHidden(false);
    };

    const mDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    // Check for interactive elements
    const handleLinkHover = () => {
      setLinkHovered(true);
    };

    const handleLinkLeave = () => {
      setLinkHovered(false);
    };

    window.addEventListener('mousemove', mMove);
    window.addEventListener('mouseenter', mEnter);
    window.addEventListener('mouseleave', mLeave);
    window.addEventListener('mousedown', mDown);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mMove);
      window.removeEventListener('mouseenter', mEnter);
      window.removeEventListener('mouseleave', mLeave);
      window.removeEventListener('mousedown', mDown);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div className={`custom-cursor ${hidden ? 'opacity-0' : ''}`}>
      <div 
        className={`cursor-dot ${clicked ? 'scale-50' : ''}`} 
        style={{
          ...cursorStyle,
          transform: `translate(-50%, -50%) ${clicked ? 'scale(0.5)' : ''}`,
        }}
      />
      <div 
        className={`cursor-ring ${linkHovered ? 'hover' : ''} ${clicked ? 'scale-150 opacity-50' : ''}`}
        style={cursorStyle}
      />
    </div>
  );
};

export default Cursor;
