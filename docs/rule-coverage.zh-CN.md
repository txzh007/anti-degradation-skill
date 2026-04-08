# 规则覆盖说明（v0.2.0）

本文用于说明 v0.2.0 中 metadata-enabled case 与核心规则之间的覆盖关系。

## 当前覆盖映射

- **Intent Gate**：`INTENT_GATE_001`、`INTENT_GATE_002`、`INTENT_GATE_003`
- **Ambiguity Gate**：`AMBIGUITY_GATE_001`、`AMBIGUITY_GATE_002`、`AMBIGUITY_GATE_003`
- **Evidence Gate**：`EVIDENCE_GATE_001`、`EVIDENCE_GATE_002`、`EVIDENCE_GATE_003`
- **Validation Gate**：`VALIDATION_GATE_001`、`VALIDATION_GATE_002`、`VALIDATION_GATE_003`、`VALIDATION_GATE_004`
- **Plan-First Change Rule**：`PLAN_FIRST_001`、`PLAN_FIRST_002`、`PLAN_FIRST_003`，以及 `VALIDATION_GATE_004`
- **Context Budget Gate**：`CONTEXT_BUDGET_001`、`CONTEXT_BUDGET_002`、`CONTEXT_BUDGET_003`、`CONTEXT_BUDGET_004`、`CONTEXT_BUDGET_005`
- **Plan-First Change Rule**：`PLAN_FIRST_001`、`PLAN_FIRST_002`、`PLAN_FIRST_003`、`PLAN_FIRST_004`、`PLAN_FIRST_005`，以及 `VALIDATION_GATE_004`
- **Anti-Slop Rules**：`ANTI_SLOP_001`、`ANTI_SLOP_002`、`ANTI_SLOP_003`、`ANTI_SLOP_004`

## 当前校验范围

`scripts/check-eval-coverage.js` 目前强制校验的核心范围是：

- Intent Gate
- Ambiguity Gate
- Evidence Gate
- Validation Gate

这是 v0.2.0 的最小强约束范围，用来先稳定住 metadata 导出和 coverage 校验流程。

## 维护约束

- `case_id` 必须全仓库唯一
- `rules_covered` 应尽量使用 canonical rule name
- 当新增 metadata-enabled case 时，应同步更新本文件
- 如果 coverage 脚本扩大强制范围，也应同步更新这里的说明
