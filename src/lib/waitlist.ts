// Emails are never hardcoded here — this list is real subscriber PII.
// It's injected at runtime via the WAITLIST_EMAILS env var (comma-separated),
// kept out of git and out of the public repo entirely.

function loadWaitlist(): Set<string> {
  const raw = process.env.WAITLIST_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isOnWaitlist(email: string): boolean {
  return loadWaitlist().has(email.trim().toLowerCase());
}
