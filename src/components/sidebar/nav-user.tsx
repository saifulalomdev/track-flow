import { useSession } from '@/providers/session-provider'

export default function NavUser() {
    const {user} = useSession()
    return (
        <div className="w-full">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-black">
                    {user?.name.split("")[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold truncate text-white">{user?.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Pro Account</p>
                </div>
            </div>
        </div>
    )
}
