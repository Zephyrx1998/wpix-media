import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-[var(--glass-shadow)] hover:shadow-[var(--glass-shadow-hover)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary/30 text-primary bg-[hsl(var(--glass-bg))] backdrop-blur-md hover:bg-primary hover:text-primary-foreground shadow-[var(--glass-shadow)] hover:shadow-[var(--glass-shadow-hover)] hover:-translate-y-0.5",
        secondary:
          "bg-[hsl(var(--glass-bg))] backdrop-blur-md text-secondary-foreground border border-[hsl(var(--glass-border))] hover:bg-[hsl(var(--glass-highlight))] shadow-[var(--glass-shadow)]",
        ghost: "hover:bg-[hsl(var(--glass-bg))] hover:backdrop-blur-md hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-[var(--glass-shadow-hover)] hover:shadow-[0_20px_60px_-12px_hsl(var(--primary)/0.35)] transform hover:-translate-y-1",
        glass: "bg-[hsl(var(--glass-bg))] backdrop-blur-md border border-[hsl(var(--glass-border))] text-foreground hover:bg-[hsl(var(--glass-highlight))] shadow-[var(--glass-shadow),var(--glass-inset)] hover:shadow-[var(--glass-shadow-hover),var(--glass-inset)] hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }