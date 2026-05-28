import { AlertTriangle, Bot, ClipboardCheck, FileText, MessageSquareText, MonitorCheck, Send, Sparkles, Users } from "lucide-react";
import { FilterPill } from "../../components/controls/Controls.jsx";
import { ActionBar, AiFitPanel, DataTable, PanelTitle, RuleMechanism, ValueMetrics } from "../../components/data-display/DataDisplay.jsx";
import { PageIntro } from "../../components/layout/PageIntro.jsx";
import { makeCopilotReport } from "../../domain/diagnosis/shared.js";
import { operationsQueue } from "../../domain/fixtures.js";

export function OperationsPage({ t, locale, task, setTask, report, runQwenDiagnosis }) {
  const fallback = makeCopilotReport(t);
  const activeReport = report || fallback;
  const tasks = [
    ["weekly", t.copilot.weekly, FileText],
    ["review", t.copilot.review, AlertTriangle],
    ["message", t.copilot.message, Send],
    ["ticket", t.copilot.ticket, ClipboardCheck]
  ];
  const actions = locale === "zh"
    ? ["生成客户周报", "生成对外邮件", "生成会议纪要", "同步跟进记录", "创建客户待办"]
    : ["Generate client report", "Generate external email", "Generate meeting notes", "Sync follow-up", "Create client task"];
  return (
    <div className="pageGrid">
      <PageIntro title={t.copilot.title} desc={t.copilot.desc} />
      <section className="panel span7">
        <PanelTitle icon={Users} title={t.copilot.queue} />
        <DataTable
          columns={locale === "zh" ? ["客户 / 开发者", "重点事项", "影响", "优先级"] : ["Client / Developer", "Priority issue", "Impact", "Priority"]}
          rows={operationsQueue[locale]}
        />
      </section>
      <section className="panel span5 recentResult">
        <PanelTitle icon={MonitorCheck} title={t.copilot.recent} />
        <strong>Galaxy Quest Studio / US RPG User Acquisition</strong>
        <p>{t.copilot.metricText}</p>
        <span className="sourceTag">{locale === "zh" ? "规则已识别 · 等待沟通" : "Rule detected · Pending communication"}</span>
      </section>
      <RuleMechanism t={t} rule={t.copilot.rule} decomposition={t.copilot.decomposition} />
      <section className="panel span4">
        <PanelTitle icon={Bot} title={t.filters.task} />
        <div className="taskList">
          {tasks.map(([id, label, Icon]) => (
            <button className={`taskButton ${task === id ? "active" : ""}`} key={id} onClick={() => setTask(id)}>
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="panel span8">
        <PanelTitle icon={MessageSquareText} title="Context" />
        <div className="copilotInputs">
          <FilterPill label={t.filters.context} value="Galaxy Quest Studio / CPA Diagnosis" />
          <FilterPill label={t.filters.range} value="2026-05-14 - 2026-05-20" />
          <FilterPill label={t.filters.output} value="中文 / English" />
        </div>
        <textarea placeholder={t.copilot.placeholder} />
        <button className="primaryAction" onClick={() => runQwenDiagnosis("copilot", fallback)}><Sparkles size={16} />{t.copilot.generate}</button>
      </section>
      <section className="panel full">
        <PanelTitle icon={FileText} title={t.copilot.draft} />
        <div className="copilotOutput">
          {[
            [t.copilot.profile, activeReport.profile || t.copilot.profileText],
            [t.copilot.metrics, activeReport.metrics || t.copilot.metricText],
            [t.copilot.reasons, activeReport.summary || t.copilot.reasonText],
            [t.copilot.external, activeReport.externalMessage || activeReport.recommendations?.join(" ") || t.copilot.externalText],
            [t.copilot.internal, activeReport.internalNotes || activeReport.causes?.join(" ") || t.copilot.internalText],
            [t.copilot.risk, activeReport.risk || t.copilot.riskText]
          ].map(([label, text]) => (
            <div key={label}>
              <strong>{label}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <ActionBar title={t.report.actions} actions={actions} />
      </section>
      <AiFitPanel t={t} wide />
      <ValueMetrics t={t} locale={locale} />
    </div>
  );
}
