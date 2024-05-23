# Rustalot map
This project is a website for the german medieval role-play "Rustalot".
More specifically, this is built from the data of the third season.

In essence, it is a "Google Maps"-like map with labels for the most important areas.
Additionally, player positions were saved every minute during the event
which can be replayed via a time selection.

It is very incomplete and currently broken, sadly.
It is viewable locally but not buildable for some reason.

## Running it

You need to have Node.js (20.5.1) installed and corepack enabled.
Then, you should be able to just
```bash
yarn install
```
and then
```bash
yarn run dev
```

## Goals

A list of features it has

* Wold map showing player positions

A list of features it should have/provide:

* Overview over all players
* Grouping/filtering by "category"
* Info for each streamer

A really, really, cool feature would be video content.
For example, you could watch the video of one streamer and then select
or have adjacent streamers alternate feeds available.
Like, watching something dumb happening from multiple perspectives.
The videos for that have been archived but somebody has to develop
and especially pay for that.
