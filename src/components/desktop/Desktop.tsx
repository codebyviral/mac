"use client"
import FinderWindow from '@/components/FinderWindow';
import Folder from '@/components/desktop/Folder';
import Background from '@/components/desktop/Background';
import { useEffect, useRef, useState } from 'react';
import { useWindowManager } from '@/hooks/useWindowManager';
import gsap from 'gsap';
import Dock from '@/components/dock/Dock';
import Resume from '@/components/desktop/Resume';

const Desktop = () => {

  const { disableHeaderClock, lockStatus, setDraggableDivRect, draggableDivRect } = useWindowManager();
  const desktopRef = useRef(null)
  const desktopAnimateRef = useRef(null)

  useEffect(() => {
    disableHeaderClock(false)
  }, []);

  useEffect(() => {
    gsap.from(desktopRef.current, {
      scale: 1.45,
      duration: 0.5,
    })
    gsap.to(desktopRef.current, {
      scale: 1,
      duration: 0.5,
    })
  }, [lockStatus])

  useEffect(() => {

    gsap.fromTo(desktopAnimateRef.current, {
      opacity: 0,
      delay: 0.5
    }, {
      opacity: 1,
      duration: 2
    })

  }, [])

  useEffect(() => {
    const draggableRegion = document.getElementById('draggable-area')?.getBoundingClientRect();

    if (draggableRegion) {
      setDraggableDivRect({
        x: draggableRegion.x,
        y: draggableRegion.y,
        width: draggableRegion.width,
        height: draggableRegion.height,
        top: draggableRegion.top,
        right: draggableRegion.right,
        bottom: draggableRegion.bottom,
        left: draggableRegion.left
      })
    }
  }, []);

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div>
        <div ref={desktopRef}>
          <Background />
          <div ref={desktopAnimateRef} className="flex items-center">
            <Folder />
            <Resume />
            <FinderWindow />
            <Dock />
          </div>
        </div>
      </div>
      <div id='draggable-area' className='z-1 pointer-events-none bg-transparent opacity-0 text-white absolute top-8 w-screen md:h-[calc(100%-11.8rem)] h-[calc(100%-8rem)]'>Draggable Area</div>
    </div>
  );
};

export default Desktop;
