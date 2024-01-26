// index.js npmjs main exports
Promise.all([
  import("./src/RestModule.mjs"),
  import("./src/TapProtocol.mjs"),
  import("./src/TracManager.mjs"),
]).then((modules) => {
    const [RestModule, TapProtocol, TracManager] = modules.map(
      (module) => module.default
    );
    module.exports = { RestModule, TapProtocol, TracManager };
  })
  .catch((error) => {
    console.error("Error importing modules:", error);
  });