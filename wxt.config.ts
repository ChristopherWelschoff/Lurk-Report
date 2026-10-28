import { defineConfig } from "wxt";

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "Lurk Report – Watchtime Stats for Twitch",
    description:
      "See how much time you spend watching each Twitch streamer – today, this week, this month or all time.",
    permissions: ["storage"],
  },
});
