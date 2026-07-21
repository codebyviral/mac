'use client';

import Image from 'next/image';
import FolderImg from '@/app/assets/Finder/folder-icon.png';
import { useWindowManager } from '@/hooks/useWindowManager';
import interact from 'interactjs';
import { useEffect } from 'react';

const Folder = () => {
  const { openWindow, draggableDivRect } = useWindowManager();

  useEffect(() => {
    const draggableRegion = draggableDivRect;

    if (!draggableRegion) return;

    const position = {
      x: 300,
      y: 300,
    };

    interact('.folder-app-icon')
      .styleCursor(false)
      .draggable({
        listeners: {
          start(event) {
            position.x = event.target.offsetLeft;
            position.y = event.target.offsetTop;
          },

          move(event) {
            position.x += event.dx;
            position.y += event.dy;

            const maxX =
              draggableRegion.right -
              draggableRegion.left -
              event.target.offsetWidth;

            const maxY =
              draggableRegion.bottom -
              draggableRegion.top -
              event.target.offsetHeight;

            position.x = Math.max(
              0,
              Math.min(position.x, maxX)
            );

            const minY = 32;

            position.y = Math.max(
              minY,
              Math.min(position.y, maxY)
            );

            event.target.style.left = `${position.x}px`;
            event.target.style.top = `${position.y}px`;
          },
        },
      });

    return () => {
      interact('.folder-app-icon').unset();
    };
  }, [draggableDivRect]);

  return (
    <div
      className="folder-app-icon absolute z-2 flex flex-col items-center"
      style={{
        left: 300,
        top: 300,
        width: 100,
        height: 100,
      }}
      onDoubleClick={() => openWindow('finder')}
    >
      <Image
        src={FolderImg}
        alt="folder"
        priority
        quality={100}
        draggable={false}
        className="w-20 object-cover md:w-26"
      />

      <h1 className="app-icon-text select-none text-sm text-white">
        Work
      </h1>
    </div>
  );
};

export default Folder;