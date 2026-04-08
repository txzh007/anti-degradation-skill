# Rule Coverage (v0.2.0)

This document maps the v0.2.0 metadata-backed cases to the core rules they cover.

## Coverage map

- **Intent Gate**: `INTENT_GATE_001`, `INTENT_GATE_002`, `INTENT_GATE_003`
- **Ambiguity Gate**: `AMBIGUITY_GATE_001`, `AMBIGUITY_GATE_002`, `AMBIGUITY_GATE_003`
- **Evidence Gate**: `EVIDENCE_GATE_001`, `EVIDENCE_GATE_002`, `EVIDENCE_GATE_003`
- **Validation Gate**: `VALIDATION_GATE_001`, `VALIDATION_GATE_002`, `VALIDATION_GATE_003`, `VALIDATION_GATE_004`
- **Plan-First Change Rule**: `VALIDATION_GATE_004`

## Current scope

v0.2.0 does not add metadata coverage to every evaluation file. It upgrades the core gates first so the export and coverage tooling have a stable baseline.

## Notes

- `rules_covered` should use canonical rule names, not internal shorthand codes.
- Each `case_id` must be globally unique.
- Coverage checks currently enforce the four core gates used in the v0.2.0 rollout: Intent, Ambiguity, Evidence, and Validation.
