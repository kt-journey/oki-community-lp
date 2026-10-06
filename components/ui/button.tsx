import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium tracking-wide transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[#9c4e32] text-white hover:bg-[#b05c3d] active:translate-y-[1px] focus-visible:ring-[#9c4e32]/55 focus-visible:ring-offset-white",
        line:
          "rounded-full bg-[#06C755] text-white hover:bg-[#05b34c] active:translate-y-[1px] focus-visible:ring-[#06C755]/60 focus-visible:ring-offset-white",
        ghost:
          "text-[#1c2430] hover:bg-black/5 focus-visible:ring-slate-400/50 focus-visible:ring-offset-white",
        outline:
          "border border-white bg-transparent text-white hover:bg-white/10 active:translate-y-[1px] focus-visible:ring-white/50 focus-visible:ring-offset-slate-900",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
