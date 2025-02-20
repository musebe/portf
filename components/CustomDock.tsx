'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Home,
  Mail,
  Pen,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dock, DockIcon } from '@/components/magicui/dock';

/**
 * A helper type to ensure we can pass additional SVG props
 * (like className) to each Lucide icon component.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

/**
 * 1) Define an `Icons` object that wraps Lucide icons
 * with default sizing and stroke color.
 *
 * Using `className='h-4 w-4 stroke-current'` ensures:
 *  - The icon is 16×16 (1rem).
 *  - The stroke color follows the current text color.
 */
const Icons = {
  home: (props: IconProps) => (
    <Home className='h-4 w-4 stroke-current' {...props} />
  ),
  blog: (props: IconProps) => (
    <Pen className='h-4 w-4 stroke-current' {...props} />
  ),
  email: (props: IconProps) => (
    <Mail className='h-4 w-4 stroke-current' {...props} />
  ),
  github: (props: IconProps) => (
    <Github className='h-4 w-4 stroke-current' {...props} />
  ),
  linkedin: (props: IconProps) => (
    <Linkedin className='h-4 w-4 stroke-current' {...props} />
  ),
  /** Twitter icon used for X */
  twitter: (props: IconProps) => (
    <Twitter className='h-4 w-4 stroke-current' {...props} />
  ),
  sun: (props: IconProps) => (
    <Sun className='h-4 w-4 stroke-current' {...props} />
  ),
  moon: (props: IconProps) => (
    <Moon className='h-4 w-4 stroke-current' {...props} />
  ),
  calendar: (props: IconProps) => (
    <Calendar className='h-4 w-4 stroke-current' {...props} />
  ),
};

/**
 * 2) Example DATA for the Dock:
 *    - Main navbar links (Home, Blog)
 *    - Contact/ Social icons (GitHub, LinkedIn, X, Email)
 */
const DATA = {
  navbar: [
    { href: '#', icon: Icons.home, label: 'Home' },
    { href: 'https://dev.to/musebe', icon: Icons.blog, label: 'Blog' },
  ],
  contact: {
    social: {
      GitHub: {
        name: 'GitHub',
        url: 'https://github.com/musebe',
        icon: Icons.github,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/emusebe/',
        icon: Icons.linkedin,
      },
      X: {
        name: 'X',
        url: 'https://x.com/_musebe',
        icon: Icons.twitter, // reusing the Twitter icon
      },
      Email: {
        name: 'Send Email',
        url: 'mailto:emusebe9@gmail.com',
        icon: Icons.email,
      },
    },
  },
};

export function CustomDock() {
  const { resolvedTheme, setTheme } = useTheme();

  /**
   * 3) We defer deciding "mobile vs. desktop" until we know
   *    the screen width, starting as `null`. This prevents a
   *    hydration mismatch (server vs. client).
   */
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1050);
    }
    // Initial check on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If we don't yet know screen size, return nothing (avoiding mismatch).
  if (isMobile === null) {
    return null;
  }

  // 4) Render the Dock with the correct orientation
  return (
    <div
      className={
        !isMobile
          ? 'fixed left-40 top-0 bottom-0 w-24 flex items-center'
          : 'fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center'
      }
    >
      <TooltipProvider>
        <Dock
          direction='middle'
          orientation={isMobile ? 'horizontal' : 'vertical'}
        >
          {/* -- Navbar Items -- */}
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <item.icon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? 'horizontal' : 'vertical'} />

          {/* -- Social / Contact Icons -- */}
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full'
                    )}
                  >
                    <social.icon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation={!isMobile ? 'horizontal' : 'vertical'} />

          {/* -- Theme Toggle -- */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='size-12 rounded-full flex items-center justify-center'
                >
                  {resolvedTheme === 'light' ? (
                    <Moon
                      className='h-4 w-4 stroke-current'
                      onClick={() => setTheme('dark')}
                    />
                  ) : (
                    <Sun
                      className='h-4 w-4 stroke-current'
                      onClick={() => setTheme('light')}
                    />
                  )}
                  <span className='sr-only'>Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}

export default CustomDock;
