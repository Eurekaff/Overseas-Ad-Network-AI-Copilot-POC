# Data Model Draft

## 1. 数据设计原则

模拟数据不追求完整复刻广告系统，而是服务于诊断链路。

数据需要支持：

- 对比当前周期和基准周期。
- 按国家、素材、广告位、广告源拆解。
- 生成明确异常。
- 支持中英文展示。
- 支持建议采纳后的后续观察。

## 2. 通用实体

### LocaleText

用于双语展示。

```json
{
  "zh": "美国",
  "en": "United States"
}
```

### TimeRange

```json
{
  "current": {
    "start": "2026-05-14",
    "end": "2026-05-20"
  },
  "baseline": {
    "start": "2026-05-07",
    "end": "2026-05-13"
  }
}
```

## 3. 广告主侧实体

### Advertiser

```json
{
  "id": "adv_001",
  "name": "Galaxy Quest Studio",
  "industry": "Mobile Game",
  "primaryMarkets": ["US", "BR", "ID"],
  "objective": "Purchase",
  "currency": "USD"
}
```

### Campaign

```json
{
  "id": "camp_001",
  "advertiserId": "adv_001",
  "name": "US RPG User Acquisition",
  "objective": "Purchase",
  "dailyBudget": 5000,
  "targetCountries": ["US"],
  "status": "Active"
}
```

### Creative

```json
{
  "id": "crt_001",
  "campaignId": "camp_001",
  "name": "Boss Battle Reward Video",
  "format": "Rewarded Video",
  "theme": "RPG Battle",
  "status": "Active"
}
```

### AdvertiserMetric

```json
{
  "date": "2026-05-20",
  "campaignId": "camp_001",
  "country": "US",
  "creativeId": "crt_001",
  "spend": 4800,
  "impressions": 1200000,
  "clicks": 36000,
  "conversions": 1224,
  "revenue": 6100,
  "budget": 5000
}
```

派生指标：

- CTR = clicks / impressions
- CVR = conversions / clicks
- CPA = spend / conversions
- ROAS = revenue / spend
- Budget Utilization = spend / budget

## 4. 开发者侧实体

### Developer

```json
{
  "id": "dev_001",
  "name": "Puzzle Island Games",
  "region": "Singapore",
  "currency": "USD"
}
```

### App

```json
{
  "id": "app_001",
  "developerId": "dev_001",
  "name": "Puzzle Island",
  "category": "Casual Game",
  "platform": "Android",
  "primaryMarkets": ["BR", "MX", "ID", "US"]
}
```

### AdPlacement

```json
{
  "id": "plc_001",
  "appId": "app_001",
  "name": "Rewarded Video - Level Complete",
  "format": "Rewarded Video",
  "status": "Active"
}
```

### AdSource

```json
{
  "id": "src_001",
  "name": "Ad Source B",
  "type": "Waterfall",
  "supportedFormats": ["Rewarded Video", "Interstitial"]
}
```

### DeveloperMetric

```json
{
  "date": "2026-05-20",
  "appId": "app_001",
  "placementId": "plc_001",
  "country": "BR",
  "adSourceId": "src_001",
  "requests": 500000,
  "filledRequests": 305000,
  "impressions": 274500,
  "revenue": 1235.25,
  "avgLoadTimeMs": 2300
}
```

派生指标：

- Fill Rate = filledRequests / requests
- Show Rate = impressions / filledRequests
- eCPM = revenue / impressions * 1000

## 5. 诊断实体

### DiagnosisReport

```json
{
  "id": "diag_001",
  "role": "Advertiser",
  "scenarioType": "CPA_INCREASE",
  "entityId": "camp_001",
  "locale": "zh",
  "severity": "High",
  "summary": {},
  "evidence": [],
  "rootCauses": [],
  "recommendations": [],
  "risks": [],
  "watchMetrics": []
}
```

### Recommendation

```json
{
  "id": "rec_001",
  "diagnosisId": "diag_001",
  "priority": "High",
  "actionType": "Manual Check",
  "title": {
    "zh": "检查美国落地页加载速度与转化回传",
    "en": "Check US landing page load speed and conversion postback"
  },
  "status": "Needs Review"
}
```

### FollowUpObservation

```json
{
  "recommendationId": "rec_001",
  "window": "7d",
  "metrics": [
    {
      "name": "CVR",
      "before": 0.034,
      "after": 0.041
    },
    {
      "name": "CPA",
      "before": 3.92,
      "after": 3.31
    }
  ]
}
```

## 6. Mock 数据重点案例

第一版至少需要三组核心数据：

1. 广告主 CPA 上升案例。
2. 开发者巴西激励视频收入下降案例。
3. 内部运营周报生成案例。

数据设计应确保异常明显、证据充分、结论可解释。

