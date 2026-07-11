'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import cursorSvg from '@/app/assets/cursor.svg';
import pointerSvg from '@/app/assets/pointinghand.svg';

type cursorProps = {
  visible: boolean;
};

const Cursor = ({ visible }: cursorProps) => {

  const [pointer, setPointer] = useState<boolean>(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const position = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;

      setPointer(!!target.closest('[data-cursor="pointer"]'));
    };

    window.addEventListener('mousemove', handleMove);

    let frame: number;

    /**
     * cursor drag smoothness
     */
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x - 10) * 0.25;

      position.current.y += (mouse.current.y - position.current.y - 10) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(
        ${position.current.x}px,
        ${position.current.y}px,
        0
      )`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[999999] pointer-events-none"
    >
      <Image
        className="pointer-events-none select-none"
        src={pointer ? pointerSvg : cursorSvg}
        alt="cursor"
        width={30}
        height={30}
        draggable={false}
        priority
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export default Cursor;
