---
"fluid-framework": "major"
"@fluidframework/tool-utils": "major"
"@fluidframework/telemetry-utils": "major"
"@fluidframework/odsp-doclib-utils": "major"
"@fluidframework/fluid-runner": "major"
"@fluid-tools/fetch-tool": "major"
"@fluidframework/devtools-core": "major"
"@fluidframework/devtools": "major"
"@fluidframework/test-utils": "major"
"@fluid-internal/test-driver-definitions": "major"
"@fluid-internal/mocha-test-setup": "major"
"@fluidframework/tinylicious-client": "major"
"@fluid-experimental/odsp-client": "major"
"@fluid-experimental/odsp-end-to-end-tests": "major"
"@fluidframework/azure-end-to-end-tests": "major"
"@fluidframework/azure-client": "major"
"@fluidframework/test-runtime-utils": "major"
"@fluidframework/runtime-utils": "major"
"@fluidframework/runtime-definitions": "major"
"@fluidframework/id-compressor": "major"
"@fluidframework/datastore-definitions": "major"
"@fluidframework/datastore": "major"
"@fluidframework/container-runtime-definitions": "major"
"@fluidframework/container-runtime": "major"
"@fluidframework/driver-utils": "major"
"@fluidframework/container-loader": "major"
"@fluidframework/undo-redo": "major"
"@fluidframework/synthesize": "major"
"@fluidframework/request-handler": "major"
"@fluid-experimental/oldest-client-observer": "major"
"@fluidframework/fluid-static": "major"
"@fluid-experimental/dds-interceptions": "major"
"@fluid-experimental/data-object-base": "major"
"@fluidframework/fluid-telemetry": "major"
"@fluidframework/app-insights-logger": "major"
"@fluid-experimental/attributor": "major"
"@fluidframework/aqueduct": "major"
"@fluidframework/agent-scheduler": "major"
"@fluidframework/tinylicious-driver": "major"
"@fluidframework/routerlicious-urlresolver": "major"
"@fluidframework/routerlicious-driver": "major"
"@fluidframework/replay-driver": "major"
"@fluidframework/odsp-urlresolver": "major"
"@fluidframework/odsp-driver-definitions": "major"
"@fluidframework/odsp-driver": "major"
"@fluidframework/local-driver": "major"
"@fluidframework/file-driver": "major"
"@fluidframework/driver-web-cache": "major"
"@fluidframework/driver-base": "major"
"@fluidframework/debugger": "major"
"@fluidframework/tree": "major"
"@fluidframework/task-manager": "major"
"@fluidframework/shared-summary-block": "major"
"@fluidframework/shared-object-base": "major"
"@fluidframework/sequence": "major"
"@fluidframework/register-collection": "major"
"@fluid-experimental/pact-map": "major"
"@fluidframework/ordered-collection": "major"
"@fluidframework/merge-tree": "major"
"@fluidframework/matrix": "major"
"@fluidframework/map": "major"
"@fluid-experimental/ink": "major"
"@fluidframework/counter": "major"
"@fluidframework/cell": "major"
"@fluidframework/driver-definitions": "major"
"@fluidframework/core-utils": "major"
"@fluidframework/core-interfaces": "major"
"@fluidframework/container-definitions": "major"
"@fluid-internal/client-utils": "major"
"@fluid-experimental/last-edited": "major"
"@fluid-experimental/data-objects": "major"
"@fluid-experimental/tree": "major"
"@fluid-experimental/sequence-deprecated": "major"
"@fluid-experimental/sharejs-json1": "major"
"@fluid-experimental/ot": "major"
"@fluid-experimental/attributable-map": "major"
"@fluid-experimental/property-shared-tree-interop": "major"
"@fluid-experimental/property-query": "major"
"@fluid-experimental/property-proxy": "major"
"@fluid-experimental/property-properties": "major"
"@fluid-experimental/property-inspector-table": "major"
"@fluid-experimental/property-dds": "major"
"@fluid-experimental/property-common": "major"
"@fluid-experimental/property-changeset": "major"
"@fluid-experimental/property-binder": "major"
"@fluid-experimental/azure-scenario-runner": "major"
"@fluidframework/azure-service-utils": "major"
"@fluidframework/azure-local-service": "major"
---

Packages now use package.json "exports" and require modern module resolution

Fluid Framework packages have been updated to use the [package.json "exports"
field](https://nodejs.org/docs/latest-v18.x/api/packages.html#exports) to define explicit entry points for both
TypeScript types and implementation code.

This means that using Fluid Framework packages require the following TypeScript settings in tsconfig.json:

- `"moduleResolution": "Node16"` with `"module": "Node16"`
- `"moduleResolution": "Bundler"` with `"module": "ESNext"`

We recommend using Node16/Node16 unless absolutely necessary. That will produce transpiled JavaScript that is suitable
for use with modern versions of Node.js _and_ Bundlers.
[See the TypeScript documentation](https://www.typescriptlang.org/tsconfig#moduleResolution) for more information
regarding the module and moduleResolution options.

**Node10 moduleResolution is not supported; it does not support Fluid Framework's API structuring pattern that is used
to distinguish stable APIs from those that are in development.**