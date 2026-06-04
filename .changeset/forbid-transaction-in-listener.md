---
"@fluidframework/tree": minor
"fluid-framework": minor
"__section": tree
---
Starting a transaction inside a change-event listener now produces a usage error

Calling `runTransaction` from inside a `nodeChanged`, `treeChanged`, or `changed` event listener now throws a `UsageError`, and `runTransactionAsync` rejects with one.
This brings transactions into line with the existing rule that direct tree mutations from inside a change-event listener are forbidden.

The error follows the existing format used by the other listener-time guards:

```
Running a transaction is forbidden during a nodeChanged, treeChanged, or changed event
```

For `nodeChanged` and `treeChanged` this primarily improves the error: edits inside the transaction body were already throwing on the inner mutation's lock check, so a listener-started transaction that did real work already failed — just with an error that named the inner edit rather than the `runTransaction` call. The guard now fails earlier and names the actual misuse.

After this error is thrown, the affected tree view enters a broken state and subsequent operations on it throw an `Invalid use of ... after it was put into an invalid state` error. Discard the view and acquire a fresh one to recover.

Applications should not make edits in response to edits. If a derived edit is genuinely needed, drive it from a user action or apply it on a `TreeBranchAlpha` and merge from there.
