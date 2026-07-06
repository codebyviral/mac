"use client";

import { useEffect, useState } from "react";
import BootScreen from "@/components/boot/BootScreen";
import Desktop from "@/components/desktop/Desktop";
import Cursor from "@/components/desktop/Cursor";

const BootManager = () => {
    const [loading, setLoading] = useState(true);
    const [showBoot, setShowBoot] = useState(false);

    useEffect(() => {
        const booted = sessionStorage.getItem("booted") === 'true';

        if (!booted) {
            setShowBoot(true);
        }

        setLoading(false);
    }, []);

    if (loading) return null;

    return (
        <>
            <div>
                {
                    showBoot ? (<BootScreen
                        onFinish={() => {
                            sessionStorage.setItem("booted", "true");
                            setShowBoot(false);
                        }}
                    />) :
                        (<>
                            <div>
                                <Desktop />
                            </div>
                        </>
                        )
                }
                <Cursor visible={!showBoot} />
            </div>
        </>
    )
};

export default BootManager;