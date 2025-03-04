import { useEffect, useState } from "react";
import cn from "classnames";

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

    window.addEventListener("mousemove", mMove);
    window.addEventListener("mouseenter", mEnter);
    window.addEventListener("mouseleave", mLeave);
    window.addEventListener("mousedown", mDown);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .interactive, .menu-button'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", mMove);
      window.removeEventListener("mouseenter", mEnter);
      window.removeEventListener("mouseleave", mLeave);
      window.removeEventListener("mousedown", mDown);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover);
        el.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  // Only show custom cursor on non-touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouchDevice) return null;

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-[9999] mix-blend-difference",
        hidden && "opacity-0"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s ease, transform 0.1s ease-out",
      }}
    >
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform duration-200",
          clicked && "scale-90",
          linkHovered && "scale-150"
        )}
      >
        <div
          className="absolute w-8 h-8 border border-white rounded-full transition-all duration-200"
          style={{
            transform: `scale(${linkHovered ? 1.2 : 1})`,
          }}
        />
        <div
          className={cn(
            "absolute w-1 h-1 bg-white rounded-full transition-all duration-200",
            linkHovered && "opacity-0 scale-0"
          )}
        />
      </div>
    </div>
  );
};

export default Cursor;
