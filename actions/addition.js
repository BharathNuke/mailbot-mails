"use strict";
let datafire = require('datafire');

module.exports = new datafire.Action({
  description: "add two numbers",
  inputs: [{
    type: "integer",
    title: "a",
    default: 0
  }, {
    type: "integer",
    title: "b",
    default: 0
  }],
  handler: async (input, context) => {
	return input.a + input.b
  },
});
