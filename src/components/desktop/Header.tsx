"use client";

import { useEffect, useState } from "react";
import AppleIcon from "@/components/desktop/AppleIcon";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

type HeaderProps = {
    color: string;
};

const Header = ({ color }: HeaderProps) => {
    const { resolvedTheme, setTheme } = useTheme();

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
        .format(date)
        .replace(/,/g, "")
        .replace("am", "AM")
        .replace("pm", "PM");

    return (
        <div className="absolute -top-1 left-3 right-5 flex items-center justify-between">
            <AppleIcon color={color} />
            <span className="text-sm absolute left-6 select-none"></span>
            <div className="flex items-center gap-4 text-white">
                <button
                    onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                >
                    {resolvedTheme === "dark" ? (
                        <SunIcon size={20} weight="bold" />
                    ) : (
                        <MoonIcon size={20} weight="bold" />
                    )}
                </button>

                <h1 className="text-sm select-none">{formattedDate}</h1>
            </div>
        </div>
    );
};

export default Header;