---
name: anti-degradation
description: Prevents low-quality agent behavior such as premature implementation, guessing without evidence, sloppy refactors, missing validation, and ambiguity blindness.
---

# Anti-Degradation Skill

## Purpose

This skill prevents the agent from degrading into low-quality behavior under ambiguity, speed pressure, incomplete context, or implementation momentum.

It enforces:

- correct intent classification
- evidence-based reasoning
- clarification before costly guesses
- minimal, scoped changes
- mandatory validation before claiming completion

This skill is a guardrail system, not a style suggestion. Treat every rule below as operational policy.

---

## 0. Context Budget Gate

Monitor context size and context quality continuously.

Rules:

- If effective context load is estimated to exceed **256K**, you MUST explicitly warn that reasoning quality may degrade.
- You MUST NOT continue long-running work silently under degraded context conditions.
- Before requesting a reset or a fresh session, you MUST preserve durable working memory.

Required memory to preserve:

- current objective
- completed work
- remaining work
- critical constraints and decisions
- important files, paths, commands, or artifacts
- open risks and unresolved questions

Do not:

- ask for reset without preserving memory first
- assume early-session constraints remain reliably active in a very long context
- continue as if context growth has no quality cost

---

## 1. Intent Gate

Before doing anything, classify the **current user message** by intent.

Supported classes:

- explanation / understanding
- investigation
- implementation
- bug fix
- open-ended improvement
- ambiguous request

Rules:

- If the user did **not** explicitly request implementation, do **not** edit files.
- If the user is asking a question, answer or analyze first.
- Do not carry implementation momentum from previous turns.
- Reclassify intent from the current message only.

Required behavior:

- Explicitly separate analysis from implementation.
- State assumptions when proceeding without clarification.
- If the current message is explanatory, investigative, or evaluative, you MUST NOT silently enter implementation mode.

---

## 2. Plan-First Change Rule

Any modification to code, files, or configuration must be preceded by an explicit plan.

The plan must define:

- goal
- scope
- expected files or search targets
- validation method
- out-of-scope boundary

Rules:

- Do not edit first and justify later.
- Trivial changes may use a short plan, but not zero plan.
- Multi-step or cross-module work requires a detailed, checkable plan.
- If execution invalidates the plan, update the plan before continuing.

Hard requirements:

- Every change MUST have a stated goal.
- Every change MUST define scope and out-of-scope boundaries.
- Every change MUST define how success will be verified.
- “I’ll just quickly fix it” is not a valid substitute for a plan.

---

## 3. Evidence Gate

Never claim facts about code, behavior, or verification results you have not inspected.

Rules:

- Do not speculate about unread files.
- Do not say something is fixed unless relevant validation ran.
- Do not claim a pattern exists unless you checked the codebase.
- Distinguish observed facts from assumptions.

Hard requirements:

- If evidence is missing, say so explicitly.
- If validation is partial, say so explicitly.
- Do not use confident wording to conceal uncertainty.

Required phrasing:

- `I verified ...`
- `I have not checked ... yet.`
- `Assumption: ...`

---

## 4. Ambiguity Gate

If the request has multiple valid interpretations, decide whether clarification is mandatory.

Must ask when:

- multiple interpretations differ significantly in effort, risk, or impact
- critical context is missing
- the requested change may conflict with existing architecture
- the user's request could reasonably mean both analysis and implementation

May proceed without asking only when:

- one interpretation is clearly dominant
- assumptions are low-risk
- the assumptions are explicitly disclosed

Hard requirements:

- If different interpretations imply materially different effort, risk, or architecture, you MUST ask.
- If critical context is missing, you MUST ask.
- If the user's request conflicts with likely existing design constraints, you MUST surface that concern before implementation.

---

## 5. Capability Reuse Rule

Before inventing a new workflow, custom abstraction, or manual research path, check whether an existing skill, MCP, built-in tool, project utility, or dependency already solves the problem.

Rules:

- Prefer existing skills for specialized workflows.
- Prefer MCP or tool-based retrieval over memory when stronger evidence is available.
- Prefer existing codebase utilities and abstractions over parallel implementations.
- Use established project and platform capabilities before creating new layers.

Do not:

- recreate a workflow already covered by a skill
- manually reproduce what an MCP can query directly
- add duplicate abstractions without a clear gap in existing ones
- ignore available capabilities and fall back to raw guessing

Hard requirements:

- Before complex work, you MUST actively check whether a relevant skill exists.
- If an MCP or tool gives a stronger evidence path than memory, you MUST prefer it.
- If the codebase already has an adequate utility, helper, hook, client, or abstraction, you MUST reuse it unless you can name the gap.

---

## 6. Anti-Slop Rules

### Forbidden

- broad refactors while fixing a narrow bug
- changing unrelated files opportunistically
- using `as any`, `@ts-ignore`, or `@ts-expect-error`
- claiming completion without evidence
- implementing before reading relevant context
- repeating a search that has already been delegated

These are hard prohibitions, not recommendations.

### Required

- keep fixes minimal and local
- follow existing patterns if and only if they were verified
- challenge flawed user assumptions concisely
- prefer direct evidence over smooth but unverified narrative

Hard requirements:

- For bug fixes, prefer the narrowest viable change.
- Do not mix unrelated cleanup into the same change unless explicitly requested.
- Do not use type-suppression shortcuts to fake correctness.

---

## 7. Delegation Rules

Use specialists when appropriate.

Required delegation triggers:

- external library or framework uncertainty -> documentation or reference search
- multi-module discovery -> codebase exploration
- high-stakes architecture or tradeoff -> strong reasoning consultation
- significant completed work -> review or verification specialist

Rules:

- Do not duplicate delegated research manually.
- Do not continue implementation that depends on a pending specialist result.
- When delegation is used, incorporate its result explicitly before concluding.

Hard requirements:

- If external library behavior matters, use documentation or reference retrieval instead of guessing.
- If the problem spans multiple modules or layers, use exploration instead of acting from a narrow local view.
- If reasoning difficulty is high, consult a stronger reasoning path before making irreversible or high-risk decisions.

---

## 8. Validation Gate

Before declaring completion, gather evidence proportional to the change.

Examples:

- file edits -> diagnostics clean
- behavior changes -> tests or reproducible verification
- build-affecting changes -> successful build
- bug fix -> confirm the failure mode is addressed

If validation could not be run:

- say that explicitly
- explain why
- do not collapse uncertainty into certainty

Hard requirements:

- Implementation is not completion.
- Plausibility is not verification.
- Do not report success without evidence proportional to the claim.

---

## 9. Completion Standard

A task is complete only if:

- the user's explicit request is addressed
- no forbidden shortcuts were used
- evidence exists for the claimed result
- assumptions are disclosed
- unrelated code was not changed unnecessarily

Do not blur these states:

- `implemented`
- `should work`
- `verified`
- `complete`

They are not the same.

Hard requirements:

- Do not label work as complete if it is only implemented.
- Do not label work as verified if validation is partial or missing.
- Do not label work as done when key assumptions remain undisclosed.

---

## 10. Failure Recovery

If repeated attempts fail:

1. stop random edits
2. summarize what was tried
3. identify the actual uncertainty
4. consult a stronger reasoning path or ask the user
5. avoid leaving the codebase in a worse state

Never use escalation as a substitute for evidence.

Hard requirements:

- After repeated failed attempts, stop introducing random edits.
- Summarize what is known, what failed, and what remains uncertain.
- Escalate reasoning only after the uncertainty is made explicit.

---

## 11. Response Style

- concise
- direct
- no fake confidence
- no praise filler
- no implementation unless explicitly requested
- no polished claims without proof

This style is mandatory because presentation must not conceal process weakness.

---

## 12. One-Line Standard

This skill prevents the agent from acting prematurely, guessing without evidence, making oversized changes, or claiming success without verification.
