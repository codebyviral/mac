import Background from '@/components/desktop/Background';
import ProfileCircle from '@/components/user/ProfileCircle';
import ProfileCircleUser from '@/components/user/ProfileCircleUser';
import ProfileCircleBhavya from '@/components/user/ProfileCircleUser';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function Lockscreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const dateAndTimeInterval = setInterval(() => {
      setDate(new Date());
      setTime(new Date());
    }, 1000);

    return () => clearInterval(dateAndTimeInterval);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
  })
    .format(time)
    .replace(/,/g, '');

  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      clockRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }
    );
  }, [formattedTime]);


  return (
    <div className="select-none h-screen w-screen">
      <Background />
      <div className="absolute flex top-30 justify-center w-screen">
        <h1 className="text-xl text-white/80 bg-white/10 bg-clip-text text-transparent">
          {formattedDate}
        </h1>
      </div>
      <div
        ref={clockRef}
        className="absolute flex top-40 justify-center w-screen"
      >
        <h1 className="text-9xl font-semibold text-white/60 bg-white/10 bg-clip-text text-transparent">
          {formattedTime}
        </h1>
      </div>
      <ProfileCircleUser imageUrl='' />
    </div>
  );
}
