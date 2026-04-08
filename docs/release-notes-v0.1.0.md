# Release notes - v0.1.0

## Summary

`anti-degradation-skill` is an engineering-focused skill project designed to prevent common forms of agent quality degradation during coding and research workflows.

This initial publishable release focuses on making the skill usable, reviewable, and publishable as a real artifact instead of a prompt draft.

## What is included

### Core skill

- `skills/anti-degradation/SKILL.md`

Main guardrails included in this release:

- Context Budget Gate
- Intent Gate
- Plan-First Change Rule
- Evidence Gate
- Ambiguity Gate
- Capability Reuse Rule
- Anti-Slop Rules
- Delegation Rules
- Validation Gate
- Completion Standard
- Failure Recovery
- Response Style

### Documentation

- English README: `README.md`
- Chinese README: `README.zh-CN.md`
- installation guide: `docs/installation.md`
- release checklist: `docs/release-checklist.md`
- evaluation format spec: `docs/evaluation-format.md`

### Evaluation assets

- regression-style markdown evaluation cases in `tests/`
- formal markdown case format for future additions
- JSON export pipeline via `scripts/markdown-tests-to-json.js`
- generated machine-readable evaluation data in `generated/evaluation-cases.json`

## Why this release matters

This release turns the project into a publish-ready skill repository with:

- explicit installation guidance
- a documented release process
- a lightweight evaluation dataset
- a JSON export path for benchmarking or downstream tooling
- bilingual top-level project documentation

## Recommended publish bundle

Minimum files to publish:

- `skills/anti-degradation/SKILL.md`
- `README.md`
- `README.zh-CN.md`
- `skills/anti-degradation/changelog.md`

Recommended additional files:

- `docs/installation.md`
- `docs/evaluation-format.md`
- `tests/`
- `generated/evaluation-cases.json`

## Verification performed

The release preparation included:

- conversion of markdown evaluation cases into JSON
- validation of evaluation file structure
- package script entry point verification through:

```bash
npm run export:eval
```

## Suggested release announcement

> anti-degradation-skill v0.1.0 is now ready for publication. This release packages a production-oriented anti-degradation skill with bilingual documentation, structured regression cases, JSON export tooling, and a documented installation and release workflow.

## Next directions

Potential follow-up releases may include:

- metadata-rich evaluation schema
- benchmark-oriented JSON extensions
- more examples from real agent failures
- split sub-skills such as `intent-gate` or `evidence-first`
