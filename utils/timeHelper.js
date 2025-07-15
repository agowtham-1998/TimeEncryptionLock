/**
 * How many milliseconds until the next time day === hour24?
 * Returns 0 if we're already at an unlocked moment.
 */

export function msUntilNextUnlock(now = new Date()) {
  // If already unlocked, diff = 0
  if (now.getDate() === now.getHours()) return 0;

  // Clone and round to nearest full hour
  const next = new Date(now);
  next.setMinutes(0, 0, 0);

  // Walk forward hour‑by‑hour until day == hour
  while (true) {
    next.setHours(next.getHours() + 1);

    // If we've rolled into next month/year, JS handles overflow automatically
    if (next.getDate() === next.getHours()) {
      return next.getTime() - now.getTime();
    }
  }
}
