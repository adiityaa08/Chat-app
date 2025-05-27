"use client";;
import { cn } from "../../lib/utility";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-black backdrop-blur-sm text-slate-100 dark:bg-black dark:text-white",
          className
        )}
        {...props}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              '--aurora': 'repeating-linear-gradient(100deg, #009e80 10%, #2288aa 15%, #7042c5 20%, #aa44cc 25%, #007b66 30%)',

                '--dark-gradient': 'repeating-linear-gradient(100deg, #000000 0%, #0a0a0a 7%, transparent 10%, transparent 12%, #000000 16%)',

                '--white-gradient': 'repeating-linear-gradient(100deg, #eeeeee 0%, #eeeeee 7%, transparent 10%, transparent 12%, #eeeeee 16%)',

                '--blue-300': '#2288aa',     // Deeper cyan-blue
                '--blue-400': '#1e90ff',     // Darker sky blue
                '--blue-500': '#007acc',     // Deep vivid blue

                '--indigo-300': '#7042c5',   // Aurora indigo-violet
                '--violet-200': '#aa44cc',   // Purple with a magenta tint

                '--black': '#000000',
                '--white': '#ffffff',
                '--transparent': 'transparent'

            }
          }>
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}></div>
        </div>
        {children}
      </div>
    </main>
  );
};
