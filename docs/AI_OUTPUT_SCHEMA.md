# AI Output Schema

## 1. 设计目标

AI 输出必须结构化、可验证、可双语渲染，并能支持后续闭环。

不要只返回一段自然语言。

## 2. 通用输出结构

```json
{
  "reportId": "diag_001",
  "locale": "zh",
  "role": "Advertiser",
  "scenarioType": "CPA_INCREASE",
  "severity": "High",
  "executiveSummary": "",
  "metricChanges": [],
  "impactScope": [],
  "evidence": [],
  "possibleCauses": [],
  "recommendations": [],
  "risks": [],
  "watchMetrics": [],
  "externalMessage": "",
  "internalNotes": ""
}
```

## 3. 字段说明

### executiveSummary

一句话说明异常和主要判断。

示例：

近 7 日 CPA 上升 28%，主要由美国市场 CVR 下滑导致，CTR 基本稳定，问题更可能发生在落地页、转化回传或用户匹配环节。

### metricChanges

用于展示关键指标变化。

```json
{
  "metric": "CPA",
  "baseline": 3.05,
  "current": 3.90,
  "changeRate": 0.28,
  "direction": "up",
  "status": "negative"
}
```

### impactScope

用于说明影响范围。

```json
{
  "dimension": "country",
  "value": "US",
  "contribution": 0.68,
  "description": "美国市场贡献了 68% 的 CPA 上升影响"
}
```

### evidence

用于承载可验证证据。

```json
{
  "type": "metric",
  "statement": "CTR remained stable while CVR dropped from 5.1% to 3.4%.",
  "metrics": ["CTR", "CVR"],
  "confidence": "High"
}
```

### possibleCauses

用于列出可能原因。

```json
{
  "title": "Landing page or conversion postback issue",
  "reasoning": "CTR stayed stable, but CVR dropped significantly.",
  "confidence": "Medium",
  "relatedEvidenceIds": ["ev_001"]
}
```

### recommendations

用于列出建议动作。

```json
{
  "id": "rec_001",
  "priority": "High",
  "title": "Check landing page load speed and conversion postback",
  "actionType": "Manual Check",
  "expectedImpact": "Recover CVR and reduce CPA",
  "risk": "Do not change budget before confirming conversion tracking.",
  "status": "Needs Review"
}
```

### watchMetrics

用于后续观察。

```json
{
  "metric": "CVR",
  "window": "24h / 7d",
  "targetDirection": "up",
  "reason": "CVR recovery is the key signal for CPA improvement."
}
```

### externalMessage

用于客户沟通，语气需要稳健，避免过度确定。

### internalNotes

用于内部运营团队，允许包含更直接的风险判断和下一步跟进建议。

## 4. 广告主输出要求

广告主诊断必须包含：

- CPA 变化。
- ROAS 变化。
- CTR / CVR 拆解。
- 影响最大的国家或素材。
- 至少 2 条证据。
- 至少 3 条建议。
- 至少 3 个后续观察指标。

## 5. 开发者输出要求

开发者诊断必须包含：

- 收入变化。
- 请求量变化。
- 填充率变化。
- 展示率变化。
- eCPM 变化。
- 影响最大的国家、广告位或广告源。
- 至少 2 条证据。
- 至少 3 条建议。

## 6. 内部 Copilot 输出要求

内部 Copilot 输出必须包含：

- 客户 / 开发者画像。
- 核心数据变化。
- 异常原因摘要。
- 建议动作。
- 对外沟通话术。
- 内部备注。
- 风险提醒。

## 7. 双语策略

建议 AI provider 根据 locale 生成目标语言报告。

核心指标名可以统一保留英文缩写：

- CTR
- CVR
- CPA
- ROAS
- eCPM

中文报告中保留英文缩写并提供中文解释，英文报告中直接使用业务指标名。

