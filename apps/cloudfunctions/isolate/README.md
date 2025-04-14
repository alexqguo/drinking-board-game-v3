# Cloud function

Brief readme regarding setup details of the cloud function.

## Deployment
A few hacky things had to happen to get this to deploy correctly, as Firebase deployments do not natively support monorepo setups.

### Monorepo issue: Deployments
Firebase deploy will assume all of your dependencies exist within NPM. Since monorepos typically have custom module resolution for packages to depend on each other, any dependency the cloud function has won't be found when deploying the function. It will still run fine in the emulator locally though which makes it confusing.

`firebase-tools-with-isolate` ([npm link](https://github.com/0x80/firebase-tools-with-isolate)) is a fork and drop in replacement of `firebase-tools` which integrates `isolate-package` as part of the deploy step. Tldr is that it will package all internal dependencies manually before deploying. Alternatively you can do this packaging step yourself manually with pre/post deployment hooks.

If you are not using shared monorepo packages none of this is an issue.

References:
- https://www.codejam.info/2023/04/firebase-functions-monorepo.html

### Firebase token and github secrets
The deployment is triggered through a Github action. Since this is a monorepo, I thought to put one `deploy` turbo command, and each application can implement its deployment on its own. That way the Github action can just run `npm run deploy` and call it a day.

However, subpackages do not inherit environment variables properly, so they need to be utilized directly in the action's `run`. Currently this is setup as `npm run deploy -- -- $FIREBASE_TOKEN` at the action level and `"deploy": "npx firebase deploy --only functions --token "` at the subpackage level, but that is a hack. Probably would be better off just executing each required deployment step directly in the action.

Also, `--token` is basically deprecated from Firebase CLI so a new solution will likely be needed at some point.

## Permissions
### Invoker role
I was having trouble actually executing the cloud function once it did get deployed due to a CORS issue. This turned out to be mostly a red herring, as the issue was related to the invoker permissions. I added `allAuthenticatedUsers` as a principal with cloud function invocation permissions in the Google Cloud console (different from the Firebase console), but that did not do anything.

Somehow the "fix" was to just delete the function and redeploy it. Not sure what happened there.

### Realtime database
Permissions on Realtime DB are currently set up such that any authed user can read any Game data. I want the cloud function to be the only thing that can actually make a write. However, Realtime DB auth rules are weird in that I can just blanket disallow writes, but somehow cloud functions bypass that through the Admin SDK since they are running on Firebase servers with elevated privileges, supposedly.