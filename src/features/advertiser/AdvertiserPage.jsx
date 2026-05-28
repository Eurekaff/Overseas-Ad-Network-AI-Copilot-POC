import { useState } from "react";
import { BarChart3, LineChart, MonitorCheck, Sparkles } from "lucide-react";
import { DateField, SelectField } from "../../components/controls/Controls.jsx";
import { AiFitPanel, DataTable, DiagnosisReport, MetricGrid, MultiLineChart, PanelTitle, RuleMechanism, ValueMetrics } from "../../components/data-display/DataDisplay.jsx";
import { PageIntro } from "../../components/layout/PageIntro.jsx";
import { makeAdvertiserView } from "../../domain/diagnosis/advertiser.js";

export function AdvertiserPage({ t, locale, report, runQwenDiagnosis, setPage, setRecStatus }) {
  const [filters, setFilters] = useState({
    account: "Galaxy Quest Studio",
    campaign: "US RPG User Acquisition",
    country: "United States",
    issue: "CPA increase / ROAS decline",
    startDate: "2026-05-14",
    endDate: "2026-05-20",
    question: locale === "zh" ? "为什么 CPA 上升？请按地区、素材和转化链路拆解。" : "Why did CPA increase? Break it down by country, creative, and conversion path."
  });
  const view = makeAdvertiserView(filters, t, locale);
  const fallback = view.report;
  const activeReport = report || fallback;
  const actions = locale === "zh"
    ? ["生成客户解释", "创建优化待办", "加入周报", "标记建议已采纳", "继续观察"]
    : ["Generate client explanation", "Create optimization task", "Add to weekly report", "Mark accepted", "Continue monitoring"];
  return (
    <div className="pageGrid">
      <PageIntro title={t.advertiser.title} desc={t.advertiser.desc} />
      <section className="controlPanel full">
        <SelectField label={t.filters.account} value={filters.account} options={["Galaxy Quest Studio", "Nova Play Labs", "Dragon Forge Games"]} onChange={(account) => setFilters((prev) => ({ ...prev, account }))} />
        <SelectField label={t.filters.campaign} value={filters.campaign} options={["US RPG User Acquisition", "BR Casual Purchase", "ID Action Retargeting"]} onChange={(campaign) => setFilters((prev) => ({ ...prev, campaign }))} />
        <SelectField label={t.filters.country} value={filters.country} options={["United States", "Brazil", "Indonesia", "Mexico"]} onChange={(country) => setFilters((prev) => ({ ...prev, country }))} />
        <SelectField label={t.filters.issue} value={filters.issue} options={["CPA increase / ROAS decline", "Budget underdelivery", "Creative fatigue", "Conversion anomaly"]} onChange={(issue) => setFilters((prev) => ({ ...prev, issue }))} />
        <DateField label="Start" value={filters.startDate} onChange={(startDate) => setFilters((prev) => ({ ...prev, startDate }))} />
        <DateField label="End" value={filters.endDate} onChange={(endDate) => setFilters((prev) => ({ ...prev, endDate }))} />
        <div className="chatInput">
          <label>{locale === "zh" ? "自定义问题" : "Custom question"}</label>
          <textarea value={filters.question} onChange={(event) => setFilters((prev) => ({ ...prev, question: event.target.value }))} />
        </div>
        <button className="primaryAction" data-testid="run-diagnosis" onClick={() => runQwenDiagnosis("advertiser", fallback, view.context)}><Sparkles size={16} />{t.advertiser.run}</button>
      </section>
      <MetricGrid metrics={view.metrics} />
      <section className="panel span7">
        <PanelTitle icon={LineChart} title={t.advertiser.trends} />
        <MultiLineChart data={view.series} lines={[
          ["cpa", "CPA", "#c2410c"],
          ["roas", "ROAS", "#047857"],
          ["cvr", "CVR", "#1d4ed8"]
        ]} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={BarChart3} title={t.advertiser.country} />
        <DataTable columns={["Country", "CPA", "CVR", "Impact", "Risk"]} rows={view.countryRows} />
      </section>
      <section className="panel span5">
        <PanelTitle icon={MonitorCheck} title={t.advertiser.creative} />
        <DataTable columns={["Creative", "CTR", "CVR", "CPA", "Risk"]} rows={view.creativeRows} />
      </section>
      <RuleMechanism t={t} rule={view.rule} decomposition={view.decomposition} />
      <DiagnosisReport
        title={t.advertiser.report}
        summary={activeReport.summary}
        causes={activeReport.causes}
        recommendations={activeReport.recommendations}
        evidence={activeReport.evidence}
        watch={activeReport.watch}
        risk={activeReport.risk}
        t={t}
        actions={actions}
        onAccept={() => {
          setRecStatus((prev) => ({ ...prev, "adv-rec-1": "Accepted" }));
          setPage("followup");
        }}
      />
      <AiFitPanel t={t} />
      <ValueMetrics t={t} locale={locale} />
    </div>
  );
}
