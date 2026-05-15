"use client"

import React, { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

// 1. Context setup
const DropdownContext = createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) throw new Error("Dropdown sub-components must be wrapped in <DropdownMenu />")
  return context
}

// 2. Main Wrapper
export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

// 3. Clean Trigger
interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function DropdownMenuTrigger({ children, className, asChild, ...props }: TriggerProps) {
  const { isOpen, setIsOpen } = useDropdown()

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleToggle,
      "aria-expanded": isOpen,
    })
  }

  return (
    <button type="button" onClick={handleToggle} className={cn("cursor-pointer", className)} {...props}>
      {children}
    </button>
  )
}

// 4. Dropdown Menu Content Panel + Overlay Wrapper
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end"
}

export function DropdownMenuContent({ children, className, align = "start", ...props }: ContentProps) {
  const { isOpen, setIsOpen } = useDropdown()

  if (!isOpen) return null

  return (
    <>
      {/* 
        This is the absolute full-screen invisible backdrop overlay.
        When clicked, it directly closes the menu without global document listeners.
      */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm cursor-default" 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(false)
        }}
      />

      {/* The actual dropdown items panel */}
      <div
        className={cn(
          "absolute mt-2 min-w-[12rem] rounded-md border border-white/10 bg-background p-1 text-popover-foreground shadow-lg z-50 animate-in fade-in-50 duration-100",
          align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}

// 5. Clickable Sub-Items
interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export function DropdownMenuItem({ children, className, disabled, onClick, ...props }: ItemProps) {
  const { setIsOpen } = useDropdown()

  return (
    <div
      onClick={(e) => {
        if (disabled) return
        if (onClick) onClick(e)
        setIsOpen(false)
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-white/5",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const DropdownMenuLabel = ({ children, className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-2 py-1.5 text-sm font-semibold text-muted-foreground/80", className)}>{children}</div>
)

export const DropdownMenuSeparator = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("-mx-1 my-1 h-px bg-white/10", className)} />
)