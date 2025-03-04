
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    withArrow = false, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Apply magnetic effect
    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = button.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        
        const strength = variant === 'text' ? 5 : 10;
        button.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      };
      
      const handleMouseLeave = () => {
        button.style.transform = 'translate(0, 0)';
      };
      
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [variant]);

    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      text: 'bg-transparent text-foreground hover:text-foreground/70'
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        ref={(node) => {
          // Assign to both refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          buttonRef.current = node;
        }}
        className={cn(
          'relative inline-flex items-center justify-center rounded-md transition-all duration-300 ease-in-expo overflow-hidden interactive',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span className="flex items-center space-x-2">
          <span>{children}</span>
          {withArrow && (
            <ArrowRight
              className={cn(
                "ml-2 h-4 w-4 transition-all duration-300",
                isHovered ? "transform translate-x-1" : ""
              )}
            />
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
