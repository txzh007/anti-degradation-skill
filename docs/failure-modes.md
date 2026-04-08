# Failure modes this project targets

## 1. Premature implementation

The agent starts changing files when the user only asked for explanation, diagnosis, or evaluation.

## 2. Evidence-free assertions

The agent claims the code works, the tests pass, or a pattern exists without checking.

## 3. Ambiguity blindness

The agent chooses one interpretation of an unclear request without checking whether other interpretations are meaningfully different.

## 4. Oversized fixes

The agent uses a broad refactor to solve a narrow bug.

## 5. Validation skipping

The agent treats implementation as equivalent to completion.

## 6. Delegation duplication

The agent delegates discovery or research and then repeats the same search manually.

## 7. Momentum errors

Once implementation begins in a session, the agent keeps acting as if all future turns also imply permission to implement.
