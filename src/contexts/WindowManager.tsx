"use client"

import { createContext, ReactNode, useState } from "react";

type WindowState = Record<WindowName, boolean>;
type WindowName = 'finder'

type WindowManagerContextType = {
  windows: WindowState;
  openWindow: (window: WindowName) => void;
  closeWindow: (window: WindowName) => void;
  toggleWindow: (window: WindowName) => void;
  isOpen: (window: WindowName) => boolean;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState>({
    finder: false
  })

  const openWindow = (window: WindowName) => {
    setWindows((prev) => ({
      ...prev,
      [window]: true
    }))
  }

  const closeWindow = (window: WindowName) => {
    console.log('closing', window)
    setWindows((prev) => ({
      ...prev,
      [window]: false
    }))
  }

  const toggleWindow = (window: WindowName) => {
    setWindows((prev) => ({
      ...prev,
      [window]: !prev[window]
    }))
  }

  const isOpen = (window: WindowName) => {
    return windows[window]
  }

  return (
    <WindowManagerContext.Provider value={{ windows, openWindow, closeWindow, toggleWindow, isOpen }}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export default WindowManagerContext;