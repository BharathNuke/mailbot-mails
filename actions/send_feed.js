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
    let encodedMessage = await google_gmail.buildMessage({
      to: [
        "bharat.sosio@gmail.com",
        "twitterbot.sosio@gmail.com"
      ],
      from: "bharat.sosio@gmail.com",
      subject: "News Feeds",
      body: body,
    }, context);
    let message = await google_gmail.users.messages.send({
      userId: "me",
      body: {
        raw: encodedMessage,
      },
    }, context);
    return message;
  },
});
