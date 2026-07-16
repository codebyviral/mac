import { FinderNode } from "@/data/finder"
import Image from "next/image";
import { useState } from "react";
import FolderImg from "@/app/assets/Finder/folder-icon.png"
import { ChevronRight, ChevronUp } from "lucide-react";
import PDFIcon from "@/app/assets/Finder/PDF.png"

type TreeNodeProps = {
    node: FinderNode
    depth: number;
}

const TreeNode = ({ node, depth }: TreeNodeProps) => {
    const [expanded, setExpanded] = useState(true)
    return (
        <div>
            <div
                className="flex gap-2 mt-2 ml-2 items-center"
                onClick={() => setExpanded(!expanded)}
                style={{
                    paddingLeft: `${depth * 20}px`
                }} >
                {node.type === 'Folder' ? (<> {expanded ? <ChevronUp size={16} /> : <ChevronRight size={16} />}  <Image src={FolderImg} width={20} alt="folder" /> </>) : (<></>)}
                {node.type === 'File' ? (<> <Image src={PDFIcon} alt="pdf" className="w-5 h-5" /> </>) : (<></>)}
                {node.name}
            </div>
            <div>
                {expanded &&
                    node.children?.map((child) => {
                        return <TreeNode key={child.name} node={child} depth={depth + 1} />
                    })
                }
            </div>
        </div>
    )
}

export default TreeNode;