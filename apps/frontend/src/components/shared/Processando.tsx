import Image from "next/image";
import { Icon360, IconSTurnDown, IconSpiral } from "@tabler/icons-react";

export default function Processando() {
    return (
        <div className="flex justify-center items-center h-screen relative">
            <Image src="/banners/principal.webp" fill alt="Barbearia" className="object-cover" />
            <div
                className="
                    flex flex-col justify-center items-center gap-2
                    absolute top-0 left-0 w-full h-full
                    bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
                "
            >
                <div className="animate-bounce flex flex-col justify-center items-center">
                    <Image src="/logo.png" alt="Logo" width={65} height={65} className="hidden sm:block animate-pulse" />
                    <Image src="/logo.png" alt="Logo" width={50} height={50} className="block sm:hidden" />
                </div>
            </div>
        </div>
    )
}
