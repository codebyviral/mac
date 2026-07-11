"use client"
import BootManager from '@/components/boot/BootManager';
import { useEffect } from 'react';


const page = () => {
  useEffect(() => { sessionStorage.setItem('lock', 'true'); }, [])
  return <BootManager />;
};

export default page;
