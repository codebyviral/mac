'use client';

import { createContext, ReactNode, useState } from 'react';

type WindowName = 'finder';
type WindowState = Record<WindowName, boolean>;

type WindowDimensions = {
  width: number;
  height: number;
}

type WindowPosition = {
  x: number;
  y: number;
}

type PreviousWindow = {
  x: number;
  y: number;
  height: number;
  width: number
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
  windowSize: WindowDimensions;
  isMaximized: boolean;
  windowPosition: WindowPosition;
  setWindowPosition: React.Dispatch<React.SetStateAction<WindowPosition>>;
  setWindowSize: React.Dispatch<React.SetStateAction<WindowDimensions>>;
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {

  const [windows, setWindows] = useState<WindowState>({ finder: false });
  const [lockStatus, setLockStatus] = useState<string>('locked');
  const [headerClock, setHeaderClock] = useState<boolean>(true);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: 900,
    height: 500
  });

  const [windowPosition, setWindowPosition] = useState<WindowPosition>({
    x: 0,
    y: 32
  });

  const [previousWindow, setPreviousWindow] = useState<PreviousWindow>({
    x: 300,
    y: 100,
    width: 800,
    height: 500,
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
    const draggableRegion = document.getElementById('draggable-area')?.getBoundingClientRect()

    if (!draggableRegion) return

    if (!isMaximized) {
      setPreviousWindow({
        x: windowPosition.x,
        y: windowPosition.y,
        width: windowSize.width,
        height: windowSize.height
      })

      setWindowPosition({
        x: draggableRegion.left,
        y: draggableRegion.top
      })

      setWindowSize({
        width: draggableRegion.width,
        height: draggableRegion.height
      })

      setIsMaximized(true);
    } else {

      setWindowPosition({
        x: previousWindow.x,
        y: previousWindow.y
      })

      setWindowSize({
        width: previousWindow.width,
        height: previousWindow.height
      })

      setIsMaximized(false);
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
        windowPosition,
        isMaximized,
        setIsMaximized,
        setWindowPosition,
        setWindowSize,
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
