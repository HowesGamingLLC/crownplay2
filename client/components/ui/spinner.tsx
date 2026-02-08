import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-amber-400 animate-spin"></div>
      </div>
    </div>
  );
}
