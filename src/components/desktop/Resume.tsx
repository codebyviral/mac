'use client';
import Image from 'next/image';
import ResumeLight from "@/app/assets/Resume/resume-light.png"
import ResumeDark from "@/app/assets/Resume/resume-dark.png"
import { useWindowManager } from '@/hooks/useWindowManager';
import interact from 'interactjs';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const Resume = () => {

    const { openWindow, draggableDivRect } = useWindowManager();
    const [isDark, setIsDark] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const draggableRegion = draggableDivRect;

        if (!draggableRegion) return;

        const position = {
            x: 300,
            y: 300,
        };

        interact('.resume-app-icon')
            .styleCursor(false)
            .draggable({
                listeners: {
                    start(event) {
                        position.x = event.target.offsetLeft;
                        position.y = event.target.offsetTop;
                    },

                    move(event) {
                        position.x += event.dx;
                        position.y += event.dy;

                        const maxX =
                            draggableRegion.right -
                            draggableRegion.left -
                            event.target.offsetWidth;

                        const maxY =
                            draggableRegion.bottom -
                            draggableRegion.top -
                            event.target.offsetHeight;

                        position.x = Math.max(
                            0,
                            Math.min(position.x, maxX)
                        );

                        const minY = 32;

                        position.y = Math.max(
                            minY,
                            Math.min(position.y, maxY)
                        );

                        event.target.style.left = `${position.x}px`;
                        event.target.style.top = `${position.y}px`;
                    },
                },
            });

        return () => {
            interact('.folder-app-icon').unset();
        };
    }, [draggableDivRect]);

    useEffect(() => {

        if (resolvedTheme === 'dark') {
            setTimeout(() => {
                setIsDark(true);
            }, 300)
        } else {
            setTimeout(() => {
                setIsDark(false);
            }, 300)
        }

    }, [resolvedTheme])

    return (
        <div className=''>
            <div className="absolute flex flex-col items-center resume-app-icon justify-center" style={{
                left: 1150,
                top: 200,
                width: 100,
                height: 100,
            }}>
                <Image
                    onDoubleClick={() => openWindow('finder')}
                    src={isDark ? ResumeDark : ResumeLight}
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
