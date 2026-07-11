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

const FinderWindow = () => {
  const { isOpen, windowSize } = useWindowManager();
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

  return (
    <div className="z-50">
      <div
        ref={finderRef}
        className={isOpen('finder') ? 'block opacity-100' : 'hidden opacity-0'}
      >
        <div className={`absolute top-1/2 left-1/2 ${windowDimension.height} ${windowDimension.width} -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-[#1E1E1E]`}>
          <div className="flex group">
            {windowActions?.map((item) => (
              <CircleButton
                key={item.name}
                takeAction={item.action}
                Icon={item.icon}
                bg={item.bg}
                text={item.text}
              />
            ))}
          </div>

          <hr className="mt-2 h-1 bg-[#0000000D]" />
        </div>
      </div>
    </div>
  );
};

export default FinderWindow;
