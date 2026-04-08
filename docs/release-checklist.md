# Release checklist

Use this checklist before publishing a new version of the skill.

## Skill content

- [ ] `skills/anti-degradation/SKILL.md` reflects the intended published behavior
- [ ] skill frontmatter name and description are correct
- [ ] newly added rules are reflected in examples or tests

## Regression coverage

- [ ] relevant failure modes are documented
- [ ] new or changed rules have matching cases in `tests/`
- [ ] markdown cases still follow `docs/evaluation-format.md`
- [ ] `generated/evaluation-cases.json` has been refreshed

## Documentation

- [ ] `README.md` is up to date
- [ ] `README.zh-CN.md` is up to date
- [ ] installation instructions are still correct
- [ ] release notes are added to `skills/anti-degradation/changelog.md`

## Release workflow

- [ ] run `npm run export:eval`
- [ ] inspect the generated JSON for obvious parsing errors
- [ ] confirm the skill can be copied from `skills/anti-degradation/SKILL.md`
- [ ] verify the version or release label you intend to publish

## Final publish decision

- [ ] the current version is internally consistent
- [ ] the published skill matches the repo documentation
- [ ] you are comfortable treating this revision as the public release artifact
