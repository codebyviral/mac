"use client";
import Image from "next/image"
import PenWithNibAppIcon from "@/app/assets/dock/PenWithNib.png"
import NavigateAppIcon from "@/app/assets/dock/Navigate.png"
import ContactAppIcon from "@/app/assets/dock/Contacts.png"
import MailAppIcon from "@/app/assets/dock/Mail.png"
import interact from "interactjs"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Dock = () => {

    const dockApps = [
        PenWithNibAppIcon,
        NavigateAppIcon,
        ContactAppIcon,
        MailAppIcon,
    ];

    const dockRef = useRef<HTMLDivElement>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animations = useRef<
        {
            scale: gsap.QuickToFunc;
        }[]
    >([]);

    const scaleIcons = (hovered: number | null) => {
        iconRefs.current.forEach((_, index) => {

            let scale = 1;

            if (hovered === index) {
                scale = 1.4;
            } else if (
                hovered !== null &&
                Math.abs(index - hovered) === 1
            ) {
                scale = 1.1;
            }

            gsap.to(iconRefs.current[index], {
                scale,
                duration: 0.35,
                ease: "power3.out",
                overwrite: "auto",
            });
        });
    };

    return (
        <div className="dock-ui">
            <div ref={dockRef} className="bg-linear-to-b from dock absolute bottom-5 md:bottom-20 w-84 h-19.5 left-1/2 -translate-x-1/2 flex justify-center rounded-[24px] items-center gap-3">
                <div ref={(el) => {
                    iconRefs.current[0] = el;
                }}
                    onMouseEnter={() => scaleIcons(0)}
                    onMouseLeave={() => scaleIcons(null)}
                    className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px] group">
                    <Image draggable={false} className="p-3" src={PenWithNibAppIcon} alt="app" />
                    <svg className="hidden">
                        <filter id="displacementFilter">
                            <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                            <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </svg>
                    <div className="tooltip">
                        <div className="absolute px-2 py-1 text-sm dock-app-icon left-1/2 -translate-x-1/2 bottom-20 dark:border dark:border-b-0 text-white rounded-full opacity-0 group-hover:opacity-100">
                            Tools
                            <svg className="hidden">
                                <filter id="displacementFilter">
                                    <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                    <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                            </svg>
                            <div className="triangle dock-hover-icon-triangle absolute mt-1 w-[inherit] left-1/2 -translate-x-1/2">
                                <svg className="hidden">
                                    <filter id="displacementFilter">
                                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                    </filter>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={(el) => {
                    iconRefs.current[1] = el;
                }}
                    onMouseEnter={() => scaleIcons(1)}
                    onMouseLeave={() => scaleIcons(null)}
                    className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px] group"><Image draggable={false} className="p-3" src={NavigateAppIcon} alt="app" /><svg className="hidden">
                        <filter id="displacementFilter">
                            <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                            <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </svg>
                    <div className="tooltip">
                        <div className="absolute px-2 py-1 text-sm dock-app-icon left-1/2 -translate-x-1/2 bottom-20 dark:border dark:border-b-0 text-white rounded-full opacity-0 group-hover:opacity-100">
                            Experience
                            <svg className="hidden">
                                <filter id="displacementFilter">
                                    <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                    <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                            </svg>
                            <div className="triangle dock-hover-icon-triangle absolute mt-1 w-[inherit] left-1/2 -translate-x-1/2">
                                <svg className="hidden">
                                    <filter id="displacementFilter">
                                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                    </filter>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={(el) => {
                    iconRefs.current[2] = el;
                }}
                    onMouseEnter={() => scaleIcons(2)}
                    onMouseLeave={() => scaleIcons(null)}
                    className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px] group"><Image draggable={false} className="p-3" src={ContactAppIcon} alt="app" /><svg className="hidden">
                        <filter id="displacementFilter">
                            <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                            <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </svg> <div className="tooltip">
                        <div className="absolute px-2 py-1 text-sm dock-app-icon left-1/2 -translate-x-1/2 bottom-20 dark:border dark:border-b-0 text-white rounded-full opacity-0 group-hover:opacity-100">
                            About
                            <svg className="hidden">
                                <filter id="displacementFilter">
                                    <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                    <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                            </svg>
                            <div className="triangle dock-hover-icon-triangle absolute mt-1 w-[inherit] left-1/2 -translate-x-1/2">
                                <svg className="hidden">
                                    <filter id="displacementFilter">
                                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                    </filter>
                                </svg>
                            </div>
                        </div>
                    </div></div>
                <div ref={(el) => {
                    iconRefs.current[3] = el;
                }}
                    onMouseEnter={() => scaleIcons(3)}
                    onMouseLeave={() => scaleIcons(null)}
                    className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px] group"><Image draggable={false} className="p-3" src={MailAppIcon} alt="app" /><svg className="hidden">
                        <filter id="displacementFilter">
                            <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                            <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </svg> <div className="tooltip">
                        <div className="absolute px-2 py-1 text-sm dock-app-icon left-1/2 -translate-x-1/2 bottom-20 dark:border dark:border-b-0 text-white rounded-full opacity-0 group-hover:opacity-100">
                            Tools
                            <svg className="hidden">
                                <filter id="displacementFilter">
                                    <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                    <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                </filter>
                            </svg>
                            <div className="triangle dock-hover-icon-triangle absolute mt-1 w-[inherit] left-1/2 -translate-x-1/2">
                                <svg className="hidden">
                                    <filter id="displacementFilter">
                                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                                    </filter>
                                </svg>
                            </div>
                        </div>
                    </div></div>
            </div>

            <svg className="hidden">
                <filter id="displacementFilter">
                    <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                    <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
        </div>
    )
}

export default Dock
