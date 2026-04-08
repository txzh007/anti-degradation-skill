# Evaluation case format

This document defines the standard markdown structure used in `tests/`.

The goal is to keep evaluation cases:

- human-readable
- easy to review in pull requests
- consistent enough to parse into JSON later
- stable enough to serve as a lightweight regression dataset

## Required top-level structure

Each file should follow this pattern:

```md
# <Rule or category name> evaluation cases

## Case 1

### Scenario
or
### User

<prompt or situation>

### Bad response

> <bad example>

### Good response

> <good example>

### Pass criteria

- <criterion 1>
- <criterion 2>
```

## Metadata schema

To support automatic export and coverage checks, each case should include a per-case metadata block immediately after the `## Case N` heading.

Recommended format:

```md
## Case 1

```yaml
case_id: INTENT_GATE_001
tags: [intent, gate, investigation]
severity: high
rules_covered: [Intent Gate]
task_type: investigation
expected_failure_mode: premature-implementation
```

### User
...
```

Required fields:

- `case_id`: unique identifier for the case across the repository
- `tags`: list of short labels for filtering and grouping
- `severity`: one of `low`, `medium`, or `high`
- `rules_covered`: list of canonical rule names covered by the case, for example `Intent Gate`
- `task_type`: short category such as `investigation`, `explanation`, `implementation`, or `validation`
- `expected_failure_mode`: concise label for the failure pattern the bad response demonstrates

Optional fields:

- `notes`: extra authoring context when needed

Authoring rules:

- place the metadata block inside the case, not before the file title and not after the next case starts
- keep field names lowercase with underscores
- prefer canonical gate names in `rules_covered` so coverage tooling can aggregate reliably
- keep `expected_failure_mode` short and stable enough for reporting

## Allowed section starters

Each case must begin with one of:

- `### Scenario`
- `### User`

Use:

- `Scenario` for state-based or workflow-based situations
- `User` for direct prompt-style cases

## Required sections per case

Every case must contain all of the following:

1. case heading: `## Case N`
2. scenario type heading: `### Scenario` or `### User`
3. `### Bad response`
4. `### Good response`
5. `### Pass criteria`

Cases that omit any required section should be treated as invalid.

## Response formatting rules

### Bad response

- should illustrate the exact failure mode being guarded against
- should be short and realistic
- should not be cartoonishly incompetent unless the rule specifically targets obvious failure

### Good response

- should demonstrate the intended behavior clearly
- should mention the right reasoning path or workflow discipline
- does not need to be verbose

## Pass criteria rules

Pass criteria must:

- be written as bullet points
- be observable from the response
- describe behaviors or constraints, not vague quality adjectives

Good examples:

- classifies as investigation
- does not edit files immediately
- ties the answer to concrete validation

Bad examples:

- is smart
- seems careful
- sounds professional

## File naming convention

Use lowercase kebab-case names matching the guarded behavior, for example:

- `intent-gate.md`
- `evidence-gate.md`
- `context-budget-gate.md`
- `capability-reuse-rule.md`

## JSON conversion target shape

The markdown files are designed to convert cleanly into JSON records with a structure like:

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

## Authoring guidance

When adding new cases:

1. Identify one concrete failure mode.
2. Write one realistic bad response.
3. Write one compact good response.
4. Add pass criteria that are specific enough to check.
5. Keep each case focused on one dominant guardrail.

## Non-goals

This format is not intended to:

- replace full automated evaluation frameworks
- encode chain-of-thought
- capture every subtle nuance of agent behavior

Its purpose is to provide a practical, inspectable, and parseable regression format.
