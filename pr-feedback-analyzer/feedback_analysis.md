# PR Feedback Analysis for @daesunp

**787 comments** across **80 pull requests** in `microsoft/FluidFramework`

---

## Theme Summary Table

| Rank | Theme | Count | % of Total | Top Flaggers |
|------|-------|-------|------------|--------------|
| 1 | **Documentation** | 169 | 21.5% | Josmithr, CraigMacomber |
| 2 | **Simplification** | 116 | 14.7% | noencke, CraigMacomber |
| 3 | **API Design** | 88 | 11.2% | noencke, CraigMacomber |
| 4 | **Correctness / Logic** | 91 | 11.6% | alex-pardes, CraigMacomber, noencke |
| 5 | **Testing** | 74 | 9.4% | CraigMacomber, yann-achard-MS, copilot |
| 6 | **Naming** | 69 | 8.8% | Josmithr, CraigMacomber, noencke |
| 7 | **Types / Type Safety** | 61 | 7.8% | noencke, CraigMacomber |
| 8 | **Readability / Style** | 80 | 10.2% | noencke, Josmithr |
| 9 | **Architecture / Layering** | 13 | 1.7% | CraigMacomber |
| 10 | **Error Handling** | 15 | 1.9% | noencke, Josmithr |
| 11 | **Performance** | 15 | 1.9% | noencke, Abe27342 |
| 12 | **Concurrency / Async** | 5 | 0.6% | Josmithr |

*(Comments often span multiple themes, so percentages sum to >100%.)*

---

## Detailed Theme Breakdown

### 1. Documentation (169 comments) -- THE #1 ISSUE

The single most frequent feedback by a wide margin. Reviewers consistently ask for:
- JSDoc on public APIs, interfaces, schemas, exported types
- User-facing doc comments (explain *what* and *why*, not implementation mechanics)
- Proper TSDoc formatting (`@remarks`, `@returns`, `@privateRemarks`)
- Changeset descriptions that are accurate and well-categorized

**Representative quotes:**

> "The summary should be descriptive to a user, not necessarily descriptive of the mechanics of the thing. Like, what really is this thing? Why would I want it?"
> -- **noencke**, PR #26405

> "Docs please."
> -- **Josmithr**, PR #24337 (appeared 3+ times across PRs)

> "This comment is mostly expressed in terms of type information, which is already captured by the type-system itself. I generally recommend writing summary comments in terms of raw semantics."
> -- **Josmithr**, PR #24337

> "This should have a doc comment noting the semantics of this type."
> -- **CraigMacomber**, PR #26061

> "Keep in mind that this might be a user's very first point of discovery for this feature. Ideally they would read docs and examples first, but in case they just stumble across this API, we want them to get a picture of what they could use it for."
> -- **noencke**, PR #25938

---

### 2. Simplification (116 comments)

Reviewers *consistently* find that implementations are more complex than necessary. This includes: redundant code, unnecessary abstractions, premature optimizations, dead code, and features that already exist elsewhere.

**Representative quotes:**

> "This whole 'double linking' scheme is making the code significantly more complicated and hard to read than it would otherwise be... Let's do something else."
> -- **noencke**, PR #26405

> "Both this class and the interface one are pretty complicated. I don't know if they're actually helping to solve the problem here. In fact -- ClassPromptBuilder isn't even used?"
> -- **noencke**, PR #26117

> "The way it is now is more complicated and verbose than either the original state or the above suggestion, IMO."
> -- **noencke**, PR #23298

> "We shouldn't really need a method for this. The user can just call `todoItem.checked = true`."
> -- **Josmithr**, PR #24183

> "This generator doesn't do anything. You can just inline the `contents` field."
> -- **Abe27342**, PR #19962

---

### 3. API Design (88 comments)

Many discussions about the right shape of public-facing APIs: what to export, interface vs class, parameter design, and premature stabilization.

**Representative quotes:**

> "Prefer to export an interface called LabelTree and then you can have it implemented here by a class... it's usually best practice since it's easier for us to make compatible API changes."
> -- **noencke**, PR #26405

> "Why do we want defaultProvider to be public? A user... won't be able to do anything with it, right, because the type is erased?"
> -- **noencke**, PR #20814

> "Having to pass multiple things through a bunch of functions like this can be annoying... A design pattern for cases like this is to group them into a single object."
> -- **CraigMacomber**, PR #22400

> "We should either take exactly two base edits in the arguments or we should handle an arbitrary number of base changes."
> -- **alex-pardes**, PR #19366

---

### 4. Correctness / Logic (91 comments)

Actual bugs, edge cases, off-by-one errors, and incorrect logic. Notably concentrated in fuzz testing and rebaser PRs.

**Representative quotes:**

> "The condition `candidateName !== shortName` in the while loop is incorrect. The variable candidateName is constructed as `${shortName}_${counter}` which will never equal shortName, making this condition always true."
> -- **copilot**, PR #26080

> "We want to do `fn(this.transactionLabel)` here, not `fn(label)`."
> -- **noencke**, PR #25938

> "Before your change, I think this is validating all entry points except the one you just removed, and now you have removed the validation. That doesn't seem like the right change."
> -- **CraigMacomber**, PR #23244

> "This isn't the correct way to do this check. A path that has this key somewhere along the path (but not as the root) should not pass this check."
> -- **CraigMacomber**, PR #16823

---

### 5. Testing (74 comments)

Missing tests, weak assertions, missing edge cases, and test organization issues.

**Representative quotes:**

> "Let's have one 'complicated' test that checks all eight outputs are exactly what we expect for the following inputs."
> -- **noencke**, PR #26080

> "I think all your tests would pass if deleteRows deleted every row no matter what you passed, or if it deleted rows incorrectly index backwards from the end."
> -- **CraigMacomber**, PR #24289

> "Rather than testing that these two values are not equal, I recommend using `assert.deepEqual`... to assert what the whole return value should be. This will catch more bugs."
> -- **yann-achard-MS**, PR #25691

> "This logic isn't very simple or an established pattern: we should have more test coverage for it."
> -- **Abe27342**, PR #18675

---

### 6. Naming (69 comments)

Variable, function, type, and test naming. Reviewers push for semantic names that match codebase conventions.

**Representative quotes:**

> "We don't generally emphasize the 'tree'-ness of schema types... TodoTree => TodoList, TodoItemTree => TodoItem."
> -- **Josmithr**, PR #24183

> "I don't think 'ParentObject' is a great name as it does not convey what it's a parent of... TreeParent would be a better name."
> -- **CraigMacomber**, PR #26061

> "shortId rather than shortID. This is consistent with how we case other acronyms -- for example, note that the interface is TreeNodeApi rather than TreeNodeAPI."
> -- **noencke**, PR #20505

> "Since there are a bunch of types in this file, 'create' is not sufficiently descriptive. 'createFieldSchema' would be better. Also note we tend to use 'create' and not 'make' in factory function names."
> -- **CraigMacomber**, PR #20681

---

### 7. Types / Type Safety (61 comments)

Unsafe casts, missing type guards, incorrect variance, and stronger typing opportunities.

**Representative quotes:**

> "Remove this cast -- cast to string instead. We *know* that value is a string, so that's a fine cast. We do *not* know that it is a `StableNodeKey`, so that's *not* a fine cast!"
> -- **noencke**, PR #20755

> "no cast! cast bad! :D Use `isStableId()`."
> -- **noencke**, PR #20755

> "TreeView is invariant over its schema, not covariant, so it will be impossible to actually use this for a view with any schema that is not exactly ImplicitFieldSchema."
> -- **CraigMacomber**, PR #26061

> "Always make your inputs readonly unless you have a reason not to."
> -- **noencke**, PR #26080

---

## Reviewer Style Notes

### noencke (241 comments -- primary reviewer)
**Focus: Simplification + API design + type safety.** Consistently pushes back on unnecessary complexity, asking "do we need this?" and proposing simpler alternatives. Strongly advocates for user-facing docs over implementation-focused docs. Provides detailed code suggestions inline. Catchphrase: *"no cast! cast bad!"*

### CraigMacomber (150 comments)
**Focus: Correctness + architecture + documentation.** The most technically thorough reviewer. Enforces strict module layering rules (core -> feature-libraries -> flex-tree -> simple-tree). Catches subtle bugs and provides long explanations of *why* something should change. Cares deeply about accurate error messages and proper API surface.

### Josmithr (118 comments)
**Focus: Documentation + naming conventions + code organization.** Nearly every comment is about JSDoc, TSDoc formatting, changeset wording, or naming. Enforces FluidFramework conventions: no `I` prefix on interfaces, camelCase filenames, `readonly` properties. Reviews are especially thorough on example apps. Phrase to watch for: *"Docs please."*

### Abe27342 (69 comments)
**Focus: Testing + documentation + bundle size.** Concentrated on fuzz testing and summarization PRs. Attentive to bundle size/performance concerns and proper codec patterns. Catches dead code and asks for better test organization.

### taylorsw04 (65 comments)
**Focus: Testing + naming + clarifying questions.** Asks probing "why" questions that serve as quality checks on design decisions. Pushes for renaming to avoid implementation-detail leakage ("ArrayChildren" not "SequenceChildren").

### alex-pardes (25 comments, concentrated)
**Focus: Mathematical correctness.** Almost exclusively reviewed rebaser axiom tests. Very focused on proper revision tagging, rollback inverse handling, and function signature correctness.

### yann-achard-MS (33 comments)
**Focus: Testing thoroughness + API design for eventing.** Deep domain expertise on tree internals. Advocates for robust assertions (`deepEqual` over individual checks).

---

## Personal PR Checklist

Based on the patterns above, verify these items before submitting any future PR:

### Documentation (the biggest gap)
- [ ] Every exported type, interface, and function has a JSDoc comment
- [ ] Doc comments describe *what* and *why* for users, not implementation mechanics
- [ ] TSDoc uses proper tags: `@remarks`, `@returns`, `@privateRemarks`
- [ ] Changeset has accurate title, correct category (deprecation vs breaking change), and clear description
- [ ] Schema fields and properties have doc comments

### Simplification
- [ ] No dead code, unused parameters, or unused imports
- [ ] No unnecessary abstractions -- is this helper/class actually saving complexity?
- [ ] Check if an existing utility already does what you're implementing
- [ ] No premature optimization -- is the complexity justified by real-world perf needs?
- [ ] No code duplication -- can existing code paths be extended instead?

### API Design
- [ ] Export interfaces, not classes, for public APIs
- [ ] Group related parameters into a single options object when passing 3+
- [ ] Question every `export` -- does the user actually need this?
- [ ] Return concrete types (`| undefined`) rather than throwing/asserting for missing values

### Types & Safety
- [ ] No unsafe casts (`as SomeType`) -- use type guards or `satisfies` instead
- [ ] All function inputs are `readonly` unless mutation is needed
- [ ] Array properties use `readonly T[]`
- [ ] Use branded types (e.g., `isStableId()`) instead of raw casts

### Testing
- [ ] New logic has corresponding tests
- [ ] Tests use `deepEqual` for structural assertions (not individual field checks)
- [ ] Tests include edge cases: empty inputs, boundary values, error paths
- [ ] Test names describe behavior, not implementation
- [ ] Tests would fail if the implementation were subtly wrong

### Naming
- [ ] Names are semantic (describe *what it is*), not implementation-derived (not "tree"-ness)
- [ ] Follow codebase conventions: `camelCase` files, no `I` prefix, `create` not `make`
- [ ] Acronym casing matches codebase: `shortId` not `shortID`, `TreeNodeApi` not `TreeNodeAPI`
- [ ] Try-variant functions are named `tryXxx`

### Correctness
- [ ] Logic works for all field kinds, not just the one you tested
- [ ] Values propagate to forked/cloned objects
- [ ] Loop conditions are correct (watch for always-true/always-false)
- [ ] Error messages accurately describe the failure

### Architecture (FluidFramework-specific)
- [ ] No imports from higher layers into lower layers (check the README dependency diagram)
- [ ] No unrelated changes in the PR
- [ ] No circular imports between modules

---

## Suggested Automated Review Rules

| Checklist Item | Enforcement |
|---|---|
| Every export has JSDoc | **ESLint**: `jsdoc/require-jsdoc` on exported declarations |
| No unsafe `as` casts | **ESLint**: `@typescript-eslint/consistent-type-assertions` with `assertionStyle: "never"` or a custom rule |
| Inputs are `readonly` | **ESLint**: `@typescript-eslint/prefer-readonly-parameter-types` |
| No unused exports | **ts-prune** or **knip** in CI |
| Test coverage for new code | **CI**: Coverage threshold check (e.g., `c8`, `istanbul`) |
| Changeset present and categorized | **CI**: Existing changeset bot (already in FluidFramework) |
| No circular imports | **ESLint**: `import/no-cycle` |
| Layer violations | **ESLint**: `import/no-restricted-paths` with FluidFramework layer config |
| Doc comments are user-facing | **LLM review prompt**: "Check that all JSDoc comments describe what the API does and why a user would want it, rather than describing implementation mechanics." |
| Simplification opportunities | **LLM review prompt**: "Identify any code that could be simplified: unnecessary abstractions, dead code, duplicated logic, or existing utilities that could be reused." |
| Correct naming conventions | **LLM review prompt**: "Check that names follow FluidFramework conventions: camelCase files, no I prefix on interfaces, semantic names (not implementation-detail names like 'tree'), acronyms as camelCase (shortId not shortID), factory functions use 'create' not 'make'." |

---

*Generated from 787 review comments across 80 PRs in microsoft/FluidFramework.*
