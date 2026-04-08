# 迁移说明（v0.2.0）

## 概览

v0.2.0 主要新增了三类能力：

1. `SKILL.md` 中更明确的执行顺序说明
2. `tests/` 中 per-case metadata
3. metadata 对应的 JSON 导出与 coverage 校验

## 如果你已经在用 v0.1.0

建议按这个顺序迁移：

1. 继续把 `skills/anti-degradation/SKILL.md` 作为最终可发布 artifact
2. 给核心评测文件中的每个 case 补上 metadata block
3. 运行 `npm run export:eval`
4. 运行 `npm run check:eval`
5. 检查 `generated/evaluation-cases.json`

## 格式变化

- `rules_covered` 现在更推荐使用 canonical rule name，例如 `Intent Gate`
- `severity` 统一限制为 `low` / `medium` / `high`
- metadata 必须位于每个 case 内部，避免导出归属错误

## 发布说明建议

发布 v0.2.0 时，建议明确写出：

- skill 行为约束更清晰了
- tests 不再只是文本 case，还包含 metadata
- 仓库现在支持轻量 coverage 校验
