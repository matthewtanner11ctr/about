---
name: publish-packages
description: 'Publish npm packages safely. Use when preparing a release, reviewing package metadata, verifying registry access, or running npm publish with the correct version and registry configuration.'
argument-hint: 'What package or release are you publishing?'
user-invocable: true
disable-model-invocation: false
---

# Publish Packages

## When to Use

- Publish a package to npm or another registry
- Perform a release dry run or preflight validation
- Confirm package metadata before a release
- Verify registry auth, scoped package access, and package visibility after publishing

## Procedure

1. Confirm the package is meant to be published.
   - If the package is marked `private: true` in `package.json`, stop and ask whether the user wants to change that metadata before publishing.
   - If the user only wants a local or test workflow, do not publish.

2. Review the release inputs before touching the registry.
   - Confirm the package name, version, and intended registry.
   - Check whether the user wants a patch, minor, or major version bump.
   - Verify that any required fields such as `files`, `main`, `exports`, or repository metadata are correct.

3. Verify authentication and registry target.
   - Run `npm whoami` or equivalent registry auth checks.
   - Confirm the correct registry is selected, especially for scoped packages.
   - If credentials are missing or invalid, stop and guide the user to authenticate before continuing.

4. Run a preflight validation step.
   - Use `npm pack --dry-run` or `npm pack` to inspect the package contents.
   - Review the generated tarball for unexpected files and ensure the published artifact matches the intended package surface.

5. Prepare the release.
   - Apply the chosen version bump intentionally.
   - Update release notes or changelog content if the project uses them.
   - Ensure the package version is not already published unless the user explicitly intends a re-release.

6. Publish only after explicit confirmation.
   - Use `npm publish` for the default registry.
   - Use the required access flag for scoped packages when applicable, such as `--access public`.
   - Avoid publishing from an unreviewed or unapproved branch or state.

7. Verify the result.
   - Confirm the new version is visible via `npm view <package-name>@<version>` or the equivalent registry command.
   - Review the final package metadata and distribution details.

## Completion Checklist

- Package metadata was reviewed and approved
- Version bump was explicit and intentional
- Registry authentication and target were verified
- Preflight tarball inspection completed successfully
- Publish command was run only after confirmation
- Published version can be confirmed in the registry
