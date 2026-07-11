'use client';

import { createContext, ReactNode, useState } from 'react';

type WindowName = 'finder';
type WindowState = Record<WindowName, boolean>;

type WindowSize = {
  width: string;
  height: string
}

type WindowManagerContextType = {
  windows: WindowState;
  openWindow: (window: WindowName) => void;
  closeWindow: (window: WindowName) => void;
  toggleWindow: (window: WindowName) => void;
  isOpen: (window: WindowName) => boolean;
  headerClock: boolean;
  disableHeaderClock: (value: boolean) => void;
  lockStatus: string;
  toggleLockStatus: () => void;
  maximizeWindow: (window: WindowName) => void;
  windowSize: WindowSize
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {

  const [windows, setWindows] = useState<WindowState>({ finder: false });
  const [lockStatus, setLockStatus] = useState<string>('locked');
  const [headerClock, setHeaderClock] = useState<boolean>(true);
  const [windowSize, SetWindowSize] = useState<{
    width: 'w-200' | 'w-screen',
    height: 'h-100' | 'h-screen',
  }>({
    width: 'w-200',
    height: 'h-100'
  });

  const openWindow = (window: WindowName) => {
    setWindows((prev) => ({
      ...prev,
      [window]: true,
    }));
  };

  const closeWindow = (window: WindowName) => {
    setWindows((prev) => ({
      ...prev,
      [window]: false,
    }));
  };

  const maximizeWindow = (window: WindowName) => {
    if (windowSize.height === 'h-100' || windowSize.width === 'w-200') {
      SetWindowSize({
        width: 'w-screen',
        height: 'h-screen'
      })
    } else {
      SetWindowSize({
        width: 'w-200',
        height: 'h-100'
      })
    }
  }

  const toggleWindow = (window: WindowName) => {
    setWindows((prev) => ({
      ...prev,
      [window]: !prev[window],
    }));
  };

  const isOpen = (window: WindowName) => {
    return windows[window];
  };

  const disableHeaderClock = (value: boolean) => {
    setHeaderClock(value);
  };

  const toggleLockStatus = (): void => {
    if (lockStatus === 'unlocked') setLockStatus('locked')
    setLockStatus('unlocked')
  }

  return (
    <WindowManagerContext.Provider
      value={{
        lockStatus,
        toggleLockStatus,
        maximizeWindow,
        windowSize,
        windows,
        openWindow,
        closeWindow,
        toggleWindow,
        isOpen,
        headerClock,
        disableHeaderClock
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export default WindowManagerContext;
