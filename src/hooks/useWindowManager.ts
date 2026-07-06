"use client";

import WindowManagerContext from "@/contexts/WindowManager"
import { useContext } from "react"

export function useWindowManager(){

    const context = useContext(WindowManagerContext);

    if(!context){
        throw new Error(
            'useWindowManager must be used inside WindowManagerProvider'
        )
    }

    return context;

}