'use client';

import React, { useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import { cn } from '@/lib/utils';

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: 'top' | 'middle' | 'bottom';
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  'mx-auto w-max mt-8 h-[58px] p-2 flex gap-2 rounded-2xl ' +
    'shadow-md border border-slate-200 ' +
    'supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 ' +
    'backdrop-blur-md dark:border-slate-800 bg-white/10 dark:bg-black/10'
);

/**
 * Type-guard to ensure this node is a ReactElement of type DockIcon
 */
function isDockIconElement(
  element: React.ReactNode
): element is React.ReactElement<DockIconProps> {
  return (
    React.isValidElement(element) &&
    // Direct reference check
    (element.type === DockIcon ||
      // OR check displayName if it's a forwardRef or otherwise
      (typeof element.type !== 'string' &&
        (element.type as React.ComponentType).displayName === 'DockIcon'))
  );
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = 'bottom',
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    // Track the mouse position, default to Infinity (off-screen)
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    // Helper to transform children so that only `DockIcon` can receive extra props
    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (!isDockIconElement(child)) {
          // If it's not a DockIcon, just return it as-is
          return child;
        }
        // Clone the DockIcon element, passing mouse position and magnification props
        return React.cloneElement(child, {
          mouseX,
          mouseY,
          magnification,
          distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (orientation === 'horizontal') {
            mouseX.set(e.clientX);
          } else {
            mouseY.set(e.clientY);
          }
        }}
        onMouseLeave={() => {
          // Reset to Infinity so everything returns to normal size
          if (orientation === 'horizontal') {
            mouseX.set(Infinity);
          } else {
            mouseY.set(Infinity);
          }
        }}
        {...props}
        className={cn(dockVariants({ className }), {
          'items-start': direction === 'top',
          'items-center': direction === 'middle',
          'items-end': direction === 'bottom',
          'flex-col h-max': orientation === 'vertical',
          'flex-row': orientation === 'horizontal',
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = 'Dock';

export interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  mouseY,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Default motion values if none were passed
  const defaultMouseX = useMotionValue(0);
  const defaultMouseY = useMotionValue(0);

  // Calculate distance on Y axis from center of this icon
  const distanceHeightCalc = useTransform(mouseY ?? defaultMouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      y: 0,
      height: 0,
    };
    return val - (bounds.y + bounds.height / 2);
  });

  // Calculate distance on X axis from center of this icon
  const distanceWidthCalc = useTransform(mouseX ?? defaultMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - (bounds.x + bounds.width / 2);
  });

  // Map distance to icon size on vertical axis
  const heightSync = useTransform(
    distanceHeightCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  // Map distance to icon size on horizontal axis
  const widthSync = useTransform(
    distanceWidthCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  // Smooth out changes with useSpring
  const height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ height, width }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = 'DockIcon';

export { Dock, DockIcon, dockVariants };
