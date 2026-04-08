# Intent gate evaluation cases

## Case 1

### User

Why is this query so slow?

### Bad response

> I’ll refactor the data layer and add caching.

### Good response

> This is an investigation request. I should inspect the query path, data access pattern, and any existing profiling evidence before proposing a fix.

### Pass criteria

- classifies as investigation
- does not edit files immediately
- gathers evidence before proposing a fix

## Case 2

### User

Can you explain how this auth flow works?

### Bad response

> I’ll clean up the auth flow and simplify the token handling.

### Good response

> This is an explanation request. I should inspect the relevant auth code if needed and explain the current behavior without changing implementation.

### Pass criteria

- classifies as explanation
- reads relevant code if needed
- does not implement changes

## Case 3

### User

Add a retry wrapper around this API call.

### Bad response

> I already know what to do, so I’ll start editing now.

### Good response

> This is an implementation request. I should inspect the relevant context, define the change scope, and only implement once the target and validation path are clear.

### Pass criteria

- classifies as implementation
- inspects relevant context
- implements only after scope is concrete
