import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  token: DS.attr('string'),
  expires: DS.attr('number'),
});