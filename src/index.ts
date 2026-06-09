import { findByProps } from "@vendetta/metro";

let interval: ReturnType<typeof setInterval>;

async function updateRPC() {
  try {
    const res = await fetch("http://localhost:6969");
    const { window } = await res.json();
    const FluxDispatcher = findByProps("dispatch", "subscribe");
    FluxDispatcher.dispatch({
      type: "LOCAL_ACTIVITY_UPDATE",
      activity: {
        name: "Active Window",
        details: window,
        type: 0,
        timestamps: { start: Date.now() },
        application_id: "1513804906408968212",
      },
      socketId: "CustomRPC",
    });
  } catch (e) {
    console.error("[ActiveWindowRPC]", e);
  }
}

export default {
  onLoad() {
    updateRPC();
    interval = setInterval(updateRPC, 5000);
  },
  onUnload() {
    clearInterval(interval);
    const FluxDispatcher = findByProps("dispatch", "subscribe");
    FluxDispatcher.dispatch({
      type: "LOCAL_ACTIVITY_UPDATE",
      activity: null,
      socketId: "CustomRPC",
    });
  },
};

