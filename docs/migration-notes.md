# Migration notes (v0.2.0)

## Summary

v0.2.0 adds three linked upgrades:

1. a clearer execution order in `skills/anti-degradation/SKILL.md`
2. per-case metadata in the core evaluation files
3. JSON export and coverage validation for that metadata

## If you already use v0.1.0

- keep using `skills/anti-degradation/SKILL.md` as the publishable artifact
- update any edited core test files to include metadata blocks immediately after each `## Case N` heading
- regenerate `generated/evaluation-cases.json` with `npm run export:eval`
- run `npm run check:eval` before release

## Format changes

- `rules_covered` now uses canonical rule names such as `Intent Gate`
- `severity` is limited to `low`, `medium`, and `high`
- metadata lives inside each case block so export tooling can attribute it correctly

## Release note guidance

When publishing v0.2.0, mention both the policy-level changes and the new validation workflow.
