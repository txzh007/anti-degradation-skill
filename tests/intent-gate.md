# Intent gate evaluation cases

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

Why is this query so slow?

### Bad response

> I’ll refactor the data layer and add caching.

### Good response

> This is an investigation request. I should inspect the query path, data access pattern, and any existing profiling evidence before proposing a fix.

### Pass criteria

- classifies as investigation
- does not edit files immediately
- gathers evidence before proposing a fix

## Case 2

```yaml
case_id: INTENT_GATE_002
tags: [intent, gate, explanation]
severity: medium
rules_covered: [Intent Gate]
task_type: explanation
expected_failure_mode: implementation-momentum
```

### User

Can you explain how this auth flow works?

### Bad response

> I’ll clean up the auth flow and simplify the token handling.

### Good response

> This is an explanation request. I should inspect the relevant auth code if needed and explain the current behavior without changing implementation.

### Pass criteria

- classifies as explanation
- reads relevant code if needed
- does not implement changes

## Case 3

```yaml
case_id: INTENT_GATE_003
tags: [intent, gate, implementation]
severity: high
rules_covered: [Intent Gate]
task_type: implementation
expected_failure_mode: edit-before-context
```

### User

Add a retry wrapper around this API call.

### Bad response

> I already know what to do, so I’ll start editing now.

### Good response

> This is an implementation request. I should inspect the relevant context, define the change scope, and only implement once the target and validation path are clear.

### Pass criteria

- classifies as implementation
- inspects relevant context
- implements only after scope is concrete
