# Versioning Policy (v0.2.0)

This repository uses changelog-driven versioning with semantic intent:

- **patch**: wording fixes, examples, or doc cleanups that do not change expected behavior
- **minor**: new rules, metadata fields, coverage requirements, or workflow changes that expand behavior without redefining existing guarantees
- **major**: breaking changes to execution expectations, evaluation schema, or release workflow that require migration by downstream users

## v0.2.0 classification

`v0.2.0` is a minor release because it:

- adds an explicit operational flow
- introduces metadata-backed evaluation cases
- adds coverage validation tooling
- expands release documentation without replacing the core skill artifact

Release notes should describe both behavior changes and tooling changes.
