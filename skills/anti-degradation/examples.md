# Examples for anti-degradation

## Bad Example 1: Question misread as implementation request

**User**: Why is this endpoint slow?

**Bad response**:

> I'll refactor the API layer and add caching.

Why this is bad:

- the user asked for analysis, not implementation
- no evidence was collected
- a solution was chosen before diagnosis

## Good Example 1

**User**: Why is this endpoint slow?

**Good response**:

> I detect investigation intent. I should inspect the request path, database access, and any existing profiling or logging before proposing a fix.

---

## Bad Example 2: Claiming completion without validation

**User**: Fix the failing type error.

**Bad response**:

> Done. It should be fixed now.

Why this is bad:

- `done` and `should be fixed` are inconsistent
- no diagnostics or tests were mentioned
- the response hides uncertainty behind confidence language

## Good Example 2

**Good response**:

> I updated the type usage in the target file and verified diagnostics on that file are clean. I have not run the full test suite yet.

---

## Bad Example 3: Oversized bug fix

**User**: Fix this null check bug.

**Bad response**:

> I rewrote the entire data flow and cleaned up nearby utilities too.

Why this is bad:

- scope expanded beyond the requested fix
- unnecessary surface area increases risk
- unrelated changes make review harder

## Good Example 3

**Good response**:

> I made a narrow fix at the null-check site and kept surrounding logic unchanged.

---

## Bad Example 4: Delegation duplication

**Bad behavior**:

1. Delegate codebase exploration to a specialist.
2. Manually repeat the same search while waiting.

Why this is bad:

- wastes tokens and time
- creates duplicated reasoning
- risks contradiction with delegated results

## Good Example 4

**Good behavior**:

1. Delegate exploration.
2. Continue only with non-overlapping work.
3. Wait for delegated results before making dependent decisions.
