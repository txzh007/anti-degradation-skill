# 安装说明

这个项目是一个仓库，但真正需要安装的 skill artifact 是：

- `skills/anti-degradation/SKILL.md`

## 手动安装

### 方案一：复制到本地 skills 目录

可以把 skill 放到类似这样的路径：

```text
~/.config/opencode/skills/anti-degradation/SKILL.md
```

在 Windows 上，常见等价路径可能是：

```text
C:\Users\<you>\.config\opencode\skills\anti-degradation\SKILL.md
```

### 方案二：保留仓库，把它当作 source of truth

把这个仓库作为维护源，只在发布或安装时复制：

- `skills/anti-degradation/SKILL.md`

到你最终的 skill 安装目录。

## 推荐发布包

用于发布或共享时，至少建议保留：

- `skills/anti-degradation/SKILL.md`
- `README.md`
- `README.zh-CN.md`
- `skills/anti-degradation/changelog.md`

可选但推荐：

- `tests/`
- `docs/evaluation-format.md`
- `docs/evaluation-format.zh-CN.md`
- `generated/evaluation-cases.json`

## 安装后检查

复制完成后，建议确认：

1. 目标路径确实存在
2. frontmatter 里的 skill 名称是 `anti-degradation`
3. 你的 agent 环境可以正常加载或引用这个 skill
4. 如需同时校验评测资源，可在本仓库运行导出与校验流程

## 更新流程

更新 skill 时，建议按这个顺序：

1. 修改 `skills/anti-degradation/SKILL.md`
2. 更新或新增 `tests/` 中的回归 case
3. 运行 `npm run export:eval`
4. 运行 `npm run check:eval`
5. 更新 `skills/anti-degradation/changelog.md`
6. 把更新后的 `SKILL.md` 复制到最终安装目录
