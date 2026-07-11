import Image from "next/image"
import PenWithNibAppIcon from "@/app/assets/dock/PenWithNib.png"
import NavigateAppIcon from "@/app/assets/dock/Navigate.png"
import ContactAppIcon from "@/app/assets/dock/Contacts.png"
import MailAppIcon from "@/app/assets/dock/Mail.png"
import interact from "interactjs"
import { useEffect } from "react"

const Dock = () => {

    useEffect(() => {
        const position = {
            x: 0,
            y: 0,
        }

        interact('.dock-ui').draggable({
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
        <div className="dock-ui">
            <div className="bg-linear-to-b from dock absolute bottom-44.5 w-84 h-19.5 left-1/2 -translate-x-1/2 flex justify-center rounded-[24px] items-center gap-3">
                <div className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px]"><Image className="p-3" src={PenWithNibAppIcon} alt="app" /><svg className="hidden">
                    <filter id="displacementFilter">
                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg></div>
                <div className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px]"><Image className="p-3" src={NavigateAppIcon} alt="app" /><svg className="hidden">
                    <filter id="displacementFilter">
                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg></div>
                <div className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px]"><Image className="p-3" src={ContactAppIcon} alt="app" /><svg className="hidden">
                    <filter id="displacementFilter">
                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg></div>
                <div className="bg-linear-to-b dock-app-icon w-13.5 h-13.5 ml-2 rounded-[12px]"><Image className="p-3" src={MailAppIcon} alt="app" /><svg className="hidden">
                    <filter id="displacementFilter">
                        <feImage href="https://pub-3b507f062445437c85a69ea700087215.r2.dev/image.png" preserveAspectRatio="none" />
                        <feDisplacementMap in='SourceGraphic' scale='200' xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </svg></div>
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
