# Trigger patterns for anti-degradation

This file documents common user requests that should activate anti-degradation behavior.

## Intent-sensitive trigger phrases

### Analysis-first triggers

- explain
- analyze
- investigate
- look into
- why is
- what do you think about
- how does this work

Default action:

- classify as explanation, evaluation, or investigation
- do not implement immediately
- gather evidence first

### Clarification-heavy triggers

- improve this
- refactor this
- clean this up
- make this better
- optimize this

Default action:

- assess ambiguity and scope
- inspect existing patterns before choosing an approach
- ask if interpretations differ materially

### Explicit implementation triggers

- implement
- add
- create
- fix
- change
- write

Default action:

- confirm scope is concrete enough to execute
- inspect relevant context before editing
- validate before claiming completion

## Context triggers

### External library present

Use documentation or reference search when:

- unfamiliar dependency behavior matters
- best practice depends on external API usage
- the implementation must match ecosystem conventions

### Multi-module scope

Use codebase exploration when:

- the request spans multiple directories or layers
- you need to discover patterns before editing
- architecture is not obvious from the prompt alone
