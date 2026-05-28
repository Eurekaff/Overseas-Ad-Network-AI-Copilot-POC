import { Check, Globe2, RefreshCw, ShieldCheck, Sparkles, UserRoundCog } from "lucide-react";
import { useState } from "react";
import { Segment } from "../components/controls/Controls.jsx";
import { copy } from "../domain/copy.js";
import { buildDiagnosisContext } from "../domain/diagnosis/context.js";
import { followMetricData } from "../domain/fixtures.js";
import { AdvertiserPage } from "../features/advertiser/AdvertiserPage.jsx";
import { DeveloperPage } from "../features/developer/DeveloperPage.jsx";
import { FollowupPage } from "../features/followup/FollowupPage.jsx";
import { OperationsPage } from "../features/operations/OperationsPage.jsx";
import { OverviewPage } from "../features/overview/OverviewPage.jsx";
import { requestDiagnosis } from "../services/diagnosisProvider.js";
import { makeNavigation } from "./navigation.js";

function App() {
  const [locale, setLocale] = useState("zh");
  const [role, setRole] = useState("advertiser");
  const [page, setPage] = useState("overview");
  const [task, setTask] = useState("weekly");
  const [providerState, setProviderState] = useState({ status: "idle", label: "" });
  const [reports, setReports] = useState({});
  const [recStatus, setRecStatus] = useState(
    Object.fromEntries(followMetricData.map((item) => [item.id, item.status]))
  );
  const t = copy[locale];

  const nav = makeNavigation(t);

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    if (nextRole === "advertiser") setPage("advertiser");
    if (nextRole === "developer") setPage("developer");
    if (nextRole === "operator") setPage("copilot");
  }

  async function runQwenDiagnosis(scenario, fallback, contextOverrides = {}) {
    setProviderState({ status: "loading", label: t.generation.loading });
    try {
      const report = await requestDiagnosis(buildDiagnosisContext(scenario, locale, contextOverrides));
      setReports((prev) => ({ ...prev, [scenario]: report }));
      setProviderState({ status: "success", label: t.generation.success });
    } catch {
      setReports((prev) => ({ ...prev, [scenario]: fallback }));
      setProviderState({ status: "error", label: t.generation.fallback });
    }
  }

  let content;
  if (page === "advertiser") content = <AdvertiserPage t={t} locale={locale} report={reports.advertiser} runQwenDiagnosis={runQwenDiagnosis} setPage={setPage} setRecStatus={setRecStatus} />;
  else if (page === "developer") content = <DeveloperPage t={t} locale={locale} report={reports.developer} runQwenDiagnosis={runQwenDiagnosis} setPage={setPage} setRecStatus={setRecStatus} />;
  else if (page === "copilot") content = <OperationsPage t={t} locale={locale} task={task} setTask={setTask} report={reports.copilot} runQwenDiagnosis={runQwenDiagnosis} />;
  else if (page === "followup") content = <FollowupPage t={t} locale={locale} recStatus={recStatus} setRecStatus={setRecStatus} />;
  else content = <OverviewPage t={t} locale={locale} setRole={setRole} setPage={setPage} />;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark"><Sparkles size={20} /></div>
          <div>
            <strong>{t.appShort}</strong>
            <span>POC</span>
          </div>
        </div>
        <nav>
          {nav.map(([id, label, Icon]) => (
            <button key={id} data-testid={`nav-${id}`} className={`navItem ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebarNote">
          <ShieldCheck size={16} />
          <span>{t.report.boundaryText}</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{t.appName}</h1>
            <p>{t.subtitle}</p>
          </div>
          <div className="topControls">
            <Segment label={t.role} value={role} onChange={handleRoleChange} options={[
              ["advertiser", t.roles.advertiser],
              ["developer", t.roles.developer],
              ["operator", t.roles.operator]
            ]} />
            <Segment label={t.language} value={locale} onChange={setLocale} options={[
              ["zh", "中文"],
              ["en", "English"]
            ]} />
          </div>
        </header>
        <section className="metaStrip">
          <span><Globe2 size={15} />{t.mockDate}</span>
          <span><UserRoundCog size={15} />{t.roles[role]}</span>
        </section>
        {providerState.status !== "idle" && (
          <div className={`generationNotice ${providerState.status}`} data-testid="generation-notice" data-status={providerState.status} role="status" aria-live="polite">
            {providerState.status === "loading" ? <RefreshCw size={16} className="spinIcon" /> : <Check size={16} />}
            <span>{providerState.label}</span>
          </div>
        )}
        {content}
      </main>
    </div>
  );
}

export default App;
