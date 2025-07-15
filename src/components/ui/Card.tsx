import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  gradient?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, gradient = false, children, ...props }, ref) => {
    const baseClasses = 'rounded-xl p-6 transition-all duration-200';
    
    const variants = {
      glass: 'glass-card hover:bg-defi-surface/90',
      gradient: 'gradient-border bg-defi-surface',
      solid: 'bg-card border border-border'
    };
    
    const variant = gradient ? 'gradient' : glass ? 'glass' : 'solid';
    
    return (
      <div
        className={cn(baseClasses, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;