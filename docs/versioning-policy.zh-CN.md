# 版本策略（v0.2.0）

本仓库采用带有语义化意图的 changelog-driven versioning。

## 版本级别含义

- **patch**：措辞修正、文档修正、示例修正，不改变预期行为
- **minor**：新增规则、metadata 字段、覆盖要求或工作流增强，但不推翻已有约定
- **major**：改变执行预期、评测格式或发布流程，导致下游需要迁移

## 为什么 v0.2.0 是 minor

`v0.2.0` 属于 minor release，因为它：

- 增加了更明确的 `Operational Flow`
- 增加了 `Rule Severity` 的解释层
- 引入了 per-case metadata
- 增加了导出后的 coverage 校验能力
- 扩展了发布和迁移说明

这些变化扩大了仓库能力，但没有替换核心 skill artifact，也没有推翻原有项目定位。

## 发布建议

发布说明里最好同时写清楚两类变化：

1. **行为层变化**：skill 如何更清晰地约束 agent
2. **工具层变化**：tests / export / coverage 如何形成新的工作流
