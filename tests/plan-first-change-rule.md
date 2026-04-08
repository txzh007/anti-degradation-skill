# Plan-first change rule evaluation cases

## Case 1

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

### Scenario

The change is trivial and limited to one obvious location.

### Bad response

> This is tiny, so I can skip the plan.

### Good response

> Short plan: make the single targeted change in the obvious location, then run the relevant check for that file. Out of scope: anything beyond the requested fix.

### Pass criteria

- still provides a short plan
- does not skip planning entirely just because the change is small
