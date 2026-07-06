import FinderWindow from "@/components/FinderWindow"
import Folder from "@/components/desktop/Folder"
import Background from "@/components/desktop/Background"

const Desktop = () => {
    return (
        <div>
            <Background />
            <div className="flex items-center">
                <Folder />
            </div>
            <FinderWindow />
        </div>
    )
}

export default Desktop