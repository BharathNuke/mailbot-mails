"use strict";
let datafire = require('datafire');

module.exports = new datafire.Action({
  handler: async (input, context) => {
	return "on_calendar action triggered"
  },
});
