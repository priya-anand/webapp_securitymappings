import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({

  host: 'http://10.0.0.4:3000',
  headers: {
    'Content-Type': 'application/json',
  },

});
