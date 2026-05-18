import { Globe } from "lucide-react";

export default function SidebarBranding() {
    return (
        <div className="w-full font-mono select-none">
            <div className="flex items-center gap-3 px-3 py-2.5 bg-zinc-950 border-2">
                <div className="h-9 w-9 bg-white border border-black flex items-center justify-center text-black">
                    <Globe className="h-5 w-5 stroke-[2.5]" />
                </div>

                {/* Brand Context */}
                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-white tracking-wider uppercase">
                            TRACKFLOW
                        </span>
                        <span className="text-[9px] bg-white text-black px-1 font-bold uppercase">
                            v1.0
                        </span>
                    </div>
                    <p className="text-[9px] text-zinc-400 font-medium tracking-tight mt-0.5 uppercase truncate">
                        DATA YOU ACTUALLY OWN.
                    </p>
                </div>
            </div>
        </div>
    );
}