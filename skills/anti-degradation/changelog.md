# Changelog

## 0.1.0 - 2026-04-08

Initial project scaffold.

Includes:

- first `anti-degradation` skill draft
- examples for good and bad behavior
- trigger reference
- philosophy, design, failure modes, and roadmap docs
- regression-style markdown tests for core gates

## 0.1.1 - 2026-04-08

Skill structure updated with three new guardrails:

- `Context Budget Gate` for warning and preserving memory when context exceeds 256K
- `Plan-First Change Rule` for requiring explicit planning before any modification
- `Capability Reuse Rule` for prioritizing skills, MCPs, tools, and existing utilities before reinvention

## 0.1.2 - 2026-04-08

Hardening pass:

- strengthened `SKILL.md` language toward system-prompt-style operational constraints
- added explicit MUST / MUST NOT style requirements around planning, evidence, ambiguity handling, reuse, validation, and completion claims
- added regression tests for context budget, plan-first change, and capability reuse

## 0.1.3 - 2026-04-08

Evaluation and documentation pass:

- converted markdown tests into evaluation-style cases with `Bad response`, `Good response`, and `Pass criteria`
- added `README.zh-CN.md` for Chinese project documentation
- updated the main `README.md` to mention the Chinese README and evaluation-oriented test structure

## 0.1.4 - 2026-04-08

Evaluation tooling pass:

- added `docs/evaluation-format.md` to formally define the markdown case structure
- added `scripts/markdown-tests-to-json.js` to convert evaluation markdown files into JSON
- updated English and Chinese READMEs with export and format references

## 0.1.5 - 2026-04-08

Publish-readiness pass:

- added `package.json` with release-oriented script entry points
- added `docs/installation.md` for manual installation and update workflow
- added `docs/release-checklist.md` for pre-publish verification
- updated English and Chinese READMEs with install, evaluation, versioning, and release workflow sections
