import Image from 'next/image'
import PDFSvg from "@/app/assets/PDF_file_icon.svg"

const FilePDF = () => {
    return (
        <div>
            <div>
                <Image className="w-20 h-20" src={PDFSvg} alt="pdf" />
            </div>
        </div>
    )
}

export default FilePDF
