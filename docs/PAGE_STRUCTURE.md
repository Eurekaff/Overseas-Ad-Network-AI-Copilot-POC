# Page Structure

## 1. 产品信息架构

第一版建议采用左侧导航 + 顶部角色与语言切换的 B2B SaaS 结构。

核心页面：

- Overview
- Advertiser Diagnosis
- Developer Diagnosis
- Operations Workbench + AI Report Assistance
- Follow-up Tracker

## 2. 全局组件

### 顶部栏

包含：

- 产品名称。
- 当前角色切换。
- 中英文语言切换。
- 当前模拟数据日期。

角色：

- Advertiser
- Developer
- Operator

语言：

- 中文
- English

### 左侧导航

包含：

- Overview
- Advertiser Diagnosis
- Developer Diagnosis
- Operations Workbench + AI Report Assistance
- Follow-up Tracker

## 3. Overview

目标：在 30 秒内让面试官理解产品定位和业务闭环。

页面内容：

- 三类用户入口。
- 今日异常概览。
- AI 诊断任务数量。
- 待人工确认建议数量。
- 后续观察中的指标数量。
- 一条闭环流程展示：异常发现 -> 诊断 -> 建议 -> 人工确认 -> 观察。

避免做成营销首页，应保持数据平台风格。

## 4. Advertiser Dashboard + AI Anomaly Explanation

目标：演示广告主 CPA 上升 / ROAS 下降诊断。

页面结构：

1. 筛选区
   - 广告账户
   - 广告计划
   - 时间范围
   - 问题类型

2. 核心指标卡
   - Spend
   - CTR
   - CVR
   - CPA
   - ROAS
   - Budget Utilization

3. 趋势图
   - CPA trend
   - ROAS trend
   - CTR / CVR trend

4. 维度拆解
   - Country performance
   - Creative performance

5. AI 诊断报告
   - 异常摘要
   - 关键证据
   - 可能原因
   - 建议动作
   - 风险提示
   - 后续观察指标

6. 人工确认区
   - 采纳
   - 暂不采纳
   - 需要人工复核

## 5. Developer Revenue Dashboard + AI Variance Analysis

目标：演示开发者激励视频广告收入下降诊断。

页面结构：

1. 筛选区
   - App
   - 广告位
   - 国家 / 地区
   - 广告源
   - 时间范围

2. 核心指标卡
   - Requests
   - Fill Rate
   - Show Rate
   - eCPM
   - Revenue
   - Load Time

3. 趋势图
   - Revenue trend
   - Fill Rate trend
   - eCPM trend

4. 维度拆解
   - Country performance
   - Ad source performance
   - Placement performance

5. AI 诊断报告
   - 收入下降原因
   - 影响范围
   - 指标拆解
   - 配置建议
   - 风险提示
   - 后续观察指标

6. 人工确认区
   - 采纳
   - 暂不采纳
   - 需要人工复核

## 6. Operations Workbench + AI Report Assistance

目标：演示内部团队提效，不做成单纯聊天框。

页面结构：

1. 任务模板区
   - 生成客户周报
   - 生成异常复盘
   - 生成对外沟通话术
   - 总结工单并给出处理建议

2. 上下文选择区
   - 客户 / 开发者
   - 关联诊断报告
   - 时间范围
   - 输出语言

3. 自由输入区
   - 支持补充问题或特殊要求。
   - 作为辅助入口，不作为主入口。

4. 输出区
   - 客户画像
   - 核心数据变化
   - 异常原因
   - 建议动作
   - 对外话术
   - 内部备注
   - 风险提醒

## 7. Follow-up Tracker

目标：展示产品闭环结果。

页面结构：

1. 建议列表
   - 建议标题
   - 来源模块
   - 优先级
   - 状态
   - 负责人
   - 创建时间

2. 后续观察
   - 24h 指标变化
   - 7d 指标变化
   - 是否改善

3. 结果摘要
   - 已采纳建议数量
   - 改善中的指标数量
   - 仍需复核的问题数量

## 8. 5 分钟演示重点

页面不应追求功能数量，而应让演示路径非常顺：

Flow Overview -> Advertiser Dashboard + AI Anomaly Explanation -> Follow-up -> Developer Revenue Dashboard + AI Variance Analysis -> Operations Workbench + AI Report Assistance -> Value Metrics。
