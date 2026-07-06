"use client";
import Image from "next/image"
import FolderImg from "@/app/assets/folder-icon.png"
import { useWindowManager } from "@/hooks/useWindowManager"
import { useEffect } from "react";

const Folder = () => {

    const { windows, openWindow } = useWindowManager();

    return (
        <div>
            <div className="absolute top-100 md:left-100 flex flex-col items-center">
                <Image onDoubleClick={() => openWindow('finder')} data-cursor='pointer' className="w-20 object-cover cursor-pointer" src={FolderImg} priority quality={100} alt="folder" />
                <h1 className="text-sm text-white select-none">Designs⚡️</h1>
            </div>
        </div>
    )
}

export default Folder
