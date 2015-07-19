/**
* Country.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'localDiskDb',
	autoPK: false,
  attributes: {
  	name: {
      "type": "string",
      "unique": true
    },
    description: {
      "type": "string",
      "defaultsTo": ""
    }
  }
};

