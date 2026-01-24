"use client"

import { useState } from 'react'
import { Copy, Check, Sparkles, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { platforms } from '@/constants/platforms';

interface UTMViewCardProps {
    finalUrl: string
    campaign: string
    platform: string // This is the utmSource string
}

export default function UTMViewCard({ finalUrl, campaign, platform }: UTMViewCardProps) {
    const [copied, setCopied] = useState(false)

    // 1. Find the platform object based on the utmSource string
    const activePlatform = platforms.find(p => p.utmSource === platform);
    
    // 2. Extract the Icon and Color (Default to Sparkles if not found)
    const PlatformIcon = activePlatform ? activePlatform.Icon : Sparkles;
    const iconColor = activePlatform ? activePlatform.color : "currentColor";

    const handleCopy = () => {
        if (!finalUrl) return
        navigator.clipboard.writeText(finalUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='w-full lg:sticky top-20 max-w-md mx-auto'>
            <div className='flex flex-col bg-card border rounded-xl p-6 shadow-sm'>

                {/* Header Area */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <LinkIcon className="size-4 text-primary" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Generated Link</span>
                    </div>

                    {/* 3. Render the Dynamic Icon */}
                    <PlatformIcon 
                        className="size-5 transition-all duration-300" 
                        style={{ color: iconColor }} 
                    />
                </div>

                {/* The Result Area */}
                <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border min-h-[100px] flex flex-col justify-center break-all">
                        {finalUrl ? (
                            <p className="text-sm font-mono text-foreground leading-relaxed">
                                {finalUrl}
                            </p>
                        ) : (
                            <p className="text-sm font-mono text-muted-foreground italic">
                                Fill in the details to see your link...
                            </p>
                        )}
                    </div>
                </div>

                <Button
                    onClick={handleCopy}
                    disabled={!finalUrl}
                    className={cn(
                        "mt-8 w-full font-bold transition-all",
                        copied && "bg-green-600 hover:bg-green-600"
                    )}
                >
                    {copied ? (
                        <span className="flex items-center gap-2">
                            <Check className="size-4" /> Copied
                        </span>
                    ) : (
                        <span className="flex items-center gap-2 text-white">
                            <Copy className="size-4" /> Copy Smart Link
                        </span>
                    )}
                </Button>
            </div>
        </div>
    )
}