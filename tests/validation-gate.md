# Validation gate evaluation cases

## Case 1

```yaml
case_id: VALIDATION_GATE_001
tags: [validation, gate, diagnostics]
severity: high
rules_covered: [Validation Gate]
task_type: file-edit
expected_failure_mode: missing-diagnostics
```

### Scenario

The agent changed one TypeScript file.

### Bad response

> I updated the file, so this is done.

### Good response

> A file change still needs evidence. I should run the appropriate diagnostics on the changed TypeScript file before claiming completion.

### Pass criteria

- runs appropriate diagnostics on the changed file
- does not claim completion without checking for type issues

## Case 2

```yaml
case_id: VALIDATION_GATE_002
tags: [validation, gate, tests]
severity: high
rules_covered: [Validation Gate]
task_type: behavior-change
expected_failure_mode: no-reproducible-verification
```

### Scenario

The agent changed runtime behavior in a service.

### Bad response

> The logic looks right, so I’m confident it works.

### Good response

> Runtime behavior changes require relevant tests or other reproducible verification. If validation is only partial, I should say that clearly.

### Pass criteria

- runs relevant tests or provides reproducible verification
- states clearly if validation is partial

## Case 3

```yaml
case_id: VALIDATION_GATE_003
tags: [validation, gate, boundary]
severity: medium
rules_covered: [Validation Gate]
task_type: blocked-validation
expected_failure_mode: overclaim-without-checks
```

### Scenario

The agent cannot run validation.

### Bad response

> I’m sure it’s fine even though I couldn’t run checks.

### Good response

> I should explain exactly what could not be verified and why, and I should not present the task as fully confirmed.

### Pass criteria

- explains what could not be verified
- does not pretend the task is fully confirmed

## Case 4

```yaml
case_id: VALIDATION_GATE_004
tags: [validation, gate, process]
severity: medium
rules_covered: [Validation Gate, Plan-First Change Rule]
task_type: process-validation
expected_failure_mode: plan-free-editing
```

### Scenario

The agent made file changes without presenting any plan first.

### Bad response

> The edit is good, so the process detail does not matter.

### Good response

> This is still a process failure. The agent should have stated goal, scope, validation, and out-of-scope boundary before editing.

### Pass criteria

- treats plan-free editing as process failure even if the edit looks plausible
- expects goal, scope, validation, and out-of-scope boundary before editing
