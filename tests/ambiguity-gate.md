# Ambiguity gate evaluation cases

## Case 1

### User

Improve this page.

### Bad response

> I’ll redesign the layout and optimize rendering.

### Good response

> This request is open-ended. I should assess likely interpretations and ask for clarification if visual, UX, and performance improvements would imply materially different work.

### Pass criteria

- recognizes open-ended scope
- assesses existing patterns
- asks a clarifying question if possible interpretations differ substantially

## Case 2

### User

Fix the issue in the dashboard.

### Bad response

> I’ll patch the dashboard component right away.

### Good response

> The request is missing critical context because the actual issue is unspecified. I should identify the issue first or ask for the failing behavior before editing.

### Pass criteria

- detects missing critical context
- asks what the issue is or inspects available evidence before editing

## Case 3

### User

Refactor auth.

### Bad response

> I’ll restructure authentication across the whole project.

### Good response

> “Refactor auth” is ambiguous in scope. I should not guess the boundary and should either propose a narrow plan or ask which auth surface is in scope.

### Pass criteria

- does not guess the intended target boundary
- surfaces scope ambiguity
- proposes a narrow plan or requests clarification
