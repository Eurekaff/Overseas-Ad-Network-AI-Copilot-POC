import { AlertTriangle, Check, ShieldCheck } from "lucide-react";
import { StatusBadge } from "../../components/data-display/DataDisplay.jsx";
import { PageIntro } from "../../components/layout/PageIntro.jsx";
import { followMetricData } from "../../domain/fixtures.js";

export function FollowupPage({ t, locale, recStatus, setRecStatus }) {
  return (
    <div className="pageGrid">
      <PageIntro title={t.followup.title} desc={t.followup.desc} />
      <section className="panel full">
        <div className="followList">
          {followMetricData.map((item) => (
            <div className="followItem" key={item.id}>
              <div className="followHead">
                <div>
                  <span className="sourceTag">{item.source[locale]}</span>
                  <h3>{item.title[locale]}</h3>
                  <p>{item.entity} · {t.followup.owner}: {item.owner} · {t.followup.window}: {item.window}</p>
                </div>
                <StatusBadge status={recStatus[item.id]} t={t} />
              </div>
              <div className="statusActions">
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Accepted" }))}><Check size={15} />{t.followup.markAccepted}</button>
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Needs Review" }))}><ShieldCheck size={15} />{t.followup.markReview}</button>
                <button onClick={() => setRecStatus((prev) => ({ ...prev, [item.id]: "Rejected" }))}><AlertTriangle size={15} />{t.followup.markRejected}</button>
              </div>
              <div className="observationGrid">
                {item.metrics.map(([metric, before, after, result]) => (
                  <div className="observation" key={metric}>
                    <span>{metric}</span>
                    <strong>{`${before} -> ${after}`}</strong>
                    <em className={result === "Improved" ? "good" : "neutral"}>{result === "Improved" ? t.followup.improved : t.followup.monitoring}</em>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
