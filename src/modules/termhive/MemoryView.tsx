import { useCallback, useState } from 'react';
import { Brain, ExternalLink, RotateCw } from 'lucide-react';

const MEMORY_URL = 'https://mem.gitspit.com';

/**
 * Memory-Panel im Dashboard-Design: eingebettet statt externer Weiterleitung.
 */
export default function MemoryView() {
  const [frameKey, setFrameKey] = useState(0);
  const reload = useCallback(() => setFrameKey((k) => k + 1), []);

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="flex h-12 flex-none items-center gap-2.5 border-b border-border px-3 md:px-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15">
          <Brain className="h-4 w-4 text-violet-500" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <h1 className="truncate text-sm font-semibold text-foreground">Memory</h1>
          <p className="truncate text-xs text-muted-foreground">Team-Memory, Skills und Wissen</p>
        </div>
        <button
          onClick={reload}
          title="Neu laden"
          aria-label="Memory neu laden"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <RotateCw className="h-4 w-4" />
        </button>
        <a
          href={MEMORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="In neuem Tab öffnen"
          aria-label="Memory in neuem Tab öffnen"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </header>
      <iframe
        key={frameKey}
        src={MEMORY_URL}
        title="Memory"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  );
}
