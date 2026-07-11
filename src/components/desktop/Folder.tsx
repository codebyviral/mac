'use client';
import Image from 'next/image';
import FolderImg from '@/app/assets/folder-icon.png';
import { useWindowManager } from '@/hooks/useWindowManager';
import interact from 'interactjs';
import { useEffect } from 'react';

const Folder = () => {

  const { windows, openWindow } = useWindowManager();

  const position = {
    x: 0,
    y: 0,
  }

  interact('.folder-app-icon').draggable({
    listeners: {
      move(event) {
        position.x += event.dx;
        position.y += event.dy;
        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
      }
    }
  })

  return (
    <div className=''>
      <div className="absolute top-100 md:left-100 flex flex-col items-center folder-app-icon">
        <Image
          onDoubleClick={() => openWindow('finder')}
          className="w-26.25 object-cover cursor-none"
          src={FolderImg}
          priority
          quality={100}
          alt="folder"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <h1 className="text-sm text-white select-none app-icon-text">Designs⚡️</h1>
      </div>
    </div>
  );
};

export default Folder;
