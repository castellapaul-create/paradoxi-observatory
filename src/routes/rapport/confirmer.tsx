import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { PdxStyles } from "@/components/PdxStyles";
import paradoxiLogoLight from "@/assets/paradoxi-logo-light.png";
import { confirmReportAccess } from "@/lib/api/report.functions";

export const Route = createFileRoute("/rapport/confirmer")({
  validateSearch: z.object({ token: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Confirmation — PARADOXI Observatory" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfirmerPage,
});

type Status = "loading" | "success" | "error";

function ConfirmerPage() {
  const { token } = Route.useSearch();
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (!token) {
      setStatus("error");
      setError("Lien invalide.");
      return;
    }

    confirmReportAccess({ data: { token } })
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      });
  }, [token]);

  return (
    <div className="pdx2">
      <PdxStyles />
      <header className="nav">
        <div className="nav-inner">
          <img className="logo" src={paradoxiLogoLight} alt="PARADOXI Observatory" />
        </div>
      </header>

      <main className="wrap" style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 560, textAlign: "center" }}>
        {status === "loading" && (
          <p style={{ fontSize: 16, color: "var(--text-muted)" }}>Confirmation en cours…</p>
        )}

        {status === "success" && (
          <>
            <div
              style={{
                width: 64, height: 64, margin: "0 auto 24px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--accent-soft)", color: "var(--accent)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
            </div>
            <span className="price-badge" style={{ margin: "0 auto 16px" }}>Email confirmé</span>
            <h1 style={{ fontSize: "clamp(1.8rem,3.2vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.015em", margin: "0 0 16px" }}>
              Votre rapport arrive.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 420, margin: "0 auto" }}>
              Vérifiez votre boîte mail dans les prochaines minutes (et vos spams, au cas où).
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 style={{ fontSize: "clamp(1.6rem,2.8vw,2rem)", fontWeight: 800, letterSpacing: "-0.015em", margin: "0 0 16px" }}>
              Ce lien ne fonctionne pas.
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 420, margin: "0 auto" }}>
              {error || "Une erreur est survenue."} Refaites la demande depuis la page rapport.
            </p>
          </>
        )}
      </main>
    </div>
  );
}
