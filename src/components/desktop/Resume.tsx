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
            <div className="absolute md:top-130 top-50 left-3 md:left-100 flex flex-col items-center resume-app-icon justify-center">
                <Image
                    onDoubleClick={() => openWindow('finder')}
                    src={resolvedTheme === 'dark' ? ResumeDark : ResumeLight}
                    className="w-20 md:w-26.25 object-cover cursor-none transition-all ease-in-out duration-300"
                    priority
                    quality={100}
                    alt="Resume"
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
