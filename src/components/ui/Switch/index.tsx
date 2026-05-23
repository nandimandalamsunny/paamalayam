import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cn } from "../../../lib/utils"
import "./Switch.css"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3 focus-visible:ring-app-primary/30 data-[size=default]:h-[22px] data-[size=default]:w-[38px] data-[size=sm]:h-[16px] data-[size=sm]:w-[28px] data-checked:bg-app-primary data-unchecked:bg-app-primary/20 data-disabled:cursor-not-allowed data-disabled:opacity-50 cursor-pointer",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-app-card shadow-sm transition-transform group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-3.5 group-data-[size=default]/switch:data-checked:translate-x-[16px] group-data-[size=sm]/switch:data-checked:translate-x-[12px] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
