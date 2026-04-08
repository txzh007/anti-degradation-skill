# Installation

This project is organized as a repository, but the actual skill artifact is:

- `skills/anti-degradation/SKILL.md`

## Manual installation

### Option 1: copy the skill into your local skills directory

Place the skill at a location like:

```text
~/.config/opencode/skills/anti-degradation/SKILL.md
```

On Windows, a typical equivalent path may look like:

```text
C:\Users\<you>\.config\opencode\skills\anti-degradation\SKILL.md
```

### Option 2: keep the repository and copy from it when publishing

Use this repository as the source of truth, and copy only:

- `skills/anti-degradation/SKILL.md`

into your final skill installation target.

## Recommended published bundle

For publishing or sharing, keep at least:

- `skills/anti-degradation/SKILL.md`
- `README.md`
- `README.zh-CN.md`
- `skills/anti-degradation/changelog.md`

Optional but recommended:

- `tests/`
- `docs/evaluation-format.md`
- `generated/evaluation-cases.json`

## Verify installation

After copying the skill:

1. Confirm the file path exists.
2. Confirm the skill name in frontmatter is `anti-degradation`.
3. Load or reference the skill from your agent environment.
4. Optionally run the evaluation export workflow in this repo to verify test assets are still consistent.

## Update workflow

When updating the skill:

1. edit `skills/anti-degradation/SKILL.md`
2. update or add regression cases in `tests/`
3. run `npm run export:eval`
4. update `skills/anti-degradation/changelog.md`
5. copy the updated `SKILL.md` to the final installation target
