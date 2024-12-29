// Declaring the Global Variable

// Disabling ESLint Var Warning
/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongClient> | undefined;
}
// Enabling ESLint Var Warning
/* eslint-enable no-var */

export {};
