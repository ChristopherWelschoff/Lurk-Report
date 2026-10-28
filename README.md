# Twitch Wrapped

A browser extension for Chrome and Opera GX that tracks how long you watch each Twitch streamer and turns it into personal stats – like Spotify Wrapped, but for Twitch.

> 🚧 **Work in progress** – currently in early development.

## Features

- [x] Detects the current Twitch channel, including channel switches without page reload
- [ ] Counts watch time only while the stream is playing and the tab is visible
- [ ] Stores watch time locally per day and streamer
- [ ] Popup with your top streamers
- [ ] Stats for today, this week, this month and all time
- [ ] Yearly "Wrapped" summary

## Privacy

All data stays in your browser (`chrome.storage.local`). Nothing is sent to any server, and no Twitch login is required.

## Tech Stack

- [WXT](https://wxt.dev) – framework for browser extensions
- TypeScript
- React
- Chrome Extension Manifest V3

## Getting Started

```bash
npm install
npm run dev
```

This opens a separate Chrome window with the extension loaded.

## Why I built this

I watch a lot of Twitch and was curious how much time I actually spend with which streamers. The project also helps me learn TypeScript and how browser extensions work.
