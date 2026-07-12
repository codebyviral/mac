import { Input } from '@/components/ui/input';
import { useWindowManager } from '@/hooks/useWindowManager';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import BhavyaLockscreen from "@/app/assets/User/bhavya-lockscreen.png"
import MacReturnIcon from "@/app/assets/Keyboard/MacReturn.svg"
import Alex from "@/app/assets/User/Alex.jpeg"

type ProfileProps = {
    imageUrl: string;
};

const ProfileCircleBhavya = (props: ProfileProps) => {

    const { headerClock, disableHeaderClock, toggleLockStatus } = useWindowManager();

    const lockRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        disableHeaderClock(true)

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key == 'Enter') toggleLockStatus();
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [])

    return (
        <div ref={lockRef} className="select-none">
            <div className="absolute bottom-35.25 items-center left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center">
                    <Image
                        width={60}
                        height={60}
                        className="rounded-full"
                        quality={100}
                        src={Alex}
                        draggable={false}
                        alt="profile"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                    <div className="mt-3 flex flex-col items-center">
                        <h1 className="text-white bg-white/10 bg-clip-text text-transparent">
                            Alex Turing
                        </h1>
                        <div
                            className="mt-3 flex flex-row gap-1 text-xs text-center font-bold text-white/60 bg-white/10 bg-clip-text text-transparent whitespace-nowrap"
                        >
                            Press <span> <Image src={MacReturnIcon} alt='command' /> </span> to explore my portfolio
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCircleBhavya;
