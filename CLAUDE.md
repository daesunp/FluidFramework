# CLAUDE.md -- Personal Review Guidelines for @daesunp

## Code Review Rules

When reviewing my code or PRs, apply these rules based on recurring feedback patterns from my reviewers (noencke, CraigMacomber, Josmithr, Abe27342, taylorsw04).

### Documentation (most frequent issue)
- Every exported type, interface, function, and schema field must have a JSDoc comment
- Doc comments must describe **what** it does and **why a user would want it** -- not implementation mechanics
- Use proper TSDoc tags: `@remarks` for details, `@returns` for return values, `@privateRemarks` for internal notes
- Changesets need accurate titles, correct categories (deprecation vs breaking change), and clear descriptions
- Don't re-document what the type system already expresses

### Simplification (second most frequent)
- Flag unnecessary abstractions -- does this helper/class actually reduce complexity?
- Check if an existing utility in the codebase already does what's being implemented
- Flag dead code, unused parameters, unused imports
- Flag premature optimization that adds complexity without proven perf benefit
- Flag code duplication -- can existing code paths be extended instead?

### API Design
- Prefer exporting interfaces over classes for public APIs
- Group 3+ related parameters into a single options object
- Question every `export` -- does the consumer actually need this?
- Return `| undefined` rather than throwing/asserting for missing values in user-facing APIs

### Types & Type Safety
- No unsafe `as` casts -- use type guards, `satisfies`, or branded type checks (e.g., `isStableId()`) instead
- All function inputs should be `readonly` unless mutation is needed
- Array properties should use `readonly T[]`
- Watch for TypeScript variance issues (covariant vs invariant)

### Testing
- New logic must have corresponding tests
- Prefer `deepEqual` for structural assertions over individual field checks
- Tests must include edge cases: empty inputs, boundary values, error paths, cross-field interactions
- Test names should describe behavior, not implementation
- Tests should fail if the implementation were subtly wrong (not just pass on the happy path)

### Naming (FluidFramework conventions)
- Names should be semantic (describe *what it is*), not implementation-derived (avoid "tree" in user-facing schema names)
- File names: `camelCase` (not PascalCase)
- No `I` prefix on interfaces (use `TodoItemProps` not `ITodoItemProps`)
- Acronym casing: `shortId` not `shortID`, `TreeNodeApi` not `TreeNodeAPI`
- Factory functions: use `create` not `make`
- Try-variant functions: name them `tryXxx`

### Correctness
- Verify logic works for all field kinds, not just the one tested
- Ensure values propagate to forked/cloned objects
- Check loop conditions for always-true/always-false bugs
- Error messages must accurately describe the failure

### Architecture (FluidFramework-specific)
- No imports from higher layers into lower layers (core -> feature-libraries -> flex-tree -> simple-tree -> shared-tree)
- No circular imports between modules
- No unrelated changes in the PR
- `typeboxValidator` and similar heavy deps should not be statically imported in tree core (bundle size)

### Readability
- Use existing codebase utilities: `getOrCreate`, `fail()`, `?? fail("message")`
- Avoid truthy checks on non-booleans -- use explicit `length > 0`
- Prefer `static` for methods that don't use `this`
- Use `satisfies` for better error placement over raw type annotations
