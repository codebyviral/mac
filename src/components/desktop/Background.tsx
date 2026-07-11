'use client';

import Image from 'next/image';
import macOSLight from '@/app/assets/mac-light.jpg';
import macOSDark from '@/app/assets/mac-dark.jpg';
import Header from '@/components/desktop/Header';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import BootScreen from '@/components/boot/BootScreen';

const Background = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  return (
    <div className="relative h-screen w-screen overflow-hidden z-0">
      <Image
        src={macOSLight}
        alt="Light Wallpaper"
        fill
        priority
        quality={100}
        className={`object-cover h-screen w-screen transition-opacity duration-700 ease-in-out ${resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <Image
        src={macOSDark}
        alt="Dark Wallpaper"
        fill
        priority
        quality={100}
        className={`object-cover transition-opacity duration-700 ease-in-out ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <Header color="white" />
    </div>
  );
};

export default Background;
