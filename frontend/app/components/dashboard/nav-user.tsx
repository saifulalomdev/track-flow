import { useUser } from "@clerk/clerk-react"
import { XIcon } from "lucide-react";
import { useSidebar } from "../layout/side-bar";

export default function NavUser() {
    const { user } = useUser();
    const { close } = useSidebar()
    return (
        <div className="w-full">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                <img src={user?.imageUrl} className="size-10 rounded-sm" alt="Profile image " />
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate">{user?.fullName}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Pro Account</p>
                </div>
                <XIcon onClick={close} className="lg:hidden" />
            </div>
        </div>
    )
}
