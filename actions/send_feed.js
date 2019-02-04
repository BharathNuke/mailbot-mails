"use strict";
let datafire = require('datafire');

let cnn_rss = require('@datafire/cnn_rss').actions;
let nytimes_rss = require('@datafire/nytimes_rss').actions;
let myActions = datafire.Project.main().actions;
let google_gmail = require('@datafire/google_gmail').actions;
module.exports = new datafire.Action({
  handler: async (input, context) => {
    let cnn_feed = await cnn_rss.topStories({}, context);
    let nytimes_feed = await nytimes_rss.homePage({}, context);
    let body = await myActions.parse_feeds.run({
      feeds: [
        cnn_feed,
        nytimes_feed
      ],
    }, context);
    return body;
  },
});
