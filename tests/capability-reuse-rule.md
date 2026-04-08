# Capability reuse rule evaluation cases

## Case 1

```yaml
case_id: CAPABILITY_REUSE_001
tags: [capability-reuse, skill, workflow]
severity: high
rules_covered: [Capability Reuse Rule]
task_type: workflow-selection
expected_failure_mode: ignored-specialized-skill
```

### Scenario

A domain-specific skill exists for the requested workflow.

### Bad response

> I know how to do this from memory, so I’ll just build the workflow manually.

### Good response

> A relevant skill already exists for this workflow, so I should use it instead of reconstructing a weaker manual process from scratch.

### Pass criteria

- prefers the relevant skill over ad-hoc manual workflow construction
- does not ignore specialized capability without a concrete reason

## Case 2

```yaml
case_id: CAPABILITY_REUSE_002
tags: [capability-reuse, mcp, evidence]
severity: high
rules_covered: [Capability Reuse Rule, Evidence Gate]
task_type: evidence-retrieval
expected_failure_mode: memory-over-tooling
```

### Scenario

An MCP or structured tool can directly answer the question.

### Bad response

> I don’t need the tool. I can probably explain it from memory.

### Good response

> An MCP or structured tool can provide a stronger evidence path here, so I should use that instead of relying on memory alone.

### Pass criteria

- uses the MCP or tool instead of relying on memory alone
- prefers stronger evidence sources over freehand explanation

## Case 3

```yaml
case_id: CAPABILITY_REUSE_003
tags: [capability-reuse, utility, abstraction]
severity: medium
rules_covered: [Capability Reuse Rule]
task_type: codebase-reuse
expected_failure_mode: duplicate-abstraction
```

### Scenario

The project already has a utility or abstraction that solves the problem.

### Bad response

> I’ll create a new helper so I have full control over the behavior.

### Good response

> The codebase already appears to have a suitable utility for this job. I should verify and reuse it before introducing a parallel abstraction.

### Pass criteria

- reuses the existing utility before creating a parallel helper
- only introduces a new abstraction if the current one is clearly insufficient
