import { Input } from '@/components/ui/input';
import { useWindowManager } from '@/hooks/useWindowManager';
import { isEnter } from '@/lib/keyboard';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import AppleWhiteBg from '@/app/assets/apple-white-bg-modified.png';
import { toast } from 'sonner';
import { log } from 'console';
import { signup } from '@/lib/action';
import BhavyaLockscreen from "@/app/assets/bhavya-lockscreen.png"
import MacReturnIcon from "@/app/assets/MacReturn.svg"
import Alex from "@/app/assets/Alex.jpeg"
import gsap from 'gsap';

type ProfileProps = {
    imageUrl: string;
};

const ProfileCircleBhavya = (props: ProfileProps) => {

    const { headerClock, disableHeaderClock, toggleLockStatus } = useWindowManager();

    const lockRef = useRef<HTMLDivElement>(null)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            toggleLockStatus();
        }
    }

    useEffect(() => {
        disableHeaderClock(true)
    }, [])

    return (
        <div ref={lockRef} className="select-none">
            <div className="absolute bottom-47.25 items-center left-1/2 -translate-x-1/2">
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
                        <Input autoFocus className='opacity-0' onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)} />
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
