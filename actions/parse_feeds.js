"use strict";
let datafire = require('datafire');

module.exports = new datafire.Action({
  description: "parse array of feeds to mail body",
  inputs: [{
    type: "array",
    title: "feeds"
  }],
  handler: async (input, context) => {    
    let body = '';
    input.feeds.forEach(result => {
      let feed = result.feed;
      body += `<h1>${feed.title}</h1>`;
      let entries = feed.entries.slice(0, 8);
      entries.forEach(entry => {
        body += `<p><a href="${entry.link}">${entry.title}</a></p>`
      })
    });
    return body;
  },
});
