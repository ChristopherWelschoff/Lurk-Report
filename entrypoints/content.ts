const IGNORED_PAGES = ["directory", "settings", "search", "downloads"];

export default defineContentScript({
  matches: ["*://*.twitch.tv/*"],
  main(ctx) {
    ctx.setInterval(() => {
      const channel = location.pathname.split("/")[1];

      if (!channel) {
        return;
      }

      if (IGNORED_PAGES.includes(channel)) {
        return;
      }
      console.log("[TW] Channel:", channel);
    }, 5000);
  },
});
