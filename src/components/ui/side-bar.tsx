"use client";

import React, {
    useContext,
    ReactNode,
    useState,
    useMemo,
    useCallback,
    ComponentType,
    SVGProps,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SidebarContextProps {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within a SidebarProvider");
    return context;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
    const close = useCallback(() => setIsOpen(false), []);

    const value = useMemo(() => ({ isOpen, toggle, close }), [isOpen, toggle, close]);

    return (
        <SidebarContext.Provider value={value}>
            <div className="relative flex h-screen w-full overflow-hidden bg-background">
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

// 2. Sidebar Core: Using HTML5 Semantic Tags & improved Mobile Logic
export function Sidebar({ children, className }: { children: ReactNode; className?: string }) {
    const { isOpen, close } = useSidebar();

    return (
        <>
            {/* Mobile Overlay: Use opacity for smoother transition */}
            <div onClick={close}
                className={cn(
                    "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity lg:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            />

            {/* Sidebar Aside */}
            <aside
                className={cn(
                    // Base & Desktop Styles
                    "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
                    // Mobile Styles
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    className
                )}
            >
                {children}
            </aside>
        </>
    );
}

// 3. Components: Semantic and Clean
export function SidebarHeader({ children, className }: { children?: ReactNode; className?: string }) {
    return (
        <div className={cn("flex h-16 items-center border-b px-6 shrink-0", className)}>
            {children || (
                <Link href="/" className="transition-opacity flex items-end text-sm hover:opacity-80">
                    <Image src="/images/logo.svg" alt="site-logo" width={40} height={40} priority />
                    <h1>Trac Flow</h1>
                </Link>
            )}
        </div>
    );
}

export function SidebarFooter({ children }: { children?: ReactNode }) {
    return (
        <div className="mt-auto border-t p-4 bg-muted/20">
            {children || (
                <p className="text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()}  Track Flow.
                </p>
            )}
        </div>
    );
}

export function SidebarInset({ children }: { children: ReactNode }) {
    return (
        <main className="flex flex-1 flex-col overflow-y-auto bg-background transition-all duration-300">
            {children}
        </main>
    );
}



interface SidebarItem {
    name: string;
    href: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface SidebarContentProps {
    sidebarItems: SidebarItem[];
}

export function SidebarContent({ sidebarItems }: SidebarContentProps) {
    const { close } = useSidebar();
    const pathname = usePathname();

    return (
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sidebarItems?.map(({ href, name, Icon }) => {
                const isActive = pathname === href;

                return (
                    <Link
                        key={href}
                        href={href}
                        onClick={close}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                        )}
                    >
                        {/* Render Icon with consistent sizing */}
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="text-sm">{name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}