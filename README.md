# Lurk Report

A browser extension for Chrome and Opera GX that tracks how long you watch each Twitch streamer and turns it into personal stats.

> 🚧 **Version 0.1.0** – currently in review for the Chrome Web Store.

<img width="1269" height="785" alt="image" src="https://github.com/user-attachments/assets/b067316c-479b-4c2c-b9e6-5012ccb77cc6" />



## Features

- ✅ Detects the current Twitch channel, including channel switches without page reload
- ✅ Counts watch time only while the stream is playing and the tab is visible
- ✅ Stores watch time locally per day and streamer
- ✅ Popup with your personal streamer ranking
- ✅ Filter by today, this week, this month or all time
- ✅ Live updates while the popup is open
- ☑️ Yearly recap of your top streamers
- ☑️ Export and import your data

## Privacy

All data stays in your browser (`chrome.storage.local`). Nothing is sent to any server, there is no tracking and no login is required. See [PRIVACY.md](PRIVACY.md).

## Tech Stack

- [WXT](https://wxt.dev) – framework for browser extensions
- TypeScript
- React
- Chrome Extension Manifest V3

## How it works

1. A **content script** runs on twitch.tv and checks every 5 seconds which channel is open and whether the video is playing in a visible tab.
2. If you are watching, it adds 5 seconds for that streamer and day and saves the result in `chrome.storage.local`.
3. The **popup** (React) loads the data, groups it per streamer, filters it by the selected time range and listens for storage changes to update live.


## Why I built this

I watch a lot of Twitch and was curious how much time I actually spend with which streamers. The project also helped me learn TypeScript
