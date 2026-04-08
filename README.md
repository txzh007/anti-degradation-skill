# anti-degradation-skill

[English](./README.md) | [中文](./README.zh-CN.md)

A dedicated repository for maintaining an anti-degradation skill that prevents LLM agents from prematurely implementing, guessing without evidence, making oversized changes, and claiming completion without validation.

Chinese companion docs are provided as `*.zh-CN.md` files for key workflow and release documents.

## What this project is

This repository treats agent quality as an engineering problem.

The core idea is simple: low-quality behavior is usually not a raw intelligence problem. It is a workflow problem. Agents degrade when they:

- misclassify intent
- keep working in overloaded context without resetting safely
- start implementing without permission
- skip planning before edits
- guess without reading
- skip clarification under ambiguity
- make larger changes than necessary
- ignore available skills, MCPs, and project utilities
- claim success without verification

This project maintains a skill that adds concrete guardrails against those failure modes.

It is intended to behave more like an operational policy than a soft writing guide.

## Core principles

- **Context budget matters**: very long conversations degrade reliability; preserve memory before reset.
- **Intent before action**: do not implement unless the user explicitly wants implementation.
- **Plan before change**: any modification should start from an explicit plan.
- **Evidence before claims**: do not assert facts about code, tests, or behavior without verification.
- **Reuse before reinventing**: prefer skills, MCPs, and existing project capabilities over manual reinvention.
- **Clarify before costly guesses**: ask when ambiguity changes scope, risk, or effort.
- **Minimal changes**: bug fixes should be narrow and local unless broader refactoring is requested.
- **Validation before completion**: do not say a task is done without appropriate diagnostics, tests, or other evidence.

## Repository structure

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
│  └─ versioning-policy.md
│  └─ versioning-policy.zh-CN.md
├─ scripts/
│  ├─ check-eval-coverage.js
│  └─ markdown-tests-to-json.js
├─ tests/
│  ├─ context-budget-gate.md
│  ├─ intent-gate.md
│  ├─ plan-first-change-rule.md
│  ├─ ambiguity-gate.md
│  ├─ evidence-gate.md
│  ├─ capability-reuse-rule.md
│  ├─ validation-gate.md
│  └─ anti-slop.md
└─ examples/
   ├─ good/
   └─ bad/
```

## Initial scope

Version `0.1.0` focuses on one production-oriented skill:

- `anti-degradation`

Its primary job is to prevent the agent from degrading under ambiguity, speed pressure, or incomplete context.

## How to use this repository

1. Start with `skills/anti-degradation/SKILL.md`.
2. Review `docs/failure-modes.md` to understand the problems the skill is designed to stop.
3. Use `tests/` as regression cases whenever you refine the skill.
4. Add new examples whenever you encounter a new failure pattern in real usage.

The `tests/` directory is written in an evaluation-oriented format with per-case metadata plus `Bad response`, `Good response`, and `Pass criteria` sections so it can also serve as a lightweight regression dataset.

The formal structure for those files is documented in `docs/evaluation-format.md`.

Installation instructions are documented in `docs/installation.md`.

Chinese installation instructions are documented in `docs/installation.zh-CN.md`.

## Export evaluation cases to JSON

You can convert the markdown evaluation cases into JSON with:

```bash
node scripts/markdown-tests-to-json.js
```

Output:

- `generated/evaluation-cases.json`

The export script validates that each case contains:

- `Scenario` or `User`
- `Bad response`
- `Good response`
- `Pass criteria`

The coverage check additionally validates:

- unique `case_id` values
- allowed `severity` values
- non-empty `rules_covered`
- coverage for the core gates upgraded in v0.2.0

## Evaluation workflow

Recommended workflow:

1. update `SKILL.md` only after the target failure mode is understood
2. add or revise cases in `tests/`
3. include metadata immediately after each `## Case N` heading for metadata-enabled files
4. run `npm run export:eval`
5. run `npm run check:eval`
6. inspect `generated/evaluation-cases.json`
7. update `docs/rule-coverage.md` and changelog notes if release scope changed

## When to use this repository

Best fit:

- coding agents that degrade into premature implementation
- repo analysis and debugging workflows
- evaluation-driven prompt or skill iteration

Less suitable without adaptation:

- casual chat assistants
- highly creative freeform writing agents
- ultra-lightweight flows where evaluation overhead is intentionally minimal

## Install

The publishable skill artifact is:

- `skills/anti-degradation/SKILL.md`

Manual installation is documented in:

- `docs/installation.md`

Typical flow:

1. maintain the source of truth in this repository
2. export evaluation JSON with `npm run export:eval`
3. copy `skills/anti-degradation/SKILL.md` into your final skills directory

## Versioning

This repository currently uses changelog-driven version tracking.

Release notes live in:

- `skills/anti-degradation/changelog.md`

If you publish tagged releases, keep the public release label aligned with the changelog entry you intend to ship.

## Release workflow

Recommended release flow:

1. finalize `SKILL.md`
2. update or add matching cases in `tests/`
3. run `npm run export:eval`
4. run `npm run check:eval`
5. inspect `generated/evaluation-cases.json`
6. update `skills/anti-degradation/changelog.md`
7. verify `docs/installation.md` still matches the intended distribution path
8. use `docs/release-checklist.md` before publishing

## Evaluation

This project includes:

- human-readable evaluation cases in `tests/`
- a formal case schema in `docs/evaluation-format.md`
- machine-readable export in `generated/evaluation-cases.json`
- coverage guidance in `docs/rule-coverage.md`

This makes the skill easier to review, compare, and publish with evidence instead of prompt-only claims.

## Release quality bar

Before shipping a release, the minimum bar is:

- `SKILL.md` and the relevant tests agree on the intended behavior
- metadata-enabled cases export successfully
- `npm run check:eval` passes
- `docs/rule-coverage.md` reflects the upgraded cases
- installation and release docs still match the intended distribution path

## Contribution workflow

When the agent fails in a new way:

1. Document the failure mode.
2. Add a good/bad example.
3. Add a regression test case.
4. Update the skill only after the failure is precisely described.

This keeps the project grounded in observed behavior instead of abstract prompt-writing.

## Roadmap

Planned future expansions:

- modular gate extraction (`intent-gate`, `evidence-first`, `validation-gate`)
- stronger review and verification patterns
- reusable test harness format for agent regression evaluation
- optional variants for coding, research, and review-heavy workflows
