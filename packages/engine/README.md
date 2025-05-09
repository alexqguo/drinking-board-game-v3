# Core Engine

## Development and Testing

(Gemini wrote this)

### Code Coverage

This package uses `c8` for code coverage, integrated with Cucumber.js for running tests.

#### Addressing Branch Coverage Issues with Imports

A common challenge when measuring code coverage for TypeScript projects is the "missing branch on imports" issue. This occurs when coverage tools report that `import` statements have uncovered branches, even if the modules are correctly imported and used.

**The Problem:**

The issue typically stems from the JavaScript code generated during TypeScript transpilation. To handle ES Module (`import`) syntax, especially when interoperating with CommonJS or within different module loading strategies, transpilers like `tsx` (or `tsc` itself) may inject helper functions or conditional logic. Coverage tools, particularly those based on source code instrumentation like Istanbul.js (which `nyc` uses), interpret these generated JavaScript structures as branches. Even if these "branches" are artifacts of the transpilation process and always take the same execution path, the alternative path is flagged as "missed," leading to inaccurate branch coverage metrics.

**The Solution Implemented:**

To achieve more accurate branch coverage for this package, the following approach was adopted:

1.  **Coverage Tool**: Switched from `nyc` to `c8`. `c8` leverages V8's built-in JavaScript coverage capabilities. This means it collects coverage information directly from the JavaScript engine as the code executes, which can be less susceptible to misinterpreting transpilation artifacts compared to instrumenting the source code.

2.  **Test Execution Command**: The `test` script in `package.json` was configured to run Cucumber.js tests with `tsx` integrated as a Node.js loader. The command is:

    ```bash
    c8 sh -c "NODE_OPTIONS='--loader tsx' cucumber-js"
    ```

    - `sh -c "..."`: Executes the command string in a shell, allowing environment variables to be set specifically for that command.
    - `NODE_OPTIONS='--loader tsx'`: This environment variable instructs Node.js to use `tsx` as a custom module loader. `tsx` then handles the on-the-fly transpilation of all TypeScript files (both step definitions and imported source files) into JavaScript that Node.js can execute (as ES Modules, given the package type).
    - `cucumber-js`: Runs the tests.

3.  **Cucumber Configuration (`cucumber.json`)**: Simplified to directly import `.ts` step definition files (e.g., `import: ["features/**/*.ts"]`), as `tsx` is globally available to the Node.js process via `NODE_OPTIONS`.

This setup ensures that `tsx` consistently handles all TypeScript transpilation at a fundamental level for the test execution process. `c8` then collects coverage from V8's native understanding of the executed code, leading to more accurate branch coverage reports, particularly for `import` statements.
