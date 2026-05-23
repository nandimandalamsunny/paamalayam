import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cn } from "../../../lib/utils"
import "./Slider.css"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [value !== undefined ? value : min],
    [value, defaultValue, min]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value !== undefined ? (Array.isArray(value) ? value : [value]) : undefined}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-horizontal:h-4 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative grow overflow-hidden rounded-full bg-app-primary/10 data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5 cursor-pointer"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-app-primary select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="relative block size-4.5 shrink-0 rounded-full border-2 border-app-primary bg-app-card shadow-sm cursor-grab active:cursor-grabbing transition-[color,box-shadow] select-none focus-visible:ring-3 focus-visible:ring-app-primary/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
