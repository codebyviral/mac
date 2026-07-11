"use client"
import FinderWindow from '@/components/FinderWindow';
import Folder from '@/components/desktop/Folder';
import Background from '@/components/desktop/Background';
import { useEffect, useRef, useState } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import gsap from 'gsap';
import Dock from '@/components/dock/Dock';

const Desktop = () => {

  const { disableHeaderClock, lockStatus } = useWindowManager();
  const desktopRef = useRef(null)

  useEffect(() => {
    disableHeaderClock(false)
  }, []);

  useEffect(() => {
    gsap.from(desktopRef.current, {
      opacity: 0,
      scale: 1.45,
      duration: 0.5,
    })
    gsap.to(desktopRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
    })
  }, [lockStatus])

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div>
        <div ref={desktopRef}>
          <Background />
          <div className="flex items-center">
            <Folder />
          </div>
          <FinderWindow />
          <Dock />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
