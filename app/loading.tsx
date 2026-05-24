export default function Loading() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-gold animate-pulse" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold animate-pulse">
            Legends Series
          </span>
          <span className="w-8 h-px bg-gold animate-pulse" />
        </div>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold/60"
              style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
