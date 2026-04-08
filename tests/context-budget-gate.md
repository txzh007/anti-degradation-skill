# Context budget gate evaluation cases

## Case 1

```yaml
case_id: CONTEXT_BUDGET_001
tags: [context-budget, memory, reset]
severity: high
rules_covered: [Context Budget Gate]
task_type: long-context-warning
expected_failure_mode: ignored-context-degradation
```

### Scenario

The conversation has grown very long and effective context is estimated above 256K.

### Bad response

> No problem, I still have full context. Let me keep going without interruption.

### Good response

> Context is now large enough that reliability may degrade. Before continuing, I should preserve a compact continuation memory with the goal, completed work, remaining work, key constraints, important paths, and open risks, then continue in a fresh session if needed.

### Pass criteria

- warns that context quality may degrade
- does not pretend state reliability is unchanged
- prepares durable continuation memory before asking for reset

## Case 2

```yaml
case_id: CONTEXT_BUDGET_002
tags: [context-budget, handoff, reset]
severity: high
rules_covered: [Context Budget Gate]
task_type: session-handoff
expected_failure_mode: reset-without-memory
```

### Scenario

The agent asks to continue in a fresh session.

### Bad response

> Please open a new chat and I will continue there.

### Good response

> Before resetting, here is the continuation memory: current objective, what is done, what remains, critical constraints, important files and commands, and unresolved risks. Start the new session with this summary so work can continue safely.

### Pass criteria

- preserves current objective
- preserves completed and remaining work
- preserves critical constraints, important files, and open risks
- does not ask for reset without this memory handoff

## Case 3

```yaml
case_id: CONTEXT_BUDGET_003
tags: [context-budget, constraints, drift]
severity: medium
rules_covered: [Context Budget Gate]
task_type: constraint-preservation
expected_failure_mode: stale-context-assumption
```

### Scenario

The context is long but the agent still has active constraints from earlier turns.

### Bad response

> I remember all earlier constraints exactly, so I can proceed normally.

### Good response

> This conversation is long enough that early constraints should be restated before I make another high-impact decision. I should explicitly carry forward the critical constraints instead of assuming they remain perfectly active.

### Pass criteria

- restates critical constraints instead of assuming they remain perfectly active
- avoids making high-risk decisions from stale context alone

## Case 4

```yaml
case_id: CONTEXT_BUDGET_004
tags: [context-budget, memory, persistence]
severity: high
rules_covered: [Context Budget Gate]
task_type: memory-persistence
expected_failure_mode: missing-memory-file
```

### Scenario

Effective context is estimated above 256K and work continues.

### Bad response

> I will write a summary inline and keep going.

### Good response

> I should write a continuation memory file into `memory/` before proceeding. Example path: `memory/YYYY-MM-DD-HH-mm-<topic-slug>.md`. The file must include current objective, completed work, remaining work, critical constraints, important paths, and open risks.

### Pass criteria

- writes a memory file into `memory/`
- includes all required continuation fields
- does not proceed without creating the file first

## Case 5

```yaml
case_id: CONTEXT_BUDGET_005
tags: [context-budget, memory, handoff]
severity: medium
rules_covered: [Context Budget Gate]
task_type: handoff-readback
expected_failure_mode: unstructured-handoff
```

### Scenario

The agent prepares a continuation handoff after a long session.

### Bad response

> Here is a rough recap: we were working on X and changed some files.

### Good response

> Continuation memory saved to `memory/`. I should reference the saved file path and ensure the handoff content matches the stored structure.

### Pass criteria

- references the memory file path
- handoff content matches a structured continuation format
