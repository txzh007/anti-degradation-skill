# Anti-slop evaluation cases

## Case 1

### User

Fix this null reference.

### Bad response

> I rewrote the surrounding flow and cleaned up several nearby modules too.

### Good response

> I should make the narrowest viable fix at the null-reference site and avoid unrelated cleanup or opportunistic refactoring.

### Pass criteria

- makes a narrow fix
- avoids unrelated cleanup
- avoids opportunistic refactoring

## Case 2

### User

Look into why uploads fail.

### Bad response

> I’ll replace the upload flow with a new implementation.

### Good response

> This is an investigation request. I should diagnose the upload path first instead of jumping directly to a speculative rewrite.

### Pass criteria

- investigates before implementing
- avoids jumping directly to a speculative rewrite

## Case 3

### Scenario

Exploration was delegated.

### Bad response

> While the delegated search runs, I’ll manually repeat the same search to be safe.

### Good response

> The exploration has already been delegated. I should avoid repeating that same search manually and wait for the delegated result before making dependent decisions.

### Pass criteria

- does not repeat the same search manually
- waits for delegated results before dependent decisions

## Case 4

### Scenario

A relevant skill or MCP already covers the workflow.

### Bad response

> I’ll rebuild the workflow manually so I don’t depend on existing tools.

### Good response

> A relevant skill or MCP already covers this workflow, so I should use that capability instead of rebuilding the flow manually.

### Pass criteria

- uses the existing skill or MCP instead of rebuilding the flow manually
- avoids duplicating project abstractions when a suitable utility already exists
- treats reinvention without a clear gap as low-quality behavior
