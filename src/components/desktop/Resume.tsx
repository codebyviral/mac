'use client';
import Image from 'next/image';
import ResumeLight from "@/app/assets/Resume/resume-light.png"
import ResumeDark from "@/app/assets/Resume/resume-dark.png"
import { useWindowManager } from '@/hooks/useWindowManager';
import interact from 'interactjs';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const Resume = () => {

    const { openWindow } = useWindowManager();
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const position = {
            x: 0,
            y: 0,
        }

        interact('.resume-app-icon').draggable({
            listeners: {
                move(event) {
                    position.x += event.dx;
                    position.y += event.dy;
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
                }
            }
        })
    }, [])

    return (
        <div className=''>
            <div className="absolute md:top-100 top-50 left-3 md:left-100 flex-col items-center resume-app-icon">
                <Image
                    onDoubleClick={() => openWindow('finder')}
                    className={`w-26.25 object-cover absolute cursor-none transition-all ease-in-out duration-500 ${resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0'}`}
                    src={ResumeLight}
                    priority
                    quality={100}
                    alt="folder"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />
                <Image
                    onDoubleClick={() => openWindow('finder')}
                    className={`w-20 md:w-26.25 object-cover cursor-none transition-all ease-in-out duration-500 ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
                    src={ResumeDark}
                    priority
                    quality={100}
                    alt="folder"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }}
                />
                <h1 className="text-sm text-white select-none app-icon-text">Resume.pdf</h1>
            </div>
        </div>
    );
};

export default Resume;
