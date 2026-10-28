import type { WatchEntry } from "@/types/WatchEntry";

const IGNORED_PAGES = [
  "directory",
  "settings",
  "search",
  "downloads",
  "videos",
];

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

      const video = document.querySelector("video");
      if (!video) {
        return;
      }

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const today = `${year}-${month}-${day}`;

      console.log(`[TW] ${today}`);

      const isVisible = document.visibilityState === "visible";

      const isWatching = isVisible && !video.paused;

      console.log(
        `[TW] Channel: ${channel} isWatching: ${isWatching} isVisible: ${isVisible}`,
      );
    }, 5000);
  },
});
