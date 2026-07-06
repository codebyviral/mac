import Image from "next/image";
import AppleIcon from "@/app/assets/apple-icon.png"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

type bootProps = {
    onFinish: () => void;
}

const BootScreen = (props: bootProps) => {

    const router = useRouter();

    const progressRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const tl = gsap.timeline({
            onComplete: props.onFinish
        });

        tl.to(progressRef.current, {
            scaleX: 1,
            duration: 2,
        })

        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5
        })
    }, [props])


    return (
        <div ref={containerRef} className="fixed inset-0 bg-black cursor-none">
            <div className="flex flex-col h-screen items-center justify-center place-content-center">
                <Image className="w-20" quality={100} src={AppleIcon} alt="apple" />
                <div className="absolute top-200 w-72 h-1.5 rounded-full bg-neutral-700 overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full w-full bg-white origin-left scale-x-0"
                    />
                </div>
            </div>
        </div>
    )
}

export default BootScreen
