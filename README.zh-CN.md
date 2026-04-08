# anti-degradation-skill

[English](./README.md) | [中文](./README.zh-CN.md)

一个专门维护“防止代理降质 / 降智 / 跑偏”的工程化 skill 仓库。

这个项目的目标不是让模型“显得更聪明”，而是通过一套明确、可执行、可回归测试的规则，减少代理在真实工作流中的低质量行为。

## 这个项目在解决什么问题

很多代理表现变差，并不是因为不会写，而是因为工作流失控。常见问题包括：

- 误判用户意图，把“解释一下”当成“直接开工”
- 没读代码就下结论
- 没验证就说“修好了”
- 小 bug 大重构
- 在高歧义任务里擅自拍板
- 长上下文会话中逐渐遗忘约束
- 明明有现成 skill、MCP、工具或项目内抽象，还重复造轮子

这个仓库的核心 skill 就是为这些问题建立护栏。

## 核心原则

- **上下文预算优先**：长会话会降低可靠性，超过阈值时要提醒并先固化记忆。
- **先判断意图，再决定动作**：用户没有明确要求实现时，不要自动改代码。
- **任何改动先写计划**：改动前必须说明目标、范围、验证方式和非目标边界。
- **证据优先于流畅表达**：没看过、没验证过、没跑过的内容不能装作已经确认。
- **优先复用现有能力**：先找 skill、MCP、已有工具和项目内已有实现，不要重复造轮子。
- **歧义先澄清**：当不同理解会导致不同工作量、风险或架构影响时，必须先问。
- **最小改动原则**：修 bug 时优先做最窄、最局部的修复。
- **验证后再宣布完成**：实现不等于完成，合理不等于验证通过。

## 仓库结构

```text
anti-degradation-skill/
├─ README.md
├─ README.zh-CN.md
├─ LICENSE
├─ .gitignore
├─ package.json
├─ skills/
│  └─ anti-degradation/
│     ├─ SKILL.md
│     ├─ examples.md
│     ├─ triggers.md
│     └─ changelog.md
├─ docs/
│  ├─ philosophy.md
│  ├─ design-principles.md
│  ├─ failure-modes.md
│  ├─ evaluation-format.md
│  ├─ evaluation-format.zh-CN.md
│  ├─ installation.md
│  ├─ installation.zh-CN.md
│  ├─ migration-notes.md
│  ├─ migration-notes.zh-CN.md
│  ├─ release-checklist.md
│  ├─ rule-coverage.md
│  ├─ rule-coverage.zh-CN.md
│  ├─ roadmap.md
│  ├─ versioning-policy.md
│  └─ versioning-policy.zh-CN.md
├─ scripts/
│  ├─ check-eval-coverage.js
│  └─ markdown-tests-to-json.js
├─ tests/
│  ├─ context-budget-gate.md
│  ├─ intent-gate.md
│  ├─ plan-first-change-rule.md
│  ├─ evidence-gate.md
│  ├─ ambiguity-gate.md
│  ├─ capability-reuse-rule.md
│  ├─ validation-gate.md
│  └─ anti-slop.md
├─ memory/
│  └─ .gitkeep
├─ plans/
│  └─ .gitkeep
└─ examples/
   ├─ good/
   └─ bad/
```

## 当前 skill 包含哪些规则

主 skill 位于：

- `skills/anti-degradation/SKILL.md`

当前主要规则包括：

1. `Context Budget Gate`
2. `Intent Gate`
3. `Plan-First Change Rule`
4. `Evidence Gate`
5. `Ambiguity Gate`
6. `Capability Reuse Rule`
7. `Anti-Slop Rules`
8. `Delegation Rules`
9. `Validation Gate`
10. `Completion Standard`
11. `Failure Recovery`
12. `Response Style`

`v0.2.0` 还补充了两层更明确的执行说明：

- `Operational Flow`：先判断意图、再确认歧义、再定义计划、再找证据、最后才实现与验证
- `Rule Severity`：把规则分成 hard block / strong default / conditional / trivial-task exception，避免所有场景都走同样重的流程

这些规则已经被强化为更接近 system-prompt 的硬约束风格，而不是软建议。

## tests 目录怎么用

`tests/` 目录不是单元测试，而是**回归评测样例集**。

每个文件采用类似结构：

- 每个 `## Case N` 下的 metadata block
- `Scenario` / `User`
- `Bad response`
- `Good response`
- `Pass criteria`

这样做的好处是：

- 可以快速看出某条规则在防什么
- 可以拿来当评测集或人工 review 清单
- 每次改规则都能补对应 case，避免 skill 漂移

正式格式说明见：

- `docs/evaluation-format.md`
- `docs/evaluation-format.zh-CN.md`

安装说明见：

- `docs/installation.md`
- `docs/installation.zh-CN.md`

## 如何导出 JSON 评测数据

可以运行：

```bash
node scripts/markdown-tests-to-json.js
```

输出文件：

- `generated/evaluation-cases.json`

这个脚本会校验每个 case 是否包含：

- `Scenario` 或 `User`
- `Bad response`
- `Good response`
- `Pass criteria`

`npm run check:eval` 还会进一步校验：

- `case_id` 是否唯一
- `severity` 是否在允许枚举内
- `rules_covered` 是否非空
- 核心 gate 是否被 metadata 覆盖到

推荐先用：

```bash
npm run export:eval
npm run check:eval
```

再查看导出的 `generated/evaluation-cases.json`。

## 评测工作流

建议按这个顺序维护：

1. 先确认 failure mode，而不是直接改 skill
2. 修改 `SKILL.md` 或相关规则说明
3. 在 `tests/` 里补对应 case
4. 给 metadata-enabled case 补齐 metadata block
5. 运行 `npm run export:eval`
6. 运行 `npm run check:eval`
7. 检查 `generated/evaluation-cases.json`
8. 更新 `docs/rule-coverage.md` / `docs/rule-coverage.zh-CN.md`

这让仓库从“只有提示词”变成“规则 + 样例 + 导出 + 校验”的完整闭环。

## 安装

真正需要发布和安装的 skill 文件是：

- `skills/anti-degradation/SKILL.md`

具体安装方式见：

- `docs/installation.md`

推荐流程：

1. 在这个仓库中维护源文件
2. 运行 `npm run export:eval`
3. 运行 `npm run check:eval`
4. 把 `skills/anti-degradation/SKILL.md` 复制到最终 skill 目录

## 版本管理

当前仓库采用基于 changelog 的版本记录方式。

发布说明位于：

- `skills/anti-degradation/changelog.md`

如果你后续要打 tag 或发 release，建议让外部发布版本号和 changelog 条目保持一致。

补充说明见：

- `docs/versioning-policy.md`
- `docs/versioning-policy.zh-CN.md`

## 发布流程

建议按这个顺序发布：

1. 完成 `SKILL.md`
2. 补齐或更新 `tests/`
3. 运行 `npm run export:eval`
4. 运行 `npm run check:eval`
5. 检查 `generated/evaluation-cases.json`
6. 更新 `skills/anti-degradation/changelog.md`
7. 确认 `docs/installation.md` 中的安装路径仍然正确
8. 按 `docs/release-checklist.md` 做最终检查

补充说明见：

- `docs/migration-notes.md`
- `docs/migration-notes.zh-CN.md`

## 评测

这个项目现在有：

- `tests/` 中的人类可读评测样例
- `docs/evaluation-format.md` 中的正式格式定义
- `docs/evaluation-format.zh-CN.md` 中的中文格式说明
- `generated/evaluation-cases.json` 中的机器可读导出结果
- `docs/rule-coverage.md` / `docs/rule-coverage.zh-CN.md` 中的覆盖说明

这样你在发布 skill 时，不只是发布一份提示词，还能同时发布它的评测依据。

## 发布质量线

发布前至少应满足：

- `SKILL.md` 与相关 `tests/` 的行为描述一致
- metadata-enabled case 可以成功导出
- `npm run check:eval` 通过
- `rule-coverage` 文档反映当前升级范围
- 安装说明和发布说明仍然匹配当前仓库结构

## 如何维护这个项目

建议采用下面的维护方式：

1. 遇到一种新的代理失误
2. 先把失误写进 `docs/failure-modes.md`
3. 补一条或多条 `tests/` 回归 case
4. 必要时再修改 `SKILL.md`
5. 记录到 `changelog.md`

这样可以避免项目退化成“不断堆提示词”，而是保持成一个有证据、有回归样例的规则仓库。

## 适用场景

这个 skill 特别适合：

- coding agent
- research + implementation 混合工作流
- 长会话、多轮迭代任务
- 容易因上下文变长而跑偏的代理
- 需要严格区分“已实现 / 已验证 / 已完成”的工程场景

## 后续可扩展方向

- 拆分子 skill，例如 `intent-gate`、`evidence-first`、`validation-gate`
- 给更多 docs 补齐中文版
- 增加更偏 review / debugging / architecture 的子规则
- 继续增强轻量评测脚本和覆盖校验能力

## 一句话概括

这个项目的目标是：

> 不让代理在长上下文、歧义、高压和偷懒倾向下，退化成“先改、乱猜、少验、乱扩散”的低质量工作模式。
