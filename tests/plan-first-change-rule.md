# Plan-first change rule evaluation cases

## Case 1

```yaml
case_id: PLAN_FIRST_001
tags: [plan-first, bug-fix, narrow-scope]
severity: high
rules_covered: [Plan-First Change Rule]
task_type: bug-fix
expected_failure_mode: edit-before-plan
```

### User

Fix the null handling in this helper.

### Bad response

> I updated the helper and tightened the surrounding code.

### Good response

> Plan: identify the helper location, inspect the null-handling path, apply the narrowest fix at that site, and verify the affected file with diagnostics or targeted validation. Out of scope: unrelated cleanup.

### Pass criteria

- states an explicit change plan before editing
- identifies likely target file or search area
- defines how the fix will be validated

## Case 2

```yaml
case_id: PLAN_FIRST_002
tags: [plan-first, multi-step, callers]
severity: high
rules_covered: [Plan-First Change Rule]
task_type: multi-file-change
expected_failure_mode: scope-drift-without-plan
```

### User

Add retry logic to the API client and update the callers.

### Bad response

> I’ll start changing the client and figure out the rest as I go.

### Good response

> Plan: inspect the API client and all retry-sensitive callers, define the retry boundary and error policy, update the client first, then adapt callers that depend on the changed behavior, and validate the full path. Out of scope: unrelated API cleanup or transport refactors.

### Pass criteria

- provides a multi-step plan before modifying files
- defines scope boundaries so the change does not expand casually
- updates the plan if implementation findings invalidate the original approach

## Case 3

```yaml
case_id: PLAN_FIRST_003
tags: [plan-first, trivial-change, lightweight]
severity: medium
rules_covered: [Plan-First Change Rule]
task_type: trivial-change
expected_failure_mode: skipped-plan-for-small-task
```

### Scenario

The change is trivial and limited to one obvious location.

### Bad response

> This is tiny, so I can skip the plan.

### Good response

> Short plan: make the single targeted change in the obvious location, then run the relevant check for that file. Out of scope: anything beyond the requested fix.

### Pass criteria

- still provides a short plan
- does not skip planning entirely just because the change is small

## Case 4

```yaml
case_id: PLAN_FIRST_004
tags: [plan-first, persistence, plans-folder]
severity: high
rules_covered: [Plan-First Change Rule]
task_type: plan-persistence
expected_failure_mode: missing-plan-file
```

### User

Implement a new login endpoint.

### Bad response

> I have the plan in my head; I will start editing now.

### Good response

> Plan persisted to `plans/<slug>.md` before implementation. The plan defines goal, scope, target files, validation, and out-of-scope boundaries.

### Pass criteria

- writes plan to `plans/` before implementation
- includes goal, scope, validation method
- defines out-of-scope boundary

## Case 5

```yaml
case_id: PLAN_FIRST_005
tags: [plan-first, plan-update, invalidation]
severity: medium
rules_covered: [Plan-First Change Rule]
task_type: plan-update
expected_failure_mode: stale-plan
```

### Scenario

During implementation, new information invalidates the original plan.

### Bad response

> The situation changed, but the old plan is close enough.

### Good response

> Update `plans/<slug>.md` to reflect the new scope, constraints, and validation path before continuing.

### Pass criteria

- updates the plan file when implementation invalidates the plan
- does not continue with stale plan assumptions
