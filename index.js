(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // index.ts
  var import_metro = __require("@vendetta/metro");
  var interval;
  async function updateRPC() {
    try {
      const res = await fetch("http://localhost:6969");
      const { window } = await res.json();
      const FluxDispatcher = (0, import_metro.findByProps)("dispatch", "subscribe");
      FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity: {
          name: "Active Window",
          details: window,
          type: 0,
          timestamps: { start: Date.now() },
          application_id: "1513804906408968212"
        },
        socketId: "CustomRPC"
      });
    } catch (e) {
      console.error("[ActiveWindowRPC]", e);
    }
  }
  var index_default = {
    onLoad() {
      updateRPC();
      interval = setInterval(updateRPC, 5e3);
    },
    onUnload() {
      clearInterval(interval);
      const FluxDispatcher = (0, import_metro.findByProps)("dispatch", "subscribe");
      FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity: null,
        socketId: "CustomRPC"
      });
    }
  };
})();
