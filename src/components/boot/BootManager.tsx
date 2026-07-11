'use client';

import { Suspense, useEffect, useState } from 'react';
import BootScreen from '@/components/boot/BootScreen';
import Desktop from '@/components/desktop/Desktop';
import Cursor from '@/components/desktop/Cursor';
import { useWindowManager } from '@/hooks/useWindowManager';
import Lockscreen from '@/components/desktop/Lockscreen';

const BootManager = () => {
  const [loading, setLoading] = useState(true);
  const [showBoot, setShowBoot] = useState(false);

  const { lockStatus } = useWindowManager()

  useEffect(() => {
    const booted = sessionStorage.getItem('booted') === 'true';

    if (!booted) {
      setShowBoot(true);
    }

    setLoading(false);
  }, []);

  if (loading) return null;


  return (
    <>
      <div className='h-screen w-screen relative bg-black'>
        {showBoot ? (
          <BootScreen
            onFinish={() => {
              sessionStorage.setItem('booted', 'true');
              setShowBoot(false);
            }}
          />
        ) : (
          <>
            <div className={`h-screen w-screen`}>
              {
                lockStatus === 'locked' ? (<div><Lockscreen /></div>) : (<div><Desktop /></div>)
              }
            </div>
          </>
        )}
        <Cursor visible={!showBoot} />
      </div>
    </>
  );
};

export default BootManager;
