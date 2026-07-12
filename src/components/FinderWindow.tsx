'use client';

import { useWindowManager } from '@/hooks/useWindowManager';
import {
  XIcon,
  MinusIcon,
  ArrowsOutSimpleIcon,
  type Icon,
} from '@phosphor-icons/react';
import CircleButton from '@/components/actions/CircleButton';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import interact from 'interactjs';
import { finderData } from '@/data/finder';
import TreeNode from '@/components/finder/TreeNode';

const FinderWindow = () => {
  const { isOpen, windowSize, windowPosition, setWindowPosition, maximizeWindow } = useWindowManager();
  const finderRef = useRef(null)

  let windowDimension = {
    width: windowSize.width,
    height: windowSize.height
  }

  const windowActions: {
    name: string;
    action: string;
    icon: Icon;
    bg: string;
    text: string;
  }[] = [
      {
        name: 'close-window',
        action: 'close',
        icon: XIcon,
        bg: 'bg-red-400',
        text: 'text-black',
      },
      {
        name: 'minimize-window',
        action: 'minimize',
        icon: MinusIcon,
        bg: 'bg-yellow-400',
        text: 'text-black',
      },
      {
        name: 'maximize-window',
        action: 'maximize',
        icon: ArrowsOutSimpleIcon,
        bg: 'bg-green-400',
        text: 'text-black',
      },
    ];

  useEffect(() => {
    gsap.from(finderRef.current, {
      opacity: 0,
      duration: 0.1
    })
    gsap.to(finderRef.current, {
      opacity: 1,
      duration: 0.1
    })
  }, [windowSize])

  useEffect(() => {
    const position = {
      x: windowPosition.x,
      y: windowPosition.y,
    }

    const draggableRegion = document.getElementById('draggable-area')?.getBoundingClientRect();

    if (draggableRegion) {
      interact('.finder-window')
        .styleCursor(false)
        .draggable({
          allowFrom: '.finder-window-header',
          listeners: {
            move(event) {
              position.x += event.dx;
              position.y += event.dy;

              setWindowPosition({ x: position.x, y: position.y })

              const maxX = draggableRegion.right - event.target.offsetWidth;
              const maxY = draggableRegion.bottom - event.target.offsetHeight;

              position.x = Math.max(draggableRegion.left, Math.min(position.x, maxX));
              position.y = Math.max(draggableRegion.top, Math.min(position.y, maxY));

              event.target.style.left = `${position.x}px`;
              event.target.style.top = `${position.y}px`;
            }
          },
        });
    }

  }, [isOpen('finder')])

  return (
    <div>
      <div>
      </div>
      <div className="z-100">
        <div
          ref={finderRef}
          className={isOpen('finder') ? 'block opacity-100' : 'hidden opacity-0'}
        >
          <div id='draggable-area' className='opacity-0 z-1 bg-transparent text-white absolute top-8 w-screen h-[calc(100%-11.8rem)]'>Draggable Area</div>
          <div style={{
            left: windowPosition.x,
            top: windowPosition.y,
            width: windowSize.width,
            height: windowSize.height
          }} className={`z-2 finder-window absolute rounded-2xl bg-white dark:bg-[#1E1E1E] ${windowDimension.width} ${windowDimension.height}`}>
            <div onDoubleClick={() => maximizeWindow('finder')} className="flex finder-window-header group items-center">
              {windowActions?.map((item) => (
                <CircleButton
                  key={item.name}
                  takeAction={item.action}
                  Icon={item.icon}
                  bg={item.bg}
                  text={item.text}
                />
              ))}
              <div className='text-sm mt-2 ml-3 font-bold'>Works</div>
            </div>
            <hr className="mt-2 h-1 bg-[#0000000D]" />
            <TreeNode node={finderData} depth={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderWindow;
