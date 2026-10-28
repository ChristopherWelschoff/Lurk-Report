import { defineConfig } from "wxt";

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Twitch Wrapped",
    description: "Tracks your Twitch watch time per streamer.",
    permissions: ["storage"],
  },
});
