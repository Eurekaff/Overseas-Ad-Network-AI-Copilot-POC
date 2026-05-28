import { useState } from "react";
import { BarChart3, LineChart, Sparkles } from "lucide-react";
import { DateField, SelectField } from "../../components/controls/Controls.jsx";
import { AiFitPanel, DataTable, DiagnosisReport, MetricGrid, MultiLineChart, PanelTitle, RuleMechanism, ValueMetrics } from "../../components/data-display/DataDisplay.jsx";
import { PageIntro } from "../../components/layout/PageIntro.jsx";
import { makeDeveloperView } from "../../domain/diagnosis/developer.js";

export function DeveloperPage({ t, locale, report, runQwenDiagnosis, setPage, setRecStatus }) {
  const [filters, setFilters] = useState({
    app: "Puzzle Island",
    placement: "Rewarded Video - Level Complete",
    country: "Brazil",
    source: "All Sources",
    startDate: "2026-05-20",
    endDate: "2026-05-20",
    question: locale === "zh" ? "为什么激励视频收入下降？请按请求量、填充率、展示率和 eCPM 拆解。" : "Why did rewarded video revenue decline? Break it down by requests, fill rate, show rate, and eCPM."
  });
  const view = makeDeveloperView(filters, t, locale);
  const fallback = view.report;
  const activeReport = report || fallback;
  const actions = locale === "zh"
    ? ["生成开发者沟通话术", "创建排查清单", "生成技术支持工单", "标记建议已采纳", "观察未来 24 小时"]
    : ["Generate developer message", "Create investigation checklist", "Create support ticket", "Mark accepted", "Monitor next 24 hours"];
  return (
    <div className="pageGrid">
      <PageIntro title={t.developer.title} desc={t.developer.desc} />
      <section className="controlPanel full">
        <SelectField label={t.filters.app} value={filters.app} options={["Puzzle Island", "Merge Chef", "Sky Runner"]} onChange={(app) => setFilters((prev) => ({ ...prev, app }))} />
        <SelectField label={t.filters.placement} value={filters.placement} options={["Rewarded Video - Level Complete", "Interstitial - Game Over", "Rewarded Video - Daily Bonus"]} onChange={(placement) => setFilters((prev) => ({ ...prev, placement }))} />
        <SelectField label={t.filters.country} value={filters.country} options={["Brazil", "Mexico", "Indonesia", "United States"]} onChange={(country) => setFilters((prev) => ({ ...prev, country }))} />
        <SelectField label={t.filters.source} value={filters.source} options={["All Sources", "Ad Source A", "Ad Source B", "Ad Source C"]} onChange={(source) => setFilters((prev) => ({ ...prev, source }))} />
        <DateField label="Start" value={filters.startDate} onChange={(startDate) => setFilters((prev) => ({ ...prev, startDate }))} />
        <DateField label="End" value={filters.endDate} onChange={(endDate) => setFilters((prev) => ({ ...prev, endDate }))} />
        <div className="chatInput">
          <label>{locale === "zh" ? "自定义问题" : "Custom question"}</label>
          <textarea value={filters.question} onChange={(event) => setFilters((prev) => ({ ...prev, question: event.target.value }))} />
        </div>
        <button className="primaryAction" data-testid="run-diagnosis" onClick={() => runQwenDiagnosis("developer", fallback, view.context)}><Sparkles size={16} />{t.developer.run}</button>
      </section>
      <MetricGrid metrics={view.metrics} />
      <section className="panel span7">
        <PanelTitle icon={LineChart} title={t.developer.trends} />
        <MultiLineChart data={view.series} lines={[
          ["revenue", "Revenue", "#0f766e"],
          ["fill", "Fill Rate", "#c2410c"],
          ["ecpm", "eCPM", "#1d4ed8"]
        ]} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={BarChart3} title={t.developer.sources} />
        <DataTable columns={["Ad Source", "Fill Rate", "eCPM", "Revenue", "Impact"]} rows={view.sourceRows} />
      </section>
      <RuleMechanism t={t} rule={view.rule} decomposition={view.decomposition} />
      <DiagnosisReport
        title={t.developer.report}
        summary={activeReport.summary}
        causes={activeReport.causes}
        recommendations={activeReport.recommendations}
        evidence={activeReport.evidence}
        watch={activeReport.watch}
        risk={activeReport.risk}
        t={t}
        actions={actions}
        onAccept={() => {
          setRecStatus((prev) => ({ ...prev, "dev-rec-1": "Accepted" }));
          setPage("followup");
        }}
      />
      <AiFitPanel t={t} />
      <ValueMetrics t={t} locale={locale} />
    </div>
  );
}
