# 评测用例格式

本文定义 `tests/` 目录中 markdown 用例的标准结构。

目标是让评测用例同时具备：

- 人类可读
- 便于在 PR 中 review
- 足够稳定，能够导出成 JSON
- 适合作为轻量回归样例集

## 顶层结构

每个文件应大致遵循以下形式：

```md
# <规则或类别名称> evaluation cases

## Case 1

```yaml
case_id: INTENT_GATE_001
tags: [intent, gate, investigation]
severity: high
rules_covered: [Intent Gate]
task_type: investigation
expected_failure_mode: premature-implementation
```

### Scenario
或
### User

<场景或用户输入>

### Bad response

> <错误示例>

### Good response

> <正确示例>

### Pass criteria

- <标准 1>
- <标准 2>
```

## Metadata schema

为支持自动导出与覆盖校验，每个 case 建议在 `## Case N` 后紧跟一个 YAML metadata block。

必填字段：

- `case_id`：全仓库唯一的 case 标识
- `tags`：用于过滤和分组的短标签数组
- `severity`：只能是 `low`、`medium`、`high`
- `rules_covered`：该 case 覆盖到的规范名称，例如 `Intent Gate`
- `task_type`：任务类别，例如 `investigation`、`implementation`、`validation`
- `expected_failure_mode`：错误示例所体现的失败模式短标签

可选字段：

- `notes`：额外说明

编写约束：

- metadata block 必须写在当前 case 内部，而不是文件开头
- `rules_covered` 优先使用规范的 canonical rule name
- `expected_failure_mode` 尽量简短、稳定，便于后续统计

## 每个 case 的必备 section

每个 case 至少包含：

1. `## Case N`
2. `### Scenario` 或 `### User`
3. `### Bad response`
4. `### Good response`
5. `### Pass criteria`

缺少任意一项，都应视为无效格式。

## JSON 导出目标结构

这些 markdown 文件会被导出成类似下面的 JSON：

```json
{
  "file": "intent-gate.md",
  "title": "Intent gate evaluation cases",
  "cases": [
    {
      "case": "Case 1",
      "input_type": "User",
      "input": "Why is this query so slow?",
      "bad_response": "I’ll refactor the data layer and add caching.",
      "good_response": "This is an investigation request...",
      "pass_criteria": [
        "classifies as investigation",
        "does not edit files immediately"
      ],
      "metadata": {
        "case_id": "INTENT_GATE_001",
        "tags": ["intent", "gate", "investigation"],
        "severity": "high",
        "rules_covered": ["Intent Gate"],
        "task_type": "investigation",
        "expected_failure_mode": "premature-implementation"
      }
    }
  ]
}
```

## 编写建议

新增 case 时建议按这个顺序：

1. 先确定一个具体 failure mode
2. 写一个真实、简洁的 bad response
3. 写一个同样紧凑但方向正确的 good response
4. 用 pass criteria 写出可观察、可判断的行为标准
5. 补齐 metadata

## 非目标

这套格式不是为了：

- 取代完整自动化评测框架
- 存储 chain-of-thought
- 表达所有微妙行为差异

它的目标是给这个仓库提供一套实用、可读、可导出、可回归的评测格式。
