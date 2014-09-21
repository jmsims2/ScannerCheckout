/**
* Status.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    event: {
        type: "string"
    },
    checkout_emp_id: {
        type: "string",
        required: true
    },
    checkout_emp_name: {
        type: "string",
        required: true
    },
    asset_tag: {
        type: "string",
        required: true
    },
    asset_name: {
        type: "string",
        required: true
    },
    asset_status: {
        type: "string",
        required: true,
        enum: ["out","in"]
    },
    checkout_time: "datetime",
    checkin_time: "datetime",
    checkin_emp_id: "string",
    checkin_emp_name: "string",
    notes: "text"
  }
};

