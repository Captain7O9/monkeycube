/**
 * Epoch time when the session started.
 */
let sessionStart = Date.now();

function createSessionStore() {
  return {
    get start() {
      return sessionStart;
    },
    set() {
      sessionStart = Date.now();
    }
  };
}

const session = createSessionStore();

export default session;
