# POC 工程可维护性标准化重构设计

## 1. 背景与目标

本项目是面向面试展示的海外广告联盟嵌入式 AI 辅助诊断 POC。产品叙事、业务场景与演示路径已经成立，当前改进重点不是增加能力，而是让现有实现具备清晰的维护边界和稳定的验证基线。

当前主要工程问题：

- `src/App.jsx` 同时包含中英文文案、mock 数据、业务计算、状态编排、请求调用、共享组件和五个页面，文件过大且职责混杂。
- `vite.config.js` 同时承载 Vite 配置、Qwen prompt 拼装、返回解析、HTTP 请求与本地代理中间件，AI provider 边界不清晰。
- 项目只有构建脚本，缺少单元测试、lint 约束和关键演示链路的回归检查。
- 诊断规则、provider fallback、建议状态闭环等可观察行为没有自动化保护，拆分代码时容易产生演示回归。

本轮目标是将 POC 整理为可阅读、可测试、可稳定演示的小型 React 项目，并在保持现有业务范围和五分钟演示叙事不变的前提下，提升作为面试演示产品的视觉层级与信息表达质量。

## 2. 范围

### 2.1 包含范围

- 拆分 React 应用壳、页面、共享组件、领域数据与领域计算逻辑。
- 提取前端 AI diagnosis service，统一真实 provider 调用与 mock fallback 行为。
- 从 `vite.config.js` 中提取 Qwen prompt、响应解析、provider 请求和 HTTP 中间件。
- 引入 Vitest，为关键纯函数、provider 边界和关键状态联动提供测试。
- 引入 ESLint，为 React 和 JavaScript 模块提供最低工程约束。
- 通过构建检查与关键页面浏览器冒烟测试验证演示链路。
- 补充 README 中的项目结构与验证命令说明。
- 按用户选定的“明亮运营控制台”概念更新视觉系统与首屏信息组织，使异常、AI 辅助链路和待人工确认更易阅读和讲述。

### 2.2 不包含范围

- 不新增业务页面、功能模块或数据场景。
- 不调整产品定位、默认 mock 业务结论或五分钟演示顺序；允许为更清晰的界面层级调整现有标题、分组和标签的展示顺序。
- 不引入登录、权限、多租户、真实广告数据、真实 SDK 或真实结算。
- 不将 Qwen 从可选增强变为运行 POC 的必需依赖。
- 不引入图片装饰、营销首页内容或与业务无关的视觉模块。
- 不引入路由框架、全局状态框架或完整领域服务架构。

## 3. 已选方案

采用按业务能力切分、保留轻量 React 架构的重构路线。

该路线将当前职责按稳定边界拆开，但保留顶层应用状态协调方式。它足以解决单文件耦合和验证缺失，也避免将一个演示型 POC 过度建设为完整产品架构。

未选择的路线：

- 路由与状态层应用化重构：当前页面数量与交互复杂度不足以证明新增依赖和迁移成本合理。
- 深度领域驱动重构：完整实体、用例和 schema 层会超出本轮维护目标，并削弱 POC 的简洁性。

## 4. 目标架构

### 4.1 前端目录职责

```text
src/
  app/
    App.jsx
    navigation.js
  components/
    controls/
    data-display/
    feedback/
    layout/
  domain/
    copy.js
    fixtures.js
    diagnosis/
      advertiser.js
      developer.js
      context.js
      shared.js
  features/
    overview/
    advertiser/
    developer/
    operations/
    followup/
  services/
    diagnosisProvider.js
  main.jsx
  styles.css
```

各边界职责如下：

- `app/`：应用壳、导航配置、页面选择、角色与语言状态、全局 provider 通知和建议状态协调。
- `components/`：被多个业务页面复用的展示或输入组件，不持有业务规则。
- `domain/`：中英文文案、mock fixtures 与纯函数诊断逻辑；不调用网络，不依赖 React。
- `features/`：各场景页面组合和局部筛选状态，仅使用 domain 输出渲染业务视图。
- `services/`：浏览器端调用接口的适配层；页面不直接使用 `fetch`。

`src/styles.css` 首轮保持单文件，以减少结构迁移成本，但允许系统性更新 token、布局、组件外观和响应式规则以落实获选视觉方向；不将 CSS 文件拆分本身作为本轮验收条件。

### 4.2 获选视觉方向：明亮运营控制台

用户在视觉选择画布中选定 A 方案，概念参考图为：

```text
/Users/eureka/.codex/generated_images/019e691e-d619-7a10-ace9-30a972b442cd/ig_0600368c6b99789f016a16d6b7cb148196830ecdd6374a7419.png
```

该方向的实施约束：

- 采用暖白主画布、深森林绿侧栏、克制的酸橙选中态和深青色数据强调色。
- 去除当前页面的背景网格噪声，使用细边框、低阴影、较充分留白建立轻盈且专业的 SaaS 质感。
- 顶部区域保持产品标题、角色切换、语言切换与模拟日期，但压缩标题占幅，提高首屏信息密度。
- Overview 首屏优先呈现 AI 辅助诊断摘要、四项 KPI、嵌入式辅助链路和待人工确认内容；现有三类流程、价值衡量和人工边界继续存在，不凭概念图增加新业务数据。
- Advertiser、Developer、Operations 与 Follow-up 页面沿用同一视觉 token 和卡片/表格/操作样式，使五分钟演示过程中视觉语言一致。
- 所有真实交互文字、表格、指标与图表由 React/CSS 渲染；概念图仅作视觉规范参考，不作为界面图片投放到产品中。

### 4.3 本地 Qwen 代理目录职责

```text
server/
  qwen/
    prompt.js
    parser.js
    provider.js
    middleware.js
vite.config.js
```

- `prompt.js`：根据诊断上下文构造受约束的提示词，明确 JSON 输出结构及人工确认边界。
- `parser.js`：解析严格 JSON 或被代码围栏包裹的 JSON，拒绝不存在有效报告对象的输出。
- `provider.js`：封装 DashScope compatible endpoint 请求、鉴权、模型参数与错误传播。
- `middleware.js`：读取 HTTP 输入、调用 provider，并把成功或失败映射为本地 API 响应。
- `vite.config.js`：仅加载环境变量并将中间件挂载到开发服务器。

## 5. 数据与交互流

### 5.1 默认展示

页面从 `domain/fixtures.js` 与 `domain/copy.js` 读取静态展示基础数据。广告主和开发者页面将当前筛选条件交给相应的纯函数诊断模块，生成：

- 指标卡与趋势数据。
- 维度拆解表。
- 规则识别与指标拆解说明。
- 默认 mock 报告。
- 可发送给 provider 的结构化诊断上下文。

### 5.2 AI 生成与 fallback

用户触发 AI 生成时：

1. feature 页面将 scenario、fallback 报告和结构化上下文传给顶层应用协调函数。
2. 顶层通过 `services/diagnosisProvider.js` 请求 `/api/qwen-diagnosis`。
3. 成功时保存接口返回的结构化报告，并展示成功提示。
4. 请求失败、接口不可用或未配置密钥时保存原有 mock fallback 报告，并展示 fallback 提示。

此流程必须保持当前行为：演示不依赖真实 Qwen 成功，也不得在失败时中断页面使用。

### 5.3 闭环追踪

广告主与开发者诊断页中的“标记建议已采纳”继续更新建议状态并跳转至闭环追踪页。此次重构仅移动状态与视图边界，不改变现有模拟观察数据和状态选项。

## 6. 公共接口与约束

### 6.1 前端 diagnosis provider

服务层公开单一能力：

```js
requestDiagnosis(context)
```

输入为 domain 构造的上下文对象；成功返回报告对象；失败抛出可由应用壳捕获的错误。fallback 决策仍由应用协调层持有，因为 fallback 是产品交互策略，不是网络服务职责。

### 6.2 Qwen provider

本地代理 provider 接受：

```js
generateDiagnosis({ context, apiKey, baseUrl, model, fetchImpl })
```

其中 `fetchImpl` 可在测试中注入。provider 返回已解析的结构化报告以及模型元信息；配置缺失或上游响应无效时抛出明确错误，由 middleware 转换为 HTTP 响应。

### 6.3 AI 报告最小结构

接口成功返回的报告必须包含当前界面实际消费的字段：

```js
{
  summary: "string",
  evidence: ["string"],
  causes: ["string"],
  recommendations: ["string"],
  risk: "string",
  watch: ["string"]
}
```

运营场景可继续使用页面消费的补充字段。首轮不引入新的 schema 库；通过解析校验与测试固定当前契约，避免增加 POC 依赖负担。

## 7. 测试与质量基线

### 7.1 Vitest 单元与关键交互测试

Vitest 覆盖下列可观察行为：

- 诊断公共计算：日期周期、趋势生成、风险等级判断。
- 广告主默认案例：CPA、CVR、ROAS 与规则结论保持当前演示数值和结论。
- 开发者默认案例：Revenue、Fill Rate 与规则结论保持当前演示数值和结论。
- diagnosis context：三个 scenario 的 provider 输入包含必要证据和角色信息。
- Qwen parser：可解析合法 JSON 与 fenced JSON，拒绝无效响应。
- Qwen prompt：包含证据绑定、结构化 JSON 和禁止自动执行高风险动作约束。
- 关键 UI 联动：provider 请求失败时显示 fallback；采纳建议后到达闭环追踪并显示已采纳状态。

测试优先锁住行为，再进行生产模块迁移，确保重构不是依靠手工记忆保持兼容。

### 7.2 ESLint

引入最小 JavaScript/React lint 配置，覆盖：

- JSX 与 React hooks 规则。
- 未使用变量与明显错误模式。
- 项目源代码、服务端 Qwen 模块和测试文件。

本轮不进行与 lint 无关的风格格式化，也不引入额外 formatter 迁移。

### 7.3 构建与浏览器冒烟

交付前必须通过：

```bash
npm run lint
npm run test
npm run build
```

浏览器冒烟验证以下关键路径：

1. 流程概览页能进入广告主诊断。
2. 未提供真实 Qwen 成功条件时，生成诊断可回退到 mock 并出现 fallback 提示。
3. 广告主建议可标记采纳并跳转到闭环追踪。
4. 语言可切换为英文且主要页面正常展示。
5. 内部运营页面仍可展示报告辅助输出。
6. 桌面首屏与窄屏下关键操作没有溢出或不可读问题，且渲染结果与明亮运营控制台概念在色彩、层级、容器与间距上保持一致。

## 8. 风险与处理方式

### 8.1 双语与默认场景回归

风险：拆分文案和 fixtures 时漏迁移字段，导致某个语言或默认报告缺内容。

处理：默认案例测试固定核心数据与报告字段，浏览器冒烟覆盖中英文切换。

### 8.2 领域计算变化

风险：移动诊断函数时改变数值计算或筛选条件影响逻辑，破坏演示话术。

处理：在迁移前为广告主和开发者默认案例补失败测试，再按原行为抽取模块。

### 8.3 Provider fallback 变化

风险：拆分服务层后，API 失败不再正确落到 mock 报告，现场演示依赖网络。

处理：将 fallback 保持为应用层策略，并以关键交互测试与浏览器无密钥场景验证。

### 8.4 过度重构

风险：为未来可能需求引入路由、状态库、schema 框架或大规模样式改写，扩大风险和时间。

处理：严格限定本轮为职责拆分和工程验证基线；新增依赖仅服务测试、lint 或当前 provider 隔离。

### 8.5 视觉改造改变产品叙事

风险：概念图包含较丰富的信息呈现，直接照搬可能引入新的队列数据、指标或产品宣称。

处理：只复用概念中的视觉系统与内容布局原则，页面展示继续使用现有业务文案、fixtures 与闭环数据；通过设计对照与交互冒烟同时检查视觉质量和范围边界。

## 9. 验收标准

重构完成的判定条件：

- 页面业务范围、五分钟演示链路、默认业务数据和 fallback 交互与当前 POC 保持一致。
- 页面实现采用获选“明亮运营控制台”方向，完成首屏层级、统一 token、表格/卡片/操作态和响应式可读性的提升。
- `App.jsx` 不再承载文案、mock fixtures、领域计算、页面实现和直接网络请求的混合职责。
- `vite.config.js` 不再包含 prompt、响应解析和 provider 业务实现。
- 广告主、开发者和 provider 核心行为具备自动化测试。
- 项目提供可执行的 lint、test、build 脚本并全部通过。
- 关键演示流程经浏览器冒烟及获选概念图对照验证通过。
- README 清楚说明新的项目结构、Qwen 配置边界和验证命令。

## 10. 交付方式

用户批准本设计后，下一步将形成逐任务实施计划。实施按测试优先方式进行：先锁定当前确定性行为，再迁移和拆分模块，最后执行完整质量基线与浏览器验证。
