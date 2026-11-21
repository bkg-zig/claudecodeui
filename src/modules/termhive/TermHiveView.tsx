import { useCallback, useState } from 'react';
import { ExternalLink, RotateCw, TerminalSquare } from 'lucide-react';

const TERMHIVE_URL = 'https://hive.gitspit.com';

/**
 * TermHive im Dashboard-Design: eigene Ansicht mit Kopfzeile (Titel, Neu laden,
 * extern öffnen) und eingebettetem TermHive (Multi-CLI-Sessions) als iframe.
 * Kein Redirect, keine neue Registerkarte – alles bleibt im gleichen Dashboard.
 */
export default function TermHiveView() {
  const [frameKey, setFrameKey] = useState(0);
  const reload = useCallback(() => setFrameKey((k) => k + 1), []);

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="flex h-12 flex-none items-center gap-2.5 border-b border-border px-3 md:px-4">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
          <TerminalSquare className="h-4 w-4 text-emerald-500" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <h1 className="truncate text-sm font-semibold text-foreground">TermHive</h1>
          <p className="truncate text-xs text-muted-foreground">Mehrere CLI-Sessions parallel steuern</p>
        </div>
        <button
          onClick={reload}
          title="Neu laden"
          aria-label="TermHive neu laden"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <RotateCw className="h-4 w-4" />
        </button>
        <a
          href={TERMHIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="In neuem Tab öffnen"
          aria-label="TermHive in neuem Tab öffnen"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </header>
      <iframe
        key={frameKey}
        src={TERMHIVE_URL}
        title="TermHive"
        className="min-h-0 w-full flex-1 border-0"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}
