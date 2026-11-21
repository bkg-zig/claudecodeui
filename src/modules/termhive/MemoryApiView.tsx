import { useCallback, useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

type HealthState =
  | { status: 'loading' }
  | { status: 'ok'; version?: string; uptime?: number; details: Record<string, unknown> }
  | { status: 'error'; message: string };

/**
 * Memory-Gateway-Status als Dashboard-Karte (same origin, kein Redirect):
 * ruft `/memory-api/health` und zeigt Ergebnis im Dashboard-Stil.
 */
export default function MemoryApiView() {
  const [health, setHealth] = useState<HealthState>({ status: 'loading' });

  const load = useCallback(() => {
    setHealth({ status: 'loading' });
    fetch('/memory-api/health')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { status?: string; version?: string; uptime?: number };
        setHealth({ status: 'ok', version: data.version, uptime: data.uptime, details: data });
      })
      .catch((err: unknown) => {
        setHealth({ status: 'error', message: err instanceof Error ? err.message : 'Unbekannter Fehler' });
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="fixed inset-0 overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15">
            <Activity className="h-4 w-4 text-sky-500" />
          </span>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold text-foreground">Memory API</h1>
            <p className="text-xs text-muted-foreground">Gateway-Status (gleiche Origin)</p>
          </div>
          <button
            onClick={load}
            className="ml-auto rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            Aktualisieren
          </button>
        </div>
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          {health.status === 'loading' && (
            <p className="text-sm text-muted-foreground">Wird geprüft …</p>
          )}
          {health.status === 'ok' && (
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-500">
                <CheckCircle2 className="h-4 w-4" /> Erreichbar
              </p>
              {health.version && (
                <p className="text-xs text-muted-foreground">Version: {health.version}</p>
              )}
              {typeof health.uptime === 'number' && (
                <p className="text-xs text-muted-foreground">Uptime: {Math.round(health.uptime)}s</p>
              )}
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer hover:text-foreground">Rohdaten</summary>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-muted/50 p-2">
                  {JSON.stringify(health.details, null, 2)}
                </pre>
              </details>
            </div>
          )}
          {health.status === 'error' && (
            <p className="flex items-center gap-2 text-sm font-medium text-amber-500">
              <AlertTriangle className="h-4 w-4" /> Nicht erreichbar: {health.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
