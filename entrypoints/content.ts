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
    console.log("[TW] script läuft");
    function getToday() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const today = `${year}-${month}-${day}`;

      return today;
    }

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

      const isVisible = document.visibilityState === "visible";

      const isWatching = isVisible && !video.paused;

      if (!isWatching) {
        return;
      }

      const today = getToday();

      console.log(`[TW] ${today} ${channel} +5s`);
    }, 5000);
  },
});
