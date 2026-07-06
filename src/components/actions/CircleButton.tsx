import { useWindowManager } from "@/hooks/useWindowManager";
import { Icon } from "@phosphor-icons/react";

type ActionProps = {
    takeAction: string;
    Icon: Icon;
    bg: string;
    text: string;
};

const CircleButton = ({
    takeAction,
    Icon,
    bg,
    text,
}: ActionProps) => {
    const { closeWindow } = useWindowManager();

    function handleWindow(action: string) {
        switch (action) {
            case "close":
                closeWindow("finder");
                break;

            case "minimize":
                console.log("Minimize");
                break;

            case "maximize":
                console.log("Maximize");
                break;
        }
    }

    return (
        <button
            onClick={() => handleWindow(takeAction)}
            className={`group mt-2 ml-2 flex h-3.5 w-3.5 items-center justify-center rounded-full ${bg}`}
        >
            <Icon
                size={8}
                weight="bold"
                className={`opacity-0 transition-opacity group-hover:opacity-100 ${text}`}
            />
        </button>
    );
};

export default CircleButton;