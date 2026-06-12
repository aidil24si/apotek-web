import React from "react";

export const Command = ({ className = "", children, ...props }) => (
  <div className={`flex h-full w-full flex-col overflow-hidden rounded-md bg-white border text-slate-950 ${className}`} {...props}>
    {children}
  </div>
);

export const CommandInput = React.forwardRef(({ className = "", ...props }, ref) => (
  <div className="flex items-center border-b px-3">
    <span className="mr-2 text-slate-400">🔍</span>
    <input
      ref={ref}
      className={`flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = ({ className = "", ...props }) => (
  <div className={`max-h-[300px] overflow-y-auto overflow-x-hidden p-1 ${className}`} {...props} />
);

export const CommandItem = ({ className = "", ...props }) => (
  <div
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  />
);